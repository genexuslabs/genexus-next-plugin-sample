import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'plugin-components-sample',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "single-export-module",
      empty: true
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  extras: {
    // Enabling this flag will allow downstream projects that consume a Stencil
    // library and use a bundler such as Vite to lazily load the Stencil
    // library's components.
    enableImportInjection: true
  },
  testing: {
    browserHeadless: "new",
  },
};
