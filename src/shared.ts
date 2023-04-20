import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { normalizePath } from 'vite';
import type { GetDirs } from './type';

/**
 * @description 是否是文件夹
 * @param path
 * @returns
 */
export const isDir = (path: string): boolean => {
    return lstatSync(path).isDirectory();
};

/**
 * @description 是否存在文件
 * @param path
 * @returns
 */
export const hasFile = (path: string) => {
    return existsSync(path);
};

/**
 * @description 获取所有文件夹
 * @param path
 * @returns
 */
export const getDirs = (path: string): GetDirs => {
    const dirs = readdirSync(path);
    return dirs.reduce<GetDirs>((result, name) => {
        const fullPath = join(path, name);
        isDir(fullPath) && result.push({ dirName: name, dirPath: normalizePath(fullPath) });
        return result;
    }, []);
};

