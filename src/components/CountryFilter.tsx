import React from 'react';
import { CountryCode } from '../types';
import { LanguageCode, t } from '../translations';

interface CountryFilterProps {
  selectedCountry: CountryCode;
  onSelectCountry: (country: CountryCode) => void;
  language?: LanguageCode;
}

const COUNTRIES: { id: CountryCode; translationKey: string; flag: string }[] = [
  { id: 'global', translationKey: 'regionGlobal', flag: '🌐' },
  { id: 'us', translationKey: 'regionUs', flag: '🇺🇸' },
  { id: 'eu', translationKey: 'regionEu', flag: '🇪🇺' },
  { id: 'uk', translationKey: 'regionUk', flag: '🇬🇧' },
  { id: 'jp', translationKey: 'regionJp', flag: '🇯🇵' },
  { id: 'ea', translationKey: 'regionEa', flag: '🌏' },
  { id: 'sa', translationKey: 'regionSa', flag: '🌎' },
];

export const CountryFilter: React.FC<CountryFilterProps> = ({
  selectedCountry,
  onSelectCountry,
  language = 'en',
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar touch-pan-x py-1.5 px-0.5 w-full">
      {COUNTRIES.map((c) => {
        const isSelected = selectedCountry === c.id;
        const labelText = t(language as LanguageCode, c.translationKey);
        return (
          <button
            key={c.id}
            onClick={() => onSelectCountry(c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all active:scale-95 ${
              isSelected
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs font-semibold'
                : 'bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>{c.flag}</span>
            <span>{labelText}</span>
          </button>
        );
      })}
    </div>
  );
};
