export class TranslationNotDefinedError extends Error {
  public override name: string;

  constructor (token: string, value?: string) {
    super(`Translation for token "${ token }" ${ value && `and its default value "${ value }"` } does not exists. Please check if the translation for the given token is provided in the translations.`);
    this.name = "TranslationNotDefinedError";
  }
}
