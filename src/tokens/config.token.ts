import { InjectionToken } from "@angular/core";
import { SpecificTranslateConfig } from "../types/config.type";

export const TRANSLATION_CONFIG_TOKEN: InjectionToken<SpecificTranslateConfig> = new InjectionToken<SpecificTranslateConfig>("translation-config-token");
