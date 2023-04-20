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

## Features

-   Support for hot updates
-   Support for custom alias prefixes
-   Supports synchronous mode configuration

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
    /**
     * @description the root directory where the alias needs to be generated is src by default
     * @default src
     */
    root: string;

    /**
     * @description prefix for generating aliases
     * @default @
     */
    prefix: string;

    /**
     * @description synchronize the mode of json configuration
     * @default all
     */
    mode: 'extends' | 'sync' | 'all' | 'off';
}
```

#### Mode

-   extends : when use `extends`,you can use the extensions option in the tsconfig.json of the current project, with the value of `@jiangweiye/tsconfig/tsconfig.alias.json`. therefore, you must ensure that `@jiangweiye/tsconfig` is installed in the project. for information on `@jiangweiye/tsconfig`, please refer to the [tsconfig](https://github.com/jwyGithub/tsconfig)

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
    "extends": "@jiangweiye/tsconfig/tsconfig.alias.json",
    "compilerOptions": {
        "baseUrl": "./"
        // ...
    }
}
```

-   sync : when use `sync`,the plugin will search for `tsconfig.json` or `jsconfig.json` in the root directory of the current project, so please ensure that this file exists in the project. The plugin will automatically generate paths options when running, and then write them to the file without the need for developers to manually add them

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

> tsconfig.json / jsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": "./"
        // ...
    }
}
```

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

