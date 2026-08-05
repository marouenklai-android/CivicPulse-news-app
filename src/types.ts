export type CountryCode = 'global' | 'us' | 'eu' | 'uk' | 'jp' | 'ea' | 'sa';

export type TopicCode = 
  | 'all'
  | 'policy'
  | 'global'
  | 'economy'
  | 'legal'
  | 'tech'
  | 'environment'
  | 'defense';

export interface OutletCoverage {
  outletName: string;
  logo: string;
  bias: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
  headline: string;
  summary: string;
  keyPoints: string[];
  url?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  author: string;
  source: string;
  publishedAt: string;
  timeAgo: string;
  readTimeMinutes: number;
  country: CountryCode;
  countryLabel: string;
  topic: TopicCode;
  topicLabel: string;
  imageUrl: string;
  imageAlt: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  aiSummary?: {
    overview: string;
    bulletPoints: string[];
    keyTakeaway: string;
  };
  outletsCoverage: OutletCoverage[];
}

export type AspectRatioType = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type ImageSizeType = '1K' | '2K' | '4K';

export interface ImageGenRequest {
  prompt: string;
  aspectRatio: AspectRatioType;
  imageSize: ImageSizeType;
  stylePreset?: string;
}

export interface ImageGenResult {
  imageUrl: string;
  prompt: string;
  aspectRatio: AspectRatioType;
  imageSize: ImageSizeType;
  timestamp: string;
}

import { LanguageCode } from './translations';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: LanguageCode;
  feedPerspective: 'balanced' | 'center' | 'left' | 'right';
  preferredTopics: TopicCode[];
  preferredCountries: CountryCode[];
  aiAlerts: boolean;
}
