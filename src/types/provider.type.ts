import { HttpHeadersOption, HttpOptions } from "@ogs-gmbh/ngx-http";
import { PreloadingStrategies } from "../enums/preloading-strategies.enum";

type TranslationBaseProvider = {
  readonly preloadingStrategy: PreloadingStrategies;
  readonly HttpOptions?: HttpOptions<never, HttpHeadersOption, never> | undefined;
};

export type TranslationPreloadProvider = TranslationBaseProvider & {
  readonly scopes: Array<string | null> | string | null;
};

