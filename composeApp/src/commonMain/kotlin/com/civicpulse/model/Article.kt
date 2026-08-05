package com.civicpulse.model

import kotlinx.serialization.Serializable

@Serializable
enum class CountryCode(val label: String, val flag: String) {
    GLOBAL("Global", "🌐"),
    US("United States", "🇺🇸"),
    EU("European Union", "🇪🇺"),
    UK("United Kingdom", "🇬🇧"),
    JP("Japan", "🇯🇵"),
    EA("East Asia", "🌏"),
    SA("South America", "🌎")
}

@Serializable
enum class TopicCode(val label: String) {
    ALL("All Topics"),
    POLICY("Policy & Legislation"),
    GLOBAL("Global Trade & Accords"),
    ECONOMY("Central Banks & Inflation"),
    LEGAL("High Court & Privacy"),
    TECH("AI Regulation & Tech"),
    ENVIRONMENT("Climate & Green Infrastructure"),
    DEFENSE("Cyber Defense & Security")
}

@Serializable
enum class BiasRating(val displayName: String, val colorHex: String) {
    LEFT("Left", "#2563EB"),
    CENTER_LEFT("Center-Left", "#3B82F6"),
    CENTER("Center", "#6B7280"),
    CENTER_RIGHT("Center-Right", "#EF4444"),
    RIGHT("Right", "#DC2626")
}

@Serializable
data class OutletCoverage(
    val outletName: String,
    val logoUrl: String,
    val bias: BiasRating,
    val headline: String,
    val summary: String,
    val keyPoints: List<String>
)

@Serializable
data class AiSummary(
    val overview: String,
    val bulletPoints: List<String>,
    val keyTakeaway: String
)

@Serializable
data class Article(
    val id: String,
    val title: String,
    val subtitle: String? = null,
    val content: String,
    val author: String,
    val source: String,
    val publishedAt: String,
    val timeAgo: String,
    val readTimeMinutes: Int,
    val country: CountryCode,
    val topic: TopicCode,
    val imageUrl: String,
    val imageAlt: String,
    val isTrending: Boolean = false,
    val isFeatured: Boolean = false,
    val aiSummary: AiSummary? = null,
    val outletsCoverage: List<OutletCoverage> = emptyList()
)

@Serializable
data class UserPreferences(
    val theme: String = "light",
    val feedPerspective: String = "balanced",
    val preferredTopics: List<TopicCode> = listOf(TopicCode.POLICY, TopicCode.GLOBAL, TopicCode.TECH),
    val preferredCountries: List<CountryCode> = listOf(CountryCode.GLOBAL, CountryCode.US, CountryCode.EU),
    val aiAlerts: Boolean = true
)
