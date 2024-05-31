import { existsSync, lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizePath } from 'vite';
import type { GetDirs } from './type';

export const isDir = (path: string): boolean => {
    return lstatSync(path).isDirectory();
};

export const hasFile = (path: string) => {
    return existsSync(path);
};

export const getDirs = (path: string): GetDirs => {
    const dirs = readdirSync(path);
    return dirs.reduce<GetDirs>((result, name) => {
        const fullPath = join(path, name);
        isDir(fullPath) && result.push({ dirName: name, dirPath: normalizePath(fullPath) });
        return result;
    }, []);
};
