import { SpecificTranslateConfig } from "../types/config.type";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";
import { ValueProvider } from "@angular/core";

export const provideTranslationConfig = (translationConfig: Readonly<SpecificTranslateConfig>): ValueProvider => ({
  provide: TRANSLATION_CONFIG_TOKEN,
  useValue: translationConfig,
  multi: false
});

