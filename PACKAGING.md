# Plugin Packaging

## General package structure

```
/
├── plugin.json              # Main manifest
├── plugin.nls.json          # Translations in the default language (en‑US)
├── plugin.nls.<lang>.json   # Additional languages (e.g., plugin.nls.jp.json)
├── README.md                # Optional documentation
├── CHANGELOG.ms             # Change history
├── backend.zip              # Binaries and resources for the BL
├── frontend.zip             # Front‑end bundle and metadata
└── icon.png                 # Icon for the plugin
```

## Manifest `plugin.json`

**Required** file that describes the plugin.

```json
{
  "id": "PluginSample",          // Unique identifier
  "version": "0.0.1",            // SemVer
  "name": "%name%",             // Display name (supports i18n)
  "description": "%description%", // Short description
  "iconUrl": "icon.png",         // Relative path or absolute URL
  "publisher": "GeneXus",
  "publisherUrl": "https://example.com/publisher",
  "url": "https://example.com/sample-plugin-1",
  "resources": [                  // "Resources" section in the Marketplace
    {
      "text": "%resources.doc.text%",
      "url": "%resources.doc.url%"
    }
  ]
}
```

### Translatable fields

Some fields accepts the `%{KEY}%` notation to resolve its value from the *NLS* files so they will be shown in the cuerrent language in the IDE (see below).

## `plugin.nls*.json`

Key → value **dictionaries** with the translated strings.

```json
{
  "name": "Basic Sample Plugin",
  "description": "This is a sample plugin for demonstration purposes",
  "resources.doc.text": "Documentation",
  "resources.doc.url": "https://example.com/sample-plugin-1-doc"
}
```

- One file per language.
- The default file must be named `plugin.nls.json` containing translations for English.
- For other languages the language code appears in the filename: `plugin.nls.<lang>.json` (ISO 639‑1). Example: `plugin.nls.jp.json` for Japanese.

## `README.md` & `CHANGELOG.md`

- **Optional** but recommended.
- Only **absolute URLs** or embedded images are allowed (*no* relative paths for now).
- For these files there can be also trnaslations to other languages following the same convention used in `plugin.nls*.json` files. Example `README.jp.md` for Japanese.

## `backend.zip`

- Contains the **binaries**, and resources that the IDE will copy into the GX backend upon startup.
- The internal structure is free‑form and preserved when extracted, so if for example some user controls are included they should be placed inside a `UserControls` folder.

## `frontend.zip`

Final front‑end bundle (SPA) plus its `package.json`.

```
frontend.zip/
├── dist/              # Bundle (e.g., main.js, assets/**)
└── package.json       # NPM metadata + gxPlugin section
```

### `package.json` — `gxPlugin` section

```json
{
  "name": "@genexusm-plugin-sample/root",
  "version": "0.0.1",
  "gxPlugin": {
    "bundle": "dist/main.js"    // Path to the entry bundle, relative to package.json
  }
}
```

Note that the `gxPlgin` section is needed so that the IDE can locate the bundle to be loaded.

## Dev Mode (local install)

During development, a plugin can be installed manually at:

```
<USER_HOME>/.genexus/Next/plugins/<pluginId>/
```

Inside that folder:

1. Create a minimal `plugin.json`:

   ```json
   {
     "id": "sample-1", // Plugin ID
     "version": "1.0.0" // Version installed
   }
   ```

2. Add `backend/` and `frontend/` directories with the corresponding content.

3. For front‑end **hot reload**, add `baseUrl` in `gxPlugin` and serve the bundle in watch mode:

   ```json
   "gxPlugin": {
     "bundle": "dist/main.js",
     "baseUrl": "http://localhost:5001/"
   }
   ```
