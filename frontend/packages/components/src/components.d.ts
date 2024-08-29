/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ConnectionResultData, GXServerConnectionData, GXServerConnectionDefault } from "./components/connect-to-gx-server/types";
import { ComboBoxModel } from "@genexus/chameleon-controls-library";
import { CancelCallback, ImportCallback, LoadCallback, ObjectContextMenuCallback, OptionsCallback } from "./components/kb-manager-import/types";
import { ImportItemResultData } from "./common/types";
export { ConnectionResultData, GXServerConnectionData, GXServerConnectionDefault } from "./components/connect-to-gx-server/types";
export { ComboBoxModel } from "@genexus/chameleon-controls-library";
export { CancelCallback, ImportCallback, LoadCallback, ObjectContextMenuCallback, OptionsCallback } from "./components/kb-manager-import/types";
export { ImportItemResultData } from "./common/types";
export namespace Components {
    interface K2bConnectGxServer {
        /**
          * Callback that must be invoked when the 'Cancel' button is pressed.
         */
        "cancelCallback": () => Promise<void>;
        /**
          * Callback that must be invoked when the 'Connect' button is pressed.
         */
        "connectCallback": (
    data: GXServerConnectionData
  ) => Promise<ConnectionResultData>;
        /**
          * Initial user values ​​for the case in which the user returns to the login modal after successful authentication.
         */
        "defaultConnectionData"?: GXServerConnectionDefault;
        /**
          * `true` if the user should be allowed to manually enter a server URL.
         */
        "enableCustomServer": boolean;
        /**
          * `true` if the user is already authenticated in the Web IDE.
         */
        "enableUserLogged": boolean;
        /**
          * Array of cataloged server URLs to be displayed in the combo.
         */
        "serverUrls": ComboBoxModel;
    }
    interface K2bKbManagerImport {
        /**
          * Add the result of importing an item
         */
        "addResultItem": (item: ImportItemResultData) => Promise<void>;
        /**
          * Callback invoked when the user wants to cancel the export process.
          * @returns It returns a boolean indicating whether the process could be canceled or not.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked when the user wants to initiate the import process.
         */
        "importCallback": ImportCallback;
        /**
          * Callback invoked when the user wants to load the xpz information
         */
        "loadCallback": LoadCallback;
        /**
          * It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions)
         */
        "objectContextMenuCallback": ObjectContextMenuCallback;
        /**
          * Callback invoked when the user wants to access the export options.
         */
        "optionsCallback": OptionsCallback;
        /**
          * The name of the imported xml or xps file
         */
        "selectedFile": File | undefined;
        /**
          * It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions)
         */
        "statusMinimal": false;
        /**
          * If true, it will display a loader when needed.
         */
        "topStateBar": true;
    }
}
export interface K2bConnectGxServerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLK2bConnectGxServerElement;
}
export interface K2bKbManagerImportCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLK2bKbManagerImportElement;
}
declare global {
    interface HTMLK2bConnectGxServerElementEventMap {
        "componentDidRenderFirstTime": string;
    }
    interface HTMLK2bConnectGxServerElement extends Components.K2bConnectGxServer, HTMLStencilElement {
        addEventListener<K extends keyof HTMLK2bConnectGxServerElementEventMap>(type: K, listener: (this: HTMLK2bConnectGxServerElement, ev: K2bConnectGxServerCustomEvent<HTMLK2bConnectGxServerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLK2bConnectGxServerElementEventMap>(type: K, listener: (this: HTMLK2bConnectGxServerElement, ev: K2bConnectGxServerCustomEvent<HTMLK2bConnectGxServerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLK2bConnectGxServerElement: {
        prototype: HTMLK2bConnectGxServerElement;
        new (): HTMLK2bConnectGxServerElement;
    };
    interface HTMLK2bKbManagerImportElementEventMap {
        "componentDidRenderFirstTime": boolean;
        "componentDidLoadEvent": boolean;
    }
    interface HTMLK2bKbManagerImportElement extends Components.K2bKbManagerImport, HTMLStencilElement {
        addEventListener<K extends keyof HTMLK2bKbManagerImportElementEventMap>(type: K, listener: (this: HTMLK2bKbManagerImportElement, ev: K2bKbManagerImportCustomEvent<HTMLK2bKbManagerImportElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLK2bKbManagerImportElementEventMap>(type: K, listener: (this: HTMLK2bKbManagerImportElement, ev: K2bKbManagerImportCustomEvent<HTMLK2bKbManagerImportElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLK2bKbManagerImportElement: {
        prototype: HTMLK2bKbManagerImportElement;
        new (): HTMLK2bKbManagerImportElement;
    };
    interface HTMLElementTagNameMap {
        "k2b-connect-gx-server": HTMLK2bConnectGxServerElement;
        "k2b-kb-manager-import": HTMLK2bKbManagerImportElement;
    }
}
declare namespace LocalJSX {
    interface K2bConnectGxServer {
        /**
          * Callback that must be invoked when the 'Cancel' button is pressed.
         */
        "cancelCallback": () => Promise<void>;
        /**
          * Callback that must be invoked when the 'Connect' button is pressed.
         */
        "connectCallback": (
    data: GXServerConnectionData
  ) => Promise<ConnectionResultData>;
        /**
          * Initial user values ​​for the case in which the user returns to the login modal after successful authentication.
         */
        "defaultConnectionData"?: GXServerConnectionDefault;
        /**
          * `true` if the user should be allowed to manually enter a server URL.
         */
        "enableCustomServer"?: boolean;
        /**
          * `true` if the user is already authenticated in the Web IDE.
         */
        "enableUserLogged"?: boolean;
        /**
          * Fired when the component has rendered for the first time.
         */
        "onComponentDidRenderFirstTime"?: (event: K2bConnectGxServerCustomEvent<string>) => void;
        /**
          * Array of cataloged server URLs to be displayed in the combo.
         */
        "serverUrls": ComboBoxModel;
    }
    interface K2bKbManagerImport {
        /**
          * Callback invoked when the user wants to cancel the export process.
          * @returns It returns a boolean indicating whether the process could be canceled or not.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked when the user wants to initiate the import process.
         */
        "importCallback": ImportCallback;
        /**
          * Callback invoked when the user wants to load the xpz information
         */
        "loadCallback": LoadCallback;
        /**
          * It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions)
         */
        "objectContextMenuCallback": ObjectContextMenuCallback;
        /**
          * This event is emitted once just after the component is fully loaded and the first render() occurs.
         */
        "onComponentDidLoadEvent"?: (event: K2bKbManagerImportCustomEvent<boolean>) => void;
        /**
          * This event is emitted once just after the component is fully loaded and the first render() occurs
         */
        "onComponentDidRenderFirstTime"?: (event: K2bKbManagerImportCustomEvent<boolean>) => void;
        /**
          * Callback invoked when the user wants to access the export options.
         */
        "optionsCallback": OptionsCallback;
        /**
          * The name of the imported xml or xps file
         */
        "selectedFile"?: File | undefined;
        /**
          * It displays the status buttons (errors, warning, succeeded) with the minimal ui (no captions)
         */
        "statusMinimal"?: false;
        /**
          * If true, it will display a loader when needed.
         */
        "topStateBar"?: true;
    }
    interface IntrinsicElements {
        "k2b-connect-gx-server": K2bConnectGxServer;
        "k2b-kb-manager-import": K2bKbManagerImport;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "k2b-connect-gx-server": LocalJSX.K2bConnectGxServer & JSXBase.HTMLAttributes<HTMLK2bConnectGxServerElement>;
            "k2b-kb-manager-import": LocalJSX.K2bKbManagerImport & JSXBase.HTMLAttributes<HTMLK2bKbManagerImportElement>;
        }
    }
}
