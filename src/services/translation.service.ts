import { HttpRequestStatus, HttpOptions, HttpHeadersOption } from "@ogs-gmbh/ngx-http";
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatestWith, distinctUntilChanged, filter, map, of, switchMap, tap } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { LocaleConfig, SpecificTranslateConfig } from "../types/config.type";
import { MultiScopedFile, NotifierScope, ParsedMultiScopedFile, ParsedMultiScopedFiles, ScopedFile } from "../types/store.type";
import { findScopeInMultiScopedFile, findTokenInScopedFiles, parseMultiScopedFile, splitMultiScopedFile } from "../utils/file.util";
import { resolveScope, translateTokenByScopedFile, translateTokenByScopedFiles } from "../utils/translate.util";
import { HttpClient } from "@angular/common/http";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";
import { TranslationHttpSerivce } from "./translation-http.serivce";
import { TranslationNotDefinedError } from "../errors/translation-not-defined.error";
import { TranslationStoreService } from "./translation-store.service";

@Injectable({
  providedIn: "root"
})
export class TranslationService {
  private readonly _httpClient: HttpClient = inject(HttpClient, { host: true });

  private readonly _translationConfig: SpecificTranslateConfig = inject(TRANSLATION_CONFIG_TOKEN);

  private readonly _translationStoreService: TranslationStoreService = inject(TranslationStoreService);

  private readonly _translationHttpService: TranslationHttpSerivce = inject(TranslationHttpSerivce);

  private readonly _isHttpLoading: BehaviorSubject<HttpRequestStatus | null> = new BehaviorSubject<HttpRequestStatus | null>(null);

  private readonly _isHttpLoading$: Observable<HttpRequestStatus | null> = this._isHttpLoading.asObservable();

