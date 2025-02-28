import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(process.env.GIT_COMMIT || 'development')
    },
    plugins: [svelte()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
        }
    }
});
