import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    server: {
        allowedHosts: [
            'a879-2a01-cb0c-cd8-d800-d05c-d154-1504-7412.ngrok-free.app'
        ]
    }
});
