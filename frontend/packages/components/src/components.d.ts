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
    interface SvConnectGxServer {
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
    interface SvKbManagerImport {
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
export interface SvConnectGxServerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSvConnectGxServerElement;
}
export interface SvKbManagerImportCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSvKbManagerImportElement;
}
declare global {
    interface HTMLSvConnectGxServerElementEventMap {
        "componentDidRenderFirstTime": string;
    }
    interface HTMLSvConnectGxServerElement extends Components.SvConnectGxServer, HTMLStencilElement {
        addEventListener<K extends keyof HTMLSvConnectGxServerElementEventMap>(type: K, listener: (this: HTMLSvConnectGxServerElement, ev: SvConnectGxServerCustomEvent<HTMLSvConnectGxServerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLSvConnectGxServerElementEventMap>(type: K, listener: (this: HTMLSvConnectGxServerElement, ev: SvConnectGxServerCustomEvent<HTMLSvConnectGxServerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLSvConnectGxServerElement: {
        prototype: HTMLSvConnectGxServerElement;
        new (): HTMLSvConnectGxServerElement;
    };
    interface HTMLSvKbManagerImportElementEventMap {
        "componentDidRenderFirstTime": boolean;
        "componentDidLoadEvent": boolean;
    }
    interface HTMLSvKbManagerImportElement extends Components.SvKbManagerImport, HTMLStencilElement {
        addEventListener<K extends keyof HTMLSvKbManagerImportElementEventMap>(type: K, listener: (this: HTMLSvKbManagerImportElement, ev: SvKbManagerImportCustomEvent<HTMLSvKbManagerImportElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLSvKbManagerImportElementEventMap>(type: K, listener: (this: HTMLSvKbManagerImportElement, ev: SvKbManagerImportCustomEvent<HTMLSvKbManagerImportElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLSvKbManagerImportElement: {
        prototype: HTMLSvKbManagerImportElement;
        new (): HTMLSvKbManagerImportElement;
    };
    interface HTMLElementTagNameMap {
        "sv-connect-gx-server": HTMLSvConnectGxServerElement;
        "sv-kb-manager-import": HTMLSvKbManagerImportElement;
    }
}
declare namespace LocalJSX {
    interface SvConnectGxServer {
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
        "onComponentDidRenderFirstTime"?: (event: SvConnectGxServerCustomEvent<string>) => void;
        /**
          * Array of cataloged server URLs to be displayed in the combo.
         */
        "serverUrls": ComboBoxModel;
    }
    interface SvKbManagerImport {
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
        "onComponentDidLoadEvent"?: (event: SvKbManagerImportCustomEvent<boolean>) => void;
        /**
          * This event is emitted once just after the component is fully loaded and the first render() occurs
         */
        "onComponentDidRenderFirstTime"?: (event: SvKbManagerImportCustomEvent<boolean>) => void;
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
        "sv-connect-gx-server": SvConnectGxServer;
        "sv-kb-manager-import": SvKbManagerImport;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sv-connect-gx-server": LocalJSX.SvConnectGxServer & JSXBase.HTMLAttributes<HTMLSvConnectGxServerElement>;
            "sv-kb-manager-import": LocalJSX.SvKbManagerImport & JSXBase.HTMLAttributes<HTMLSvKbManagerImportElement>;
        }
    }
}
