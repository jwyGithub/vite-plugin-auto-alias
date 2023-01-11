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

#### vite.config.ts

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

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

#### tsconfig.json or jsconfig.json

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["src/*"],
            "@plugins/*": ["src/plugins/*"],
            "@router/*": ["src/router/*"],
            "@scss/*": ["src/scss/*"]
        }
    }
}
```

