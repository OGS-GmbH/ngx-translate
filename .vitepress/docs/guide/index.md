# Getting started

## Installation

### Prerequisites

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm add -D @ogs-gmbh/ngx-translate
```

```sh [pnpm]
$ pnpm add -D @ogs-gmbh/ngx-translate
```

```sh [yarn]
$ yarn add -D @ogs-gmbh/ngx-translate
```

```sh [bun]
$ bun add -D @ogs-gmbh/ngx-translate
```

:::

### Configuration

The package should be configured trough an [`InjectionToken`](https://v18.angular.dev/api/core/InjectionToken). To do it, you can use the [`NgModule`](https://v18.angular.dev/api/core/NgModule), that exposes various required functionalities in your app.

#### 1. Configure

First, you need to define your config. You should place it into a global configuration. A [build environment](https://angular.dev/tools/cli/environments) suits the best in this case.

You'll find support for the http config in [ngx-http docs](https://ogs-gmbh.github.io/ngx-http/guide/define-a-connection).

Every possible property in the translation config is documented aswell in [references](/reference/types/SpecificTranslateConfig).

```typescript [example.ts]
import { TranslationConfig } from "@ogs-gmbh/ngx-translate";

const TRANSLATION_CONFIG: TranslationConfig = {
  http: {
    // http config
  },
  translate: {
    // translation config
  }
}
```

#### 2. Provide

Providing the configuration can be done either by importing it inside a [`Component`](https://v18.angular.dev/essentials/components#using-components) or by inside a [`NgModule`](https://v18.angular.dev/api/core/NgModule).

##### Component

`Components` with and without standalone characteristic are supported.

::: warning Usage of imports

Make sure to **only** import [`TranslationModule`](/reference/classes/TranslationModule) in your `Component`.

:::

```typescript
@Component({
  imports: [
    TranslationModule
  ],
  standalone: true
})
export class AppComponent {}
```

##### NgModule

Otherwise, you can just import the Module for your `NgModule`.

::: warning Usage of imports

Make sure to use the appropiate [`TranslationModule.forRoot`](/reference/classes/TranslationModule#forroot) **only** inside your [Root-`NgModule`](https://v17.angular.io/guide/feature-modules#feature-modules-vs-root-modules). While `TranslationModule` can be imported directly in your `NgModule`.

:::

```typescript [exmaple.ts]
@NgModule({
  imports: [
    TranslationModule.forRoot(TRANSLATION_CONFIG)
  ]
})
export class AppModule {}
```

## Implementation

To make use of the translation lib, simply use our [`TranslationPipe`](/reference/classes/TranslationPipe). The pipe is automatically provided by providing the `TranslationModule`.

Later in your Angular template, you can simply take the following code as an example:

```html [example.html]
<div>
  <p>
    {{
      "This is my value in english"
      | translate : "my-greeting-token"
    }}
  </p>
</div>
```
