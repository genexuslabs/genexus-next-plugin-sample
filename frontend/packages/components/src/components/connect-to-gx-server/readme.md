# sv-connect-gx-server



<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute              | Description                                                                                                      | Type                                                                      | Default     |
| ------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| `cancelCallback` _(required)_  | --                     | Callback that must be invoked when the 'Cancel' button is pressed.                                               | `() => Promise<void>`                                                     | `undefined` |
| `connectCallback` _(required)_ | --                     | Callback that must be invoked when the 'Connect' button is pressed.                                              | `(data: GXServerConnectionData) => Promise<ConnectionResultData>`         | `undefined` |
| `defaultConnectionData`        | --                     | Initial user values ​​for the case in which the user returns to the login modal after successful authentication. | `undefined \| { serverUrl: string; userName: string; password: string; }` | `undefined` |
| `enableCustomServer`           | `enable-custom-server` | `true` if the user should be allowed to manually enter a server URL.                                             | `boolean`                                                                 | `false`     |
| `enableUserLogged`             | `enable-user-logged`   | `true` if the user is already authenticated in the Web IDE.                                                      | `boolean`                                                                 | `false`     |
| `serverUrls` _(required)_      | --                     | Array of cataloged server URLs to be displayed in the combo.                                                     | `ComboBoxItemModel[]`                                                     | `undefined` |


## Events

| Event                         | Description                                               | Type                  |
| ----------------------------- | --------------------------------------------------------- | --------------------- |
| `componentDidRenderFirstTime` | Fired when the component has rendered for the first time. | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
