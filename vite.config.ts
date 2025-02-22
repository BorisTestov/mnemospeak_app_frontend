import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'src'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@stores': path.resolve(__dirname,'src/stores'),
            '@utils': path.resolve(__dirname,'src/utils'),
        },
    },
    server: {
        host: true,
        allowedHosts: ['localhost', 'emerging-wren-engaging.ngrok-free.app'],
    }
})
