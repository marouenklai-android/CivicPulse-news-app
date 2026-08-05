import React, { useState } from 'react';
import { Article } from '../types';
import { 
  X, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Type, 
  Volume2, 
  VolumeX, 
  Clock, 
  SplitSquareVertical, 
  ExternalLink, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageCode, t } from '../translations';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onOpenCompare: (article: Article) => void;
  language?: LanguageCode;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenCompare,
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!article) return null;

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-relaxed',
  };

  const getBiasLabel = (bias: string) => {
    const b = (bias || '').toLowerCase();
    if (b.includes('center')) return t(lang, 'biasCenter');
    if (b.includes('left')) return t(lang, 'biasLeft');
    if (b.includes('right')) return t(lang, 'biasRight');
    return bias;
  };

  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = `${article.title}. ${article.aiSummary?.overview || ''} ${article.content}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center overflow-y-auto p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        layoutId={`article-card-${article.id}`}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="bg-white dark:bg-slate-900 w-full max-w-3xl min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200 dark:border-slate-800"
      >
        
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-blue-200 dark:border-blue-800/60">
              {article.topicLabel}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {article.readTimeMinutes} {t(lang, 'minRead')}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Font Size Toggle */}
            <button
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xlarge');
                else setFontSize('normal');
              }}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Adjust Font Size"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Read Aloud Toggle */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-full transition-colors ${
                isSpeaking
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSpeaking ? 'Stop Reading' : 'Read Article Aloud'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? t(lang, 'bookmarked') : t(lang, 'bookmark')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title={t(lang, 'share')}
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Scroll Body */}
        <div className="p-4 sm:p-8 overflow-y-auto max-h-[85vh]">
          {/* Main Title & Subtitle */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <motion.span
                layoutId={`article-source-${article.id}`}
                className="text-slate-900 dark:text-slate-100 font-bold"
              >
                {article.source}
              </motion.span>
              <span>•</span>
              <span>{t(lang, 'byAuthor')} {article.author}</span>
              <span>•</span>
              <span>{article.timeAgo}</span>
            </div>

            <motion.h1
              layoutId={`article-title-${article.id}`}
              className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 leading-tight mb-3"
            >
              {article.title}
            </motion.h1>

            {article.subtitle && (
              <p className="font-serif text-slate-600 dark:text-slate-300 text-base sm:text-lg border-l-4 border-blue-600 dark:border-blue-500 pl-3.5 italic">
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Featured Image */}
          <div className="mb-6 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video relative">
            <motion.img
              layoutId={`article-image-${article.id}`}
              src={article.imageUrl}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/80 to-transparent text-white text-xs italic">
              {article.imageAlt}
            </div>
          </div>

          {/* AI Summary Callout Box */}
          {article.aiSummary && (
            <div className="mb-8 rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50/70 dark:from-slate-800/80 dark:to-slate-900/90 border border-blue-200/80 dark:border-blue-800/60 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                  <span className="uppercase tracking-wider text-xs">{t(lang, 'aiExecBrief')}</span>
                </div>
                <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/80 px-2 py-0.5 rounded">
                  Gemini Flash 3.6
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 italic">
                "{article.aiSummary.overview}"
              </p>

              <div className="space-y-2 mb-4">
                {article.aiSummary.bulletPoints.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-blue-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {t(lang, 'keyImpact')}: {article.aiSummary.keyTakeaway}
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onOpenCompare(article);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                >
                  <span>{t(lang, 'compareOutlets')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Article Full Text Body */}
          <div className={`font-serif text-slate-800 dark:text-slate-200 space-y-4 mb-8 ${fontClasses[fontSize]}`}>
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Outlet Coverage Quick Bar */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                {t(lang, 'mediaCoverageComparison')} ({article.outletsCoverage?.length || 0} {t(lang, 'outlets')})
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenCompare(article);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-semibold text-xs hover:bg-blue-100 transition-colors"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>{t(lang, 'deepBiasAnalysis')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(article.outletsCoverage || []).map((out, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onClose();
                    onOpenCompare(article);
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {out.outletName}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full uppercase tracking-wider ${
                      out.bias === 'center' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      out.bias.includes('left') ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {getBiasLabel(out.bias)}
                    </span>
                  </div>
                  <h4 className="font-serif font-semibold text-xs text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                    "{out.headline}"
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {out.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};
