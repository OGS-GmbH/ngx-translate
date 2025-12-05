import { BehaviorSubject, Observable, Subject, distinctUntilChanged } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { LoadedScope, LoadedScopes, LocaleLoadedScopes, NotifierScope, NotifierScopes, ScopedFile } from "../types/store.type";
import { LocaleConfig, SpecificTranslateConfig } from "../types/config.type";
import { CollectingStrategies } from "../enums/collecting-strategies.enum";
import { LocaleNotDefinedError } from "../errors/locale-not-defined.error";
import { SourceLocaleNotDefinedError } from "../errors/source-locale-not-defined.error";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";

type StorageAttributes = {
  collectingStrategy: CollectingStrategies;
  locale: {
    type: Storage;
    key: string;
  };
  translations: {
    type: Storage;
    key: string;
  };
};

type StoreTranslations = LoadedScopes | LocaleLoadedScopes;

@Injectable({
  providedIn: "root"
})
export class TranslationStoreService {
  private _loadedScopes: LoadedScopes | LocaleLoadedScopes | null;

  private _notifierScopes: NotifierScopes | null = null;

  private readonly _translationConfig: SpecificTranslateConfig = inject(TRANSLATION_CONFIG_TOKEN);

  private readonly _locale: BehaviorSubject<LocaleConfig>;

  private readonly _locale$: Observable<LocaleConfig>;

  private readonly _storageAttributes: StorageAttributes = {
    collectingStrategy: this._translationConfig.storageConfig?.collectingStrategy ?? CollectingStrategies.CURRENT,
    locale: {
      type: this._translationConfig.storageConfig?.locale?.type ?? window.localStorage,
      key: this._translationConfig.storageConfig?.locale?.key ?? "locale"
    },
    translations: {
      type: this._translationConfig.storageConfig?.translations?.type ?? window.sessionStorage,
      key: this._translationConfig.storageConfig?.translations?.key ?? "translations"
    }
  };

  constructor () {
    const sourceLocale: LocaleConfig | undefined = this.getSourceLocale();

    if (sourceLocale === undefined)
      throw new SourceLocaleNotDefinedError();

    if (this._translationConfig.storageConfig?.locale?.store) {
      const localeStorageValue: LocaleConfig | null = this._getStorageValue("locale") as LocaleConfig | null;
      const localeExists: boolean = localeStorageValue ? this._checkIfLocaleExists(localeStorageValue) : false;
      const isSourceLocale: boolean = localeStorageValue ? this._checkIfLocaleIsSourceLocale(localeStorageValue) : false;

      if (!localeExists || isSourceLocale)
        this._setStorageValue("locale", null);

      this._locale = new BehaviorSubject<LocaleConfig>(localeStorageValue ?? sourceLocale);
    } else
      this._locale = new BehaviorSubject<LocaleConfig>(sourceLocale);

    if (this._translationConfig.storageConfig?.translations?.store) {
      const translationsStorageValue: StoreTranslations | null = this._getStorageValue("translations") as StoreTranslations | null;

      this._loadedScopes = translationsStorageValue ?? null;
    } else
      this._loadedScopes = null;

    this._locale$ = this._locale.asObservable();
  }

