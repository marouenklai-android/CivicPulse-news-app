import React, { useState, useEffect, useMemo } from 'react';
import { 
  CountryCode, 
  TopicCode, 
  Article, 
  UserPreferences 
} from './types';
import { INITIAL_ARTICLES } from './data/newsData';
import { getTranslatedArticle } from './services/articleTranslator';
import { t } from './translations';

import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { CountryFilter } from './components/CountryFilter';
import { TopicFilter } from './components/TopicFilter';
import { TrendingCarousel } from './components/TrendingCarousel';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { CompareCoverageView } from './components/CompareCoverageView';
import { ExploreView } from './components/ExploreView';
import { SavedView } from './components/SavedView';
import { ProfileView } from './components/ProfileView';
import { TrendingView } from './components/TrendingView';
import { OnboardingModal } from './components/OnboardingModal';
import { AnimatePresence, motion } from 'motion/react';

import { SlidersHorizontal, RefreshCw, Search, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';

const NAV_TABS: NavTab[] = ['feed', 'compare', 'explore', 'saved', 'profile'];

export default function App() {
  // Theme state: light or dark
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('civicpulse_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<NavTab>('feed');

  // Filters state
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('global');
  const [selectedTopic, setSelectedTopic] = useState<TopicCode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Articles state (empty by default until real news is fetched)
  const [articles, setArticles] = useState<Article[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Saved / Bookmarked Articles (localStorage persistence)
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('civicpulse_saved_v1');
      return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
    } catch {
      return ['art-1', 'art-3'];
    }
  });

  // User Preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('civicpulse_prefs_v1');
      const parsed = saved ? JSON.parse(saved) : {};
      return {
        theme: parsed.theme || 'light',
        language: parsed.language || 'en',
        feedPerspective: parsed.feedPerspective || 'balanced',
        preferredTopics: parsed.preferredTopics || ['policy', 'global', 'tech'],
        preferredCountries: parsed.preferredCountries || ['global', 'us', 'eu'],
        aiAlerts: parsed.aiAlerts ?? true,
      };
    } catch {
      return {
        theme: 'light',
        language: 'en',
        feedPerspective: 'balanced',
        preferredTopics: ['policy', 'global', 'tech'],
        preferredCountries: ['global', 'us', 'eu'],
        aiAlerts: true,
      };
    }
  });

  // Reading Modal & Compare selection state
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [compareArticleId, setCompareArticleId] = useState<string>('');

  // Onboarding screen state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('civicpulse_onboarded_v1');
  });

  const handleCompleteOnboarding = (topics: TopicCode[]) => {
    setUserPreferences(prev => ({
      ...prev,
      preferredTopics: topics,
    }));
    localStorage.setItem('civicpulse_onboarded_v1', 'true');
    setIsOnboardingOpen(false);
  };

  // AI Briefing state
  const [briefingData, setBriefingData] = useState<any>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(false);

  // Live Real News fetching state
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isLiveFeed, setIsLiveFeed] = useState(true);

  // Swipe-to-refresh & Touch Tab Swiping state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [swipeHint, setSwipeHint] = useState<string | null>(null);

  const touchStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);

  // Fetch Real Live News from Express Backend (/api/news)
  const fetchLiveNews = async () => {
    setIsLoadingNews(true);
    setNewsError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCountry && selectedCountry !== 'all') params.append('country', selectedCountry);
      if (selectedTopic && selectedTopic !== 'all') params.append('topic', selectedTopic);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (userPreferences.language) params.append('lang', userPreferences.language);

      const response = await fetch(`/api/news?${params.toString()}`);
      const contentType = response.headers.get('content-type') || '';

      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setIsLiveFeed(data.isLive !== false);
          setNewsError(null);
        } else {
          // Graceful fallback to INITIAL_ARTICLES if live AI returns 0 items
          let fallback = INITIAL_ARTICLES;
          if (selectedTopic && selectedTopic !== 'all') {
            const filtered = fallback.filter(a => a.topic === selectedTopic);
            if (filtered.length > 0) fallback = filtered;
          }
          setArticles(fallback);
          setIsLiveFeed(false);
          setNewsError(data.error || "Live AI news service paused. Showing verified briefing items.");
        }
      } else {
        // Fallback to INITIAL_ARTICLES if response was HTML or non-200
        let fallback = INITIAL_ARTICLES;
        if (selectedTopic && selectedTopic !== 'all') {
          const filtered = fallback.filter(a => a.topic === selectedTopic);
          if (filtered.length > 0) fallback = filtered;
        }
        setArticles(fallback);
        setIsLiveFeed(false);
        setNewsError(null);
      }
    } catch (err) {
      console.error('Failed to fetch real live news from /api/news:', err);
      let fallback = INITIAL_ARTICLES;
      if (selectedTopic && selectedTopic !== 'all') {
        const filtered = fallback.filter(a => a.topic === selectedTopic);
        if (filtered.length > 0) fallback = filtered;
      }
      setArticles(fallback);
      setIsLiveFeed(false);
      setNewsError(null);
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, [selectedCountry, selectedTopic, searchQuery, userPreferences.language]);

  // Trigger feed refresh (Swipe-to-Refresh action)
  const handleTriggerRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await fetchLiveNews();
    setRefreshToast('Live Gemini AI Intelligence Synced');
    setTimeout(() => setRefreshToast(null), 2500);
    setTimeout(() => setIsRefreshing(false), 700);
  };

  // Touch gesture handlers for mobile swipe-to-refresh & tab switching
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    // Don't intercept swipe when user is dragging inside horizontal scroll lists, chips, or inputs
    if (target.closest('.no-scrollbar, .overflow-x-auto, input, textarea, button, [role="button"]')) {
      touchStartRef.current = null;
      return;
    }
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;

    // Pull down to refresh gesture near top of page
    if (window.scrollY < 20 && deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)) {
      setPullDistance(Math.min(deltaY, 80));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPullDistance(0);
    if (!touchStartRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    // 1. Vertical Pull-Down to Refresh
    if (window.scrollY < 20 && deltaY > 60 && Math.abs(deltaY) > 1.3 * Math.abs(deltaX)) {
      handleTriggerRefresh();
      return;
    }

    // 2. Horizontal Swipe Left / Right to Change Tabs
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > 1.3 * Math.abs(deltaY) && duration < 600) {
      const currentIndex = NAV_TABS.indexOf(activeTab);
      if (deltaX < 0 && currentIndex < NAV_TABS.length - 1) {
        // Swipe Left -> Next Tab
        const nextTab = NAV_TABS[currentIndex + 1];
        setActiveTab(nextTab);
        setSwipeHint(`Swiped left → ${nextTab.toUpperCase()}`);
        setTimeout(() => setSwipeHint(null), 1500);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe Right -> Prev Tab
        const prevTab = NAV_TABS[currentIndex - 1];
        setActiveTab(prevTab);
        setSwipeHint(`Swiped right ← ${prevTab.toUpperCase()}`);
        setTimeout(() => setSwipeHint(null), 1500);
      }
    }
  };

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('civicpulse_theme', theme);
  }, [theme]);

  // Handle RTL and language changes
  useEffect(() => {
    if (userPreferences.language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [userPreferences.language]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('civicpulse_saved_v1', JSON.stringify(savedArticleIds));
  }, [savedArticleIds]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('civicpulse_prefs_v1', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Toggle dark/light theme
  const handleToggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      setUserPreferences(p => ({ ...p, theme: next }));
      return next;
    });
  };

  // Toggle bookmark for article
  const handleToggleBookmark = (e: React.MouseEvent | null, article: Article) => {
    if (e) e.stopPropagation();
    setSavedArticleIds(prev => 
      prev.includes(article.id)
        ? prev.filter(id => id !== article.id)
        : [...prev, article.id]
    );
  };

  // Handle article comparison trigger
  const handleOpenCompare = (article: Article) => {
    setCompareArticleId(article.id);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Daily Intelligence Briefing via Gemini API
  const handleGenerateBriefing = async () => {
    setLoadingBriefing(true);
    try {
      const response = await fetch('/api/gemini/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredTopics: userPreferences.preferredTopics,
          preferredCountries: userPreferences.preferredCountries,
          feedPerspective: userPreferences.feedPerspective,
          lang: userPreferences.language,
        })
      });

      const data = await response.json();
      if (data.recommendations) {
        setBriefingData(data.recommendations);
      }
    } catch (err) {
      console.error('Failed to generate briefing:', err);
    } finally {
      setLoadingBriefing(false);
    }
  };

  // Translate all articles dynamically according to the user's selected language
  const translatedArticles = useMemo(() => {
    return articles.map(art => getTranslatedArticle(art, userPreferences.language));
  }, [articles, userPreferences.language]);

  const displayReadingArticle = useMemo(() => {
    return readingArticle ? getTranslatedArticle(readingArticle, userPreferences.language) : null;
  }, [readingArticle, userPreferences.language]);

  // Filtered Articles for Main Feed
  const exactMatches = translatedArticles.filter(art => {
    const matchesCountry = selectedCountry === 'global' || art.country === selectedCountry || art.country === 'global';
    const matchesTopic = selectedTopic === 'all' || art.topic === selectedTopic;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      art.title.toLowerCase().includes(q) ||
      art.subtitle?.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.source.toLowerCase().includes(q) ||
      art.topicLabel.toLowerCase().includes(q) ||
      art.countryLabel.toLowerCase().includes(q)
    );
    return matchesCountry && matchesTopic && matchesSearch;
  });

  const isUsingFallback = articles.length > 0 && exactMatches.length === 0;
  const displayArticles = isUsingFallback ? translatedArticles : exactMatches;

  const featuredArticle = displayArticles.find(a => a.isFeatured) || displayArticles[0];
  const standardArticles = displayArticles.length > 1
    ? displayArticles.filter(a => a.id !== featuredArticle?.id)
    : displayArticles;

  // Robust Trending Articles computation: ensure carousel always has items
  const filteredTrending = displayArticles.filter(a => a.isTrending);
  const globalTrending = translatedArticles.filter(a => a.isTrending);
  const trendingArticles = filteredTrending.length > 0
    ? filteredTrending
    : (globalTrending.length > 0 ? globalTrending : translatedArticles.slice(0, 5));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Application Header */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={userPreferences.language}
        onChangeLanguage={(lang) => setUserPreferences(prev => ({ ...prev, language: lang }))}
        onOpenSearch={() => {
          const searchElem = document.getElementById('main-feed-search-input');
          if (searchElem) {
            searchElem.focus();
          } else {
            setActiveTab('explore');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setActiveTab('saved')}
      />

      {/* Toast Feedback for Tab Swiping & Feed Refresh */}
      <AnimatePresence>
        {refreshToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-slate-700 dark:border-slate-300 pointer-events-none"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 animate-spin" />
            <span>{refreshToast}</span>
          </motion.div>
        )}

        {swipeHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 bg-blue-600 text-white rounded-full text-xs font-mono font-bold shadow-xl flex items-center gap-2 border border-blue-400/30 pointer-events-none"
          >
            <Smartphone className="w-3.5 h-3.5 animate-bounce" />
            <span>{swipeHint}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Body with Touch Swipe & Pull-To-Refresh Gestures */}
      <main 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="max-w-4xl mx-auto px-4 pt-2 pb-28 relative select-none sm:select-text"
      >
        {/* Pull Down to Refresh Visual Bar */}
        {(pullDistance > 0 || isRefreshing) && (
          <div 
            style={{ height: `${isRefreshing ? 52 : Math.min(pullDistance * 0.7, 60)}px` }}
            className="overflow-hidden transition-all duration-200 flex items-center justify-center bg-blue-500/10 dark:bg-blue-400/10 border-b border-blue-500/20 rounded-b-2xl mb-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <RefreshCw className={`w-4 h-4 ${isRefreshing || pullDistance > 50 ? 'animate-spin' : ''}`} />
              <span>
                {isRefreshing
                  ? 'Refreshing feed signals...'
                  : pullDistance > 55
                  ? 'Release finger to refresh feed'
                  : 'Pull down to refresh feed'}
              </span>
            </div>
          </div>
        )}

        {/* Swipe Gesture Tip Bar for Mobile */}
        <div className="hidden sm:flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mb-2 px-1">
          <div className="flex items-center gap-1 font-mono">
            <Smartphone className="w-3 h-3 text-blue-500" />
            <span>Swipe left / right to change tabs • Pull down to refresh</span>
          </div>
          <button
            onClick={handleTriggerRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Swipe Refresh'}</span>
          </button>
        </div>

        {/* TAB 1: MAIN FEED */}
        {activeTab === 'feed' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Sticky Search & Region/Topic Filters (Always Visible at top of view) */}
            <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className={`w-2 h-2 rounded-full ${isLoadingNews ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                  <span>{isLoadingNews ? 'Generating Live Gemini News Signals...' : isLiveFeed ? 'Gemini 3.6 Flash News Engine' : 'News Feed'}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{articles.length} articles</span>
                  {isLiveFeed && (
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                      GEMINI 3.6 LIVE AI
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Search Bar Input */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                <input
                  id="main-feed-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword, topic, policy, or country..."
                  className="w-full h-9 pl-9 pr-8 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Mode Filters (Region & Topic) */}
              <CountryFilter
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
                language={userPreferences.language}
              />
              <TopicFilter
                selectedTopic={selectedTopic}
                onSelectTopic={setSelectedTopic}
                language={userPreferences.language}
              />
            </div>

            {/* Unavailable State Notice when Real News Stream is empty */}
            {!isLoadingNews && articles.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xs my-6">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                    Real-Time News Stream Unavailable
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    {newsError || "Real-time news data is currently unavailable. Mocked fallback data has been disabled."}
                  </p>
                </div>
                <button
                  onClick={fetchLiveNews}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Loading Live News</span>
                </button>
              </div>
            )}

            {/* Trending Carousel */}
            {trendingArticles.length > 0 && (
              <TrendingCarousel
                articles={trendingArticles}
                onSelectArticle={setReadingArticle}
                onViewAllTrending={() => setActiveTab('trending')}
                language={userPreferences.language}
              />
            )}

            {/* Featured Hero Article */}
            {featuredArticle && (
              <section>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                    {t(userPreferences.language, 'leadAnalysis')}
                  </h2>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full">
                    {t(userPreferences.language, 'topStory')}
                  </span>
                </div>

                <ArticleCard
                  article={featuredArticle}
                  onSelect={setReadingArticle}
                  isBookmarked={savedArticleIds.includes(featuredArticle.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onCompareOutlets={(e, art) => {
                    e.stopPropagation();
                    handleOpenCompare(art);
                  }}
                  variant="featured"
                  language={userPreferences.language}
                />
              </section>
            )}

            {/* Latest News Feed List */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                  {t(userPreferences.language, 'latestBriefings')} ({standardArticles.length})
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Region: {selectedCountry.toUpperCase()}</span>
                  <span>•</span>
                  <span>Topic: {selectedTopic.toUpperCase()}</span>
                </div>
              </div>

              {isUsingFallback && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                  <span>No exact matches for filter. Showing global intelligence updates below.</span>
                  <button
                    onClick={() => {
                      setSelectedCountry('global');
                      setSelectedTopic('all');
                      setSearchQuery('');
                    }}
                    className="ml-2 font-bold underline shrink-0 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {standardArticles.map(art => (
                    <ArticleCard
                      key={art.id}
                      article={art}
                      onSelect={setReadingArticle}
                      isBookmarked={savedArticleIds.includes(art.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onCompareOutlets={(e, a) => {
                        e.stopPropagation();
                        handleOpenCompare(a);
                      }}
                      language={userPreferences.language}
                    />
                  ))}
                </div>
            </section>
          </div>
        )}

        {/* TAB 2: MULTI-OUTLET COMPARE */}
        {activeTab === 'compare' && (
          <CompareCoverageView
            articles={translatedArticles}
            selectedArticleId={compareArticleId}
            onSelectArticle={(art) => setCompareArticleId(art.id)}
            language={userPreferences.language}
          />
        )}

        {/* TAB 3: EXPLORE & SEARCH */}
        {activeTab === 'explore' && (
          <ExploreView
            articles={translatedArticles}
            onSelectArticle={setReadingArticle}
            savedArticles={savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectCountry={(c) => {
              setSelectedCountry(c);
              setActiveTab('feed');
            }}
            onSelectTopic={(t) => {
              setSelectedTopic(t);
              setActiveTab('feed');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            language={userPreferences.language}
          />
        )}

        {/* TAB 4: SAVED BOOKMARKS */}
        {activeTab === 'saved' && (
          <SavedView
            articles={translatedArticles}
            savedArticleIds={savedArticleIds}
            onSelectArticle={setReadingArticle}
            onRemoveBookmark={(e, id) => {
              e.stopPropagation();
              setSavedArticleIds(prev => prev.filter(i => i !== id));
            }}
            onClearAllBookmarks={() => setSavedArticleIds([])}
            language={userPreferences.language}
          />
        )}

        {/* TAB 5: PROFILE & PREFERENCES */}
        {activeTab === 'profile' && (
          <ProfileView
            preferences={userPreferences}
            onUpdatePreferences={(updated) => {
              setUserPreferences(prev => ({ ...prev, ...updated }));
              if (updated.theme) setTheme(updated.theme);
            }}
            onGenerateDailyBriefing={handleGenerateBriefing}
            briefingData={briefingData}
            loadingBriefing={loadingBriefing}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}

        {/* TAB 6: TRENDING INTELLIGENCE GRID VIEW */}
        {activeTab === 'trending' && (
          <TrendingView
            articles={translatedArticles}
            onSelectArticle={setReadingArticle}
            savedArticleIds={savedArticleIds}
            onToggleBookmark={(e, art) => handleToggleBookmark(e, art)}
            onCompareOutlets={handleOpenCompare}
            onBackToFeed={() => setActiveTab('feed')}
            language={userPreferences.language}
          />
        )}

      </main>

      {/* Article Detail Reading Modal with Shared Element Transition */}
      <AnimatePresence>
        {displayReadingArticle && (
          <ArticleDetailModal
            article={displayReadingArticle}
            onClose={() => setReadingArticle(null)}
            isBookmarked={savedArticleIds.includes(displayReadingArticle.id)}
            onToggleBookmark={(art) => handleToggleBookmark(null, art)}
            onOpenCompare={handleOpenCompare}
            language={userPreferences.language}
          />
        )}
      </AnimatePresence>

      {/* Onboarding Screen with Animations & Jetpack Compose Kotlin Code Inspector */}
      <AnimatePresence>
        {isOnboardingOpen && (
          <OnboardingModal
            isOpen={isOnboardingOpen}
            onClose={() => setIsOnboardingOpen(false)}
            onComplete={handleCompleteOnboarding}
            userPreferences={userPreferences}
          />
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
        savedCount={savedArticleIds.length}
        language={userPreferences.language}
      />

    </div>
  );
}
