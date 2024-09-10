# sv-object-selector



<!-- Auto Generated Below -->


## Properties

| Property                            | Attribute | Description                                                  | Type                                                  | Default     |
| ----------------------------------- | --------- | ------------------------------------------------------------ | ----------------------------------------------------- | ----------- |
| `contextMenuCallback` _(required)_  | --        | Callback invoked to open the context menu                    | `(contextMenuInfo: ContextMenuInfo) => Promise<void>` | `undefined` |
| `loadObjectsCallback` _(required)_  | --        | Callback invoked to load objects (filtered by selected type) | `(type: string) => Promise<ObjectDescription[]>`      | `undefined` |
| `objectTypes`                       | --        | The available object types.                                  | `ObjectType[]`                                        | `[]`        |
| `openObjectCallback` _(required)_   | --        | Callback invoked to open the selected objects                | `(id: string) => Promise<void>`                       | `undefined` |
| `selectObjectCallback` _(required)_ | --        | Callback invoked when selection is changed                   | `(id: string) => Promise<void>`                       | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
