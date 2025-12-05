# Provide scopes

## Usage

In some cases, your application contains translation scopes, that would annoy the user by loading it just in time and would produce flickering at the initial render instead.

For this purpose, you can preload [scopes](/guide/define-a-scope) trough our lib by using the [`provideTranslationPreload`](/reference/functions/provideTranslationPreload) or, if you prefer a reactive way, [`provideTranslationPreloadReactive`](/reference/functions/provideTranslationPreloadReactive).

## Example

Here an example with `provideTranslationPreload`. The signature of `provideTranslationPreloadReactive` is equivalent.

```typescript [example.component.ts]
import { Component } from "@angular/core";
import { provideTranslationPreload } from "@ogs-gmbh/ngx-http";

@Component({
  selector: "app-component",
  template: ``,
  providers: [
    provideTranslationPreload([
      "my-first-scope",
      "my-second-scope"
    ])
  ]
})
export class AppComponent {}
```

