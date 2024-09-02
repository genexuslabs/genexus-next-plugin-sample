# sv-kb-manager-import



<!-- Auto Generated Below -->


## Properties

| Property                                 | Attribute        | Description                                                                                   | Type                                                                           | Default     |
| ---------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------- |
| `cancelCallback` _(required)_            | --               | Callback invoked when the user wants to cancel the export process.                            | `() => Promise<boolean>`                                                       | `undefined` |
| `importCallback` _(required)_            | --               | Callback invoked when the user wants to initiate the import process.                          | `(itemIds: string[]) => Promise<boolean>`                                      | `undefined` |
| `loadCallback` _(required)_              | --               | Callback invoked when the user wants to load the xpz information                              | `(file: File) => Promise<ImportCategoryData[]>`                                | `undefined` |
| `objectContextMenuCallback` _(required)_ | --               | It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions) | `(tree: ObjectsSourceType, contextMenuInfo: ContextMenuInfo) => Promise<void>` | `undefined` |
| `optionsCallback` _(required)_           | --               | Callback invoked when the user wants to access the export options.                            | `() => Promise<void>`                                                          | `undefined` |
| `selectedFile`                           | --               | The name of the imported xml or xps file                                                      | `File \| undefined`                                                            | `undefined` |
| `statusMinimal`                          | `status-minimal` | It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions) | `boolean`                                                                      | `false`     |
| `topStateBar`                            | `top-state-bar`  | If true, it will display a loader when needed.                                                | `boolean`                                                                      | `true`      |


## Events

| Event                         | Description                                                                                        | Type                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------- |
| `componentDidLoadEvent`       | This event is emitted once just after the component is fully loaded and the first render() occurs. | `CustomEvent<boolean>` |
| `componentDidRenderFirstTime` | This event is emitted once just after the component is fully loaded and the first render() occurs  | `CustomEvent<boolean>` |


## Methods

### `addResultItem(item: ImportItemResultData) => Promise<void>`

Add the result of importing an item

#### Parameters

| Name   | Type                                                                                                         | Description |
| ------ | ------------------------------------------------------------------------------------------------------------ | ----------- |
| `item` | `{ id: string; name: string; status: "error" \| "success" \| "warning"; messages?: string[] \| undefined; }` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                        | Description |
| --------------------------- | ----------- |
| `"file-name"`               |             |
| `"select-file-load-button"` |             |
| `"select-kb-btn"`           |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
