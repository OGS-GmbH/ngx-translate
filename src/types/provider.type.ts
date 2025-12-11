import { HttpHeadersOption, HttpOptions } from "@ogs-gmbh/ngx-http";
import { PreloadingStrategies } from "../enums/preloading-strategies.enum";

/**
 * Base provider type for translation preloading
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type TranslationBaseProvider = {
  /**
   * Preloading strategy to use
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly preloadingStrategy: PreloadingStrategies;
  /**
   * Additional HTTP options for translation preloading requests (e.g. headers)
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly httpOptions?: HttpOptions<never, HttpHeadersOption, never> | undefined;
};
/**
 * Provider type for translation preloading with HTTP scopes
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type TranslationPreloadProvider = TranslationBaseProvider & {
  /**
   * Translation scopes to preload
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly scopes: Array<string | null> | string | null;
};

