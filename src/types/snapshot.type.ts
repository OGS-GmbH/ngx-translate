/**
 * Represents a localizable Translation with all required properties
 * @category Types
 *
 * @since 1.4.0
 * @author Ian Wenneckers
 */
export type TranslationSnapshot = {
  /**
   * Value, that gets piped
   *
   * @remarks Will be used as possible fallback value.
   *
   * @since 1.4.0
   * @author Ian Wenneckers
   */
  value: string;
  /**
   * Token, that was used to translate the value
   *
   * @since 1.4.0
   * @author Ian Wenneckers
   */
  token: string;
  /**
   * Scope, that was searched for `token`
   *
   * @since 1.4.0
   * @author Ian Wenneckers
   */
  scope?: Readonly<string | Array<string | null> | null> | undefined;
  /**
   * Flag, that enables fallbacks to `value`
   *
   * @since 1.4.0
   * @author Ian Wenneckers
   */
  shouldFallback?: boolean | undefined;
};
