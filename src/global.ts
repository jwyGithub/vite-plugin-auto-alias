export type GetDirs = Array<{
    dirName: string;
    dirPath: string;
}>;

export interface AutoAlias {
    root: string;
    prefix: string;
}

export interface IAliasPath {
    compilerOptions: {
        paths: {
            [key: string]: string[];
        };
    };
}
