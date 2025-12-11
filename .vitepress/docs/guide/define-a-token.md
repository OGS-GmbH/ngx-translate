# Define a token

## Meaning

Tokens exist to identify translations.

Each sentence, word or char, or in general a `String`, can be identified by token. However, tokens can be described multiple times, while only referencing exactly one meaning.

If your application should support 5 languages, then your `API` should answer the same token at the same endpoint with a different description when supplying one of the 5 languages.

It is up to you and your team on how fine-grained a translation token can be. But be aware of complexity.

## Example

You can only provide one token to the `TranslationPipe`.

```typescript [example.component.ts]
import { Component } from "@angular/core";
import { TranslationPipeModule } from "@ogs-gmbh/ngx-translate";

@Component({
  selector: "app-component",
  template: `
    <p>{{ "My sentence" | translate : "my-token" }}</p>
  `,
  imports: [
    TranslationPipeModule
  ]
})
export class AppComponent {}
```

