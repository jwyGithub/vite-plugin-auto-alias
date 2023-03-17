import { writeFileSync } from 'fs';
import { parse } from 'path';
import type { Alias } from 'vite';
import type { IAliasPath } from './global';

export default class HackJson {
    private __ROOT__: string;
    private __JSONCONFIG__: string;
    constructor(root: string, jsonConfig: string) {
        this.__ROOT__ = root;
        this.__JSONCONFIG__ = jsonConfig;
    }

    private getPathKeyAndValue({ find, prefix }: { find: string | RegExp; prefix: string }): {
        key: string;
        value: string;
    } {
        const { name } = parse(this.__ROOT__);
        const pathKey = typeof find === 'string' ? `${find}/*` : `${find.source.replace('^', '')}/*`;
        const pathValue =
            typeof find === 'string'
                ? `${name}/${find}/*`.replace(new RegExp(`${prefix}/`), '')
                : `${name}/${find.source.replace(`^${prefix}`, '')}/*`;
        return {
            key: pathKey,
            value: pathValue
        };
    }

    private getConfig(alias: Alias[], prefix: string): IAliasPath {
        return {
            compilerOptions: {
                paths: alias.reduce<{ [key: string]: string[] }>((result, item) => {
                    const { key, value } = this.getPathKeyAndValue({ find: item.find, prefix });
                    result[key] = [value];
                    return result;
                }, {})
            }
        };
    }

    updateConfig(alias: Alias[], prefix: string) {
        const config = this.getConfig(alias, prefix);
        writeFileSync(this.__JSONCONFIG__, JSON.stringify(config, null, 2));
    }
}

