import { LocaleConfig } from "../public-api";

/**
 * Snapshot of the {@link SourceLocaleNotDefinedError} properties for serialization purposes
 * @category Types
 *
 * @since 2.0.0
 * @author Simon Kovtyk
 */
export type SourceLocaleNotDefinedStateSnapshot = {
  /**
   * {@link LocaleConfig} of the source locale that is not defined in the translation configuration
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  locale?: LocaleConfig;
}

/**
 * Error thrown when a {@link LocaleConfig} as source locale is not defined
 * @category Errors
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export class SourceLocaleNotDefinedError extends Error {
  public override readonly name: string;

  constructor (
    snapshot?: SourceLocaleNotDefinedStateSnapshot
  ) {
    super(
      `A source locale does not exists. Please check if a source locale is provided in the translation config.\n`
      + `State: ${ JSON.stringify(snapshot) }`
    );
    this.name = "SourceLocaleNotDefinedError";
  }
}

