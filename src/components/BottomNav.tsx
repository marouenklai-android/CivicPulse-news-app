import React from 'react';
import { Rss, SplitSquareVertical, Compass, Bookmark, User } from 'lucide-react';
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.id === 'feed' && activeTab === 'trending');

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id as NavTab)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-medium scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
