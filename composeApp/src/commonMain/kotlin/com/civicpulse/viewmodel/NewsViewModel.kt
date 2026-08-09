package com.civicpulse.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.civicpulse.model.*
import com.civicpulse.repository.NewsRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

sealed interface NewsUiState {
    object Loading : NewsUiState
    data class Success(
        val articles: List<Article>,
        val featuredArticle: Article?,
        val trendingArticles: List<Article>,
        val selectedCountry: CountryCode,
        val selectedTopic: TopicCode,
        val savedArticleIds: Set<String>,
        val searchQuery: String,
        val userPreferences: UserPreferences,
        val dailyBriefing: DailyBriefingState = DailyBriefingState.Idle
    ) : NewsUiState
    data class Error(val message: String) : NewsUiState
}

sealed interface DailyBriefingState {
    object Idle : DailyBriefingState
    object Loading : DailyBriefingState
    data class Generated(
        val headline: String,
        val editorialNote: String,
        val recommendedFocus: List<String>
    ) : DailyBriefingState
}

sealed interface NewsUserIntent {
    data class SelectCountry(val country: CountryCode) : NewsUserIntent
    data class SelectTopic(val topic: TopicCode) : NewsUserIntent
    data class ToggleBookmark(val articleId: String) : NewsUserIntent
    data class UpdateSearchQuery(val query: String) : NewsUserIntent
    data class SelectPerspective(val mode: String) : NewsUserIntent
    object GenerateDailyBriefing : NewsUserIntent
    object ToggleTheme : NewsUserIntent
    object ClearBookmarks : NewsUserIntent
}

class NewsViewModel(
    private val repository: NewsRepository = NewsRepository()
) : ViewModel() {

    private val _selectedCountry = MutableStateFlow(CountryCode.GLOBAL)
    private val _selectedTopic = MutableStateFlow(TopicCode.ALL)
    private val _searchQuery = MutableStateFlow("")
    private val _savedArticleIds = MutableStateFlow<Set<String>>(setOf("art-1", "art-3"))
    private val _userPreferences = MutableStateFlow(UserPreferences())
    private val _dailyBriefingState = MutableStateFlow<DailyBriefingState>(DailyBriefingState.Idle)

    private val _articles = MutableStateFlow<List<Article>>(emptyList())
    private val _isLoading = MutableStateFlow(true)

    // Combined UI state pipeline using Kotlin Coroutines StateFlow
    val uiState: StateFlow<NewsUiState> = combine(
        listOf(
            _articles,
            _selectedCountry,
            _selectedTopic,
            _savedArticleIds,
            _searchQuery,
            _userPreferences,
            _dailyBriefingState
        )
    ) { args ->
        val articles = args[0] as List<Article>
        val country = args[1] as CountryCode
        val topic = args[2] as TopicCode
        val savedIds = args[3] as Set<String>
        val query = args[4] as String
        val prefs = args[5] as UserPreferences
        val briefing = args[6] as DailyBriefingState

        if (articles.isEmpty()) {
            NewsUiState.Loading
        } else {
            val filtered = articles.filter { article ->
                val matchesCountry = country == CountryCode.GLOBAL || article.country == country || article.country == CountryCode.GLOBAL
                val matchesTopic = topic == TopicCode.ALL || article.topic == topic
                val matchesQuery = query.isBlank() || (
                    article.title.contains(query, ignoreCase = true) ||
                    article.content.contains(query, ignoreCase = true) ||
                    article.source.contains(query, ignoreCase = true)
                )
                matchesCountry && matchesTopic && matchesQuery
            }

            val featured = filtered.firstOrNull { it.isFeatured } ?: filtered.firstOrNull()
            val trending = articles.filter { it.isTrending }

            NewsUiState.Success(
                articles = filtered,
                featuredArticle = featured,
                trendingArticles = trending,
                selectedCountry = country,
                selectedTopic = topic,
                savedArticleIds = savedIds,
                searchQuery = query,
                userPreferences = prefs,
                dailyBriefing = briefing
            )
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = NewsUiState.Loading
    )

    init {
        loadInitialArticles()
    }

    fun processIntent(intent: NewsUserIntent) {
        when (intent) {
            is NewsUserIntent.SelectCountry -> _selectedCountry.value = intent.country
            is NewsUserIntent.SelectTopic -> _selectedTopic.value = intent.topic
            is NewsUserIntent.UpdateSearchQuery -> _searchQuery.value = intent.query
            is NewsUserIntent.ToggleBookmark -> {
                _savedArticleIds.update { current ->
                    if (current.contains(intent.articleId)) {
                        current - intent.articleId
                    } else {
                        current + intent.articleId
                    }
                }
            }
            is NewsUserIntent.SelectPerspective -> {
                _userPreferences.update { it.copy(feedPerspective = intent.mode) }
            }
            is NewsUserIntent.ToggleTheme -> {
                _userPreferences.update {
                    val next = if (it.theme == "light") "dark" else "light"
                    it.copy(theme = next)
                }
            }
            is NewsUserIntent.ClearBookmarks -> _savedArticleIds.value = emptySet()
            is NewsUserIntent.GenerateDailyBriefing -> generateBriefing()
        }
    }

    private fun loadInitialArticles() {
        viewModelScope.launch {
            _isLoading.value = true
            _articles.value = repository.getInitialArticles()
            _isLoading.value = false
        }
    }

    private fun generateBriefing() {
        viewModelScope.launch {
            _dailyBriefingState.value = DailyBriefingState.Loading
            try {
                val briefing = repository.synthesizeDailyBriefing(
                    topics = _userPreferences.value.preferredTopics,
                    countries = _userPreferences.value.preferredCountries,
                    perspective = _userPreferences.value.feedPerspective
                )
                _dailyBriefingState.value = briefing
            } catch (e: Exception) {
                _dailyBriefingState.value = DailyBriefingState.Idle
            }
        }
    }
}
