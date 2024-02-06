import { PluginOption } from 'vite';

type Mode = 'extends' | 'sync' | 'all' | 'off';
interface AutoAlias {
    root?: string | undefined;
    prefix?: string | undefined;
    mode?: Mode;
    extendsPath?: string;
}

declare const _default: (options?: AutoAlias) => PluginOption;

export { _default as default };
