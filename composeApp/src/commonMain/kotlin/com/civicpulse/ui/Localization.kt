package com.civicpulse.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf

enum class AppLanguage(val code: String, val displayName: String, val flag: String, val isRtl: Boolean) {
    EN("en", "English", "🇺🇸", false),
    FR("fr", "Français", "🇫🇷", false),
    ES("es", "Español", "🇪🇸", false),
    DE("de", "Deutsch", "🇩🇪", false),
    JA("ja", "日本語", "🇯🇵", false),
    AR("ar", "العربية", "🇸🇦", true);

    companion object {
        fun fromCode(code: String): AppLanguage =
            values().find { it.code.equals(code, ignoreCase = true) } ?: EN
    }
}

object KotlinStringResources {
    private val translations = mapOf(
        AppLanguage.EN to mapOf(
            "tagline" to "The Informed Observer",
            "global_regions" to "Global Regions",
            "latest_briefs" to "Latest Intelligence Briefs",
            "lead_analysis" to "LEAD INTELLIGENCE ANALYSIS",
            "min_read" to "min read",
            "generate_briefing" to "Generate AI Briefing",
            "generating" to "Synthesizing Intelligence...",
            "daily_briefing" to "AI Daily Executive Briefing",
            "theme_light" to "Light Mode",
            "theme_dark" to "Dark Mode",
            "saved_articles" to "Saved Articles",
            "select_language" to "Select Language"
        ),
        AppLanguage.FR to mapOf(
            "tagline" to "L'Observateur Informé",
            "global_regions" to "Régions Globales",
            "latest_briefs" to "Derniers Bulletin de Renseignement",
            "lead_analysis" to "ANALYSE DE RENSEIGNEMENT PRINCIPALE",
            "min_read" to "min de lecture",
            "generate_briefing" to "Générer un Briefing IA",
            "generating" to "Synthèse du Renseignement...",
            "daily_briefing" to "Briefing Exécutif Quotidien IA",
            "theme_light" to "Mode Clair",
            "theme_dark" to "Mode Sombre",
            "saved_articles" to "Articles Sauvegardés",
            "select_language" to "Choisir la langue"
        ),
        AppLanguage.ES to mapOf(
            "tagline" to "El Observador Informado",
            "global_regions" to "Regiones Globales",
            "latest_briefs" to "Últimos Informes de Inteligencia",
            "lead_analysis" to "ANÁLISIS DE INTELIGENCIA PRINCIPAL",
            "min_read" to "min de lectura",
            "generate_briefing" to "Generar Informe IA",
            "generating" to "Sintetizando Inteligencia...",
            "daily_briefing" to "Informe Ejecutivo Diario IA",
            "theme_light" to "Modo Claro",
            "theme_dark" to "Modo Oscuro",
            "saved_articles" to "Artículos Guardados",
            "select_language" to "Seleccionar idioma"
        ),
        AppLanguage.DE to mapOf(
            "tagline" to "Der Informierte Beobachter",
            "global_regions" to "Globale Regionen",
            "latest_briefs" to "Neueste Briefings",
            "lead_analysis" to "HAUPTANALYSE DER INTELLIGENZ",
            "min_read" to "Min. Lesezeit",
            "generate_briefing" to "KI-Briefing Erstellen",
            "generating" to "Synthetisiere Erkenntnisse...",
            "daily_briefing" to "Tägliches KI-Briefing",
            "theme_light" to "Heller Modus",
            "theme_dark" to "Dunkler Modus",
            "saved_articles" to "Gespeicherte Artikel",
            "select_language" to "Sprache auswählen"
        ),
        AppLanguage.JA to mapOf(
            "tagline" to "情報に通じたオブザーバー",
            "global_regions" to "グローバル地域",
            "latest_briefs" to "最新インテリジェンス概要",
            "lead_analysis" to "主要インテリジェンス分析",
            "min_read" to "分で読める",
            "generate_briefing" to "AIブリーフィングを生成",
            "generating" to "インテリジェンス合成中...",
            "daily_briefing" to "AI毎日のエグゼクティブブリーフィング",
            "theme_light" to "ライトモード",
            "theme_dark" to "ダークモード",
            "saved_articles" to "保存された記事",
            "select_language" to "言語を選択"
        ),
        AppLanguage.AR to mapOf(
            "tagline" to "المراقب المطلع",
            "global_regions" to "المناطق العالمية",
            "latest_briefs" to "أحدث الإيجازات الإخبارية",
            "lead_analysis" to "تحليل الاستخبارات الرئيسي",
            "min_read" to "دقائق قراءة",
            "generate_briefing" to "توليد إيجاز الذكاء الاصطناعي",
            "generating" to "جاري تجميع المعلومات...",
            "daily_briefing" to "الإيجاز التنفيذي اليومي بالذكاء الاصطناعي",
            "theme_light" to "الوضع الفاتح",
            "theme_dark" to "الوضع الداكن",
            "saved_articles" to "المقالات المحفوظة",
            "select_language" to "اختر اللغة"
        )
    )

    fun getString(key: String, language: AppLanguage): String {
        return translations[language]?.get(key)
            ?: translations[AppLanguage.EN]?.get(key)
            ?: key
    }
}

val LocalAppLanguage = staticCompositionLocalOf { AppLanguage.EN }

@Composable
fun ProvideAppLanguage(
    language: AppLanguage,
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(LocalAppLanguage provides language) {
        content()
    }
}

@Composable
fun stringResource(key: String): String {
    val currentLanguage = LocalAppLanguage.current
    return KotlinStringResources.getString(key, currentLanguage)
}