  /**
   * An Observable, that will emit only when a HTTP-Request is made
   * @returns An observable with the HttpRequestStatus if HTTP is currently under use. Otherwise an observable with null inside.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public isHttpLoading$ (): Observable<HttpRequestStatus | null> {
    return this._isHttpLoading$.pipe(
      distinctUntilChanged(),
      filter((isHttpLoading: HttpRequestStatus | null): boolean => isHttpLoading !== null)
    );
  }

  /**
   * Preload multiple translations with references to different various
   * @param httpClient - The HttpClient, that'll be used
   * @param translationStoreService - The TranslationStoreService, that'll be used
   * @param translationHttpService - The TranslationHttpService, that'll be used
   * @param _locale - The locale, that should be preloaded
   * @param scopeName - The scope name for the lookup of the translation
   * @param httpOptions - Additional HTTP Options for the request
   * @returns An observable to handle the status
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  /* eslint-disable-next-line @tseslint/class-methods-use-this, @tseslint/max-params */
  public _preloadWithRef$ (
    httpClient: Readonly<HttpClient>,
    translationStoreService: Readonly<TranslationStoreService>,
    translationHttpService: Readonly<TranslationHttpSerivce>,
    _locale: LocaleConfig,
    scopeName: ReadonlyArray<string | null> | string | null,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<void> {
    /*
     * Handle resolve by store
     * Check if all scopes are in store
     */
    if ((typeof scopeName === "string" || scopeName === null) && translationStoreService.hasScopedFile(scopeName))
      return EMPTY;

    if (Array.isArray(scopeName) && translationStoreService.hasScopedFiles(scopeName))
      return EMPTY;

    // Check if scopes are in notifer scopes
    if ((typeof scopeName === "string" || scopeName === null) && translationStoreService.isScopeNameInNotifierScopes(scopeName))
      return EMPTY;

    if (Array.isArray(scopeName) && translationStoreService.areScopeNamesInNotifierScopes(scopeName as ReadonlyArray<string | null>))
      return EMPTY;

    // Check if scopes are not in store
    if (typeof scopeName === "string" || scopeName === null) {
      return translationHttpService.getWithRef$<ScopedFile>(
        httpClient,
        scopeName,
        httpOptions
      ).pipe(
        tap((scopedFile: ScopedFile): void => {
          translationStoreService.setScopedFile(scopeName, scopedFile);
        }),
        map((): void => void 0)
      );
    } else {
      const existingScopes: Array<string | null> = translationStoreService.getExistingScopes(scopeName);

      if (existingScopes.length === scopeName.length)
        return EMPTY;

      const extinctScopes: Array<string | null> = scopeName.filter((_scopeName: string | null): boolean => !existingScopes.includes(_scopeName));

      if (extinctScopes.length === 0)
        return EMPTY;

      return translationHttpService.getWithRef$<MultiScopedFile>(
        httpClient,
        extinctScopes,
        httpOptions
      ).pipe(
        tap((multiScopedFile: MultiScopedFile): void => {
          const parsedMultiScopedFiles: ParsedMultiScopedFiles = parseMultiScopedFile(multiScopedFile);

          parsedMultiScopedFiles.forEach((parsedScopedFile: ParsedMultiScopedFile): void => {
            translationStoreService.setScopedFile(parsedScopedFile.scopeName, parsedScopedFile.file);
          });
        }),
        map((): void => void 0)
      );
    }
  }

  /**
   * Translates a token by the locale reactive\
   * @param token - The token to resolve the translation
   * @param scopeName - A scope name to resolve the lookup
   * @param value - The default value of the translation
   * @param httpOptions - Additional HTTP Options for the request
   * @returns An observable with the current translation as string
   *
   * @remarks
   * If the locale changes, a new translation based on the new locale will be emitted.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public translateTokenByLocale$ (
    token: string,
    value: string,
    scopeName?: ReadonlyArray<string | null> | string | null,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<string> {
    return this._translationStoreService.getLocale$().pipe(switchMap((locale: LocaleConfig): Observable<string> => this._translateWithRef$(
      this._httpClient,
      this._translationStoreService,
      this._translationHttpService,
      locale,
      token,
      value,
      this._resolveScope(scopeName),
      httpOptions
    )));
  }

  /**
   * Translates a token by the current locale\
   * @param token - The token to resolve the translation
   * @param scopeName - A scope name to resolve the lookup
   * @param value - The default value of the translation
   * @param httpOptions - Additional HTTP Options for the request
   * @returns An observable with the current translation as string
   *
   * @remarks
   * If the locale changes, no new translation will be emitted.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public translateTokenByCurrentLocale$ (
    token: string,
    value: string,
    scopeName?: ReadonlyArray<string | null> | string | null,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<string> {
    const currentLocale: LocaleConfig = this._translationStoreService.getCurrentLocale();

    return this._translateWithRef$(
      this._httpClient,
      this._translationStoreService,
      this._translationHttpService,
      currentLocale,
      token,
      value,
      scopeName,
      httpOptions
    );
  }

  /**
   * Preload translations by locale
   * @param httpClient - The HttpClient, that'll be used
   * @param translationStoreService - The TranslationStoreService, that'll be used
   * @param translationHttpService - The TranslationHttpService, that'll be used
   * @param scopeName - The scope name for the lookup of the translation
   * @param httpOptions - Additional HTTP Options for the request
   * @returns An observable to handle the status
   *
   * @remarks
   * If the locale changes, the scope will be preloaded again.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  /* eslint-disable-next-line @tseslint/max-params */
  public preloadByLocale (
    httpClient: Readonly<HttpClient>,
    translationStoreService: Readonly<TranslationStoreService>,
    translationHttpService: Readonly<TranslationHttpSerivce>,
    scopeName: string | null | ReadonlyArray<string | null>,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<void> {
    return translationStoreService.getLocale$().pipe(switchMap((locale: LocaleConfig): Observable<void> => this._preloadWithRef$(
      httpClient,
      translationStoreService,
      translationHttpService,
      locale,
      scopeName,
      httpOptions
    )));
  }

  /**
   * Preload translations by locale
   * @param httpClient - The HttpClient, that'll be used
   * @param translationStoreService - The TranslationStoreService, that'll be used
   * @param translationHttpService - The TranslationHttpService, that'll be used
   * @param scopeName - The scope name for the lookup of the translation
   * @param httpOptions - Additional HTTP Options for the request
   * @returns An observable to handle the status
   *
   * @remarks
   * If the locale changes, no new preloading will be made.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  /* eslint-disable-next-line @tseslint/max-params */
  public preloadByCurrentLocale (
    httpClient: Readonly<HttpClient>,
    translationStoreService: Readonly<TranslationStoreService>,
    translationHttpService: Readonly<TranslationHttpSerivce>,
    scopeName: string | null | ReadonlyArray<string | null>,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<void> {
    const currentLocale: LocaleConfig = translationStoreService.getCurrentLocale();

    return this._preloadWithRef$(
      httpClient,
      translationStoreService,
      translationHttpService,
      currentLocale,
      scopeName,
      httpOptions
    );
  }

  private _resolveScope<T extends ReadonlyArray<string | null> | string | null>(scopeName?: T): T {
    return resolveScope(this._translationConfig, scopeName);
  }

  /* eslint-disable-next-line @tseslint/class-methods-use-this */
  private _translateBySourceLocale (token: string, value?: string): Observable<string> {
    if (!value)
      throw new TranslationNotDefinedError(token);

    return of(value);
  }

  private _translateByStore (scope: ReadonlyArray<string | null> | string | null, token: string): Observable<string> {
    if (typeof scope === "string" || scope === null) {
      /* eslint-disable-next-line @tseslint/no-non-null-assertion */
      const scopedFile: ScopedFile = this._translationStoreService.getScopedFile(scope)!;
      const _translatedToken: string | undefined = translateTokenByScopedFile(scopedFile, token);

      if (_translatedToken === undefined) throw new TranslationNotDefinedError(token);

      return of(_translatedToken);
    }

    let translatedToken: string | undefined;

    scope.map((_scope: string | null): ScopedFile | undefined => this._translationStoreService.getScopedFile(_scope))
      .some((scopedFile: ScopedFile | undefined): boolean => {
        if (scopedFile === undefined) return false;

        const _translatedToken: string | undefined = translateTokenByScopedFile(scopedFile, token);

        if (_translatedToken === undefined) return false;

        translatedToken = _translatedToken;

        return true;
      });

    if (translatedToken === undefined) throw new TranslationNotDefinedError(token);

    return of(translatedToken);
  }

  private _getScopedFileByNotifier (scope: string | null): Observable<ScopedFile> {
    const currentNotifier: Subject<ScopedFile> = new Subject<ScopedFile>();

    this._translationStoreService.addNotifierToNotifierScope(scope, currentNotifier);

    return currentNotifier.asObservable();
  }

  private _getScopedFileByAddingNotifier (scope: string | null): Observable<ScopedFile> {
    const currentNotifier: Subject<ScopedFile> = new Subject<ScopedFile>();

    this._translationStoreService.addNotifierScope({
      scope,
      notifiers: [ currentNotifier ]
    });

    return currentNotifier;
  }

  /* eslint-disable-next-line @tseslint/max-params */
  private _getScopedFileByHttpWithRef$<T extends ReadonlyArray<string | null> | string | null>(
    httpClient: Readonly<HttpClient>,
    translationStoreService: Readonly<TranslationStoreService>,
    translationHttpService: Readonly<TranslationHttpSerivce>,
    scope: T,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<T extends ReadonlyArray<string | null> ? MultiScopedFile : ScopedFile> {
    if (typeof scope === "string" || scope === null)
      translationStoreService.addNotifierScope({ scope, notifiers: null });
    else
      translationStoreService.addNotifierScopes(scope.map((_scope: string | null): NotifierScope => ({ scope: _scope, notifiers: null })));


    this._isHttpLoading.next(HttpRequestStatus.PENDING);

    return translationHttpService.getWithRef$<T extends ReadonlyArray<string | null> ? MultiScopedFile : ScopedFile>(httpClient, scope, httpOptions).pipe(
      catchError((): Observable<never> => {
        this._isHttpLoading.next(HttpRequestStatus.ERROR);
        this._isHttpLoading.next(null);

        if (typeof scope === "string" || scope === null)
          translationStoreService.isScopeNameInNotifierScopes(scope) && translationStoreService.removeNotifierScope(scope);
        else {
          scope.forEach((_scope: string | null): void => {
            if (!translationStoreService.isScopeNameInNotifierScopes(_scope))
              return;

            translationStoreService.removeNotifierScope(_scope);
          });
        }

        return of();
      }),
      tap((genericScopedFile: T extends ReadonlyArray<string | null> ? MultiScopedFile : ScopedFile): void => {
        this._isHttpLoading.next(HttpRequestStatus.SUCCESS);
        this._isHttpLoading.next(null);

        if (typeof scope === "string" || scope === null) {
          translationStoreService.setScopedFile(scope, genericScopedFile as ScopedFile);

          const notifierScope: NotifierScope | undefined = translationStoreService.getNotiferScope(scope);

          if (notifierScope === undefined) return;

          notifierScope.notifiers?.forEach((notifier: Subject<ScopedFile>): void => {
            notifier.next(genericScopedFile as ScopedFile);
          });
          translationStoreService.removeNotifierScope(scope);

          return;
        }

        scope.forEach((_scope: string | null): void => {
          const parsedScopedFile: ScopedFile = findScopeInMultiScopedFile(genericScopedFile as MultiScopedFile, _scope);
          const notifierScope: NotifierScope | undefined = translationStoreService.getNotiferScope(_scope);

          if (notifierScope === undefined) return;

          notifierScope.notifiers?.forEach((notifier: Subject<ScopedFile>): void => {
            notifier.next(parsedScopedFile);
          });
          translationStoreService.removeNotifierScope(_scope);
        });
      })
    );
  }

  /* eslint-disable-next-line @tseslint/max-params */
  private _translateWithRef$ (
    httpClient: Readonly<HttpClient>,
    translationStoreService: Readonly<TranslationStoreService>,
    translationHttpService: Readonly<TranslationHttpSerivce>,
    locale: LocaleConfig,
    token: string,
    value: string,
    scopeName?: ReadonlyArray<string | null> | string | null,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<string> {
    let resolvedScopes: ReadonlyArray<string | null> | string | null | undefined;

    const sourceLocale: LocaleConfig | undefined = this._translationStoreService.getSourceLocale();

    // Handle direct resolving
    if (sourceLocale !== undefined && sourceLocale === this._translationStoreService.getCurrentLocale())
      return this._translateBySourceLocale(token, value);

    // Handle store resolving
    if (typeof scopeName === "string" || scopeName === null) {
      resolvedScopes = this._resolveScope(scopeName);

      if (translationStoreService.hasScopedFile(resolvedScopes))
        return this._translateByStore(resolvedScopes, token);
    } else {
      resolvedScopes = this._resolveScope(scopeName);

      if (translationStoreService.hasScopedFiles(resolvedScopes))
        return this._translateByStore(resolvedScopes, token);
    }

    // Handle notifier resolving
    if (typeof resolvedScopes === "string" || resolvedScopes === null) {
      if (translationStoreService.isScopeNameInNotifierScopes(resolvedScopes)) {
        return this._getScopedFileByNotifier(resolvedScopes)
          .pipe(map((scopedFile: ScopedFile): string => {
            const translatedToken: string | undefined = translateTokenByScopedFile(scopedFile, token);

            if (translatedToken === undefined) throw new TranslationNotDefinedError(token, value);

            return translatedToken;
          }));
      }
    } else {
      const existingScopes: Array<string | null> = translationStoreService.getExistingNotifierScopes(resolvedScopes);
      const extinctScopes: Array<string | null> = resolvedScopes.filter((resolvedScope: string | null): boolean => !existingScopes.includes(resolvedScope));
      const existingNotifiers: Array<Observable<ScopedFile>> = existingScopes.map((existingScope: string | null): Observable<ScopedFile> => this._getScopedFileByNotifier(existingScope));
      const extinctScopesHttp: Observable<ScopedFile> = this._getScopedFileByHttpWithRef$(httpClient, translationStoreService, translationHttpService, extinctScopes, httpOptions)
        .pipe(
          tap((multiScopedFile: ScopedFile | MultiScopedFile): void => {
            const castedMultiScopedFile: MultiScopedFile = multiScopedFile as MultiScopedFile;
            const parsedMultiScopedFile: ParsedMultiScopedFiles = parseMultiScopedFile(castedMultiScopedFile);

            parsedMultiScopedFile.forEach((_parsedMultiScopedFile: ParsedMultiScopedFile): void => {
              translationStoreService.setScopedFile(
                _parsedMultiScopedFile.scopeName,
                _parsedMultiScopedFile.file
              );
            });
          }),
          map((multiScopedFile: ScopedFile | MultiScopedFile): ScopedFile => {
            const castedMultiScopedFile: MultiScopedFile = multiScopedFile as MultiScopedFile;
            const splittedMultiScopedFiles: ScopedFile[] = splitMultiScopedFile(castedMultiScopedFile);

            return findTokenInScopedFiles(splittedMultiScopedFiles, token);
          })
        );

      return extinctScopesHttp.pipe(
        combineLatestWith(...existingNotifiers),
        map((scopedFiles: ScopedFile[]): string => {
          const translatedToken: string | undefined = translateTokenByScopedFiles(scopedFiles, token);

          if (translatedToken === undefined) throw new TranslationNotDefinedError(token, value);

          return translatedToken;
        })
      );
    }

    // Handle HTTP resolving
    return of(locale).pipe(switchMap((): Observable<string> => (
      /* eslint-disable-next-line @tseslint/no-unnecessary-condition */
      typeof resolvedScopes === "string" || resolvedScopes === null
        ? this._getScopedFileByHttpWithRef$(
          httpClient,
          translationStoreService,
          translationHttpService,
          resolvedScopes,
          httpOptions
        ).pipe(map((scopedFile: ScopedFile): string => {
          translationStoreService.setScopedFile(
            resolvedScopes,
            scopedFile
          );

          const translatedToken: string | undefined = translateTokenByScopedFile(scopedFile, token);

          if (translatedToken === undefined)
            throw new TranslationNotDefinedError(token, value);

          return translatedToken;
        }))
        // Handle array
        : this._getScopedFileByHttpWithRef$(
          httpClient,
          translationStoreService,
          translationHttpService,
          resolvedScopes,
          httpOptions
        ).pipe(
          tap((multiScopedFile: MultiScopedFile): void => {
            const parsedMultiScopedFile: ParsedMultiScopedFiles = parseMultiScopedFile(multiScopedFile);

            parsedMultiScopedFile.forEach((_parsedMultiScopedFile: ParsedMultiScopedFile): void => {
              translationStoreService.setScopedFile(
                _parsedMultiScopedFile.scopeName,
                _parsedMultiScopedFile.file
              );
            });
          }),
          map((multiScopedFile: MultiScopedFile): string => {
            const splittedMultiScopedFiles: ScopedFile[] = splitMultiScopedFile(multiScopedFile);
            const foundScopedFile: ScopedFile = findTokenInScopedFiles(splittedMultiScopedFiles, token);
            const translatedToken: string | undefined = translateTokenByScopedFile(foundScopedFile, token);

            if (translatedToken === undefined)
              throw new TranslationNotDefinedError(token, value);

            return translatedToken;
          })
        )
    )));
  }
}

