import React, { useState } from 'react';
import { Article, OutletCoverage } from '../types';
import { SplitSquareVertical, Sparkles, Scale, Info, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { LanguageCode, t } from '../translations';

interface CompareCoverageViewProps {
  articles: Article[];
  selectedArticleId?: string;
  onSelectArticle: (article: Article) => void;
  language?: LanguageCode;
}

interface FramingResult {
  outletName: string;
  editorialAngle: string;
  keyTone: string;
  highlightedElements: string;
  omittedElements: string;
}

interface ComparisonData {
  neutralBaseline: string;
  framingAnalysis: FramingResult[];
  mediaInsight: string;
}

export const CompareCoverageView: React.FC<CompareCoverageViewProps> = ({
  articles,
  selectedArticleId,
  onSelectArticle,
  language = 'en',
}) => {
  const lang: LanguageCode = (language as LanguageCode) || 'en';
  const currentArticle = articles.find(a => a.id === selectedArticleId) || articles[0];

  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'deviations'>('all');

  const handleRunAiComparison = async () => {
    if (!currentArticle) return;
    setLoadingAi(true);

    try {
      const response = await fetch('/api/gemini/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: currentArticle.title,
          outlets: currentArticle.outletsCoverage,
          lang
        })
      });

      const resData = await response.json();
      if (resData.comparison) {
        setComparisonData(resData.comparison);
      }
    } catch (err) {
      console.error('Failed to compare outlets:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  const getBiasLabel = (bias: string) => {
    const b = (bias || '').toLowerCase();
    if (b.includes('center')) return t(lang, 'biasCenter');
    if (b.includes('left')) return t(lang, 'biasLeft');
    if (b.includes('right')) return t(lang, 'biasRight');
    return bias;
  };

  if (!currentArticle) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-xs my-6">
        <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
          {t(lang, 'noStoriesToCompareTitle')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          {t(lang, 'noStoriesToCompareDesc')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-700/50">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-2 uppercase tracking-wider">
          <SplitSquareVertical className="w-4 h-4" />
          <span>{t(lang, 'multiOutletMatrix')}</span>
        </div>
        <h2 className="font-serif font-bold text-xl sm:text-2xl mb-2">
          {t(lang, 'compareCoverageTitle')}
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {t(lang, 'compareCoverageDesc')}
        </p>
      </div>

      {/* Story Selection Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          {t(lang, 'selectStoryToCompare')}
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {articles.map((art) => {
            const isSelected = art.id === currentArticle.id;
            return (
              <button
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  setComparisonData(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="truncate max-w-[180px]">{art.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {art.outletsCoverage?.length || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Summary Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {t(lang, 'selectedTopic')}: {currentArticle.topicLabel} • {currentArticle.countryLabel}
          </span>
          <button
            onClick={handleRunAiComparison}
            disabled={loadingAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs active:scale-95 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 text-yellow-300 ${loadingAi ? 'animate-spin' : ''}`} />
            <span>{loadingAi ? t(lang, 'analyzingFraming') : t(lang, 'runGeminiAnalysis')}</span>
          </button>
        </div>

        <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">
          {currentArticle.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif line-clamp-2">
          {currentArticle.subtitle || currentArticle.content}
        </p>
      </div>

      {/* AI Neutral Synthesis Section (If generated) */}
      {comparisonData && (
        <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-slate-800/90 dark:to-slate-900/90 rounded-2xl p-5 border border-blue-200 dark:border-blue-800 shadow-sm animate-in fade-in duration-300 space-y-4">
          <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold text-sm">
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{t(lang, 'neutralFactSynthesis')}</span>
            </div>
            <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
              Gemini Flash 3.6
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {t(lang, 'coreFacts')}
            </h4>
            <p className="text-sm font-serif text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
              "{comparisonData.neutralBaseline}"
            </p>
          </div>

          {comparisonData.mediaInsight && (
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 border border-blue-100 dark:border-slate-700 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                  {t(lang, 'mediaLiteracyInsight')}
                </span>
                <span>{comparisonData.mediaInsight}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Side-by-Side Outlet Coverage Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            {t(lang, 'outletBreakdown')} ({currentArticle.outletsCoverage?.length || 0} {t(lang, 'sources')})
          </h3>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTabFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t(lang, 'allHeadlines')}
            </button>
            <button
              onClick={() => setActiveTabFilter('deviations')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeTabFilter === 'deviations'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t(lang, 'editorialAngles')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(currentArticle.outletsCoverage || [])
            .filter(outlet => activeTabFilter === 'all' || outlet.bias !== 'center')
            .map((outlet, index) => {
            const aiFraming = comparisonData?.framingAnalysis.find(
              f => f.outletName.toLowerCase().includes(outlet.outletName.toLowerCase()) ||
                   outlet.outletName.toLowerCase().includes(f.outletName.toLowerCase())
            );

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Outlet Logo & Bias Tag */}
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {outlet.outletName}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      outlet.bias === 'center' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      outlet.bias.includes('left') ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {getBiasLabel(outlet.bias)}
                    </span>
                  </div>

                  {/* Headline as published */}
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug mb-2">
                    "{outlet.headline}"
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-serif leading-relaxed mb-4">
                    {outlet.summary}
                  </p>

                  {/* Key points emphasized by this outlet */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t(lang, 'keyHighlights')}
                    </span>
                    {outlet.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Detailed Framing Analysis Card Footer */}
                {aiFraming ? (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                    <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
                      <span>{t(lang, 'editorialAngleLabel')} {aiFraming.editorialAngle}</span>
                      <span className="bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.2 rounded text-[10px]">
                        {t(lang, 'toneLabel')} {aiFraming.keyTone}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 dark:text-slate-300">
                      <strong className="text-emerald-700 dark:text-emerald-400">{t(lang, 'emphasizes')}</strong> {aiFraming.highlightedElements}
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300">
                      <strong className="text-amber-700 dark:text-amber-400">{t(lang, 'downplaysOmits')}</strong> {aiFraming.omittedElements}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleRunAiComparison}
                    className="w-full mt-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t(lang, 'generateFramingAnalysis')}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
