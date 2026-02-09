import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateConfig } from "./types/config.type";
import { TranslationService } from "./services/translation.service";
import { TranslationStoreService } from "./services/translation-store.service";
import { provideTranslationConfig } from "./providers/config.provider";
import { provideTranslationHttpConfig, provideTranslationHttpOptions } from "./providers/http.provider";
import { provideTranslationInterceptor } from "./providers/interceptor.provider";
import { TranslationHttpService } from "./public-api";

/**
 * Translation Module, that bundles all translation related functionality
 * @category NG modules
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TranslationHttpService,
    TranslationStoreService,
    TranslationService,
    provideTranslationInterceptor()
  ]
})
/* eslint-disable-next-line @tseslint/no-extraneous-class */
export class TranslationModule {
  /**
   * Configure the Translation Module with the specified configuration
   * @param translateConfig - The {@link TranslateConfig}
   * @returns A `ModuleWithProviders` for the {@link TranslationModule} with the provided configuration
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  public static forRoot (translateConfig: Readonly<TranslateConfig>): ModuleWithProviders<TranslationModule> {
    const providers: Provider[] = [
      provideTranslationConfig(translateConfig.translate),
      provideTranslationHttpConfig(translateConfig.http.config)
    ];

    if (translateConfig.http.options !== undefined) {
      providers.push(
        provideTranslationHttpOptions(translateConfig.http.options)
      );
    }

    return {
      ngModule: TranslationModule,
      providers
    };
  }
}
