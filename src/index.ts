import { join, parse } from 'path';
import type { Alias, PluginOption } from 'vite';
import { normalizePath } from 'vite';
import type { GetDirs } from './shared';
import { getDirs } from './shared';
import HackTsconfig from './HackTsconfig';

function genArrayAlias(dirs: GetDirs = [], root: string = join(process.cwd(), 'src')) {
    return dirs.reduce<Alias[]>(
        (result, item) => {
            result.push({ find: new RegExp(`^@${item.dirName}`), replacement: item.dirPath });
            return result;
        },
        [{ find: '@', replacement: root }]
    );
}

const DEFAULT_CONFIG = {
    root: join(process.cwd(), 'src'),
    tsconfig: join(process.cwd(), 'tsconfig.json'),
    debug: false
};

interface AutoAlias {
    root: string;
    tsconfig: string;
    debug: boolean;
}

export default ({ root, tsconfig }: AutoAlias = DEFAULT_CONFIG): PluginOption => {
    const dirs = getDirs(root);
    const hackTsconfig = new HackTsconfig(root, tsconfig);
    return {
        name: 'vite-plugin-auto-alias',
        enforce: 'pre',
        config() {
            const alias = genArrayAlias(dirs, root);
            hackTsconfig.addPaths(alias);
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
                            hackTsconfig.addPath(newAlias);
                            break;
                        case 'unlinkDir':
                            hackTsconfig.removePath(path);
                            break;
                        default:
                            break;
                    }
                    server.restart();
                }
            });
        }
    };
};

