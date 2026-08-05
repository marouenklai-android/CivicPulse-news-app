import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Code, 
  Check, 
  Copy, 
  Compass, 
  BookOpen, 
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';
import { TopicCode, UserPreferences } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedTopics: TopicCode[]) => void;
  userPreferences: UserPreferences;
}

const ONBOARDING_SLIDES = [
  {
    id: 'welcome',
    badge: 'CivicPulse Mobile',
    title: 'Global Civic Intelligence & Balanced Coverage',
    subtitle: 'Track geopolitical policies, technology standards, and multi-outlet perspectives without algorithmic bias.',
    icon: Compass,
    accentColor: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'ai-features',
    badge: 'AI-Powered Synthesis',
    title: 'Instant Bullet Summaries & Real-Time Translation',
    subtitle: 'Digest lengthy international policy reports in seconds with Gemini AI breakdown and 5+ global language support.',
    icon: Sparkles,
    accentColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'personalize',
    badge: 'Tailored Radar',
    title: 'Choose Your Priority Intelligence Topics',
    subtitle: 'Select topics you want highlighted on your main feed. You can adjust this anytime in your profile.',
    icon: Layers,
    accentColor: 'from-blue-600 to-emerald-600',
  },
];

const AVAILABLE_TOPICS: { id: TopicCode; label: string; icon: string }[] = [
  { id: 'policy', label: 'Policy & Governance', icon: '🏛️' },
  { id: 'tech', label: 'Technology & AI', icon: '🔬' },
  { id: 'economy', label: 'Global Economy', icon: '📈' },
  { id: 'environment', label: 'Environment & Climate', icon: '🌿' },
  { id: 'legal', label: 'Legal & Constitutional', icon: '⚖️' },
  { id: 'defense', label: 'Defense & Security', icon: '🛡️' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  userPreferences,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<TopicCode[]>(
    userPreferences.preferredTopics || ['policy', 'tech', 'global']
  );
  const [showKotlinCode, setShowKotlinCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onComplete(selectedTopics);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const toggleTopic = (topic: TopicCode) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const kotlinComposeSnippet = `// Android Jetpack Compose OnboardingScreen.kt
package com.civicpulse.app.ui.onboarding

import androidx.compose.animation.*
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch

data class OnboardingPage(
    val title: String,
    val description: String,
    val iconRes: String,
    val category: String
)

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OnboardingScreen(
    onFinishOnboarding: (List<String>) -> Unit
) {
    val pages = remember {
        listOf(
            OnboardingPage(
                title = "Global Civic Intelligence",
                description = "Track geopolitical policies & neutral perspective coverage across global outlets.",
                iconRes = "compass",
                category = "CivicPulse Mobile"
            ),
            OnboardingPage(
                title = "AI-Powered Synthesis",
                description = "Digest lengthy reports with AI bullet points & real-time multi-language translation.",
                iconRes = "sparkles",
                category = "Gemini Powered"
            ),
            OnboardingPage(
                title = "Personalized Radar",
                description = "Select your priority topics to customize your main intelligence feed.",
                iconRes = "layers",
                category = "Tailored Feed"
            )
        )
    }

    val pagerState = rememberPagerState(pageCount = { pages.size })
    val coroutineScope = rememberCoroutineScope()
    var selectedTopics by remember { mutableStateOf(listOf("policy", "tech", "economy")) }

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Header Action
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "CivicPulse",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
                TextButton(onClick = { onFinishOnboarding(selectedTopics) }) {
                    Text("Skip", color = MaterialTheme.colorScheme.primary)
                }
            }

            // Animated Horizontal Pager
            HorizontalPager(
                state = pagerState,
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
            ) { pageIndex ->
                val page = pages[pageIndex]
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(vertical = 16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Box(
                        modifier = Modifier
                            .size(100.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primaryContainer),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (pageIndex == 0) "🌐" else if (pageIndex == 1) "✨" else "📊",
                            fontSize = 40.sp
                        )
                    }

                    Spacer(modifier = Modifier.height(32.dp))

                    Text(
                        text = page.category.uppercase(),
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = page.title,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = page.description,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                }
            }

            // Pager Indicators
            Row(
                horizontalArrangement = Arrangement.Center,
                modifier = Modifier.padding(bottom = 24.dp)
            ) {
                repeat(pages.size) { index ->
                    val color = if (pagerState.currentPage == index) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.outlineVariant
                    }
                    Box(
                        modifier = Modifier
                            .padding(4.dp)
                            .clip(CircleShape)
                            .background(color)
                            .size(if (pagerState.currentPage == index) 12.dp else 8.dp)
                    )
                }
            }

            // Bottom CTA Controls
            Button(
                onClick = {
                    if (pagerState.currentPage < pages.size - 1) {
                        coroutineScope.launch {
                            pagerState.animateScrollToPage(pagerState.currentPage + 1)
                        }
                    } else {
                        onFinishOnboarding(selectedTopics)
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(16.dp)
            ) {
                Text(
                    text = if (pagerState.currentPage == pages.size - 1) "Get Started" else "Next",
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}`;

  const copySnippet = () => {
    navigator.clipboard.writeText(kotlinComposeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              C
            </div>
            <span className="font-serif font-bold text-slate-900 dark:text-slate-100 text-sm">
              CivicPulse Mobile
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Kotlin Code Inspector */}
            <button
              onClick={() => setShowKotlinCode(!showKotlinCode)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                showKotlinCode 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
              title="View native Android Jetpack Compose Kotlin Code"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showKotlinCode ? 'UI Preview' : 'Kotlin Code'}</span>
            </button>

            {/* Skip Button */}
            <button
              onClick={() => onComplete(selectedTopics)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Content Body: Either UI Preview or Kotlin Inspector */}
        {showKotlinCode ? (
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Android Jetpack Compose
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Native Kotlin implementation using HorizontalPager & AnimatedVisibility
                </p>
              </div>
              <button
                onClick={copySnippet}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors shrink-0"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Snippet'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 select-text">
              <code>{kotlinComposeSnippet}</code>
            </pre>
          </div>
        ) : (
          <div className="p-6 flex-1 flex flex-col justify-between">
            {/* Slide Content with Motion Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Visual Decorative Icon Card */}
                <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentSlide.accentColor} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 animate-pulse`}>
                    <currentSlide.icon className="w-10 h-10" />
                  </div>

                  {/* Contextual Visual Mock Elements depending on slide */}
                  {currentSlide.id === 'welcome' && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="absolute top-3 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-xs"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Multi-Outlet Neutrality
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-3 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-xs"
                      >
                        <Globe className="w-3 h-3 text-blue-500" />
                        Global Policy Radar
                      </motion.div>
                    </>
                  )}

                  {currentSlide.id === 'ai-features' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 inset-x-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        Gemini 3 Executive Memo
                      </div>
                      <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Instant 3-Bullet Points
                      </span>
                    </motion.div>
                  )}

                  {currentSlide.id === 'personalize' && (
                    <div className="absolute top-3 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {selectedTopics.length} Topics Active
                    </div>
                  )}
                </div>

                {/* Text Heading */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block">
                    {currentSlide.badge}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100 leading-tight">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Topic Selector Grid (Slide 3) */}
                {currentSlide.id === 'personalize' && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {AVAILABLE_TOPICS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-900 dark:text-blue-200 font-semibold shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="text-sm">{topic.icon}</span>
                          <span className="truncate flex-1 text-left">{topic.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pager Controls & Dot Indicators */}
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={currentSlideIndex === 0}
                className={`p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  currentSlideIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {ONBOARDING_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx
                        ? 'w-6 bg-blue-600 dark:bg-blue-500'
                        : 'w-2 bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Next / Get Started Button */}
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span>{currentSlideIndex === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
