import { Article } from '../types';

/**
 * Maps news topics and headline keywords to pro photojournalism visual prompts
 * and curated photographic imagery featuring political leaders, press conferences, and domain themes.
 */

// Curated high-definition photographic pools mapped to specific story themes
const THEMED_PHOTO_POOLS: Record<string, string[]> = {
  presidential_politics: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80', // Press conference room / Capitol
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80', // Government assembly hall
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=1200&q=80', // World leader podium / Flag backdrop
    'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80', // Political summit conference table
  ],
  infrastructure: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  ],
  ai_tech: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  ],
  legal_court: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
  ],
  climate_nature: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511497584788-876761c119ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
  ],
  finance_economy: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  ],
  defense_space: [
    'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80',
  ],
  semiconductor: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80',
  ],
  general_policy: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=1200&q=80',
  ]
};

/**
 * Detects specific countries or political venues mentioned in the news headline or article data.
 */
interface CountryVenueDetails {
  country: string;
  flag: string;
  venue: string;
  leaderTitle: string;
}

const COUNTRY_VENUE_MAP: Array<{ keywords: string[]; details: CountryVenueDetails }> = [
  {
    keywords: ['us', 'usa', 'united states', 'america', 'washington', 'white house', 'biden', 'trump', 'capitol', 'congress', 'pentagon', 'senate'],
    details: {
      country: 'United States',
      flag: 'official United States flag with stars and stripes',
      venue: 'White House James S. Brady Press Briefing Room podium in Washington D.C.',
      leaderTitle: 'President of the United States'
    }
  },
  {
    keywords: ['uk', 'britain', 'united kingdom', 'london', 'downing street', 'parliament', 'starmer', 'sunak', 'westminster', 'british'],
    details: {
      country: 'United Kingdom',
      flag: 'official Union Jack flag of the United Kingdom',
      venue: '10 Downing Street official press briefing podium in London',
      leaderTitle: 'Prime Minister of the United Kingdom'
    }
  },
  {
    keywords: ['france', 'french', 'paris', 'macron', 'elysee', 'élysée', 'national assembly'],
    details: {
      country: 'France',
      flag: 'official French blue white red tricolor flag',
      venue: 'Élysée Palace presidential press briefing room in Paris',
      leaderTitle: 'President of France'
    }
  },
  {
    keywords: ['germany', 'german', 'berlin', 'scholz', 'bundestag', 'chancellery'],
    details: {
      country: 'Germany',
      flag: 'official German black red gold tricolor flag',
      venue: 'Federal Chancellery press conference hall in Berlin',
      leaderTitle: 'Chancellor of Germany'
    }
  },
  {
    keywords: ['japan', 'japanese', 'tokyo', 'kishida', 'diet'],
    details: {
      country: 'Japan',
      flag: 'official Japanese national flag with red sun circle',
      venue: 'Prime Minister Official Residence press briefing stage in Tokyo',
      leaderTitle: 'Prime Minister of Japan'
    }
  },
  {
    keywords: ['china', 'chinese', 'beijing', 'xi jinping', 'beijing', 'communist party'],
    details: {
      country: 'China',
      flag: 'official national flag of the People\'s Republic of China with yellow stars on red backdrop',
      venue: 'Great Hall of the People press conference hall in Beijing',
      leaderTitle: 'President of China'
    }
  },
  {
    keywords: ['india', 'indian', 'delhi', 'new delhi', 'modi', 'lok sabha'],
    details: {
      country: 'India',
      flag: 'official Indian saffron white green tricolor flag with Ashoka Chakra emblem',
      venue: 'Hyderabad House official press podium in New Delhi',
      leaderTitle: 'Prime Minister of India'
    }
  },
  {
    keywords: ['canada', 'canadian', 'ottawa', 'trudeau', 'parliament hill'],
    details: {
      country: 'Canada',
      flag: 'official Canadian red maple leaf flag',
      venue: 'Parliament Hill West Block press briefing room in Ottawa',
      leaderTitle: 'Prime Minister of Canada'
    }
  },
  {
    keywords: ['ukraine', 'ukrainian', 'kyiv', 'zelenskyy', 'zelensky'],
    details: {
      country: 'Ukraine',
      flag: 'official Ukrainian blue and yellow national flag',
      venue: 'Presidential Office official briefing podium in Kyiv',
      leaderTitle: 'President of Ukraine'
    }
  },
  {
    keywords: ['russia', 'russian', 'moscow', 'putin', 'kremlin'],
    details: {
      country: 'Russia',
      flag: 'official Russian white blue red tricolor flag',
      venue: 'Kremlin Grand Palace hall podium in Moscow',
      leaderTitle: 'President of Russia'
    }
  },
  {
    keywords: ['israel', 'israeli', 'jerusalem', 'netanyahu', 'knesset'],
    details: {
      country: 'Israel',
      flag: 'official Israeli blue Star of David flag',
      venue: 'Prime Minister Office press conference podium in Jerusalem',
      leaderTitle: 'Prime Minister of Israel'
    }
  },
  {
    keywords: ['australia', 'australian', 'canberra', 'albanese'],
    details: {
      country: 'Australia',
      flag: 'official Australian national flag with Southern Cross stars',
      venue: 'Parliament House press courtyard podium in Canberra',
      leaderTitle: 'Prime Minister of Australia'
    }
  },
  {
    keywords: ['eu', 'european union', 'brussels', 'von der leyen'],
    details: {
      country: 'European Union',
      flag: 'official European Union blue flag with twelve golden stars circle',
      venue: 'European Commission Berlaymont press briefing hall in Brussels',
      leaderTitle: 'President of the European Commission'
    }
  }
];

