[English](https://github.com/jwyGithub/vite-plugin-auto-alias) | 简体中文

# vite-plugin-auto-alias

基于路径自动生成别名

<p align="center">
  <img src="https://img.shields.io/npm/v/vite-plugin-auto-alias" alt='version'>
  <img src="https://img.shields.io/npm/dy/vite-plugin-auto-alias" alt='download'>
  <img src="https://img.shields.io/github/issues/jwyGithub/vite-plugin-auto-alias" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/vite-plugin-auto-alias" alt='license'>
</p>
<br />

## 安装

#### 使用 pnpm

```sh
pnpm add vite-plugin-auto-alias -D
```

#### 使用 yarn

```sh
yarn add vite-plugin-auto-alias -D
```

#### 使用 npm

```sh
npm install vite-plugin-auto-alias -D
```

## 使用

> vite.config.ts / vite.config.js

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

## 配置

```typescript
export interface AutoAlias {
    // 需要生成别名的根目录，默认src
    root: string;
    // 生成别名的前缀，默认@
    prefix: string;
    // 同步json配置的模式
    mode: 'extends' | 'sync' | 'all';
}
```

> mode

-   extends: 继承模式，只支持 typescript 项目
-   sync: 同步模式，支持 typescript 和 javascript 项目，开启后，生成的 paths 将自动同步至 tsconfig.json/jsconfig.json
-   all: 同时开启继承模式和同步模式,默认为 all

### extends / all 模式配置

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

### sync 模式配置

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

**请确保在项目中存在 jsconfig.json 文件或 tsconfig.json**

## 示例

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

