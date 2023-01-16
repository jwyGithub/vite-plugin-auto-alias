# vite-plugin-auto-alias

automatically generate alias based on path

<p align="center">
  <img src="https://img.shields.io/npm/v/vite-plugin-auto-alias" alt='version'>
  <img src="https://img.shields.io/npm/dy/vite-plugin-auto-alias" alt='download'>
  <img src="https://img.shields.io/github/issues/jwyGithub/vite-plugin-auto-alias" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/vite-plugin-auto-alias" alt='license'>
</p>
<br />

## install

#### with pnpm

```sh
pnpm add vite-plugin-auto-alias -D
```

#### with yarn

```sh
yarn add vite-plugin-auto-alias -D
```

#### with npm

```sh
npm install vite-plugin-auto-alias -D
```

## use

#### with typescript project

> vite.config.ts

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

`define root path and config path`

```typescript
import autoAlias from 'vite-plugin-auto-alias';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            autoAlias({
                root: resolve(__dirname, './src'),
                prefix: '@',
                jsonPath: resolve(__dirname, './tsconfig.json')
            })
        ]
    };
});
```

#### with javascript project

### if you are using a javascript project, you must specify the path of jsconfig.json, which is the jsonPath option

> vite.config.js

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

`define root path and config path`

```typescript
import autoAlias from 'vite-plugin-auto-alias';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            autoAlias({
                root: resolve(__dirname, './src'),
                prefix: '@',
                // require
                jsonPath: resolve(__dirname, './jsconfig.json')
            })
        ]
    };
});
```

## Type

```typescript
export type AutoAlias = {
    root: string;
    prefix: string;
    jsonPath: string;
};
```

**tips : In order to get a better path prompt, be sure to configure the jsconfig.json file or tsconfig.json file in the project**

## example

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

