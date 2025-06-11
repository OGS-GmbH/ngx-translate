# i18n Translation Library

![GitHub License](https://img.shields.io/github/license/OGS-GmbH/ngx-translate)
![NPM Version](https://img.shields.io/npm/v/%40ogs-gmbh%2Fngx-translate)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/OGS-GmbH/ngx-translate/main-deploy.yml)

This Angular i18n library offers a REST-based approach to internationalization, with support for chunked and token-based translation loading.

Translations are retrieved dynamically from remote endpoints, allowing for modular and scalable language management, especially in large applications or multi-tenant environments.

Each translation chunk is associated with a specific feature or module, and access can be controlled via authentication tokens. The library enables runtime language switching and supports nested keys (multi-chunks).

Its clean API and minimal setup make it easy to integrate into both new and existing projects.

## Installation
To get started, you can install this package using your preferred package manager.
````shell
npm install -D @ogs-gmbh/ngx-translate
````

<details>
<summary>Other package manager</summary>
<br />

````shell
yarn add -D @ogs-gmbh/ngx-translate
````

````shell
pnpm install -D @ogs-gmbh/ngx-translate
````

</details>

## License
The MIT License (MIT) - Please have a look at the [LICENSE file](https://github.com/OGS-GmbH/ngx-translate/blob/main/LICENSE) for more details.

## Contributing
Contributions are always welcome and greatly appreciated. Whether you want to report a bug, suggest a new feature, or improve the documentation, your input helps make the project better for everyone.

If you're unsure where to start, check the open issues for guidance. Even small contributions, such as fixing typos or improving code readability, are valuable.

Feel free to submit a pull request or start a discussion — we're happy to collaborate!

---

<a href="https://www.ogs.de/en/"><img src="https://www.ogs.de/fileadmin/templates/main/img/logo.png" height="32" /></a>
<p>Gesellschaft für Datenverarbeitung und Systemberatung mbH</p>

[Imprint](https://www.ogs.de/en/imprint/) | [Contact](https://www.ogs.de/en/contact/) | [Careers](https://www.ogs.de/en/about-ogs/#Careers)
