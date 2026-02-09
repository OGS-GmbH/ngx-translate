/**
 * Strategies for collecting translations in the application, so that they don't have to be fetched multiple times.
 * @remarks Each option describes which {@link LocaleConfig} should be collected.
 * @deprecated Use {@link CollectingStrategy} instead. It'll be removed in upcoming releases.
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum CollectingStrategies {
  /**
   * Collect every translation, regardless of the current {@link LocaleConfig}
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

/**
 * Strategies for collecting translations in the application, so that they don't have to be fetched multiple times.
 * @remarks Each option describes which {@link LocaleConfig} should be collected.
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum CollectingStrategy {
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
