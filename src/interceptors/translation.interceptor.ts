import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LocaleConfig } from "../types/config.type";
import { Observable } from "rxjs";
import { TranslationStoreService } from "../services/translation-store.service";

/**
 * Interceptor to add the current locale language header to HTTP requests.
 * @remarks Adds a `language` header with the value of the current locale to each outgoing HTTP request.
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
@Injectable({
  providedIn: "root"
})
export class TranslationInterceptor implements HttpInterceptor {
  private readonly _translationStoreService: TranslationStoreService = inject(TranslationStoreService);

  public intercept (httpRequest: Readonly<HttpRequest<unknown>>, httpHandler: Readonly<HttpHandler>): Observable<HttpEvent<unknown>> {
    const currentLocale: LocaleConfig = this._translationStoreService.getCurrentLocale();
    const clonedHttpRequest: HttpRequest<unknown> = httpRequest.clone({
      setHeaders: {
        language: currentLocale.value
      }
    });

    return httpHandler.handle(clonedHttpRequest);
  }
}
