import { AdditionalHeader, appendHttpHeaders } from "@ogs/ngx-http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, retry, timeout } from "rxjs";
import { SpecificTranslateConfig } from "../types/config.type";
import { TRANSLATION_CONFIG_TOKEN } from "../tokens/config.token";
import { TRANSLATION_HTTP_CONFIG } from "../tokens/http.token";

@Injectable({
  providedIn: "root"
})
export class TranslationHttpSerivce {
  private readonly _translationHttpConfig: string = inject(TRANSLATION_HTTP_CONFIG);

  private readonly _translationConfig: SpecificTranslateConfig | null = inject(TRANSLATION_CONFIG_TOKEN, { optional: true });

  public getWithRef$<T>(httpClientRef: Readonly<HttpClient>, scopeName: ReadonlyArray<string | null> | string | null, additionalHeaders?: AdditionalHeader[]): Observable<T> {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    additionalHeaders !== undefined && (httpHeaders = appendHttpHeaders(httpHeaders, additionalHeaders));

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

    return httpClientRef.get<T>(path, { responseType: "json", observe: "body", headers: httpHeaders }).pipe(
      timeout(this._translationConfig?.timeout ?? 3000),
      retry(0)
    );
  }
}
