import { ChangeDetectorRef, DestroyRef, Pipe, PipeTransform, inject } from "@angular/core";
import { SpecificTranslateConfig, TRANSLATION_CONFIG_TOKEN } from "../public-api";
/* eslint-disable-next-line @tseslint/no-shadow */
import { Observable, Subject, catchError, distinctUntilChanged, of, switchMap, throwError } from "rxjs";
import { TRANSLATION_SCOPE_TOKEN } from "../tokens/scope.token";
import { TranslationService } from "../services/translation.service";
import { resolveScope } from "../utils/translate.util";
import { HttpErrorResponse } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { isEqual } from "es-toolkit";
import { TranslationSnapshot } from "../types/snapshot.type";

/**
 * Core pipe to translate content inside an Angular Template
 * @category NG pipes
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
@Pipe({
  name: "translate",
  pure: false
})
export class TranslationPipe implements PipeTransform {
  private readonly _translationSnapshot$: Subject<TranslationSnapshot> = new Subject<TranslationSnapshot>();

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _lastValue: string | null = null;

  private readonly _translationService: TranslationService = inject(TranslationService);

  private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly _translationScopeToken: string | null = inject(TRANSLATION_SCOPE_TOKEN, { optional: true });

  private readonly _translationConfig: SpecificTranslateConfig | null = inject(TRANSLATION_CONFIG_TOKEN, { optional: true });

  constructor () {
    this._translationSnapshot$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        distinctUntilChanged(isEqual),
        switchMap(({token, value, scope, shouldFallback}: Readonly<TranslationSnapshot>) => this._translationService
          .translateTokenByLocale$(token, value, this._resolveScope(scope))
          .pipe(
            catchError((_httpErrorResponse: HttpErrorResponse, _: Observable<string>): Observable<string> => {
              const fallbackToSourceLocale: boolean | undefined = shouldFallback ?? this._translationConfig?.fallbackToSourceLocale;

              return fallbackToSourceLocale ? of(value) : throwError(() => _httpErrorResponse);
            }),
            distinctUntilChanged()
          ))
      ).subscribe((translatedValue: string) => {
        this._updateLastValue(translatedValue);
      });
  }

  /**
   * Transforms a token into its translated value
   *
   * @param value - The possible fallback value, if no translation was found. Check the `fallback` parameter
   * @param token - The token to be translated
   * @param scope - Optional scope(s) to narrow down the translation search
   * @param shouldFallback - Optional flag to determine if it should fallback to the source locale when no translation was found. If not provided, {@link TranslationNotDefinedError} will be thrown instead.
   * @returns The translated token or the fallback value
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public transform (
    value: string,
    token: string,
    scope?: Readonly<Array<string | null> | string | null>,
    shouldFallback?: boolean
  ): string {
    this._translationSnapshot$.next({
      value,
      token,
      scope,
      shouldFallback
    });

    return this._lastValue ?? value;
  }

  private _resolveScope<T extends ReadonlyArray<string | null> | string | null>(scope?: T): T {
    return resolveScope(this._translationConfig, scope ?? this._translationScopeToken as T);
  }

  private _updateLastValue (newValue: string): void {
    if (this._lastValue === newValue) return;

    this._lastValue = newValue;
    this._changeDetectorRef.markForCheck();
  }
}
