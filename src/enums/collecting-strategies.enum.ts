/**
 * Strategies for collecting translations in the application, so that they don't have to be fetched multiple times.
 * @remarks Each option describes which locales should be collected.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum CollectingStrategies {
  /**
   * Collect every translation, regardless of the current locale
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  ALL = "all",
  /**
   * Collect only translations of the current locale
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  CURRENT = "current"
}
