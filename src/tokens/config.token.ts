import { InjectionToken } from "@angular/core";
import { SpecificTranslateConfig } from "../types/config.type";

/**
 * Injection token for translation configuration
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const TRANSLATION_CONFIG_TOKEN: InjectionToken<SpecificTranslateConfig> = new InjectionToken<SpecificTranslateConfig>("translation-config-token");
