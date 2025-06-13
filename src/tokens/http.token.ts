import { InjectionToken } from "@angular/core";
import { HttpHeadersOption, HttpOptions } from "@ogs-gmbh/ngx-http";

export const TRANSLATION_HTTP_CONFIG: InjectionToken<string> = new InjectionToken<string>("translation-http-config");
export const TRANSLATION_HTTP_OPTIONS: InjectionToken<HttpOptions<never, HttpHeadersOption, never>> = new InjectionToken<HttpOptions<never, HttpHeadersOption, never>>("translation-http-options");
