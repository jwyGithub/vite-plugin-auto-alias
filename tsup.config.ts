import path from 'node:path';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [`${path.join(__dirname, './src/index.ts')}`],
    outDir: path.join(__dirname, './dist'),
    outExtension({ format }) {
        return {
            js: `.${format}.js`
        };
    },
    dts: true,
    target: ['node12'],
    format: ['esm', 'cjs'],
    minify: false,
    clean: true,
    tsconfig: path.resolve(__dirname, './tsconfig.json')
});
