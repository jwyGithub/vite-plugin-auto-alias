import type { Alias } from 'vite';
import type { IJson, Mode } from './type';
/**
 * @description 获取json
 * @param jsonPath jsonPath
 * @returns
 */
export declare function getJson(jsonPath: string): IJson;
/**
 * @description 合并json
 * @param target IJson
 * @param source IJson
 * @returns IJson
 */
export declare function mergeJson(target: IJson, source: IJson): IJson;
/**
 * @description 移除某个path
 * @param pathKey path key
 * @param source  IJson
 * @returns IJson
 */
export declare function removePath(pathKey: string, source: IJson): IJson;
/**
 * @description 转换成json path格式
 * @param root string
 * @param param1
 * @returns
 */
export declare function convertToJsonPath(root: string, { find, prefix }: {
    find: string | RegExp;
    prefix: string;
}): {
    key: string;
    value: string;
};
/**
 * @description 生成json
 * @param alias Alias[]
 * @param root string
 * @param prefix string
 * @returns IJson
 */
export declare function genJson(alias: Alias[], root: string, prefix: string): IJson;
export interface ISyncJson {
    extendJson: string;
    jsJson: string;
    tsJson: string;
    alias: Alias[];
    prefix: string;
    root: string;
    mode: Mode;
}
/**
 * @description 同步json文件
 * @param extendJson 继承的json
 * @param jsJson jsconfig.json
 * @param tsJson tsconfig.json
 */
export declare function syncJson({ extendJson, jsJson, tsJson, alias, prefix, root, mode }: ISyncJson): void;
export interface IRemoveJson {
    extendJson: string;
    jsJson: string;
    tsJson: string;
    unlinkDirName: string;
    root: string;
    prefix: string;
    mode: Mode;
}
export declare function removeJson({ extendJson, jsJson, tsJson, unlinkDirName, prefix, mode }: IRemoveJson): void;
