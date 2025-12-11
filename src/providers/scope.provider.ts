import { TRANSLATION_SCOPE_TOKEN } from "../tokens/scope.token";
import { ValueProvider } from "@angular/core";

/**
 * Provide a translation scope
 *
 * @param scope - The translation scope to provide
 * @returns A ValueProvider for the translation scope
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationScope = (scope: string): ValueProvider => ({
  provide: TRANSLATION_SCOPE_TOKEN,
  useValue: scope,
  multi: false
});

