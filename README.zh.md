[English](https://github.com/jwyGithub/vite-plugin-auto-alias) | 简体中文

# vite-plugin-auto-alias

基于路径自动生成别名

<p align="center">
  <img src="https://img.shields.io/npm/v/vite-plugin-auto-alias" alt='version'>
  <img src="https://img.shields.io/npm/dm/vite-plugin-auto-alias" alt='download'>
  <img src="https://img.shields.io/github/issues/jwyGithub/vite-plugin-auto-alias" alt='issues'>
  <img src="https://img.shields.io/github/license/jwyGithub/vite-plugin-auto-alias" alt='license'>
</p>
<br />

## 特性

-   支持热更新
-   支持别名自定义
-   支持同步模式自定义配置

## 安装

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

## 配置项

```typescript
export interface AutoAlias {
    /**
     * @description 别名生成的路径
     * @default src
     */
    root?: string;

    /**
     * @description 别名前缀
     * @default @
     */
    prefix?: string;

    /**
     * @description json同步模式
     * @default sync
     */
    mode?: 'sync' | 'off';

    /**
     * @description 别名配置文件路径
     * @default tsconfig.json
     */
    aliasPath?: string;
}
```

#### 关于 mode

-   sync : 当使用`sync`时，插件会在当前项目的根目录中搜索`tsconfig.json`或`jsconfig.json`，因此请确保该文件存在于项目中。该插件将在运行时自动生成`paths`选项，然后将它们写入文件，而无需开发人员手动添加

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
```
