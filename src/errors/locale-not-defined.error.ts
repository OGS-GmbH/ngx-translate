import { LocaleConfig } from "../public-api";

/**
 * Snapshot of the {@link LocaleNotDefinedError} properties for serialization purposes.
 * @category Types
 *
 * @since 2.0.0
 * @author Simon Kovtyk
 */
export type LocaleNotDefinedStateSnapshot = {
  /**
   * {@link LocaleConfig}, that is not defined
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  locale: LocaleConfig;
}

/**
 * Error thrown when a requested {@link LocaleConfig} is not defined
 * @category Errors
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export class LocaleNotDefinedError extends Error {
  public override readonly name: string;

  constructor (locale: LocaleConfig) {
    super(`Locale "${ locale.value }" does not exists. Please check if the locale is provided in the translation config.`);
    this.name = "LocaleNotDefinedError";
  }
}

