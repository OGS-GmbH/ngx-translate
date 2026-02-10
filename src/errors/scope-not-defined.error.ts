import { LocaleConfig } from "../public-api";

/**
 * Snapshot of the {@link ScopeNotDefinedError} properties for serialization purposes
 * @category Types
 *
 * @since 2.0.0
 * @author Simon Kovtyk
 */
export type ScopeNotDefinedStateSnapshot = {
  /**
   * Indicates whether the default scope is not defined
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  isDefaultScope: boolean;
  /**
   * Name of the scope that is not defined
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  scope?: string;
  /**
   * {@link LocaleConfig} of the scope that is not defined in the translations
   *
   * @since 2.0.0
   * @author Simon Kovtyk
   */
  locale?: LocaleConfig;
}

/**
 * Error thrown when a scope is not defined
 * @category Errors
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export class ScopeNotDefinedError extends Error {
  public override readonly name: string;

  constructor (
    snapshot: ScopeNotDefinedStateSnapshot
  ) {
    super(
      snapshot.isDefaultScope
        ? `The default scope does not exists. Please check if the given scope is provided.`
        : `Scope does not exists. Please check if the given scope is provided.\n`
        + `State: ${ JSON.stringify(snapshot) }`
    );
    this.name = "ScopeNotDefinedError";
  }
}
