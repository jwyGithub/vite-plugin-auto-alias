import type { CompilerOptions, MapLike } from 'typescript';

export type Mode = 'sync' | 'off';

export interface AutoAlias {
    root?: string | undefined;
    prefix?: string | undefined;
    mode?: Mode;
    aliasPath?: string | null;
}

export type GetDirs = Array<{
    dirName: string;
    dirPath: string;
}>;

export interface IPaths extends MapLike<string[]> {}

export interface IJson {
    [key: string]: any;
    compilerOptions: ICompilerOptions;
}

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type ICompilerOptions = RequiredKeys<CompilerOptions, 'paths'>;
