import { SpecificTranslateConfig } from "../public-api";
import { MultiScopedFile, ScopedFile } from "../types/store.type";
import { findScopeInMultiScopedFile } from "./file.util";

/**
 * Translate token by a scoped file
 * @param scopedFile - The scoped file, that should include the translation
 * @param token - The token, that'll be translated
 * @returns A `string`, that represents the translated token. If no translation was found `undefined`.
 */
export const translateTokenByScopedFile = (scopedFile: ScopedFile, token: string): string | undefined => {
  const isTokenValid: boolean = Object.keys(scopedFile).includes(token);

  if (!isTokenValid) return;

  return scopedFile[ token ];
};
export const translateTokenByScopedFiles = (scopedFiles: ScopedFile[], token: string): string | undefined => {
  let translation: string | undefined;

  scopedFiles.some((scopedFile: ScopedFile): boolean => {
    const isTokenValid: boolean = Object.keys(scopedFile).includes(token);

    if (!isTokenValid) return false;

    translation = scopedFile[ token ];

    return true;
  });

  return translation;
};
/**
 * Translate token by a multi scoped file by first resolving the scope out of the multi scoped file
 * @param multiScopedFile - The MultiScopedFile, that should includes the scope to search and the token
 * @param scopeName - The scope name which should include the translation for the token
 * @param token - The token, that'll be translated
 * @returns A `string`, that represents the translated token. If no translation was found `undefined`.
 */
export const translateTokenByMultiScopedFile = (multiScopedFile: MultiScopedFile, scopeName: string | null, token: string): string | undefined => {
  const scopedFile: ScopedFile = findScopeInMultiScopedFile(multiScopedFile, scopeName);

  return translateTokenByScopedFile(scopedFile, token);
};
export function resolveScope<T extends ReadonlyArray<string | null> | string | null> (translationConfig: SpecificTranslateConfig | null, scopeName?: T): T {
  return (scopeName ?? translationConfig?.defaultScope ?? null) as T;
}

