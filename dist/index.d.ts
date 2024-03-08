import { PluginOption } from 'vite';

type Mode = 'sync' | 'off';
interface AutoAlias {
    root?: string | undefined;
    prefix?: string | undefined;
    mode?: Mode;
    aliasPath?: string;
}

declare const _default: (options?: AutoAlias) => PluginOption;

export { _default as default };