export function detectCountryAndVenue(text: string): CountryVenueDetails {
  const lower = text.toLowerCase();
  for (const item of COUNTRY_VENUE_MAP) {
    if (item.keywords.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lower))) {
      return item.details;
    }
  }
  // Generic fallback
  return {
    country: 'International State',
    flag: 'official national diplomatic flag',
    venue: 'official presidential press conference briefing room podium',
    leaderTitle: 'President and Head of State'
  };
}

/**
 * Builds a professional editorial photojournalism prompt.
 * Automatically detects national origin to render dynamic country flags and official presidential briefing room podium backdrops.
 */
export function buildArticleImagePrompt(title: string, topic: string, countryHint?: string): string {
  const cleanTitle = title.replace(/[^\w\s]/gi, '').trim();
  const lowerTitle = cleanTitle.toLowerCase();
  const lowerTopic = (topic || '').toLowerCase();

  // Check if topic or title specifies a non-political domain
  const isTech = lowerTitle.includes('ai') || lowerTitle.includes('code') || lowerTitle.includes('chip') || lowerTopic.includes('tech');
  const isClimate = lowerTitle.includes('climate') || lowerTitle.includes('carbon') || lowerTopic.includes('environment');
  const isCourt = lowerTitle.includes('court') || lowerTitle.includes('lawyer') || lowerTopic.includes('legal');
  const isEconomy = lowerTitle.includes('market') || lowerTitle.includes('bank') || lowerTopic.includes('economy');
  const isDefense = lowerTitle.includes('military') || lowerTitle.includes('weapon') || lowerTopic.includes('defense');

  let coreSubject = '';

  if (isTech) {
    coreSubject = `high tech semiconductor research laboratory or AI technology center depicting ${cleanTitle}`;
  } else if (isClimate) {
    coreSubject = `environmental field study or climate impact zone depicting ${cleanTitle}`;
  } else if (isCourt) {
    coreSubject = `supreme court building entrance and legal scales of justice depicting ${cleanTitle}`;
  } else if (isEconomy) {
    coreSubject = `financial exchange trading floor or central bank vault depicting ${cleanTitle}`;
  } else if (isDefense) {
    coreSubject = `satellite defense monitoring station or aerospace briefing depicting ${cleanTitle}`;
  } else {
    // Political Press Conference & Presidential State Briefing with DYNAMIC COUNTRY FLAGS
    const countryData = detectCountryAndVenue(`${title} ${countryHint || ''}`);
    coreSubject = `${countryData.leaderTitle} and world leaders delivering an official political address at the ${countryData.venue}, flanked by press microphones, news cameras, and prominent diplomatic ${countryData.flag} backdrop, regarding ${cleanTitle}`;
  }

  // Pro Photojournalism quality modifiers
  return `Professional Reuters press photograph, cinematic 35mm photojournalism, high detail editorial lighting, official state briefing room podium, sharp focus on world leader at microphone, prominent ${detectCountryAndVenue(title).flag} backdrop, depicting ${coreSubject}`;
}

/**
 * Generates an AI-rendered photo URL for a story headline using Pollinations AI engine.
 */
export function generateAiStoryImageUrl(title: string, topic: string, seed: string = '1'): string {
  const prompt = buildArticleImagePrompt(title, topic);
  const encoded = encodeURIComponent(prompt);
  const numericSeed = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 10000;
  return `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=700&seed=${numericSeed}&nologo=true&model=flux`;
}

/**
 * Determines the best dynamic image for an article story based on its narrative features.
 */
export function getDynamicArticleImage(article: Partial<Article>, variantIndex: number = 0): string {
  if (!article) return THEMED_PHOTO_POOLS.presidential_politics[0];

  const title = (article.title || '').toLowerCase();
  const topic = (article.topic || '').toLowerCase();

  // Match keyword narrative - default to presidential_politics if no explicit niche matched
  let categoryPool = THEMED_PHOTO_POOLS.presidential_politics;

  if (title.includes('chip') || title.includes('lithography') || title.includes('semiconductor') || title.includes('silicon')) {
    categoryPool = THEMED_PHOTO_POOLS.semiconductor;
  } else if (title.includes('ai') || title.includes('code') || title.includes('algorithm') || title.includes('robot') || topic === 'tech') {
    categoryPool = THEMED_PHOTO_POOLS.ai_tech;
  } else if (title.includes('court') || title.includes('law') || title.includes('parliament') || title.includes('legal') || topic === 'legal') {
    categoryPool = THEMED_PHOTO_POOLS.legal_court;
  } else if (title.includes('carbon') || title.includes('climate') || title.includes('rainforest') || title.includes('wind') || title.includes('sea') || topic === 'environment') {
    categoryPool = THEMED_PHOTO_POOLS.climate_nature;
  } else if (title.includes('bank') || title.includes('interest') || title.includes('inflation') || title.includes('market') || title.includes('tariff') || topic === 'economy') {
    categoryPool = THEMED_PHOTO_POOLS.finance_economy;
  } else if (title.includes('defense') || title.includes('cyber') || title.includes('satellite') || title.includes('military') || topic === 'defense') {
    categoryPool = THEMED_PHOTO_POOLS.defense_space;
  } else if (title.includes('rail') || title.includes('grid') || title.includes('bridge') || title.includes('infrastructure')) {
    categoryPool = THEMED_PHOTO_POOLS.infrastructure;
  } else {
    // Default to presidential politics!
    categoryPool = THEMED_PHOTO_POOLS.presidential_politics;
  }

  // Calculate deterministic index per article ID to ensure consistent assignment
  const strId = article.id || article.title || '1';
  const charSum = strId.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const idx = (charSum + variantIndex) % categoryPool.length;

  return categoryPool[idx];
}

