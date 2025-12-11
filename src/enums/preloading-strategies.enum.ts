/**
 * Strategies for preloading translations
 * @remarks Each option describes when the preload should happen.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum PreloadingStrategies {
  /**
   * Preload translations during application initialization
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  INITIALIZATION = "initialization",
  /**
   * Preload translations during application runtime
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  RUNTIME = "runtime"
}
