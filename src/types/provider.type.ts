import { AdditionalsInRequest } from "@ogs/ngx-http";
import { PreloadingStrategies } from "../enums/preloading-strategies.enum";

type TranslationBaseProvider = {
  readonly preloadingStrategy: PreloadingStrategies;
  readonly additionalsInRequest?: AdditionalsInRequest | undefined;
};

export type TranslationPreloadProvider = TranslationBaseProvider & {
  readonly scopes: Array<string | null> | string | null;
};

