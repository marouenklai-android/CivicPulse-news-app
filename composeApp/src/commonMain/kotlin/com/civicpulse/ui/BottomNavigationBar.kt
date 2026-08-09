package com.civicpulse.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class NavigationTab(val titleKey: String, val fallbackTitle: String, val icon: String) {
    FEED("navFeed", "Feed", "📡"),
    COMPARE("navCompare", "Compare", "⚖️"),
    EXPLORE("navExplore", "Explore", "🧭"),
    SAVED("navSaved", "Saved", "🔖"),
    PROFILE("navProfile", "Profile", "👤")
}

@Composable
fun BottomNavigationBar(
    currentTab: NavigationTab,
    onTabSelected: (NavigationTab) -> Unit,
    savedCount: Int = 0,
    modifier: Modifier = Modifier
) {
    NavigationBar(
        modifier = modifier,
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 6.dp
    ) {
        NavigationTab.values().forEach { tab ->
            val selected = currentTab == tab
            val titleText = stringResource(tab.titleKey)

            NavigationBarItem(
                selected = selected,
                onClick = { onTabSelected(tab) },
                icon = {
                    BadgedBox(
                        badge = {
                            if (tab == NavigationTab.SAVED && savedCount > 0) {
                                Badge(
                                    containerColor = MaterialTheme.colorScheme.primary,
                                    contentColor = MaterialTheme.colorScheme.onPrimary
                                ) {
                                    Text(savedCount.toString(), fontWeight = FontWeight.Bold, fontSize = 10.sp)
                                }
                            }
                        }
                    ) {
                        Text(tab.icon, fontSize = 18.sp)
                    }
                },
                label = {
                    Text(
                        text = if (titleText.startsWith("Key:")) tab.fallbackTitle else titleText,
                        fontSize = 11.sp,
                        fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium,
                        maxLines = 1
                    )
                }
            )
        }
    }
}

