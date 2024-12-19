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

export const removeComments = (code: string) => {
    if (!code) return code;
    let inString = false;
    let inComment = false;
    let inMultilineComment = false;
    let newStr = '';

    for (let i = 0; i < code.length; i++) {
        if (inComment) {
            if (code[i] === '\n') {
                inComment = false;
                newStr += '\n';
            }
            continue;
        }

        if (inMultilineComment) {
            if (code[i] === '*' && code[i + 1] === '/') {
                inMultilineComment = false;
                i++;
            }
            continue;
        }

        if (code[i] === '"' && code[i - 1] !== '\\') {
            inString = !inString;
        }

        if (!inString) {
            if (code[i] === '/' && code[i + 1] === '/') {
                inComment = true;
                i++;
                continue;
            }
            if (code[i] === '/' && code[i + 1] === '*') {
                inMultilineComment = true;
                i++;
                continue;
            }
        }

        if (!inComment && !inMultilineComment) {
            newStr += code[i];
        }
    }

    return newStr;
};
