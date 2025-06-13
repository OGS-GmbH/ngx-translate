import { MultiScopedFile, ParsedMultiScopedFiles, ScopedFile } from "../types/store.type";
import { ScopeNotDefinedError } from "../errors/scope-not-defined.error";
import { TranslationNotDefinedError } from "../errors/translation-not-defined.error";

/**
 * Parse a multi scoped file by the defined scopes
 * @param {MultiScopedFile} multiScopedFile - The multi scoped file, that should be parsed
 * @returns {ParsedMultiScopedFiles} - A partial scoped file for processing it further
 */
export const parseMultiScopedFile = (multiScopedFile: MultiScopedFile): ParsedMultiScopedFiles => {
  const splittedMultiScopedFile: ParsedMultiScopedFiles = [];
  const globalScopedFile: Record<string, string> = {};

  Object.keys(multiScopedFile).forEach((key: string): void => {
    const currentItem: ScopedFile | undefined = multiScopedFile[ key ];

    if (!(currentItem !== undefined && !Array.isArray(currentItem)))
      return;

    if (typeof currentItem === "object") {
      return void splittedMultiScopedFile.push({
        scopeName: key,
        file: currentItem
      });
    }

    globalScopedFile[ key ] = currentItem;
  });
  splittedMultiScopedFile.push({
    scopeName: null,
    file: globalScopedFile
  });

  return splittedMultiScopedFile;
};
export const splitMultiScopedFile = (multiScopedFile: MultiScopedFile): ScopedFile[] => {
  const scopedFile: ScopedFile[] = [];
  const globalScopedFile: Record<string, string> = {};

  Object.keys(multiScopedFile).forEach((key: string): void => {
    const currentItem: Readonly<Record<string, string>> | undefined = multiScopedFile[ key ];

    if (!(currentItem !== undefined && !Array.isArray(currentItem)))
      return;

    if (typeof currentItem === "object")
      return void scopedFile.push(currentItem);

    globalScopedFile[ key ] = currentItem;
  });
  scopedFile.push(globalScopedFile);

  return scopedFile;
};
/**
 * Find a scope inside a multi scoped file\
 * Throws an error if the scope could not be resolved out of the multi scoped file
 * @param {MultiScopedFile} multiScopedFile - The multi scoped file, that should include the scope
 * @param {string | null} scopeName - The scope name, that'll be searched
 * @returns {ScopedFile} - The found scoped file
 */
export const findScopeInMultiScopedFile = (multiScopedFile: MultiScopedFile, scopeName: string | null): ScopedFile => {
  // Filter all not-nested elements to represent the global scope.
  if (scopeName === null) {
    const newScopedFile: Record<string, string> = {};

    Object.keys(multiScopedFile).forEach((key: string): void => {
      const currentItem: Readonly<Record<string, string>> | undefined = multiScopedFile[ key ];

      if (!(currentItem !== undefined && typeof currentItem !== "object" && !Array.isArray(currentItem)))
        return;

      newScopedFile[ key ] = currentItem;
    });

    return newScopedFile;
  }

  // Get the specific scoped file
  const scopedFile: ScopedFile | undefined = multiScopedFile[ scopeName ];

  if (scopedFile === undefined) throw new ScopeNotDefinedError(false, scopeName);

  return scopedFile;
};
/**
 * Parse a multi scoped file
 * @param {MultiScopedFile} multiScopedFile - The multi scoped file, that'll be parsed
 * @param {string[] | string} scopeName - The scope name, that'll be resolved
 * @returns {ScopedFile[]} - All scoped files, that match the scope name
 */
export const parseMultiScopedFileByScope = (multiScopedFile: MultiScopedFile, scopeName: string[] | string): ScopedFile[] => {
  if (Array.isArray(scopeName))
    return scopeName.map((_scopeName: string): ScopedFile => findScopeInMultiScopedFile(multiScopedFile, _scopeName));


  return [ findScopeInMultiScopedFile(multiScopedFile, scopeName) ];
};
export const findTokenInScopedFiles = (scopedFiles: readonly ScopedFile[], token: string): ScopedFile => {
  const foundScopedFile: ScopedFile | undefined = scopedFiles.find((scopedFile: ScopedFile): boolean => Object.keys(scopedFile).includes(token));

  if (foundScopedFile === undefined) throw new TranslationNotDefinedError(token);

  return foundScopedFile;
};

