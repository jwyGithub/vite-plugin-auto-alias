import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';
import type { Alias } from 'vite';
import { hasFile } from './shared';
import type { IJson, IPaths, Mode } from './type';

/**
 * @description 获取json
 * @param jsonPath jsonPath
 * @returns
 */
export function getJson(jsonPath: string): IJson {
    try {
        const jsonText = readFileSync(jsonPath, 'utf-8');
        return JSON.parse(jsonText);
    } catch (error) {
        process.exit(0);
    }
}
/**
 * @description 合并json
 * @param target IJson
 * @param source IJson
 * @returns IJson
 */
export function mergeJson(target: IJson, source: IJson): IJson {
    const targetPaths: IPaths = target.compilerOptions?.paths ?? {};
    const sourcePaths: IPaths = source.compilerOptions?.paths ?? {};
    for (const pathKey in targetPaths) {
        if (!Reflect.has(sourcePaths, pathKey)) {
            sourcePaths[pathKey] = targetPaths[pathKey];
        }
    }
    return {
        ...source,
        compilerOptions: {
            ...source.compilerOptions,
            paths: sourcePaths
        }
    };
}

/**
 * @description 移除某个path
 * @param pathKey path key
 * @param source  IJson
 * @returns IJson
 */
export function removePath(pathKey: string, source: IJson): IJson {
    const sourcePaths: IPaths = source.compilerOptions.paths;
    Reflect.deleteProperty(sourcePaths, pathKey);
    return {
        ...source,
        compilerOptions: {
            ...source.compilerOptions,
            paths: sourcePaths
        }
    };
}

/**
 * @description 转换成json path格式
 * @param root string
 * @param param1
 * @returns
 */
export function convertToJsonPath(
    root: string,
    { find, prefix }: { find: string | RegExp; prefix: string }
): { key: string; value: string } {
    const { name } = parse(root);
    const pathKey = typeof find === 'string' ? `${find}/*` : `${find.source.replace('^', '')}/*`;
    const pathValue =
        typeof find === 'string'
            ? `${name}/${find}/*`.replace(new RegExp(`${prefix}/`), '')
            : `${name}/${find.source.replace(`^${prefix}`, '')}/*`;
    return {
        key: pathKey,
        value: pathValue
    };
}

/**
 * @description 生成json
 * @param alias Alias[]
 * @param root string
 * @param prefix string
 * @returns IJson
 */
export function genJson(alias: Alias[], root: string, prefix: string): IJson {
    const paths = alias.reduce<{ [key: string]: string[] }>((result, item) => {
        const { key, value } = convertToJsonPath(root, { find: item.find, prefix });
        result[key] = [value];
        return result;
    }, {});
    return {
        compilerOptions: {
            paths: paths,
            baseUrl: '.'
        }
    };
}

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
export function syncJson({ extendJson, jsJson, tsJson, alias, prefix, root, mode }: ISyncJson) {
    if (hasFile(extendJson) && ['all', 'extends'].includes(mode)) {
        const json = genJson(alias, root, prefix);
        hasFile(extendJson) && writeFileSync(extendJson, JSON.stringify(json, null, 4));
    }
    if (hasFile(jsJson) && ['all', 'sync'].includes(mode)) {
        const target = genJson(alias, root, prefix);
        const source = getJson(jsJson);
        const newJson = mergeJson(target, source);
        hasFile(jsJson) && writeFileSync(jsJson, JSON.stringify(newJson, null, 4));
    }
    if (hasFile(tsJson) && ['all', 'sync'].includes(mode)) {
        const target = genJson(alias, root, prefix);
        const source = getJson(tsJson);
        const newJson = mergeJson(target, source);
        hasFile(tsJson) && writeFileSync(tsJson, JSON.stringify(newJson, null, 4));
    }
}

export interface IRemoveJson {
    extendJson: string;
    jsJson: string;
    tsJson: string;
    unlinkDirName: string;
    root: string;
    prefix: string;
    mode: Mode;
}

export function excutor(json: string, path: string) {
    const newJson = removePath(path, getJson(json));
    writeFileSync(json, JSON.stringify(newJson, null, 4));
}

export function removeJson({ extendJson, jsJson, tsJson, unlinkDirName, prefix, mode }: IRemoveJson) {
    const toRemovePath = `${prefix}${unlinkDirName}/*`;
    hasFile(extendJson) && ['all', 'extends'].includes(mode) && excutor(extendJson, toRemovePath);
    hasFile(jsJson) && ['all', 'sync'].includes(mode) && excutor(jsJson, toRemovePath);
    hasFile(tsJson) && ['all', 'sync'].includes(mode) && excutor(tsJson, toRemovePath);
}

