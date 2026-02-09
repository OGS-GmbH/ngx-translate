/**
 * Strategies for preloading translations
 * @remarks Each option describes when the preload should happen.
 * @category NG config
 * @deprecated Use {@link PreloadingStrategy} instead. It'll be removed in upcoming releases.
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

/**
 * Strategies for preloading translations
 * @remarks Each option describes when the preload should happen.
 * @category NG config
 *
 * @since 2.0.0
 * @author Simon Kovtyk
 */
export enum PreloadingStrategy {
  /**
   * Preload translations during application initialization
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  INITIALIZATION = "initialization",
  /**
   * Preload translations during application runtime
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  RUNTIME = "runtime"
}
