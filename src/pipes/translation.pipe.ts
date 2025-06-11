import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, inject } from "@angular/core";
import { SpecificTranslateConfig, TRANSLATION_CONFIG_TOKEN } from "../public-api";
import { Subscription, filter } from "rxjs";
import { TRANSLATION_SCOPE_TOKEN } from "../tokens/scope.token";
import { TranslationService } from "../services/translation.service";
import { resolveScope } from "../utils/translate.util";

@Pipe({
  name: "translate",
  pure: false
})
export class TranslationPipe implements PipeTransform, OnDestroy {
  private _translationServiceSubscription: Subscription | null = null;

  private _lastValue: string | null = null;

  private _hasTranslationChanged: boolean = false;

  private readonly _translationService: TranslationService = inject(TranslationService);

  private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly _translationScopeToken: string | null = inject(TRANSLATION_SCOPE_TOKEN, { optional: true });

  private readonly _translationConfig: SpecificTranslateConfig | null = inject(TRANSLATION_CONFIG_TOKEN, { optional: true });

  public transform (value: string, token: string, scope?: Readonly<Array<string | null> | string | null>): string | null {
    if (this._translationServiceSubscription !== null)
      return this._lastValue;

    this._translationServiceSubscription = this._translationService.translateTokenByLocale$(token, value, this._resolveScope(scope))
      .pipe(filter((translation: string): boolean => translation !== this._lastValue))
      .subscribe({
        next: (translation: string): void => {
          this._hasTranslationChanged = translation !== this._lastValue;
          this._updateLastValue(translation);
        }
      });

    return this._lastValue;
  }

  public ngOnDestroy (): void {
    this._translationServiceSubscription?.unsubscribe();
  }

  private _resolveScope<T extends ReadonlyArray<string | null> | string | null>(scope?: T): T {
    return resolveScope(this._translationConfig, scope ?? this._translationScopeToken as T);
  }

  private _updateLastValue (newValue: string): void {
    this._lastValue = newValue;
    this._hasTranslationChanged && this._changeDetectorRef.markForCheck();
  }
}
