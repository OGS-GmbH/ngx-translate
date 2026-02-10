import { ClassProvider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslationInterceptor } from "../interceptors/translation.interceptor";

/**
 * Provide the translation HTTP interceptor
 *
 * @returns A `ClassProvider` for the `TranslationInterceptor`
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationInterceptor = (): ClassProvider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: TranslationInterceptor,
  multi: true
});
