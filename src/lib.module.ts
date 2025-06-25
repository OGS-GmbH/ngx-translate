import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateConfig } from "./types/config.type";
import { TranslationHttpSerivce } from "./services/translation-http.serivce";
import { TranslationPipeModule } from "./pipe.module";
import { TranslationService } from "./services/translation.service";
import { TranslationStoreService } from "./services/translation-store.service";
import { provideTranslationConfig } from "./providers/config.provider";
import { provideTranslationHttpConfig, provideTranslationHttpOptions } from "./providers/http.provider";
import { provideTranslationInterceptor } from "./providers/interceptor.provider";

@NgModule({
  imports: [
    CommonModule,
    TranslationPipeModule
  ],
  providers: [
    TranslationHttpSerivce,
    TranslationStoreService,
    TranslationService,
    provideTranslationInterceptor()
  ],
  exports: [
    TranslationPipeModule
  ]
})
/* eslint-disable-next-line @tseslint/no-extraneous-class */
export class TranslationModule {
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
