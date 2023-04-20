import { defineConfig } from 'rollup';
import ts from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default defineConfig({
    input: './src/index.ts',
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
                    declarationDir: 'dist/types',
                    allowJs: true
                },
                include: ['src/**/*', 'rollup.config.ts'],
                exclude: ['rollup.config.ts']
            },
            clean: true,
            useTsconfigDeclarationDir: true
        }),
        terser()
    ],
    external: ['vite', 'path', 'fs', 'url']
});

