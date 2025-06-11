import { LocaleConfig } from "../public-api";

export class LocaleNotDefinedError extends Error {
  public override readonly name: string;

  constructor (locale: LocaleConfig) {
    super(`Locale "${ locale.value }" does not exists. Please check if the locale is provided in the translation config.`);
    this.name = "LocaleNotDefinedError";
  }
}

