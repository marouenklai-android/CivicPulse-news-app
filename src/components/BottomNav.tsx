import React from 'react';
import { Rss, SplitSquareVertical, Compass, Bookmark, User, Sparkles } from 'lucide-react';
import { LanguageCode, t } from '../translations';

export type NavTab = 'feed' | 'compare' | 'explore' | 'saved' | 'profile' | 'trending';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  savedCount: number;
  language: LanguageCode;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  savedCount,
  language,
}) => {
  const tabs = [
    { id: 'feed', label: t(language, 'navFeed'), icon: Rss },
    { id: 'compare', label: t(language, 'navCompare'), icon: SplitSquareVertical },
    { id: 'explore', label: t(language, 'navExplore'), icon: Compass },
    { id: 'saved', label: t(language, 'navSaved'), icon: Bookmark, count: savedCount },
    { id: 'profile', label: t(language, 'navProfile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.id === 'feed' && activeTab === 'trending');

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as NavTab)}
              className="flex flex-col items-center justify-center group focus:outline-none cursor-pointer py-0.5 px-2"
            >
              {/* Material 3 Active Indicator Pill */}
              <div className={`relative px-4 py-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-1 tracking-tight leading-none transition-colors ${
                isActive
                  ? 'font-bold text-blue-700 dark:text-blue-300'
                  : 'font-medium text-slate-500 dark:text-slate-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
