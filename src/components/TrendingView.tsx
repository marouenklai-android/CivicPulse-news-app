import React, { useState } from 'react';
import { Article, TopicCode } from '../types';
import { ArticleCard } from './ArticleCard';
import { ArrowLeft, Flame, Sparkles, Search } from 'lucide-react';
import { LanguageCode, t } from '../translations';
import { TopicFilter } from './TopicFilter';

interface TrendingViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleBookmark: (e: React.MouseEvent | null, article: Article) => void;
  onCompareOutlets: (article: Article) => void;
  onBackToFeed: () => void;
  language?: LanguageCode;
}

export const TrendingView: React.FC<TrendingViewProps> = ({
  articles,
  onSelectArticle,
  savedArticleIds,
  onToggleBookmark,
  onCompareOutlets,
  onBackToFeed,
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<TopicCode>('all');

  const rawTrending = articles.filter(a => a.isTrending);
  const baseList = rawTrending.length > 0 ? rawTrending : articles;

  const filteredTrending = baseList.filter((art) => {
    const matchesTopic = selectedTopic === 'all' || art.topic === selectedTopic;
    const matchesQuery = !searchQuery.trim() || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.topicLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.content && art.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={onBackToFeed}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3 py-1.5 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Feed</span>
          </button>
          
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <Flame className="w-3.5 h-3.5" />
            <span>LIVE TRENDING GRID</span>
          </div>
        </div>

        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{t(lang, 'trendingIntelligence')}</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            High-impact geopolitical signals, viral multi-outlet reports, and trending policy developments curated across global news networks.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trending topics, headlines, or outlets..."
              className="w-full h-10 pl-9 pr-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full"
              >
                ✕
              </button>
            )}
          </div>

          <TopicFilter
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
            language={lang}
          />
        </div>
      </div>

      {/* Grid Subheader */}
      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Trending Intelligence Grid</span>
          <span className="text-xs font-sans font-normal px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
            {filteredTrending.length} items
          </span>
        </h2>
      </div>

      {/* Grid Layout - 2 Columns on Desktop & Tablet */}
      {filteredTrending.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No trending articles match your filter.
          </p>
          <button
            onClick={() => { setSelectedTopic('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {filteredTrending.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              isBookmarked={savedArticleIds.includes(article.id)}
              onToggleBookmark={(e, art) => onToggleBookmark(e, art)}
              onCompareOutlets={(e, art) => {
                e.stopPropagation();
                onCompareOutlets(art);
              }}
              language={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
};
