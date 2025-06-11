import { Subject } from "rxjs";

/*
 * Scoped file types
 */
export type ScopedFile = Readonly<Record<string, string>>;
export type MultiScopedFile = Readonly<Record<string, ScopedFile>>;
export type ParsedMultiScopedFile = {
  readonly scopeName: string | null;
  readonly file: ScopedFile;
};
export type ParsedMultiScopedFiles = ParsedMultiScopedFile[];
/*
 * Loaded scopes (storage)
 */
export type LoadedScope = {
  readonly scope: string | null;
  file: ScopedFile;
};
export type LoadedScopes = LoadedScope[];
export type LocaleLoadedScopes = Record<string, LoadedScopes>;
/*
 * Notifier scopes (storage)
 */
export type NotifierScope = {
  readonly scope: string | null;
  notifiers: Array<Subject<ScopedFile>> | null;
};
export type NotifierScopes = NotifierScope[];
export type MultiScopeBasedNotifierScope = ReadonlyArray<Subject<ScopedFile>> | null;
export type MultiScopeBasedNotifierScopes = Record<string, MultiScopeBasedNotifierScope> & {
  notifiers?: ReadonlyArray<Subject<ScopedFile>> | null | undefined;
};

