export class ScopeNotDefinedError extends Error {
  public override readonly name: string;

  constructor (isDefaultScope: boolean, scopeName?: string) {
    super(
      isDefaultScope
        ? `The default scope does not exists. Please check if the given scope is provided.`
        : `Scope "${ scopeName }" does not exists. Please check if the given scope is provided.`
    );
    this.name = "ScopeNotDefinedError";
  }
}
