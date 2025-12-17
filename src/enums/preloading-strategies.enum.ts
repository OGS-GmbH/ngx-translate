/**
 * Strategies for preloading translations
 * @remarks Each option describes when the preload should happen.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum PreloadingStrategies {
  /** Preload translations during application initialization */
  INITIALIZATION = "initialization",
  /** Preload translations during application runtime */
  RUNTIME = "runtime"
}
