import React from 'react';
import { Article } from '../types';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageCode, t } from '../translations';

interface TrendingCarouselProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewAllTrending: () => void;
  language?: LanguageCode;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  articles,
  onSelectArticle,
  onViewAllTrending,
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            {t(lang, 'trendingIntelligence')}
          </h2>
        </div>
        <button
          onClick={onViewAllTrending}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
        >
          <span>{t(lang, 'viewAll')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          No trending articles match your current filter.
          <button
            onClick={onViewAllTrending}
            className="ml-2 font-bold text-blue-600 dark:text-blue-400 underline"
          >
            Show global trending
          </button>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 -mx-4 px-4 touch-pan-x">
          {articles.map((art) => (
            <motion.div
              key={art.id}
              layoutId={`article-card-${art.id}`}
              onClick={() => onSelectArticle(art)}
              className="flex-none w-[280px] sm:w-[320px] snap-start bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group shrink-0"
            >
              {/* Image Header */}
              <div className="h-40 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <motion.img
                  layoutId={`article-image-${art.id}`}
                  src={art.imageUrl}
                  alt={art.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {art.topicLabel}
                  </span>
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                    {t(lang, 'aiSummary')}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-3.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                  <motion.span layoutId={`article-source-${art.id}`} className="font-semibold text-slate-700 dark:text-slate-300">
                    {art.source}
                  </motion.span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.timeAgo}
                  </span>
                </div>
                <motion.h3
                  layoutId={`article-title-${art.id}`}
                  className="font-serif font-semibold text-sm leading-snug text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                >
                  {art.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
