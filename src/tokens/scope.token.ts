import { InjectionToken } from "@angular/core";

/**
 * Injection token that holds a translation scope
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const TRANSLATION_SCOPE_TOKEN: InjectionToken<string> = new InjectionToken<string>("translation-scope-token");
