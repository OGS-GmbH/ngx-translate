import { InjectionToken } from "@angular/core";

/**
 * Injection token for translation preloading
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const TRANSLATION_PRELOAD_TOKEN: InjectionToken<string> = new InjectionToken<string>("translation-preload-token");
