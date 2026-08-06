import { CountryCode } from '../types';

export interface CountryInfo {
  flag: string;
  label: string;
  code: string;
}

const COUNTRY_MAP: Record<string, { flag: string; label: string }> = {
  us: { flag: '🇺🇸', label: 'United States' },
  uk: { flag: '🇬🇧', label: 'United Kingdom' },
  eu: { flag: '🇪🇺', label: 'European Union' },
  jp: { flag: '🇯🇵', label: 'Japan' },
  ea: { flag: '🌏', label: 'East Asia' },
  sa: { flag: '🌎', label: 'South America' },
  global: { flag: '🌐', label: 'Global' },
  fr: { flag: '🇫🇷', label: 'France' },
  de: { flag: '🇩🇪', label: 'Germany' },
  cn: { flag: '🇨🇳', label: 'China' },
  in: { flag: '🇮🇳', label: 'India' },
  ua: { flag: '🇺🇦', label: 'Ukraine' },
  ru: { flag: '🇷🇺', label: 'Russia' },
  ca: { flag: '🇨🇦', label: 'Canada' },
  il: { flag: '🇮🇱', label: 'Israel' },
  au: { flag: '🇦🇺', label: 'Australia' },
  br: { flag: '🇧🇷', label: 'Brazil' },
  kr: { flag: '🇰🇷', label: 'South Korea' },
  it: { flag: '🇮🇹', label: 'Italy' },
  es: { flag: '🇪🇸', label: 'Spain' },
};

/**
 * Returns flag emoji and display label for an article's country code or label.
 */
export function getCountryInfo(countryCode?: CountryCode | string, rawLabel?: string): CountryInfo {
  const code = (countryCode || '').toLowerCase();
  const label = rawLabel || '';
  const labelLower = label.toLowerCase();

  // 1. Direct code lookup
  if (code && COUNTRY_MAP[code]) {
    return {
      flag: COUNTRY_MAP[code].flag,
      label: rawLabel || COUNTRY_MAP[code].label,
      code,
    };
  }

  // 2. Text matching on label or title
  if (labelLower.includes('united states') || labelLower.includes('america') || labelLower === 'us') {
    return { flag: '🇺🇸', label: rawLabel || 'United States', code: 'us' };
  }
  if (labelLower.includes('united kingdom') || labelLower.includes('britain') || labelLower === 'uk') {
    return { flag: '🇬🇧', label: rawLabel || 'United Kingdom', code: 'uk' };
  }
  if (labelLower.includes('european union') || labelLower === 'eu') {
    return { flag: '🇪🇺', label: rawLabel || 'European Union', code: 'eu' };
  }
  if (labelLower.includes('japan')) {
    return { flag: '🇯🇵', label: rawLabel || 'Japan', code: 'jp' };
  }
  if (labelLower.includes('france')) {
    return { flag: '🇫🇷', label: rawLabel || 'France', code: 'fr' };
  }
  if (labelLower.includes('germany')) {
    return { flag: '🇩🇪', label: rawLabel || 'Germany', code: 'de' };
  }
  if (labelLower.includes('china')) {
    return { flag: '🇨🇳', label: rawLabel || 'China', code: 'cn' };
  }
  if (labelLower.includes('india')) {
    return { flag: '🇮🇳', label: rawLabel || 'India', code: 'in' };
  }
  if (labelLower.includes('ukraine')) {
    return { flag: '🇺🇦', label: rawLabel || 'Ukraine', code: 'ua' };
  }
  if (labelLower.includes('russia')) {
    return { flag: '🇷🇺', label: rawLabel || 'Russia', code: 'ru' };
  }
  if (labelLower.includes('canada')) {
    return { flag: '🇨🇦', label: rawLabel || 'Canada', code: 'ca' };
  }
  if (labelLower.includes('israel')) {
    return { flag: '🇮🇱', label: rawLabel || 'Israel', code: 'il' };
  }
  if (labelLower.includes('australia')) {
    return { flag: '🇦🇺', label: rawLabel || 'Australia', code: 'au' };
  }
  if (labelLower.includes('east asia')) {
    return { flag: '🌏', label: rawLabel || 'East Asia', code: 'ea' };
  }
  if (labelLower.includes('south america')) {
    return { flag: '🌎', label: rawLabel || 'South America', code: 'sa' };
  }

  // Fallback to Global
  return {
    flag: '🌐',
    label: rawLabel || 'Global',
    code: 'global',
  };
}
