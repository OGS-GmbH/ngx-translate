# Translate by Service

## Usage

Sometimes, it is necessary to translate not without [`TranslationPipe`](/reference/classes/TranslationPipe) but programatically by [`TranslationService`](/reference/classes/TranslationService).

We provide two ways to achieve it. Either reactively by using [`translateTokenByLocale`](/reference/classes/TranslationService#translatetokenbylocale) or by [`translateTokenByCurrentLocale`](/reference/classes/TranslationService#translatetokenbycurrentlocale).

## Example

Take the following code excerpt about [`translateTokenByLocale`](/reference/classes/TranslationService#translatetokenbylocale) as an example.

```typescript [example.ts]
import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationService } from "@ogs-gmbh/ngx-translate";
import { Subscription } from "rxjs";

@Component({
  selector: "app-component",
  template: ``
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _translationService: TranslationService = inject(TranslationService);

  private readonly _translationSubscription: Subscription | null = null;

  public ngOnInit(): void {
    this._translationSubscription = this._translationService.translateTokenByLocale$(
      "my-token",
      "my-fallback-value",
      "my-scope"
    ).subscribe((translatedValue: string): void => {
      // use `translatedValue` here
    });
  }

  public onDestroy(): void {
    this._translationSubscription?.unsubscribe();
  }
}
```
