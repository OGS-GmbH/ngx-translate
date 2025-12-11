import { SpecificTranslateConfig } from "../types/config.type";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";
import { ValueProvider } from "@angular/core";

/**
 * Provides a translation configuration
 *
 * @param translationConfig - The translation configuration to provide
 * @returns A ValueProvider for the translation configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationConfig = (translationConfig: Readonly<SpecificTranslateConfig>): ValueProvider => ({
  provide: TRANSLATION_CONFIG_TOKEN,
  useValue: translationConfig,
  multi: false
});

