import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.GIT_COMMIT || 'development'),
  },
  plugins: [svelte()],
})
