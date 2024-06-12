import { defineConfig } from 'vite';
// import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
    plugins: [],
    server: {
        watch: {
            usePolling: true
        }
        // host: true,
        // fs: { strict: false } 

    },
    esbuild: {
        //drop: ["console", "debugger"], // Removes console and debugger statements
        format: "esm"
    },
    build: {
        //commonjsOptions: { transformMixedEsModules: true } ,
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
        },
        rollupOptions: {
            // additional Rollup options if necessary
        }
    }
});
