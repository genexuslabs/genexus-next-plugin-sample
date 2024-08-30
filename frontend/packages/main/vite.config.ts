import { defineConfig } from 'vite';
import { viteStaticCopy } from "vite-plugin-static-copy";
// import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
              {
                src: "../components/dist/plugin-components-sample/assets",
                dest: "./",
              },
              {
                src: "../components/dist/plugin-components-sample/global.css",
                dest: "./",
              }
            ],
          }),
    ],
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