  /**
   * Get the current locale
   *
   * @returns The current locale
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getCurrentLocale (): LocaleConfig {
    return this._locale.value;
  }

  /**
   * Get an observable of the current locale
   *
   * @returns An observable of the current locale
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getLocale$ (): Observable<LocaleConfig> {
    return this._locale$.pipe(distinctUntilChanged());
  }

  /**
   * Set the current locale
   *
   * @param locale - The locale to set
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public setLocale (locale: LocaleConfig): void {
    if (!this._checkIfLocaleExists(locale))
      throw new LocaleNotDefinedError(locale);

    if (this._translationConfig.storageConfig?.locale?.store) {
      this._checkIfLocaleIsSourceLocale(locale)
        ? this._setStorageValue("locale", null)
        : this._setStorageValue("locale", locale);
    }

    if (this._translationConfig.storageConfig?.translations?.store && this._translationConfig.storageConfig.collectingStrategy === CollectingStrategies.CURRENT) this._setStorageValue("translations", null);

    this._locale.next(locale);
  }

  /**
   * Get all defined locales
   *
   * @returns An array of all defined locales
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getLocales (): LocaleConfig[] {
    return this._translationConfig.locales;
  }

  /**
   * Set a scoped file
   *
   * @param scopeName - The name of the scope
   * @param file - The scoped file to set
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public setScopedFile (scopeName: string | null, file: ScopedFile): void {
    const existingScope: LoadedScope | undefined = scopeName ? this._getScopeByScopeName(scopeName) : undefined;

    if (existingScope === undefined)
      this._appendScope(scopeName, file);
    else
      existingScope.file = file;


    if (this._translationConfig.storageConfig?.translations?.store) this._setStorageValue("translations", this._loadedScopes);
  }

  /**
   * Get a scoped file
   *
   * @param scopeName - The name of the scope, the ScopedFile belongs to
   * @returns `ScopedFile` if found, otherwise `undefined`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getScopedFile (scopeName: string | null): ScopedFile | undefined {
    const existingScope: LoadedScope | undefined = this._getScopeByScopeName(scopeName);

    return existingScope ? existingScope.file : undefined;
  }

  /**
   * Check if a scoped file exists
   *
   * @param scopeName - The name of the scope, the ScopedFile belongs to
   * @returns `true` if found, otherwise `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public hasScopedFile (scopeName: string | null): boolean {
    const existingScope: LoadedScope | undefined = this._getScopeByScopeName(scopeName);

    return Boolean(existingScope);
  }

  /**
   * Check if scoped files exist
   *
   * @param scopeNames - An array of scope names, the ScopedFiles belong to
   * @returns `true` if all could be found, otherwise `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public hasScopedFiles (scopeNames: ReadonlyArray<string | null>): boolean {
    const existingScopes: LoadedScopes | undefined = this._getScopeByScopeNames(scopeNames);

    return Boolean(existingScopes);
  }

  /**
   * Check if a scope exists
   *
   * @param scopeName - The name of the scope
   * @returns `true` if found, otherwise `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public isScopeExisting (scopeName: string | null): boolean {
    const existingScope: LoadedScope | undefined = this._getScopeByScopeName(scopeName);

    return existingScope !== undefined;
  }

  /**
   * Check which scopes exist
   *
   * @param scopeNames - An array of scope names, that should be checked
   * @returns An array of existing scope names
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getExistingScopes (scopeNames: ReadonlyArray<string | null>): Array<string | null> {
    return scopeNames.filter((scopeName: string | null): boolean => this.isScopeExisting(scopeName));
  }

  /**
   * Check if scope name is in notifier scopes
   *
   * @param scopeName - The name of the scope
   * @returns `true` if found, otherwise `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public isScopeNameInNotifierScopes (scopeName: string | null): boolean {
    return Boolean(this._notifierScopes?.find((notifierScope: Readonly<NotifierScope>): boolean => notifierScope.scope === scopeName));
  }

  /**
   * Check if scope names are in notifier scopes
   *
   * @param scopeNames - An array of scope names, that should be checked
   * @returns `true` if all are found, otherwise `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public areScopeNamesInNotifierScopes (scopeNames: ReadonlyArray<string | null>): boolean {
    return scopeNames.map((scopeName: string | null): boolean => this.isScopeNameInNotifierScopes(scopeName))
      .reduce((previous: boolean, current: boolean): boolean => previous && current);
  }

  /**
   * Check which scope names are in notifier scopes
   *
   * @param scopeNames - An array of scope names, that should be checked
   * @returns An array of existing scope names
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getExistingNotifierScopes (scopeNames: ReadonlyArray<string | null>): Array<string | null> {
    return scopeNames.filter((scopeName: string | null): boolean => this.isScopeNameInNotifierScopes(scopeName));
  }

  /**
   * Get notifier scope by scope name
   *
   * @param scopeName - The name of the scope
   * @returns `NotifierScope` if found, otherwise `undefined`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getNotiferScope (scopeName: string | null): NotifierScope | undefined {
    return this._notifierScopes?.find((notiferScope: NotifierScope): boolean => notiferScope.scope === scopeName);
  }

  /**
   * Get notifier scopes by scope names
   *
   * @param scopeNames - An array of scope names
   * @retuns `NotifierScopes` if found, otherwise `undefined`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getNotifierScopes (scopeNames: ReadonlyArray<string | null>): NotifierScopes | undefined {
    const filteredScopes: NotifierScopes | [] = scopeNames.map((scopeName: string | null): NotifierScope | undefined => this.getNotiferScope(scopeName))
      .filter((notifierScope: Readonly<NotifierScope> | undefined): boolean => notifierScope !== undefined) as NotifierScopes | [];

    return filteredScopes.length === 0 ? filteredScopes : undefined;
  }

  /**
   * Add a notifier scope
   *
   * @param notifierScope - The notifier scope to add
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public addNotifierScope (notifierScope: Readonly<NotifierScope>): void {
    this._notifierScopes === null
      ? this._notifierScopes = [ notifierScope ]
      : this._notifierScopes.push(notifierScope);
  }

  /**
   * Add multiple notifier scopes
   *
   * @param notifierScopes - The notifier scopes to add
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public addNotifierScopes (notifierScopes: NotifierScopes): void {
    this._notifierScopes === null
      ? this._notifierScopes = notifierScopes
      : this._notifierScopes.push(...notifierScopes);
  }

  /**
   * Add a notifier to a notifier scope
   *
   * @param scopeName - The name of the scope
   * @param notifier - The notifier to add
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public addNotifierToNotifierScope (scopeName: string | null, notifier: Subject<ScopedFile>): void {
    this._notifierScopes = this._notifierScopes?.map((notifierScope: NotifierScope): NotifierScope => {
      if (notifierScope.scope !== scopeName) return notifierScope;

      notifierScope.notifiers === null
        ? notifierScope.notifiers = [ notifier ]
        : notifierScope.notifiers.push(notifier);

      return notifierScope;
    }) ?? null;
  }

  /**
   * Remove a notifier scope
   *
   * @param scopeName - The name of the scope
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public removeNotifierScope (scopeName: string | null): void {
    if (this._notifierScopes === null)
      return;

    this._notifierScopes = this._notifierScopes.filter((notifierScope: Readonly<NotifierScope>): boolean => notifierScope.scope !== scopeName);
  }

  /**
   * Get the source locale
   *
   * @returns `LocaleConfig` if defined, otherwise `undefined`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getSourceLocale (): LocaleConfig | undefined {
    return this._translationConfig.locales.find((localeConfig: LocaleConfig) => localeConfig.isSource);
  }

  private _checkIfLocaleExists (locale: LocaleConfig): boolean {
    return this._translationConfig.locales.some((configLocale: LocaleConfig): boolean => configLocale.value === locale.value);
  }

  private _checkIfLocaleIsSourceLocale (locale: LocaleConfig): boolean {
    return this._translationConfig.locales.some((localeConfig: LocaleConfig) => localeConfig.value === locale.value && localeConfig.isSource);
  }

  private _setStorageValue (dataType: "locale" | "translations", storageValue: unknown): void {
    storageValue === null
      ? this._storageAttributes[ dataType ].type.removeItem(this._storageAttributes[ dataType ].key)
      : this._storageAttributes[ dataType ].type.setItem(this._storageAttributes[ dataType ].key, JSON.stringify(storageValue));
  }

  private _getStorageValue (dataType: "locale" | "translations"): unknown {
    const serializedStorageValue: string | null = this._storageAttributes[ dataType ].type.getItem(this._storageAttributes[ dataType ].key);

    return serializedStorageValue ? JSON.parse(serializedStorageValue) : null;
  }

  private _getScopeByScopeName (scopeName: string | null): LoadedScope | undefined {
    if (this._storageAttributes.collectingStrategy === CollectingStrategies.ALL) {
      const localeLoadedScopes: LocaleLoadedScopes | null = this._loadedScopes as LocaleLoadedScopes;

      if (this._loadedScopes === null) return undefined;

      const _loadedScopes: LoadedScopes | undefined = localeLoadedScopes[ this._locale.value.value ];

      return _loadedScopes?.find((loadedScope: LoadedScope): boolean => loadedScope.scope === scopeName);
    }

    const loadedScopes: LoadedScopes | null = this._loadedScopes as LoadedScopes | null;

    return loadedScopes?.find((loadedScope: LoadedScope): boolean => loadedScope.scope === scopeName);
  }

  private _getScopeByScopeNames (scopeNames: ReadonlyArray<string | null>): LoadedScopes | undefined {
    if (this._storageAttributes.collectingStrategy === CollectingStrategies.ALL) {
      const localeLoadedScopes: LocaleLoadedScopes | null = this._loadedScopes as LocaleLoadedScopes;

      if (this._loadedScopes === null) return undefined;

      const _loadedScopes: LoadedScopes | undefined = localeLoadedScopes[ this._locale.value.value ];

      return _loadedScopes?.filter((loadedScope: LoadedScope): boolean => scopeNames.includes(loadedScope.scope));
    }

    const loadedScopes: LoadedScopes = this._loadedScopes as LoadedScopes;

    return loadedScopes.filter((loadedScope: LoadedScope): boolean => scopeNames.includes(loadedScope.scope));
  }

  private _appendScope (scopeName: string | null, file: ScopedFile): void {
    if (this._storageAttributes.collectingStrategy === CollectingStrategies.ALL) {
      const localeLoadedScopes: LocaleLoadedScopes | null = this._loadedScopes as LocaleLoadedScopes | null;

      if (localeLoadedScopes === null) {
        this._loadedScopes = { [ this._locale.value.value ]: [ { scope: scopeName, file } ] };

        return;
      }

      const loadedScope: LoadedScopes | undefined = localeLoadedScopes[ this._locale.value.value ];

      if (loadedScope === undefined) {
        localeLoadedScopes[ this._locale.value.value ] = [ { scope: scopeName, file } ];

        return;
      }

      loadedScope.push({ scope: scopeName, file });

      return;
    }

    this._loadedScopes === null
      ? this._loadedScopes = [ { scope: scopeName, file } ]
      : (this._loadedScopes as LoadedScopes).push({ scope: scopeName, file });
  }
}
