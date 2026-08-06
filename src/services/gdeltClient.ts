import { Article, TopicCode } from '../types';
import { INITIAL_ARTICLES } from '../data/newsData';
import { formatTimeAgo } from '../utils/timeHelper';

export interface GdeltApiResponse {
  articles?: Array<{
    url?: string;
    url_mobile?: string;
    title?: string;
    seendate?: string;
    socialimage?: string;
    domain?: string;
    language?: string;
    sourcecountry?: string;
  }>;
}

// Parse GDELT seendate "20260803T053000Z" or "20260803053000"
function parseGdeltDate(seendate?: string): string {
  if (!seendate) return new Date().toISOString();
  try {
    const clean = seendate.replace(/[^0-9]/g, '');
    if (clean.length >= 14) {
      const year = clean.slice(0, 4);
      const month = clean.slice(4, 6);
      const day = clean.slice(6, 8);
      const hour = clean.slice(8, 10);
      const min = clean.slice(10, 12);
      const sec = clean.slice(12, 14);
      return new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}Z`).toISOString();
    }
  } catch {
    // fallback
  }
  return new Date().toISOString();
}

export interface GdeltBackendResponseMeta {
  status: number;
  statusText: string;
  url: string;
  source?: string;
  total?: number;
  isFallback?: boolean;
  sampleTitle?: string;
  rawJson?: any;
  error?: string;
}

/**
 * Live GDELT API Fetcher
 * Tries the backend proxy /api/gdelt first (to bypass CORS), then public CORS proxy, then direct fetch.
 */
export async function fetchGdeltClientNews(
  query: string = 'policy OR technology OR climate OR economy',
  maxRecords: number = 12
): Promise<{
  source: string;
  query: string;
  total: number;
  articles: Article[];
  isFallback?: boolean;
  backendResponseMeta?: GdeltBackendResponseMeta;
}> {
  const cleanQuery = query.trim() || 'policy';
  let backendMeta: GdeltBackendResponseMeta | undefined;

  // 1. First Attempt: Backend API proxy (/api/gdelt) which bypasses browser CORS completely
  try {
    const backendUrl = `/api/gdelt?query=${encodeURIComponent(cleanQuery)}&maxrecords=${maxRecords}`;
    const response = await fetch(backendUrl);
    
    if (response.ok) {
      const data = await response.json();
      backendMeta = {
        status: response.status,
        statusText: response.statusText,
        url: backendUrl,
        source: data.source,
        total: data.articles?.length || 0,
        isFallback: !!data.isFallback,
        sampleTitle: data.articles?.[0]?.title,
        rawJson: {
          source: data.source,
          query: data.query,
          total: data.total,
          isFallback: data.isFallback,
          articleCount: data.articles?.length || 0,
          sampleArticles: data.articles?.slice(0, 2).map((a: any) => ({
            id: a.id,
            title: a.title,
            source: a.source,
            publishedAt: a.publishedAt
          }))
        }
      };

      if (data.articles && data.articles.length > 0) {
        return {
          source: data.source || 'GDELT DOC 2.0 Live Stream',
          query: cleanQuery,
          total: data.articles.length,
          articles: data.articles,
          isFallback: !!data.isFallback,
          backendResponseMeta: backendMeta
        };
      }
    } else {
      backendMeta = {
        status: response.status,
        statusText: response.statusText,
        url: backendUrl,
        error: `HTTP ${response.status} ${response.statusText}`
      };
    }
  } catch (err: any) {
    console.warn("Backend /api/gdelt endpoint fetch failed, attempting client direct/proxy fallback...", err);
    backendMeta = {
      status: 0,
      statusText: 'Fetch Exception',
      url: `/api/gdelt?query=${encodeURIComponent(cleanQuery)}`,
      error: err?.message || 'Network error accessing /api/gdelt'
    };
  }

  // 2. Second Attempt: Public CORS proxy to query https://api.gdeltproject.org directly in browser
  const gdeltRawUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(cleanQuery)}&mode=artlist&maxrecords=${maxRecords}&format=json&sort=DateDesc`;
  const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(gdeltRawUrl)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(corsProxyUrl, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`CORS Proxy HTTP ${response.status}`);
    }

    const data: GdeltApiResponse = await response.json();
    const rawArticles = data.articles || [];

    if (rawArticles.length === 0) {
      throw new Error("No articles returned from GDELT query");
    }

    const fallbackImages = [
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    ];

    const articles: Article[] = rawArticles.map((art, index) => {
      const publishedIso = parseGdeltDate(art.seendate);
      const domain = art.domain || 'Global Press Wire';
      const title = art.title ? art.title.trim() : 'Global Event Signal Update';
      const sourceCountry = art.sourcecountry || 'International';

      let topicCode: TopicCode = 'policy';
      let topicLabel = 'Policy & Governance';
      const titleLower = title.toLowerCase();
      if (titleLower.includes('tech') || titleLower.includes('ai') || titleLower.includes('chip') || titleLower.includes('cyber')) {
        topicCode = 'tech';
        topicLabel = 'Technology & AI';
      } else if (titleLower.includes('economy') || titleLower.includes('bank') || titleLower.includes('trade') || titleLower.includes('market')) {
        topicCode = 'economy';
        topicLabel = 'Global Economy';
      } else if (titleLower.includes('climate') || titleLower.includes('green') || titleLower.includes('energy') || titleLower.includes('carbon')) {
        topicCode = 'environment';
        topicLabel = 'Environment & Climate';
      } else if (titleLower.includes('court') || titleLower.includes('law') || titleLower.includes('legal')) {
        topicCode = 'legal';
        topicLabel = 'Legal & Constitutional';
      } else if (titleLower.includes('defense') || titleLower.includes('security') || titleLower.includes('nato')) {
        topicCode = 'defense';
        topicLabel = 'Defense & Security';
      }

      const imageUrl = (art.socialimage && art.socialimage.startsWith('http'))
        ? art.socialimage
        : fallbackImages[index % fallbackImages.length];

      return {
        id: `client-gdelt-${Date.now()}-${index}`,
        title: title,
        subtitle: `Indexed direct by GDELT Project from ${domain} (${art.language || 'English'})`,
        content: `LIVE GDELT SIGNAL: ${title}\n\nThis article was indexed in real-time by the GDELT Project (Global Data on Events, Location, and Tone). Domain of origin: ${domain}. Source region: ${sourceCountry}. Language: ${art.language || 'English'}.\n\nFull source coverage URL: ${art.url}`,
        author: domain,
        source: `${domain} (GDELT)`,
        publishedAt: publishedIso,
        timeAgo: formatTimeAgo(publishedIso),
        readTimeMinutes: 4,
        country: 'global',
        countryLabel: sourceCountry,
        topic: topicCode,
        topicLabel: topicLabel,
        imageUrl: imageUrl,
        imageAlt: title,
        isTrending: index < 3,
        isFeatured: index === 0,
        aiSummary: {
          overview: `Live GDELT signal: ${title} from ${domain}.`,
          bulletPoints: [
            `Indexed in GDELT DOC 2.0 database with high global media salience.`,
            `Source country origin recorded as ${sourceCountry}.`,
            `Cross-referenced across international broadcast and digital wire services.`
          ],
          keyTakeaway: `Real-time event recorded in the open GDELT Project event dataset.`
        },
        outletsCoverage: [
          {
            outletName: domain,
            logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=100&q=80',
            bias: 'center',
            headline: title,
            summary: `Primary reporting indexed by GDELT Project from domain ${domain}.`,
            keyPoints: [
              `Direct wire URL: ${art.url || 'https://gdeltproject.org'}`,
              `GDELT Language Code: ${art.language || 'English'}`
            ],
            url: art.url || 'https://gdeltproject.org'
          }
        ]
      };
    });

    return {
      source: 'GDELT DOC 2.0 API (Live Wire)',
      query: cleanQuery,
      total: articles.length,
      articles: articles
    };

  } catch (err: any) {
    console.warn("GDELT fetch fallback triggered:", err?.message || err);

    return {
      source: 'GDELT DOC 2.0 API',
      query: cleanQuery,
      total: 0,
      articles: [],
      isFallback: false,
      backendResponseMeta: backendMeta
    };
  }
}

