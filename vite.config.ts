import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    // index.htmlがsrc直下にあるため、rootをsrcに指定
    root: 'src',
    
    // publicフォルダの位置（rootがsrcになったため、相対指定で戻る）
    publicDir: '../public',

    envPrefix: ['VITE_', 'PROJECT_'],
    
    build: {
        // 出力先（rootがsrcなので、相対パスでプロジェクトルートのdistへ）
        outDir: '../dist',
        emptyOutDir: true,
        // Three.js などのモジュールでチャンク警告が出るのを防ぐ
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                // ファイルの種類ごとにスッキリ出力を整理する
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash][extname]'
            }
        }
    },
    
    server: {
        port: 3000,
        open: true,
        strictPort: true,
    },
    
    plugins: [
        // GLSLシェーダーのインポートを可能にするプラグイン
        glsl()
    ]
})
