# Fix Gradle Daemon Termination and Compilation Errors

The project is experiencing a Gradle daemon termination error (exit code 0) and several Kotlin compilation errors. The daemon issue is likely related to memory constraints or compiler instability caused by invalid code patterns.

## Proposed Changes

### Build Configuration

#### [MODIFY] [gradle.properties](file:///C:/Users/marouan%20klai/AndroidStudioProjects/CivicPulse-news-app/gradle.properties)
- Increase Gradle and Kotlin daemon memory limits.
- Add `kotlin.compiler.execution.strategy=in-process` as a fallback if the daemon continues to fail.

### Compose UI Fixes

#### [MODIFY] [App.kt](file:///C:/Users/marouan%20klai/AndroidStudioProjects/CivicPulse-news-app/composeApp/src/commonMain/kotlin/com/civicpulse/App.kt)
- Fix the parameter name in `CivicPulseTheme` from `darkTheme` to `useDarkTheme`.

#### [MODIFY] [ArticleCard.kt](file:///C:/Users/marouan%20klai/AndroidStudioProjects/CivicPulse-news-app/composeApp/src/commonMain/kotlin/com/civicpulse/ui/ArticleCard.kt)
- Fix a potential overload resolution issue in `Text` by ensuring correct parameter types.

### ViewModel Fixes

#### [MODIFY] [NewsViewModel.kt](file:///C:/Users/marouan%20klai/AndroidStudioProjects/CivicPulse-news-app/composeApp/src/commonMain/kotlin/com/civicpulse/viewmodel/NewsViewModel.kt)
- Fix the `combine` function call for 7 flows. The current implementation uses a lambda with too many parameters for the standard `combine` extension, leading to type inference failure.

## Verification Plan

### Automated Tests
- Run `./gradlew :composeApp:compileDebugKotlinAndroid` to verify successful compilation.
- Run `./gradlew clean` to ensure a fresh build state.
