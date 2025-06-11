import { MultiScopedFile, ScopedFile } from "./store.type";

export type ScopeResolve = Array<{
  readonly type: "notifier" | "http";
  readonly file: ScopedFile | MultiScopedFile;
}>;

