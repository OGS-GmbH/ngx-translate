import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateConfig } from "./types/config.type";
import { TranslationHttpSerivce } from "./services/translation-http.serivce";
import { TranslationPipeModule } from "./pipe.module";
import { TranslationService } from "./services/translation.service";
import { TranslationStoreService } from "./services/translation-store.service";
import { provideTranslationConfig } from "./providers/config.provider";
import { provideTranslationHttpConfig } from "./providers/http.provider";
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
    return {
      ngModule: TranslationModule,
      providers: [
        provideTranslationConfig(translateConfig.translate),
        provideTranslationHttpConfig(translateConfig.http)
      ]
    };
  }
}
