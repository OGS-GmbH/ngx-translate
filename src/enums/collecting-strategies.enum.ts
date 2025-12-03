/**
 * Strategies for collecting translations in the application, so that they don't have to be fetched multiple times.
 * @remarks Each option describes which locales should be collected.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export enum CollectingStrategies {
  ALL = "all",
  CURRENT = "current"
}
