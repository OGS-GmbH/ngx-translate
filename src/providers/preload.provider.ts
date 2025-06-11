import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PreloadingStrategies } from "../enums/preloading-strategies.enum";
import { TRANSLATION_PRELOAD_TOKEN } from "../tokens/preload.token";
import { TranslationHttpSerivce } from "../services/translation-http.serivce";
import { TranslationPreloadProvider } from "../types/provider.type";
import { TranslationService } from "../services/translation.service";
import { TranslationStoreService } from "../services/translation-store.service";

/* eslint-disable @tseslint/max-params */
const handleInitializationStrategy = (
  httpClient: Readonly<HttpClient>,
  translationHttpService: Readonly<TranslationHttpSerivce>,
  translationStoreService: Readonly<TranslationStoreService>,
  translationSerivce: Readonly<TranslationService>,
  scopes: Readonly<Array<string | null> | string | null>
): () => void => (): void => void translationSerivce.preloadByCurrentLocale(httpClient, translationStoreService, translationHttpService, scopes).subscribe();
/* eslint-enable @tseslint/max-params */
/* eslint-disable @tseslint/max-params */
const handleRuntimeStrategy = (
  httpClient: Readonly<HttpClient>,
  translationHttpService: Readonly<TranslationHttpSerivce>,
  translationStoreService: Readonly<TranslationStoreService>,
  translationSerivce: Readonly<TranslationService>,
  scopes: Readonly<Array<string | null> | string | null>
): () => Readonly<TranslationService> => (): Readonly<TranslationService> => {
  translationSerivce.preloadByCurrentLocale(httpClient, translationStoreService, translationHttpService, scopes).subscribe();

  return translationSerivce;
};
/* eslint-enable @tseslint/max-params */

export const provideTranslationPreload = (preloadProvider: Readonly<TranslationPreloadProvider>): FactoryProvider => {
  switch (preloadProvider.preloadingStrategy) {
    case PreloadingStrategies.INITIALIZATION: {
      return {
        provide: APP_INITIALIZER,
        useFactory: (
          httpClient: Readonly<HttpClient>,
          translationHttpService: Readonly<TranslationHttpSerivce>,
          translationStoreService: Readonly<TranslationStoreService>,
          translationSerivce: Readonly<TranslationService>
        ): () => void => handleInitializationStrategy(httpClient, translationHttpService, translationStoreService, translationSerivce, preloadProvider.scopes),
        deps: [ HttpClient, TranslationHttpSerivce, TranslationStoreService, TranslationService ],
        multi: true
      };
    }

    case PreloadingStrategies.RUNTIME: {
      return {
        provide: TRANSLATION_PRELOAD_TOKEN,
        useFactory: (
          httpClient: Readonly<HttpClient>,
          translationHttpService: Readonly<TranslationHttpSerivce>,
          translationStoreService: Readonly<TranslationStoreService>,
          translationSerivce: Readonly<TranslationService>
        ): () => void => handleRuntimeStrategy(httpClient, translationHttpService, translationStoreService, translationSerivce, preloadProvider.scopes),
        deps: [ HttpClient, TranslationHttpSerivce, TranslationStoreService, TranslationService ],
        multi: false
      };
    }
  }
};

/* eslint-disable @tseslint/max-params */
const handleReactiveInitializationStrategy = (
  httpClient: Readonly<HttpClient>,
  translationHttpService: Readonly<TranslationHttpSerivce>,
  translationStoreService: Readonly<TranslationStoreService>,
  translationSerivce: Readonly<TranslationService>,
  scopes: Readonly<Array<string | null> | string | null>
): () => void => (): void => void translationSerivce.preloadByLocale(httpClient, translationStoreService, translationHttpService, scopes).subscribe();
/* eslint-enable @tseslint/max-params */
/* eslint-disable @tseslint/max-params */
const handleReactiveRuntimeStrategy = (
  httpClient: Readonly<HttpClient>,
  translationHttpService: Readonly<TranslationHttpSerivce>,
  translationStoreService: Readonly<TranslationStoreService>,
  translationSerivce: Readonly<TranslationService>,
  scopes: Readonly<Array<string | null> | string | null>
): () => Readonly<TranslationService> => (): Readonly<TranslationService> => {
  translationSerivce.preloadByLocale(httpClient, translationStoreService, translationHttpService, scopes).subscribe();

  return translationSerivce;
};
/* eslint-enable @tseslint/max-params */

export const provideTranslationPreloadReactive = (preloadProvider: Readonly<TranslationPreloadProvider>): FactoryProvider => {
  switch (preloadProvider.preloadingStrategy) {
    case PreloadingStrategies.INITIALIZATION: {
      return {
        provide: APP_INITIALIZER,
        useFactory: (
          httpClient: Readonly<HttpClient>,
          translationHttpService: Readonly<TranslationHttpSerivce>,
          translationStoreService: Readonly<TranslationStoreService>,
          translationSerivce: Readonly<TranslationService>
        ) => handleReactiveInitializationStrategy(httpClient, translationHttpService, translationStoreService, translationSerivce, preloadProvider.scopes),
        deps: [ HttpClient, TranslationHttpSerivce, TranslationStoreService, TranslationService ],
        multi: true
      };
    }

    case PreloadingStrategies.RUNTIME: {
      return {
        provide: TRANSLATION_PRELOAD_TOKEN,
        useFactory: (
          httpClient: Readonly<HttpClient>,
          translationHttpService: Readonly<TranslationHttpSerivce>,
          translationStoreService: Readonly<TranslationStoreService>,
          translationSerivce: Readonly<TranslationService>
        ) => handleReactiveRuntimeStrategy(httpClient, translationHttpService, translationStoreService, translationSerivce, preloadProvider.scopes),
        deps: [ HttpClient, TranslationHttpSerivce, TranslationStoreService, TranslationService ],
        multi: false
      };
    }
  }
};

