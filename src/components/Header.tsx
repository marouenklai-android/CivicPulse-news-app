import React from 'react';
import { Search, Moon, Sun, Bookmark, Globe } from 'lucide-react';
import { LanguageCode, LANGUAGES, t } from '../translations';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language: LanguageCode;
  onChangeLanguage: (code: LanguageCode) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  language,
  onChangeLanguage,
  onOpenSearch,
  savedCount,
  onOpenSaved,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-15 flex items-center justify-between gap-2 overflow-hidden">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 shrink-0">
            <span className="font-serif text-base tracking-wider">C</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-bold text-base leading-none tracking-tight text-slate-900 dark:text-slate-100 truncate">
                Civic<span className="text-blue-600 dark:text-blue-400">Pulse</span>
              </h1>
            </div>
            <p className="text-[9px] font-sans text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest leading-none mt-0.5 truncate hidden xs:block">
              {t(language, 'tagline')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-1.5 sm:px-2 py-1 border border-slate-200 dark:border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pl-1 pr-0.5"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-full text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shrink-0"
            title="Search articles & filters"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenSaved}
            className="relative p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Saved Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
