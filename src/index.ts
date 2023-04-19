import { dirname, join, parse, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { Alias, PluginOption } from 'vite';
import type { GetDirs } from './shared';
import { getDirs, hasFile } from './shared';
import { removeJson, syncJson } from './sync';

export interface AutoAlias {
    root?: string | undefined;
    prefix?: string | undefined;
    mode?: 'extends' | 'sync' | 'all';
}

const DEFAULT_CONFIG: Required<AutoAlias> = {
    root: join(process.cwd(), 'src'),
    prefix: '@',
    mode: 'all'
};

/**
 * @description 别名配置文件路径
 */
const ALIAS_JSON_PATH = resolve(process.cwd(), 'node_modules/@jiangweiye/tsconfig/tsconfig.alias.json');

const jsconfig = (root: string) => join(root, 'jsconfig.json');
const tsconfig = (root: string) => join(root, 'tsconfig.json');

/**
 * @description 生成数组
 * @param dir GetDirs
 * @param root string
 * @param prefix string
 * @returns {Alias[]}
 */
function genArrayAlias(dirs: GetDirs, root: string, prefix: string): Alias[] {
    return dirs.reduce<Alias[]>(
        (result, item) => {
            result.push({ find: new RegExp(`^${prefix}${item.dirName}`), replacement: item.dirPath });
            return result;
        },
        [{ find: prefix, replacement: root }]
    );
}

const mergeConfig = (baseConfig: AutoAlias): Required<AutoAlias> => {
    return {
        root: baseConfig.root ?? DEFAULT_CONFIG.root,
        prefix: baseConfig.prefix ?? DEFAULT_CONFIG.prefix,
        mode: baseConfig.mode ?? DEFAULT_CONFIG.mode
    };
};

export default (options: AutoAlias = DEFAULT_CONFIG): PluginOption => {
    const { root, prefix, mode } = mergeConfig(options);
    if (!hasFile(root)) {
        return undefined;
    } else {
        const dirs = getDirs(root);
        return {
            name: 'vite-plugin-auto-alias',
            enforce: 'pre',
            config() {
                const alias = genArrayAlias(dirs, root, prefix);
                syncJson({
                    extendJson: ALIAS_JSON_PATH,
                    jsJson: jsconfig(process.cwd()),
                    tsJson: tsconfig(process.cwd()),
                    alias,
                    root,
                    prefix,
                    mode
                });
                return {
                    resolve: {
                        alias
                    }
                };
            },
            configureServer(server) {
                server.watcher.on('all', (eventName, path) => {
                    const { dir, name: unlinkDirName } = parse(path);
                    if (dir === root) {
                        if (eventName === 'addDir') {
                            const alias = genArrayAlias(dirs, root, prefix);
                            syncJson({
                                extendJson: ALIAS_JSON_PATH,
                                jsJson: jsconfig(process.cwd()),
                                tsJson: tsconfig(process.cwd()),
                                alias,
                                root,
                                prefix,
                                mode
                            });
                            server.restart();
                        }

                        if (eventName === 'unlinkDir') {
                            removeJson({
                                extendJson: ALIAS_JSON_PATH,
                                jsJson: jsconfig(process.cwd()),
                                tsJson: tsconfig(process.cwd()),
                                unlinkDirName,
                                root,
                                prefix,
                                mode
                            });
                            server.restart();
                        }
                    }
                });
            }
        };
    }
};

