import React from 'react';
import { Article } from '../types';
import { Bookmark, Sparkles, Clock, SplitSquareVertical, ExternalLink, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageCode, t } from '../translations';
import { getDynamicArticleImage } from '../utils/dynamicImage';
import { getCountryInfo } from '../utils/countryHelper';
import { formatTimeAgo } from '../utils/timeHelper';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, article: Article) => void;
  onCompareOutlets?: (e: React.MouseEvent, article: Article) => void;
  variant?: 'featured' | 'standard' | 'compact';
  language?: LanguageCode;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  onCompareOutlets,
  variant = 'standard',
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';
  const countryInfo = getCountryInfo(article.country, article.countryLabel);
  const timeDisplay = formatTimeAgo(article.publishedAt, article.timeAgo);

  if (variant === 'featured') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer group mb-6"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 flex flex-col justify-between order-2 md:order-1">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                >
                  {article.source}
                </span>

                {/* Country Badge */}
                <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  <span className="text-xs">{countryInfo.flag}</span>
                  <span>{countryInfo.label}</span>
                </span>

                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                  {timeDisplay}
                </span>
                <span className="text-slate-400 dark:text-slate-600 text-xs">•</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">
                  {article.readTimeMinutes} {t(lang, 'minRead')}
                </span>
              </div>

              <h3
                className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2"
              >
                {article.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-serif line-clamp-3 mb-4 leading-relaxed">
                {article.subtitle || article.content}
              </p>
            </div>

            {/* AI Callout Preview Box */}
            <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/60 dark:border-blue-800/40 rounded-xl p-3 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-semibold text-blue-900 dark:text-blue-200 block mb-0.5">
                  {t(lang, 'aiSummary')}
                </span>
                <p className="text-slate-700 dark:text-slate-300 italic line-clamp-2">
                  "{article.aiSummary?.keyTakeaway || article.aiSummary?.overview || 'Summary available for multi-outlet comparison.'}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <button
                onClick={(e) => onCompareOutlets && onCompareOutlets(e, article)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                {t(lang, 'compareOutlets')} ({article.outletsCoverage?.length || 0})
              </button>

              <button
                onClick={(e) => onToggleBookmark(e, article)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isBookmarked ? t(lang, 'bookmarked') : t(lang, 'bookmark')}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-52 md:h-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 order-1 md:order-2">
            <motion.img
              layoutId={`article-image-${article.id}`}
              src={article.imageUrl || getDynamicArticleImage(article, 0)}
              alt={article.imageAlt || article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getDynamicArticleImage(article, 0);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex items-center gap-3"
      >
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
          <img
            src={article.imageUrl || getDynamicArticleImage(article, 0)}
            alt={article.imageAlt || article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getDynamicArticleImage(article, 0);
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-0.5 flex-wrap">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {article.source}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <span>{countryInfo.flag}</span>
              <span>{countryInfo.label}</span>
            </span>
            <span>•</span>
            <span>{timeDisplay}</span>
          </div>
          <h4
            className="font-serif font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight"
          >
            {article.title}
          </h4>
        </div>
        <button
          onClick={(e) => onToggleBookmark(e, article)}
          className={`p-1.5 rounded-full shrink-0 transition-colors ${
            isBookmarked
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    );
  }

  // Standard Card
  return (
    <div
      onClick={() => onSelect(article)}
      className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              {article.source}
            </span>

            {/* Country Badge */}
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 px-2 py-0.5 rounded text-[10px] font-medium">
              <span>{countryInfo.flag}</span>
              <span>{countryInfo.label}</span>
            </span>

            <span className="text-slate-400 dark:text-slate-600 text-xs">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {timeDisplay}
            </span>
          </div>

          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[10px] font-medium">
            {article.topicLabel}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <h3
              className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2"
            >
              {article.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 font-serif leading-relaxed mb-3">
              {article.subtitle || article.content}
            </p>
          </div>

          <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
            <img
              src={article.imageUrl || getDynamicArticleImage(article, 0)}
              alt={article.imageAlt || article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getDynamicArticleImage(article, 0);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          {article.aiSummary && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>{t(lang, 'aiSummary')}</span>
            </div>
          )}

          {(article.outletsCoverage?.length || 0) > 1 && (
            <button
              onClick={(e) => onCompareOutlets && onCompareOutlets(e, article)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <SplitSquareVertical className="w-3 h-3" />
              <span>{article.outletsCoverage?.length || 0} {t(lang, 'outlets')}</span>
            </button>
          )}
        </div>

        <button
          onClick={(e) => onToggleBookmark(e, article)}
          className={`p-1.5 rounded-full transition-colors ${
            isBookmarked
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={isBookmarked ? t(lang, 'bookmarked') : t(lang, 'bookmark')}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};
