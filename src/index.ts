import { join, parse } from 'path';
import type { Alias, PluginOption, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import type { GetDirs } from './shared';
import { getDirs, unique } from './shared';

function genArrayAlias(dirs: GetDirs = [], root: string = join(process.cwd(), 'src')) {
    return dirs.reduce<Alias[]>(
        (result, item) => {
            result.push({ find: new RegExp(`^@${item.dirName}`), replacement: item.dirPath });
            return result;
        },
        [{ find: '@', replacement: root }]
    );
}

export default (root: string = join(process.cwd(), 'src')): PluginOption => {
    // eslint-disable-next-line init-declarations
    let _config: ResolvedConfig;
    const dirs = getDirs(root);
    return {
        name: 'vite-plugin-auto-alias',
        enforce: 'pre',
        configResolved(config) {
            _config = config;
        },
        config() {
            return {
                resolve: {
                    alias: genArrayAlias(dirs, root)
                }
            };
        },
        configureServer(server) {
            server.watcher.on('addDir', path => {
                const { dir, name } = parse(path);
                if (dir === root) {
                    _config.resolve.alias.push({
                        find: new RegExp(`^@${name}`),
                        replacement: normalizePath(path)
                    });
                }
                _config.resolve.alias = unique(_config.resolve.alias);
            });

            server.watcher.on('unlinkDir', (path: string) => {
                const { dir } = parse(path);
                if (dir === root) {
                    _config.resolve.alias = _config.resolve.alias.filter(item => item.replacement !== path);
                }
            });
        }
    };
};

