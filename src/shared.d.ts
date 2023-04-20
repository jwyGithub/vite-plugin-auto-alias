import type { GetDirs } from './type';
/**
 * @description 是否是文件夹
 * @param path
 * @returns
 */
export declare const isDir: (path: string) => boolean;
/**
 * @description 是否存在文件
 * @param path
 * @returns
 */
export declare const hasFile: (path: string) => boolean;
/**
 * @description 获取所有文件夹
 * @param path
 * @returns
 */
export declare const getDirs: (path: string) => GetDirs;
