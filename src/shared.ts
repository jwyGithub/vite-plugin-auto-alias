import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { normalizePath } from 'vite';

/**
 * @description 是否是文件夹
 * @param path
 * @returns
 */
export const isDir = (path: string): boolean => {
    return lstatSync(path).isDirectory();
};

export type GetDirs = Array<{
    dirName: string;
    dirPath: string;
}>;
/**
 * @description 获取所有文件夹
 * @param path
 * @returns
 */
export const getDirs = (path: string): GetDirs => {
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
};

