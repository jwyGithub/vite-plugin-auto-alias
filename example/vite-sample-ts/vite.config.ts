import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoAlias from 'vite-plugin-auto-alias';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), autoAlias()]
});

