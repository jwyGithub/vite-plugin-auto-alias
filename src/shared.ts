import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import type { Alias } from 'vite';
import { normalizePath } from 'vite';

/**
 * @description 去重
 * @param {Alias[]} data
 * @returns {Alias[]}
 */
export const unique = (data: Alias[]): Alias[] => {
    const temp: { [key: string]: any } = {};
    return data.reduce<Alias[]>((prev, item) => {
        const key = typeof item.find === 'string' ? item.find : item.find.source;
        // eslint-disable-next-line no-constant-binary-expression
        temp[key] ? '' : (temp[key] = true && prev.push(item));
        return prev;
    }, []);
};

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

