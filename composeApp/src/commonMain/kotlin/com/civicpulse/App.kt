package com.civicpulse

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.civicpulse.model.Article
import com.civicpulse.model.UserPreferences
import com.civicpulse.ui.*
import com.civicpulse.viewmodel.NewsUiState
import com.civicpulse.viewmodel.NewsUserIntent
import com.civicpulse.viewmodel.NewsViewModel

@Composable
fun App() {
    var currentLanguage by remember { mutableStateOf(AppLanguage.EN) }
    var selectedTab by remember { mutableStateOf(NavigationTab.FEED) }
    var selectedArticle by remember { mutableStateOf<Article?>(null) }
    var isSearchOpen by remember { mutableStateOf(false) }

    val viewModel = remember { NewsViewModel() }
    val uiState by viewModel.uiState.collectAsState()

    ProvideAppLanguage(language = currentLanguage) {
        val isDarkTheme = when (val state = uiState) {
            is NewsUiState.Success -> state.userPreferences.theme == "dark"
            else -> false
        }

        CivicPulseTheme(useDarkTheme = isDarkTheme) {
            Scaffold(
                topBar = {
                    HeaderBar(
                        currentLanguage = currentLanguage,
                        onLanguageChange = { currentLanguage = it },
                        isDarkTheme = isDarkTheme,
                        onToggleTheme = { viewModel.processIntent(NewsUserIntent.ToggleTheme) },
                        onOpenSearch = { isSearchOpen = !isSearchOpen }
                    )
                },
                bottomBar = {
                    val savedCount = when (val state = uiState) {
                        is NewsUiState.Success -> state.savedArticleIds.size
                        else -> 0
                    }
                    BottomNavigationBar(
                        currentTab = selectedTab,
                        onTabSelected = { selectedTab = it },
                        savedCount = savedCount
                    )
                }
            ) { paddingValues ->
                Box(modifier = Modifier.fillMaxSize().padding(paddingValues)) {
                    Column(modifier = Modifier.fillMaxSize()) {
                        // Optional search input bar if search is active
                        if (isSearchOpen && uiState is NewsUiState.Success) {
                            val successState = uiState as NewsUiState.Success
                            OutlinedTextField(
                                value = successState.searchQuery,
                                onValueChange = { query ->
                                    viewModel.processIntent(NewsUserIntent.UpdateSearchQuery(query))
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 16.dp, vertical = 8.dp),
                                placeholder = { Text("Search briefs, topics, sources...") },
                                singleLine = true,
                                trailingIcon = {
                                    if (successState.searchQuery.isNotEmpty()) {
                                        IconButton(onClick = { viewModel.processIntent(NewsUserIntent.UpdateSearchQuery("")) }) {
                                            Text("✕")
                                        }
                                    }
                                }
                            )
                        }

                        when (val state = uiState) {
                            is NewsUiState.Loading -> {
                                Box(
                                    modifier = Modifier.fillMaxSize(),
                                    contentAlignment = Alignment.Center
                                ) {
                                    CircularProgressIndicator()
                                }
                            }
                            is NewsUiState.Error -> {
                                Box(
                                    modifier = Modifier.fillMaxSize().padding(16.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "Error: ${state.message}",
                                        color = MaterialTheme.colorScheme.error
                                    )
                                }
                            }
                            is NewsUiState.Success -> {
                                when (selectedTab) {
                                    NavigationTab.FEED -> HomeScreen(
                                        uiState = state,
                                        onIntent = { intent -> viewModel.processIntent(intent) },
                                        onSelectArticle = { article -> selectedArticle = article }
                                    )
                                    NavigationTab.COMPARE -> CompareCoverageView(
                                        articles = state.articles,
                                        onSelectArticle = { article -> selectedArticle = article }
                                    )
                                    NavigationTab.EXPLORE -> TrendingCarouselView(
                                        trendingArticles = state.articles,
                                        onSelectArticle = { article -> selectedArticle = article }
                                    )
                                    NavigationTab.SAVED -> SavedView(
                                        savedArticles = state.articles.filter { state.savedArticleIds.contains(it.id) },
                                        onSelectArticle = { article -> selectedArticle = article },
                                        onRemoveBookmark = { article -> viewModel.processIntent(NewsUserIntent.ToggleBookmark(article.id)) },
                                        onClearAll = { viewModel.processIntent(NewsUserIntent.ClearBookmarks) }
                                    )
                                    NavigationTab.PROFILE -> ProfileView(
                                        userPreferences = state.userPreferences,
                                        currentLanguage = currentLanguage,
                                        onLanguageChange = { currentLanguage = it },
                                        isDarkTheme = isDarkTheme,
                                        onToggleTheme = { viewModel.processIntent(NewsUserIntent.ToggleTheme) },
                                        onUpdatePreferences = { /* Preference updates */ }
                                    )
                                }
                            }
                        }
                    }

                    selectedArticle?.let { article ->
                        val isBookmarked = when (val state = uiState) {
                            is NewsUiState.Success -> state.savedArticleIds.contains(article.id)
                            else -> false
                        }
                        ArticleDetailDialog(
                            article = article,
                            isBookmarked = isBookmarked,
                            onClose = { selectedArticle = null },
                            onToggleBookmark = { art ->
                                viewModel.processIntent(NewsUserIntent.ToggleBookmark(art.id))
                            }
                        )
                    }
                }
            }
        }
    }
}
