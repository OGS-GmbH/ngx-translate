import { HttpConfig, HttpHeadersOption, HttpOptions, buildHttpConnectionString } from "@ogs-gmbh/ngx-http";
import { TRANSLATION_HTTP_CONFIG, TRANSLATION_HTTP_OPTIONS } from "../tokens/http.token";
import { ValueProvider } from "@angular/core";

/**
 * Provide a translation HTTP configuration
 *
 * @param httpConfig - The `HttpConfig` to provide
 * @returns A `ValueProvider` for the translation HTTP configuration
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationHttpConfig = (httpConfig: Readonly<HttpConfig>): ValueProvider => ({
  provide: TRANSLATION_HTTP_CONFIG,
  useValue: buildHttpConnectionString(httpConfig),
  multi: false
});
/**
 * Provide additional translation `HttpOptions`
 * @remarks These `HttpOptions` include headers that will be merged with other `HttpOptions`.
 *
 * @param httpOptions - The `HttpOptions` to provide
 * @returns A `ValueProvider` for the translation `HttpOptions`
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationHttpOptions = (httpOptions: HttpOptions<never, HttpHeadersOption, never>): ValueProvider => ({
  provide: TRANSLATION_HTTP_OPTIONS,
  useValue: httpOptions,
  multi: false
});
