package com.civicpulse.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class NavigationTab(val title: String, val icon: String) {
    EXPLORE("Explore", "🧭"),
    SAVED("Saved", "🔖"),
    COMPARE("Compare", "⚖️"),
    PROFILE("Profile", "👤"),
    COMPOSE_STUDIO("Compose Studio", "⚡")
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
            NavigationBarItem(
                selected = selected,
                onClick = { onTabSelected(tab) },
                icon = {
                    BadgedBox(
                        badge = {
                            if (tab == NavigationTab.SAVED && savedCount > 0) {
                                Badge { Text(savedCount.toString()) }
                            }
                        }
                    ) {
                        Text(tab.icon, fontSize = 20.sp)
                    }
                },
                label = {
                    Text(
                        text = tab.title,
                        fontSize = 11.sp,
                        fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal
                    )
                }
            )
        }
    }
}
