import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "plugin-components-sample",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
      copy: [
        // Global CSS
        {
          src: "assets/generated/css",
          dest: ""
        },

        // Icons
        {
          src: "assets/generated/icons",
          dest: "assets/icons"
        }
      ]
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

      // Only used for local testing purposes
      copy: [
        // Chameleon
        {
          src: "../../../node_modules/@genexus/chameleon-controls-library/dist",
          dest: "chameleon"
        },

        // JS
        {
          src: "../../../node_modules/@genexus/mercury/dist",
          dest: "mercury"
        },

        // CSS bundles
        {
          // Mercury bundles
          src: "../../../node_modules/@genexus/mercury/dist/bundles/css",
          dest: "css"
        },
        {
          src: "assets/generated/css",
          dest: ""
        },

        // Icons
        {
          // Mercury icons
          src: "../../../node_modules/@genexus/mercury/dist/assets",
          dest: "assets"
        },
        {
          // Own icons
          src: "assets/generated/icons",
          dest: "assets/icons"
        },

        // Fonts
        {
          src: "../../../node_modules/@genexus/mercury/dist/assets/fonts",
          dest: "css/base/assets/fonts"
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
