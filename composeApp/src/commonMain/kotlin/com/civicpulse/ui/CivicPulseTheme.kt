package com.civicpulse.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// CivicPulse Material3 Color Tokens
val CivicBlue = Color(0xFF2563EB)
val CivicBlueLight = Color(0xFF3B82F6)
val CivicBlueDark = Color(0xFF1D4ED8)
val CivicDarkBg = Color(0xFF0F172A)
val CivicCardDark = Color(0xFF1E293B)
val CivicAccent = Color(0xFF38BDF8)

val LightColorScheme = lightColorScheme(
    primary = CivicBlue,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFDBEAFE),
    onPrimaryContainer = Color(0xFF1E3A8A),
    secondary = Color(0xFF0284C7),
    onSecondary = Color.White,
    background = Color(0xFFF8FAFC),
    onBackground = Color(0xFF0F172A),
    surface = Color.White,
    onSurface = Color(0xFF0F172A),
    surfaceVariant = Color(0xFFF1F5F9),
    onSurfaceVariant = Color(0xFF475569),
    outline = Color(0xFFE2E8F0)
)

val DarkColorScheme = darkColorScheme(
    primary = CivicAccent,
    onPrimary = Color(0xFF0F172A),
    primaryContainer = Color(0xFF1E3A8A),
    onPrimaryContainer = Color(0xFFBFDBFE),
    secondary = Color(0xFF38BDF8),
    onSecondary = Color(0xFF0F172A),
    background = CivicDarkBg,
    onBackground = Color(0xFFF1F5F9),
    surface = CivicCardDark,
    onSurface = Color(0xFFF1F5F9),
    surfaceVariant = Color(0xFF334155),
    onSurfaceVariant = Color(0xFF94A3B8),
    outline = Color(0xFF475569)
)

/**
 * CivicPulse Material3 Theme wrapper supporting Light and Dark modes.
 *
 * @param useDarkTheme Boolean flag indicating whether to apply dark theme. Defaults to system settings.
 * @param content Composable lambda content tree.
 */
@Composable
fun CivicPulseTheme(
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (useDarkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colors,
        typography = Typography(),
        shapes = Shapes(),
        content = content
    )
}

