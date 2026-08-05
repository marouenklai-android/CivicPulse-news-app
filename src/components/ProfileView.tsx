import React from 'react';
import { UserPreferences } from '../types';
import { User, Settings, Shield, Bell, Sparkles, CheckCircle2, Sliders, Globe, Smartphone, Play } from 'lucide-react';
import { LanguageCode, LANGUAGES, t } from '../translations';

interface ProfileViewProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onGenerateDailyBriefing: () => void;
  briefingData: any;
  loadingBriefing: boolean;
  onOpenOnboarding?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  preferences,
  onUpdatePreferences,
  onGenerateDailyBriefing,
  briefingData,
  loadingBriefing,
  onOpenOnboarding,
}) => {
  const lang = preferences.language || 'en';

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Profile Card Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
          AT
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
              Alex Thorne
            </h2>
            <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Observer Gold
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            marouen.klaai@gmail.com • Policy & Economics Analyst
          </p>
        </div>
      </div>

      {/* AI Daily Briefing Generator Section */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-700/60 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-yellow-300 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{t(lang, 'aiDailyBriefing')}</span>
          </div>
          <button
            onClick={onGenerateDailyBriefing}
            disabled={loadingBriefing}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            <Sparkles className={`w-3.5 h-3.5 ${loadingBriefing ? 'animate-spin' : ''}`} />
            <span>{loadingBriefing ? t(lang, 'briefingGenerating') : t(lang, 'generateBriefing')}</span>
          </button>
        </div>

        {briefingData ? (
          <div className="space-y-3 pt-2 border-t border-slate-700/60 animate-in fade-in duration-200">
            <h3 className="font-serif font-bold text-lg text-yellow-200">
              {briefingData.briefingHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
              {briefingData.editorialNote}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Recommended Focus Areas for Today:
              </span>
              <div className="flex flex-wrap gap-2">
                {briefingData.recommendedFocusAreas.map((area: string, i: number) => (
                  <span
                    key={i}
                    className="bg-slate-800 border border-slate-700 text-blue-300 text-xs px-3 py-1 rounded-lg font-medium"
                  >
                    • {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-300">
            Tap '{t(lang, 'generateBriefing')}' to let Gemini process top developments across your preferred regions and topics into a custom executive memorandum.
          </p>
        )}
      </div>

      {/* Preferences Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>{t(lang, 'profileTitle')}</span>
        </h3>

        {/* Display Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t(lang, 'language')}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onUpdatePreferences({ language: l.code })}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                  lang === l.code
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{l.flag} {l.label}</span>
                {lang === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Perspective Mode Selector */}
        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Default Feed Framing Bias Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'balanced', label: 'Balanced' },
              { id: 'center', label: 'Center Facts' },
              { id: 'left', label: 'Left/Social' },
              { id: 'right', label: 'Right/Market' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onUpdatePreferences({ feedPerspective: p.id as any })}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  preferences.feedPerspective === p.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Breaking News Alerts Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
              AI Priority Breaking News Push Alerts
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Only notify for high-confidence geopolitical developments
            </span>
          </div>

          <button
            onClick={() => onUpdatePreferences({ aiAlerts: !preferences.aiAlerts })}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              preferences.aiAlerts ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                preferences.aiAlerts ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* App Theme Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
              {t(lang, 'appTheme')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {preferences.theme === 'dark' ? t(lang, 'darkMode') : t(lang, 'lightMode')}
            </span>
          </div>

          <button
            onClick={() => onUpdatePreferences({ theme: preferences.theme === 'light' ? 'dark' : 'light' })}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              preferences.theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                preferences.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Onboarding Screen & Android Kotlin Code Trigger */}
        {onOpenOnboarding && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span>Onboarding Screen & Android Kotlin</span>
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Replay animated onboarding or inspect Jetpack Compose code
              </span>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
