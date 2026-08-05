import React, { useState } from 'react';
import { Article } from '../types';
import { Bookmark, Sparkles, Trash2, SlidersHorizontal, BookOpen } from 'lucide-react';
import { LanguageCode, t } from '../translations';

interface SavedViewProps {
  articles: Article[];
  savedArticleIds: string[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (e: React.MouseEvent, articleId: string) => void;
  onClearAllBookmarks: () => void;
  language?: LanguageCode;
}

export const SavedView: React.FC<SavedViewProps> = ({
  articles,
  savedArticleIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAllBookmarks,
  language = 'en',
}) => {
  const [perspectiveMode, setPerspectiveMode] = useState<'balanced' | 'right' | 'left'>('balanced');
  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('all');

  const bookmarkedArticles = articles.filter(a => savedArticleIds.includes(a.id));

  const filteredSaved = bookmarkedArticles.filter((art) => {
    if (activeTopicFilter === 'all') return true;
    return art.topic === activeTopicFilter;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs mb-1">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>PERSONAL READING VAULT</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
            Saved Articles & Reading Briefs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {savedArticleIds.length} items bookmarked for offline reference and deep reading.
          </p>
        </div>

        {savedArticleIds.length > 0 && (
          <button
            onClick={onClearAllBookmarks}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved</span>
          </button>
        )}
      </div>

      {/* Perspective Shift Segmented Control */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Personalized Perspective Filter</span>
          </span>
          <span className="text-[11px] text-slate-400 italic">Toggle framing angle</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setPerspectiveMode('balanced')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              perspectiveMode === 'balanced'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Balanced (Neutral)
          </button>
          <button
            onClick={() => setPerspectiveMode('right')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              perspectiveMode === 'right'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Fiscal / Right Angle
          </button>
          <button
            onClick={() => setPerspectiveMode('left')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              perspectiveMode === 'left'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Social / Left Angle
          </button>
        </div>
      </div>

      {/* Saved items list */}
      {bookmarkedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            Your Reading Vault is Empty
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Tap the bookmark icon on any article in the feed or comparison tab to save it to your personal vault for offline reading.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Showing {filteredSaved.length} bookmarked stories</span>
            <span>Mode: {perspectiveMode.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSaved.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {art.topicLabel}
                    </span>
                    <button
                      onClick={(e) => onRemoveBookmark(e, art.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>

                  {/* AI Perspective Frame Snapshot based on active mode */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{perspectiveMode === 'balanced' ? 'Balanced AI Summary:' : `${perspectiveMode.toUpperCase()} Perspective Framing:`}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic">
                      {perspectiveMode === 'balanced'
                        ? art.aiSummary?.overview || art.subtitle
                        : perspectiveMode === 'right'
                        ? `Emphasizes fiscal accountability, deficit risk, and business productivity implications.`
                        : `Focuses on environmental sustainability, social equity, and public accessibility rights.`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{art.source}</span>
                  <span>{art.readTimeMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
