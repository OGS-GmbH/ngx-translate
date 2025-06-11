import { MultiScopeBasedNotifierScopes, NotifierScope, NotifierScopes } from "../types/store.type";

export const getNotifierScopeByScope = (notifierScopes: NotifierScopes, scopeName: string | null): NotifierScope | undefined => notifierScopes.find((notifierScope: Readonly<NotifierScope>): boolean => notifierScope.scope === scopeName);
export const buildMultiScopeBasedNotifierScopes = (notifierScopes: NotifierScopes): MultiScopeBasedNotifierScopes => {
  const multiScopeBasedNotifierScopes: MultiScopeBasedNotifierScopes = {};

  notifierScopes.forEach((notifierScope: NotifierScope): void => {
    notifierScope.scope === null
      ? multiScopeBasedNotifierScopes.notifiers = notifierScope.notifiers
      : multiScopeBasedNotifierScopes[ notifierScope.scope ] = notifierScope.notifiers;
  });

  return multiScopeBasedNotifierScopes;
};

