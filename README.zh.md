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

## use

#### 在 typescript 项目中使用

> vite.config.ts

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

`自定义路径，别名以及json路径`

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

#### 在 javascript 项目中使用

### 如果使用的是 javascript 项目，则必须指定 jsconfig.json 的路径，即 jsonPath 选项

> vite.config.js

```typescript
import autoAlias from 'vite-plugin-auto-alias';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [autoAlias()]
    };
});
```

`自定义路径，别名以及json路径`

```typescript
import autoAlias from 'vite-plugin-auto-alias';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [
            autoAlias({
                root: resolve(__dirname, './src'),
                prefix: '@',
                // 必须
                jsonPath: resolve(__dirname, './jsconfig.json')
            })
        ]
    };
});
```

## 类型

```typescript
export type AutoAlias = {
    root: string;
    prefix: string;
    jsonPath: string;
};
```

**提示：为了获得更好的路径提示，请确保在项目中配置 jsconfig.json 文件或 tsconfig.json**

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

