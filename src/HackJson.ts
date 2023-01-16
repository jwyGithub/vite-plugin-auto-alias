import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';
import type { Alias } from 'vite';

export default class HackJson {
    private __ROOT__: string;
    private __JSONCONFIG__: string;
    constructor(root: string, jsonConfig: string) {
        this.__ROOT__ = root;
        this.__JSONCONFIG__ = jsonConfig;
    }

    public addPaths(alias: Alias[]) {
        const config = this.getBaseConfig();
        const lastConfigPaths = config.compilerOptions.paths;
        const nextConfigPaths: { [key: string]: string[] } = {};
        for (const { find } of alias) {
            const { key, value } = this.getPathKeyAndValue(find);
            nextConfigPaths[key] = [value];
        }
        config.compilerOptions.paths = { ...nextConfigPaths, ...lastConfigPaths };
        this.updateConfig(config);
    }

    public addPath(alias: Alias) {
        const { find } = alias;
        const config = this.getBaseConfig();
        const lastConfigPaths = config.compilerOptions.paths;
        const nextConfigPaths: { [key: string]: string[] } = {};
        const { key, value } = this.getPathKeyAndValue(find);
        nextConfigPaths[key] = [value];
        config.compilerOptions.paths = { ...nextConfigPaths, ...lastConfigPaths };
        this.updateConfig(config);
    }

    public removePath(path: string) {
        const { name } = parse(path);
        const find = new RegExp(`^@${name}`);
        const { key } = this.getPathKeyAndValue(find);
        const config = this.getBaseConfig();
        const lastConfigPaths = config.compilerOptions.paths;
        delete lastConfigPaths[key];
        this.updateConfig(config);
    }

    private getBaseConfig(): { [key: string]: any } {
        try {
            const configStr = readFileSync(this.__JSONCONFIG__, 'utf-8');
            return JSON.parse(configStr);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    private getPathKeyAndValue(find: string | RegExp): {
        key: string;
        value: string;
    } {
        const { name } = parse(this.__ROOT__);
        const pathKey = typeof find === 'string' ? `${find}/*` : `${find.source.replace('^', '')}/*`;
        const pathValue = typeof find === 'string' ? `${name}/${find}/*`.replace(/@\//, '') : `${name}/${find.source.replace('^@', '')}/*`;
        return {
            key: pathKey,
            value: pathValue
        };
    }

    private updateConfig(config: any) {
        writeFileSync(this.__JSONCONFIG__, JSON.stringify(config, null, 4));
    }
}

