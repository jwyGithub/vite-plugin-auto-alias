import { join } from 'path';
import { lstatSync, readdirSync } from 'fs';
import type { Alias, AliasOptions, PluginOption, UserConfig } from 'vite';
import { normalizePath } from 'vite';

function isDir(path: string): boolean {
    return lstatSync(path).isDirectory();
}

type GetDirs = Array<{
    dirName: string;
    dirPath: string;
}>;

function getDirs(path: string): GetDirs {
    try {
        const dirs = readdirSync(path);
        return dirs.reduce<GetDirs>((result, name) => {
            const fullPath = join(path, name);
            isDir(fullPath) && result.push({ dirName: name, dirPath: normalizePath(fullPath) });
            return result;
        }, []);
    } catch (error: any) {
        throw new Error(error);
    }
}

function genObjectAlias(dirs: GetDirs = []) {
    return dirs.reduce((result, item) => {
        result[`@${item.dirName}`] = item.dirPath;
        return result;
    }, {} as AliasOptions & { [key: string]: string });
}

function genArrayAlias(dirs: GetDirs = []) {
    return dirs.reduce<Alias[]>((result, item) => {
        result.push({ find: new RegExp(`^@${item.dirName}`), replacement: item.dirPath });
        return result;
    }, []);
}

function setConfig(config: UserConfig, dirs: GetDirs = []) {
    if (config.resolve) {
        config.resolve.alias = Array.isArray(config.resolve.alias)
            ? [...config.resolve.alias, ...genArrayAlias(dirs)]
            : { ...config.resolve.alias, ...genObjectAlias(dirs) };
    } else {
        config.resolve = {
            alias: [{ find: '@', replacement: join(process.cwd(), 'src') }, ...genArrayAlias(dirs)]
        };
    }
}

function autoAlias(root: string = join(process.cwd(), 'src')): PluginOption {
    const dirs = getDirs(root);
    return {
        name: 'vite-plugin-auto-alias',
        enforce: 'pre',
        config(config) {
            setConfig(config, dirs);
        }
    };
}

export default autoAlias;

