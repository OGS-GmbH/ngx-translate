import { InjectionToken } from "@angular/core";
import { HttpHeadersOption, HttpOptions } from "@ogs-gmbh/ngx-http";

/**
 * Injection token for HTTP configuration
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const TRANSLATION_HTTP_CONFIG: InjectionToken<string> = new InjectionToken<string>("translation-http-config");
/**
 * Injection token for additional HTTP configuration
 * @readonly
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const TRANSLATION_HTTP_OPTIONS: InjectionToken<HttpOptions<never, HttpHeadersOption, never>> = new InjectionToken<HttpOptions<never, HttpHeadersOption, never>>("translation-http-options");
