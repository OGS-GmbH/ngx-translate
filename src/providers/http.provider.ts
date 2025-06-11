import { HttpConfig, buildHttpConnectionString } from "@ogs/ngx-http";
import { TRANSLATION_HTTP_CONFIG } from "../tokens/http.token";
import { ValueProvider } from "@angular/core";

export const provideTranslationHttpConfig = (httpConfig: Readonly<HttpConfig>): ValueProvider => ({
  provide: TRANSLATION_HTTP_CONFIG,
  useValue: buildHttpConnectionString(httpConfig),
  multi: false
});

