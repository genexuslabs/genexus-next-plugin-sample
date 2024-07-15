import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "plugin-components-sample",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "single-export-module",
      empty: true
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers,
      copy: [
        {
          src: "../../../node_modules/@genexus/mercury/dist/bundles/css",
          dest: "css"
        },
        {
          src: "../../../node_modules/@genexus/chameleon-controls-library",
          dest: "chameleon"
        },
        {
          src: "../../../node_modules/@genexus/mercury",
          dest: "mercury"
        },
        {
          src: "../../../node_modules/@genexus/mercury/dist/assets",
          dest: "assets"
        }
      ]
    }
  ],
  extras: {
    // Enabling this flag will allow downstream projects that consume a Stencil
    // library and use a bundler such as Vite to lazily load the Stencil
    // library's components.
    enableImportInjection: true
  },
  testing: {
    browserHeadless: "new"
  }
};
