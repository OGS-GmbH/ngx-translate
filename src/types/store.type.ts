import { Subject } from "rxjs";

/**
 * Scoped file, that represents a translation set for a specific scope
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type ScopedFile = Readonly<Record<string, string>>;
/**
 * Multi Scoped file, that represents multiple translation sets for a specific scopes
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type MultiScopedFile = Readonly<Record<string, ScopedFile>>;
/**
 * Parsed multi scoped file
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type ParsedMultiScopedFile = {
  /**
   * Scope name
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly scopeName: string | null;
  /**
   * Scoped file content
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly file: ScopedFile;
};
/**
 * Parsed multi scoped files
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type ParsedMultiScopedFiles = ParsedMultiScopedFile[];
/**
 * Loaded scope
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type LoadedScope = {
  readonly scope: string | null;
  file: ScopedFile;
};
/**
 * Loaded scope array
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type LoadedScopes = LoadedScope[];
export type LocaleLoadedScopes = Record<string, LoadedScopes>;
/**
 * Notifier scopes (storage)
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type NotifierScope = {
  /**
   * Scope name
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  readonly scope: string | null;
  /**
   * Subject notifiers for the scope
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  notifiers: Array<Subject<ScopedFile>> | null;
};
/**
 * Notifier scopes array
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type NotifierScopes = NotifierScope[];
/**
 * Multi scope based notifier scope
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type MultiScopeBasedNotifierScope = ReadonlyArray<Subject<ScopedFile>> | null;
/**
 * Mutli scope based notifier scopes
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export type MultiScopeBasedNotifierScopes = Record<string, MultiScopeBasedNotifierScope> & {
  /**
   * Notifiers, that provide a set of scoped files
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  notifiers?: ReadonlyArray<Subject<ScopedFile>> | null | undefined;
};

