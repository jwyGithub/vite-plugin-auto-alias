export type Mode = 'extends' | 'sync' | 'all' | 'off';

export interface AutoAlias {
    root?: string | undefined;
    prefix?: string | undefined;
    mode?: Mode;
    extendsPath?: string;
}

export type GetDirs = Array<{
    dirName: string;
    dirPath: string;
}>;

export interface IPaths {
    [key: string]: string[];
}

export interface IJson {
    [key: string]: any;
    compilerOptions: {
        [key: string]: any;
        baseUrl: string;
        paths: IPaths;
    };
}

