import { dirname, join, parse, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { Alias, PluginOption } from 'vite';
import type { GetDirs } from './shared';
import { getDirs, hasFile } from './shared';
import { removeJson, syncJson } from './sync';

export interface AutoAlias {
    root: string;
    prefix: string;
}

/**
 * @description 默认配置
 */
const DEFAULT_CONFIG: AutoAlias = {
    root: join(process.cwd(), 'src'),
    prefix: '@'
};

/**
 * @description 别名配置文件路径
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ALIAS_JSON_PATH = resolve(__dirname, '../alias.json');

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

/**
 * @description 入口函数
 */
export default ({ root, prefix }: AutoAlias = DEFAULT_CONFIG): PluginOption => {
    root = root ?? DEFAULT_CONFIG.root;
    prefix = prefix ?? DEFAULT_CONFIG.prefix;
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
                    prefix
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
                                prefix
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
                                prefix
                            });
                            server.restart();
                        }
                    }
                });
            }
        };
    }
};

