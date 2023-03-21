English | [简体中文](https://github.com/jwyGithub/vite-plugin-auto-alias/blob/master/README.zh.md)

# vite-plugin-auto-alias

automatically generate alias based on path

<p align="center">
  <img src="https://img.shields.io/npm/v/vite-plugin-auto-alias" alt='version'>
  <img src="https://img.shields.io/npm/dm/vite-plugin-auto-alias" alt='download'>
  <img src="https://img.shields.io/github/issues/jwyGithub/vite-plugin-auto-alias" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/vite-plugin-auto-alias" alt='license'>
</p>
<br />

## Install

#### pnpm

```sh
pnpm add vite-plugin-auto-alias -D
```

#### yarn

```sh
yarn add vite-plugin-auto-alias -D
```

#### npm

```sh
npm install vite-plugin-auto-alias -D
```

## Use

> vite.config.ts / vite.config.js

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

## Option

```typescript
export interface AutoAlias {
    // the root directory where the alias needs to be generated is src by default
    root: string;
    // prefix for generating aliases, default@
    prefix: string;
    // synchronize the mode of json configuration
    mode: 'extends' | 'sync' | 'all';
}
```

> mode

-   extends: inheritance mode, only typescript projects are supported
-   sync: synchronization mode, supporting typescript and javascript projects. When enabled, the generated paths will be automatically synchronized to tsconfig.json/jsconfig.json
-   all: enable both inheritance mode and synchronization mode. The default is all

### extends / all mode

> vite.config.ts

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            autoAlias({
                // ...
                mode: 'extends'
            })
        ]
    };
});
```

> tsconfig.json

```json
{
    "extends": "./node_modules/vite-plugin-auto-alias/alias.json",
    "compilerOptions": {
        "baseUrl": "./"
        // ...
    }
}
```

### sync mode

> vite.config.ts / vite.config.js

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            autoAlias({
                // ...
                mode: 'sync'
            })
        ]
    };
});
```

**please ensure that the jsconfig.json file or tsconfig.json exists in the project**

## Example

    |-- src
        |-- plugins
        |-- router
        |-- scss
        |-- store
        |-- utils
        |-- views
        |-- ....

```typescript
import xxx from '@plugins/xxx';
import xxx from '@router/xxx';
import xxx from '@scss/xxx';
import xxx from '@store/xxx';
import xxx from '@utils/xxx';
import xxx from '@views/xxx';
....
```

