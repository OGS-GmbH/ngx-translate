import { TRANSLATION_SCOPE_TOKEN } from "../tokens/scope.token";
import { ValueProvider } from "@angular/core";

export const provideTranslationScope = (scope: string): ValueProvider => ({
  provide: TRANSLATION_SCOPE_TOKEN,
  useValue: scope,
  multi: false
});

