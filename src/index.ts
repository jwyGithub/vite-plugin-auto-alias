import { join, parse, resolve } from 'path';
import type { Alias, PluginOption } from 'vite';
import { getDirs, hasFile } from './shared';
import HackJson from './HackJson';
import type { AutoAlias, GetDirs } from './global';

/**
 * @description 默认配置
 */
const DEFAULT_CONFIG = {
    root: join(process.cwd(), 'src'),
    prefix: '@'
};

/**
 * @description 别名配置文件路径
 */
const ALIAS_JSON_PATH = resolve(__dirname, '../alias.json');

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
    prefix = prefix || DEFAULT_CONFIG.prefix;
    if (!hasFile(root)) {
        return undefined;
    } else {
        const dirs = getDirs(root);
        const writeConfig = new HackJson(root, ALIAS_JSON_PATH);
        return {
            name: 'vite-plugin-auto-alias',
            enforce: 'pre',
            config() {
                const alias = genArrayAlias(dirs, root, prefix);
                writeConfig.updateConfig(alias, prefix);
                return {
                    resolve: {
                        alias
                    }
                };
            },
            configureServer(server) {
                server.watcher.on('all', (eventName, path) => {
                    const { dir } = parse(path);
                    if (dir === root) {
                        switch (eventName) {
                            case 'addDir':
                            case 'unlinkDir':
                                const alias = genArrayAlias(dirs, root, prefix);
                                writeConfig.updateConfig(alias, prefix);
                                break;
                            default:
                                break;
                        }
                        server.restart();
                    }
                });
            }
        };
    }
};

