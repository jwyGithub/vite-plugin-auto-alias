import { join, parse } from 'path';
import type { Alias, PluginOption } from 'vite';
import { normalizePath } from 'vite';
import { getDirs, hasFile } from './shared';
import HackJson from './HackJson';
import type { AutoAlias, GetDirs } from './global';

const DEFAULT_CONFIG = {
    root: join(process.cwd(), 'src'),
    prefix: '@',
    jsonPath: join(process.cwd(), 'tsconfig.json')
};

function genArrayAlias(dirs: GetDirs, root: string, prefix: string) {
    return dirs.reduce<Alias[]>(
        (result, item) => {
            result.push({ find: new RegExp(`^${prefix}${item.dirName}`), replacement: item.dirPath });
            return result;
        },
        [{ find: prefix, replacement: root }]
    );
}

export default ({ root, prefix, jsonPath }: AutoAlias = DEFAULT_CONFIG): PluginOption => {
    if (!hasFile(root)) {
        return undefined;
    } else {
        let hackJson: HackJson | null = null;
        const dirs = getDirs(root);
        if (hasFile(jsonPath)) {
            hackJson = new HackJson(root, jsonPath);
        }
        return {
            name: 'vite-plugin-auto-alias',
            enforce: 'pre',
            config() {
                const alias = genArrayAlias(dirs, root, prefix);
                hackJson?.addPaths(alias);
                return {
                    resolve: {
                        alias
                    }
                };
            },
            configureServer(server) {
                server.watcher.on('all', (eventName, path) => {
                    const { dir, name } = parse(path);
                    if (dir === root) {
                        switch (eventName) {
                            case 'addDir':
                                const newAlias = {
                                    find: new RegExp(`^@${name}`),
                                    replacement: normalizePath(path)
                                };
                                hackJson?.addPath(newAlias);
                                break;
                            case 'unlinkDir':
                                hackJson?.removePath(path);
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

