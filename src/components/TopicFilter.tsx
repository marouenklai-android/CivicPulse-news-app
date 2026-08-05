import React from 'react';
import { TopicCode } from '../types';
import { LanguageCode, t } from '../translations';

interface TopicFilterProps {
  selectedTopic: TopicCode;
  onSelectTopic: (topic: TopicCode) => void;
  language?: LanguageCode;
}

const TOPICS: { id: TopicCode; translationKey: string }[] = [
  { id: 'all', translationKey: 'topicAll' },
  { id: 'policy', translationKey: 'topicPolicy' },
  { id: 'global', translationKey: 'topicGlobal' },
  { id: 'economy', translationKey: 'topicEconomy' },
  { id: 'legal', translationKey: 'topicLegal' },
  { id: 'tech', translationKey: 'topicTech' },
  { id: 'environment', translationKey: 'topicEnvironment' },
  { id: 'defense', translationKey: 'topicDefense' },
];

export const TopicFilter: React.FC<TopicFilterProps> = ({
  selectedTopic,
  onSelectTopic,
  language = 'en',
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar touch-pan-x py-1 w-full">
      {TOPICS.map((tItem) => {
        const isSelected = selectedTopic === tItem.id;
        const labelText = t(language as LanguageCode, tItem.translationKey);
        return (
          <button
            key={tItem.id}
            onClick={() => onSelectTopic(tItem.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all active:scale-95 ${
              isSelected
                ? 'bg-blue-600 text-white dark:bg-blue-500 font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {labelText}
          </button>
        );
      })}
    </div>
  );
};
