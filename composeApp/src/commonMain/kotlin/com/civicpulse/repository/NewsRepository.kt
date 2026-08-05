package com.civicpulse.repository

import com.civicpulse.model.*
import com.civicpulse.viewmodel.DailyBriefingState
import kotlinx.coroutines.delay

class NewsRepository {

    suspend fun getInitialArticles(): List<Article> {
        delay(100) // Simulate fast async flow
        return listOf(
            Article(
                id = "art-1",
                title = "G7 Reaches Historic Consensus on Global Tariff Framework & Clean Energy Subsidies",
                subtitle = "Finance ministers from seven major industrial economies approve unified cross-border carbon tariff mechanism in Brussels.",
                content = "Finance ministers and central bank governors representing the Group of Seven (G7) nations concluded three days of intense negotiations in Brussels today with a joint communique pledging a unified framework for carbon border adjustment tariffs...",
                author = "Eleanor Vance",
                source = "Global Policy Monitor",
                publishedAt = "2026-08-02T14:30:00Z",
                timeAgo = "12m ago",
                readTimeMinutes = 5,
                country = CountryCode.EU,
                topic = TopicCode.GLOBAL,
                imageUrl = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
                imageAlt = "EU Headquarters Brussels",
                isTrending = true,
                isFeatured = true,
                aiSummary = AiSummary(
                    overview = "G7 nations approved a landmark cross-border carbon tariff and renewable energy subsidy compliance standard.",
                    bulletPoints = listOf(
                        "Establishes baseline carbon intensity metrics for steel, aluminum, and clean tech.",
                        "Eases transatlantic trade frictions between North America and European bloc.",
                        "Includes $45B transition support fund for developing manufacturing partners."
                    ),
                    keyTakeaway = "Signals a major structural shift toward green industrial policy backed by coordinated global trade enforcement."
                ),
                outletsCoverage = listOf(
                    OutletCoverage(
                        outletName = "Financial Sentinel",
                        logoUrl = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=100&q=80",
                        bias = BiasRating.CENTER_RIGHT,
                        headline = "G7 Carbon Tariff Deal Risks Supply Chain Inflation and Trade Frictions",
                        summary = "Editorial board warns that strict carbon intensity levies could increase component costs for Western automakers and electronics manufacturers in the short term.",
                        keyPoints = listOf("Short-term compliance costs for manufacturers", "Potential retaliatory duties from non-signatory nations")
                    ),
                    OutletCoverage(
                        outletName = "Tribune Policy Dispatch",
                        logoUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=100&q=80",
                        bias = BiasRating.CENTER_LEFT,
                        headline = "Historic G7 Climate Accord Paves Way for Fair Industrial Transition",
                        summary = "Lauds the agreement as a vital step to hold carbon-intensive exporters accountable while rewarding green infrastructure investments.",
                        keyPoints = listOf("Protects domestic green industries from undercut pricing", "Sets binding global standard for clean energy transition")
                    )
                )
            ),
            Article(
                id = "art-2",
                title = "US Federal Reserve Signals Interest Rate Pause Amid Balanced Employment Figures",
                subtitle = "Chairman highlights stabilizing core PCE inflation alongside robust domestic productivity gains.",
                content = "Federal Reserve officials voted unanimously today to maintain the target federal funds rate at 4.25%-4.50%, signaling a cautious approach as macroeconomic indicators present a balanced picture...",
                author = "Marcus Thorne",
                source = "Washington Capital Journal",
                publishedAt = "2026-08-02T12:00:00Z",
                timeAgo = "2h ago",
                readTimeMinutes = 4,
                country = CountryCode.US,
                topic = TopicCode.ECONOMY,
                imageUrl = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
                imageAlt = "Federal Reserve Building",
                isTrending = true,
                isFeatured = false,
                aiSummary = AiSummary(
                    overview = "Fed holds baseline interest rates steady while emphasizing data-dependent policy for upcoming quarters.",
                    bulletPoints = listOf("Core inflation moderates to 2.3% annualized.", "Unemployment remains steady at 3.8%.", "Bond yields stabilized across 2-year and 10-year treasuries."),
                    keyTakeaway = "Monetary policy has achieved a soft landing equilibrium, lowering immediate recession anxiety."
                )
            ),
            Article(
                id = "art-3",
                title = "High Court Rules on AI Copyright Safeguards for Synthetic Data Training",
                subtitle = "Landmark judicial opinion establishes new fair-use thresholds for commercial LLM models.",
                content = "In a unanimous 7-0 decision, the Appellate Division ruled that AI developers must provide transparent provenance logging for training sets while establishing statutory licensing pools...",
                author = "Sophia Ling",
                source = "Lex Tech Review",
                publishedAt = "2026-08-02T09:15:00Z",
                timeAgo = "5h ago",
                readTimeMinutes = 6,
                country = CountryCode.UK,
                topic = TopicCode.TECH,
                imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                imageAlt = "Digital AI Legal Network",
                isTrending = false,
                isFeatured = false,
                aiSummary = AiSummary(
                    overview = "High Court sets precedent requiring provenance transparency and opt-out royalty structures for AI training data.",
                    bulletPoints = listOf("Requires audit trails for proprietary training corpora.", "Establishes collective rights management framework."),
                    keyTakeaway = "Provides long-awaited legal clarity for AI startups and creative copyright holders alike."
                )
            )
        )
    }

    suspend fun synthesizeDailyBriefing(
        topics: List<TopicCode>,
        countries: List<CountryCode>,
        perspective: String
    ): DailyBriefingState.Generated {
        delay(600) // Simulate Gemini synthesis
        return DailyBriefingState.Generated(
            headline = "Executive Policy Memorandum: Transatlantic Energy & Tech Alignment",
            editorialNote = "Top intelligence priority today centres on the G7 Brussels Climate Accord and UK Judicial rulings on synthetic AI training logs. Key focus areas indicate low immediate macro inflation risk alongside tightened regulatory compliance for international tech firms.",
            recommendedFocus = listOf(
                "G7 Carbon Tariff Compliance Protocols",
                "US Federal Reserve Data Dependent Rate Floor",
                "UK High Court AI Provenance Requirements"
            )
        )
    }
}
