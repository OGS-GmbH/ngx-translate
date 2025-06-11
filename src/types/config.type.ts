import { CollectingStrategies } from "../enums/collecting-strategies.enum";
import { HttpConfig } from "@ogs/ngx-http";

export type LocaleConfig = {
  readonly value: string;
  readonly name?: string;
  readonly isSource?: boolean;
};
export type SpecificTranslateConfig = {
  readonly locales: LocaleConfig[];
  readonly timeout?: number | undefined;
  readonly defaultScope?: string | undefined;
  readonly storageConfig?: {
    readonly collectingStrategy?: CollectingStrategies | undefined;
    readonly locale?: {
      readonly key?: string | undefined;
      readonly type?: Storage | undefined;
      readonly store?: boolean | undefined;
    } | undefined;
    readonly translations?: {
      readonly key?: string | undefined;
      readonly type?: Storage | undefined;
      readonly store?: boolean | undefined;
    } | undefined;
  } | undefined;
};
export type TranslateConfig = {
  readonly http: HttpConfig;
  readonly translate: SpecificTranslateConfig;
};

