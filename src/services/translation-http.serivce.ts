import { HttpHeadersOption, HttpOptions, mergeHttpHeaders } from "@ogs-gmbh/ngx-http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, retry, timeout } from "rxjs";
import { SpecificTranslateConfig } from "../types/config.type";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";
import { TRANSLATION_HTTP_CONFIG, TRANSLATION_HTTP_OPTIONS } from "../tokens/http.token";

@Injectable({
  providedIn: "root"
})
export class TranslationHttpSerivce {
  private readonly _translationHttpConfig: string = inject(TRANSLATION_HTTP_CONFIG);

  private readonly _translationConfig: SpecificTranslateConfig | null = inject(TRANSLATION_CONFIG_TOKEN, { optional: true });

  private readonly _translationHttpOptions: HttpOptions<never, HttpHeadersOption, never> | null = inject(TRANSLATION_HTTP_OPTIONS, { optional: true });

  /**
   * Gets translations with the provided HttpClient reference.
   *
   * @param httpClientRef - The HttpClient reference to use for the request.
   * @param scopeName - The scope name(s) for the translations.
   * @param httpOptions - Optional HTTP options to customize the request.
   * @returns An Observable of the requested translations.
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public getWithRef$<T>(
    httpClientRef: Readonly<HttpClient>,
    scopeName: ReadonlyArray<string | null> | string | null,
    httpOptions?: HttpOptions<never, HttpHeadersOption, never>
  ): Observable<T> {
    let path: string = this._translationHttpConfig;

    if (typeof scopeName === "string" || scopeName === null) {
      if (scopeName !== null)
        path += `?scope=${ encodeURIComponent(scopeName) }`;
    } else {
      const urlSearchParams: URLSearchParams = new URLSearchParams();

      scopeName.forEach((scopeNameItem: string | null): void => {
        if (scopeNameItem === null) return;

        urlSearchParams.append("scope", encodeURIComponent(scopeNameItem));
      });
      path += `?${ urlSearchParams.toString() }`;
    }

    let headers: HttpHeaders = new HttpHeaders();

    if (this._translationHttpOptions?.headers !== undefined)
      headers = mergeHttpHeaders(headers, this._translationHttpOptions.headers);

    if (httpOptions?.headers !== undefined)
      headers = mergeHttpHeaders(headers, httpOptions.headers);

    return httpClientRef.get<T>(path, {
      responseType: "json",
      observe: "body",
      headers
    }).pipe(
      timeout(this._translationConfig?.timeout ?? 3000),
      retry(0)
    );
  }
}
