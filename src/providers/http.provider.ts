import { HttpConfig, HttpHeadersOption, HttpOptions, buildHttpConnectionString } from "@ogs-gmbh/ngx-http";
import { TRANSLATION_HTTP_CONFIG, TRANSLATION_HTTP_OPTIONS } from "../tokens/http.token";
import { ValueProvider } from "@angular/core";

export const provideTranslationHttpConfig = (httpConfig: Readonly<HttpConfig>): ValueProvider => ({
  provide: TRANSLATION_HTTP_CONFIG,
  useValue: buildHttpConnectionString(httpConfig),
  multi: false
});
export const provideTranslationHttpOptions = (httpOptions: HttpOptions<never, HttpHeadersOption, never>): ValueProvider => ({
  provide: TRANSLATION_HTTP_OPTIONS,
  useValue: httpOptions,
  multi: false
});
