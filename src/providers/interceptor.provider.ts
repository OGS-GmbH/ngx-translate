import { ClassProvider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslationInterceptor } from "../interceptors/translation.interceptor";

export const provideTranslationInterceptor = (): ClassProvider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: TranslationInterceptor,
  multi: true
});

