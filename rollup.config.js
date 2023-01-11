import { defineConfig } from 'rollup';
import ts from 'rollup-plugin-typescript2';

export default defineConfig({
    input: './index.ts',
    output: [
        {
            format: 'cjs',
            exports: 'default',
            file: 'dist/index.cjs.js'
        },
        {
            format: 'esm',
            exports: 'default',
            file: 'dist/index.esm.js'
        }
    ],
    plugins: [
        ts({
            tsconfig: './tsconfig.json',
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    declarationMap: false,
                    declarationDir: 'dist',
                    allowJs: true
                },
                include: ['index.ts']
            },
            clean: true,
            useTsconfigDeclarationDir: true
        })
    ],
    external: ['vite', 'path', 'fs']
});

