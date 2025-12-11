import { CollectingStrategies } from "../enums/collecting-strategies.enum";
import { HttpConfig, HttpHeadersOption, HttpOptions } from "@ogs-gmbh/ngx-http";

/**
 * Description of a locale, your app should support
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type LocaleConfig = {
  /**
   * The locale value, e.g. "en", "de" or "fr"
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly value: string;
  /**
   * The locale name, e.g. "English", "Deutsch" or "Français"
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly name?: string;
  /**
   * Marks the locale as source locale. A source locale is the locacle, used in your source code.
   * @remarks Only one locale should be marked as source locale
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly isSource?: boolean;
};
export type SpecificTranslateConfig = {
  /**
   * The locales, your app should support
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly locales: LocaleConfig[];
  /**
   * The timeout for HTTP requests in millisecond
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly timeout?: number | undefined;
  /**
   * Overrides the global scope, which should be used as default scope when no scope is provided. Default is `null`.
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly defaultScope?: string | undefined;
  /**
   * Fallback to source locale translations, when a translation is missing in the current locale. Default is `false`.
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly fallbackToSourceLocale?: boolean | undefined;
  /**
   * Configuration for storing locale and translations in the browser storage
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly storageConfig?: {
    /**
     * The strategy to use for collecting translations to store in the browser storage
     * @readonly
     *
     * @since 1.0.0
     * @author Simon Kovtyk
     */
    readonly collectingStrategy?: CollectingStrategies | undefined;
    /**
     * Configuration for storing the current locale in the browser storage
     * @readonly
     *
     * @since 1.0.0
     * @author Simon Kovtyk
     */
    readonly locale?: {
      /**
       * The key to use for storing the current locale
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly key?: string | undefined;
      /**
       * The storage type to use for storing the current locale (e.g. `localeStorage` or `sessionStorage`)
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly type?: Storage | undefined;
      /**
       * Wether to store the current locale in the browser storage or not. Default is `false`.
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly store?: boolean | undefined;
    } | undefined;
    /**
     * Configuration for storing the translations in the browser storage
     * @readonly
     *
     * @since 1.0.0
     * @author Simon Kovtyk
     */
    readonly translations?: {
      /**
       * The key to use for storing the translations
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly key?: string | undefined;
      /**
       * The storage type to use for storing the translations (e.g. `localeStorage` or `sessionStorage`)
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly type?: Storage | undefined;
      /**
       * Wether to store the translations in the browser storage or not. Default is `false`.
       * @readonly
       *
       * @since 1.0.0
       * @author Simon Kovtyk
       */
      readonly store?: boolean | undefined;
    } | undefined;
  } | undefined;
};
/**
 * Configuration
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type TranslateConfig = {
  /**
   * Configuration for HTTP requests
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly http: {
    /**
     * The HTTP configuration
     * @readonly
     *
     * @since 1.0.0
     * @author Simon Kovtyk
     */
    config: HttpConfig;
    /**
     * Additional HTTP options (e.g. headers), which will be merged with other HTTP options
     * @readonly
     *
     * @since 1.0.0
     * @author Simon Kovtyk
     */
    options?: HttpOptions<never, HttpHeadersOption, never>;
  };
  /**
   * Translation-related configuration
   * @readonly
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly translate: SpecificTranslateConfig;
};

