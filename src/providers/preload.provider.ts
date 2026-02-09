import { EnvironmentProviders, FactoryProvider, inject, provideAppInitializer } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TRANSLATION_PRELOAD_TOKEN } from "../tokens/preload.token";
import { TranslationHttpSerivce } from "../services/translation-http.serivce";
import { TranslationPreloadProvider } from "../types/provider.type";
import { TranslationService } from "../services/translation.service";
import { TranslationStoreService } from "../services/translation-store.service";
import { PreloadingStrategy } from "../enums/preloading-strategy.enum";

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

/**
 * Provide translation preloading based on the specified {@link PreloadingStrategy}
 *
 * @param preloadProvider - The {@link TranslationPreloadProvider} configuration
 * @returns A `FactoryProvider` for translation preloading
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationPreload = (preloadProvider: Readonly<TranslationPreloadProvider>): FactoryProvider | EnvironmentProviders => {
  switch (preloadProvider.preloadingStrategy) {
    case PreloadingStrategy.INITIALIZATION: {
      return provideAppInitializer(() => {
        const httpClient: Readonly<HttpClient> = inject(HttpClient);
        const translationHttpService: Readonly<TranslationHttpSerivce> = inject(TranslationHttpSerivce);
        const translationStoreService: Readonly<TranslationStoreService> = inject(TranslationStoreService);
        const translationService: Readonly<TranslationService> = inject(TranslationService);

        handleInitializationStrategy(httpClient, translationHttpService, translationStoreService, translationService, preloadProvider.scopes);
      });
    }

    case PreloadingStrategy.RUNTIME: {
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

/**
 * Provide reactive translation preloading based on the specified {@link PreloadingStrategy}
 *
 * @param preloadProvider - The {@link TranslationPreloadProvider} configuration
 * @returns A `FactoryProvider` for reactive translation preloading
 * @category NG config
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
export const provideTranslationPreloadReactive = (preloadProvider: Readonly<TranslationPreloadProvider>): FactoryProvider | EnvironmentProviders => {
  switch (preloadProvider.preloadingStrategy) {
    case PreloadingStrategy.INITIALIZATION: {
      return provideAppInitializer(() => {
        const httpClient: Readonly<HttpClient> = inject(HttpClient);
        const translationHttpService: Readonly<TranslationHttpSerivce> = inject(TranslationHttpSerivce);
        const translationStoreService: Readonly<TranslationStoreService> = inject(TranslationStoreService);
        const translationService: Readonly<TranslationService> = inject(TranslationService);

        handleReactiveInitializationStrategy(httpClient, translationHttpService, translationStoreService, translationService, preloadProvider.scopes);
      });
    }

    case PreloadingStrategy.RUNTIME: {
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

