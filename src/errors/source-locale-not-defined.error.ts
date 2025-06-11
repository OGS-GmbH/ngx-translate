export class SourceLocaleNotDefinedError extends Error {
  public override readonly name: string;

  constructor () {
    super(`A source locale does not exists. Please check if a source locale is provided in the translation config.`);
    this.name = "SourceLocaleNotDefinedError";
  }
}

