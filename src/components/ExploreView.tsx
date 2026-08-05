import React, { useState } from 'react';
import { Article, CountryCode, TopicCode } from '../types';
import { Search, Globe, Landmark, Compass, ArrowRight, Filter, Sparkles } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { LanguageCode, t } from '../translations';

interface ExploreViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  savedArticles: string[];
  onToggleBookmark: (e: React.MouseEvent, article: Article) => void;
  onSelectCountry: (country: CountryCode) => void;
  onSelectTopic: (topic: TopicCode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language?: LanguageCode;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  articles,
  onSelectArticle,
  savedArticles,
  onToggleBookmark,
  onSelectCountry,
  onSelectTopic,
  searchQuery,
  onSearchChange,
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';
  const [selectedQuickTag, setSelectedQuickTag] = useState<string | null>(null);

  const REGIONS: { id: CountryCode; labelKey: string; image: string; descKey: string }[] = [
    { id: 'us', labelKey: 'regionUs', image: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?auto=format&fit=crop&w=400&q=80', descKey: 'regionDescUs' },
    { id: 'eu', labelKey: 'regionEu', image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=400&q=80', descKey: 'regionDescEu' },
    { id: 'uk', labelKey: 'regionUk', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80', descKey: 'regionDescUk' },
    { id: 'ea', labelKey: 'regionEa', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', descKey: 'regionDescEa' },
  ];

  // Filter articles based on search query
  const filteredArticles = articles.filter((art) => {
    if (!searchQuery && !selectedQuickTag) return true;
    const q = (searchQuery || selectedQuickTag || '').toLowerCase().trim();
    return (
      art.title.toLowerCase().includes(q) ||
      art.subtitle?.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.source.toLowerCase().includes(q) ||
      art.topicLabel.toLowerCase().includes(q) ||
      art.countryLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Search Bar Input Container */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t(lang, 'searchPlaceholder')}
            className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3 text-xs">
          <span className="text-slate-400 font-semibold py-1">{t(lang, 'quickFilters')}</span>
          {['Infrastructure', 'Carbon Tariff', 'AI Copyright', 'Central Bank', 'Cyber Defense'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (selectedQuickTag === tag) {
                  setSelectedQuickTag(null);
                  onSearchChange('');
                } else {
                  setSelectedQuickTag(tag);
                  onSearchChange(tag);
                }
              }}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedQuickTag === tag || searchQuery === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* Regions Circle Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            {t(lang, 'exploreRegions')}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">{t(lang, 'tapToFilter')}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {REGIONS.map((r) => (
            <div
              key={r.id}
              onClick={() => onSelectCountry(r.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group flex flex-col items-center text-center shadow-xs hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-slate-100 dark:border-slate-800 group-hover:border-blue-500 transition-colors">
                <img
                  src={r.image}
                  alt={t(lang, r.labelKey)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t(lang, r.labelKey)}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {t(lang, r.descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics Bento Grid */}
      <section>
        <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100 mb-4">
          {t(lang, 'keyTopics')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { id: 'policy', labelKey: 'topicPolicy', color: 'bg-blue-600' },
            { id: 'global', labelKey: 'topicGlobal', color: 'bg-indigo-600' },
            { id: 'economy', labelKey: 'topicEconomy', color: 'bg-emerald-600' },
            { id: 'legal', labelKey: 'topicLegal', color: 'bg-amber-600' },
            { id: 'tech', labelKey: 'topicTech', color: 'bg-purple-600' },
            { id: 'environment', labelKey: 'topicEnvironment', color: 'bg-teal-600' },
          ].map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id as TopicCode)}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer group relative overflow-hidden shadow-xs"
            >
              <div className={`w-2 h-full absolute left-0 top-0 bottom-0 ${topic.color}`} />
              <div className="pl-2">
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t(lang, topic.labelKey)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Results / All Articles List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            {searchQuery ? `${t(lang, 'searchResultsFor')} "${searchQuery}"` : t(lang, 'allArticles')}
          </h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {filteredArticles.length} items
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <Search className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-1">
              {t(lang, 'noMatchingArticles')}
            </h3>
            <button
              onClick={() => onSearchChange('')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold mt-2"
            >
              {t(lang, 'resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={onSelectArticle}
                isBookmarked={savedArticles.includes(art.id)}
                onToggleBookmark={onToggleBookmark}
                language={lang}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
