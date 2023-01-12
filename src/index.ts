import { join, parse } from 'path';
import type { Alias, PluginOption, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import type { GetDirs } from './shared';
import { getDirs, unique } from './shared';
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

export const DEFAULT_CONFIG = {
    root: join(process.cwd(), 'src'),
    tsconfig: join(process.cwd(), 'tsconfig.json'),
    debug: false
};

export interface AutoAlias {
    root: string;
    tsconfig: string;
    debug: boolean;
}

export default ({ root, tsconfig }: AutoAlias = DEFAULT_CONFIG): PluginOption => {
    // eslint-disable-next-line init-declarations
    let _config: ResolvedConfig;
    const dirs = getDirs(root);
    const hackTsconfig = new HackTsconfig(root, tsconfig);
    return {
        name: 'vite-plugin-auto-alias',
        enforce: 'pre',
        configResolved(config) {
            _config = config;
        },
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
            server.watcher.on('addDir', path => {
                const { dir, name } = parse(path);
                if (dir === root) {
                    const newAlias = {
                        find: new RegExp(`^@${name}`),
                        replacement: normalizePath(path)
                    };
                    hackTsconfig.addPath(newAlias);
                    _config.resolve.alias.push(newAlias);
                }
                _config.resolve.alias = unique(_config.resolve.alias);
            });

            server.watcher.on('unlinkDir', (path: string) => {
                const { dir } = parse(path);
                if (dir === root) {
                    hackTsconfig.removePath(path);
                    _config.resolve.alias = _config.resolve.alias.filter(item => item.replacement !== path);
                }
            });
        }
    };
};

