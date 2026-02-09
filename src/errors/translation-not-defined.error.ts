import { LocaleConfig } from "../public-api";

/**
 * Snapshot of the translation that is not defined
 * @category Types
 *
 * @since 2.0.0
 * @author Simon Kovtyk
 */
export type TranslationNotDefinedStateSnapshot = {
  /**
   * Token for which the translation is not defined in the translations
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  token: string;
  /**
   * Value of the translation that is not defined in the translations
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  value?: string;
  /**
   * Scope of the translation that is not defined in the translations
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  scope?: ReadonlyArray<string | null> | string | null;
  /**
   * {@link LocaleConfig} of the translation that is not defined in the translations
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  locale?: LocaleConfig;
}

/**
 * Error thrown when a translation for a given token is not defined
 * @category Errors
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export class TranslationNotDefinedError extends Error {
  public override name: string;

  constructor (
    snapshot: TranslationNotDefinedStateSnapshot
  ) {
    super(`Translation does not exists.
      Please check if the translation for the given token is provided in the translations.
      \n
      State: ${ JSON.stringify(snapshot) }`);
    this.name = "TranslationNotDefinedError";
  }
}
