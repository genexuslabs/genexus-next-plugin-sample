/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CallToServerCallback } from "./components/echo-console/types";
import { CancelCallback, ConfirmCallback } from "./common/types";
import { ContextMenuCallback, LoadObjectsCallback, ObjectType, OpenObjectCallback, SelectObjectCallback } from "./components/object-selector/types";
export { CallToServerCallback } from "./components/echo-console/types";
export { CancelCallback, ConfirmCallback } from "./common/types";
export { ContextMenuCallback, LoadObjectsCallback, ObjectType, OpenObjectCallback, SelectObjectCallback } from "./components/object-selector/types";
export namespace Components {
    interface SvEchoConsole {
        /**
          * Callback invoked to call server.
         */
        "callToServerCallback": CallToServerCallback;
        /**
          * Callback invoked to cancel.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked to confirm.
         */
        "confirmCallback": ConfirmCallback;
    }
    interface SvKbObjectNameEditor {
        /**
          * Callback invoked to cancel.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked to confirm.
         */
        "confirmCallback": ConfirmCallback;
        /**
          * KB Object Name value.
         */
        "value": string;
    }
    interface SvObjectSelector {
        /**
          * Callback invoked to open the context menu
         */
        "contextMenuCallback": ContextMenuCallback;
        /**
          * Callback invoked to load objects (filtered by selected type)
         */
        "loadObjectsCallback": LoadObjectsCallback;
        /**
          * The available object types.
         */
        "objectTypes": ObjectType[];
        /**
          * Callback invoked to open the selected objects
         */
        "openObjectCallback": OpenObjectCallback;
        /**
          * Callback invoked when selection is changed
         */
        "selectObjectCallback": SelectObjectCallback;
    }
}
declare global {
    interface HTMLSvEchoConsoleElement extends Components.SvEchoConsole, HTMLStencilElement {
    }
    var HTMLSvEchoConsoleElement: {
        prototype: HTMLSvEchoConsoleElement;
        new (): HTMLSvEchoConsoleElement;
    };
    interface HTMLSvKbObjectNameEditorElement extends Components.SvKbObjectNameEditor, HTMLStencilElement {
    }
    var HTMLSvKbObjectNameEditorElement: {
        prototype: HTMLSvKbObjectNameEditorElement;
        new (): HTMLSvKbObjectNameEditorElement;
    };
    interface HTMLSvObjectSelectorElement extends Components.SvObjectSelector, HTMLStencilElement {
    }
    var HTMLSvObjectSelectorElement: {
        prototype: HTMLSvObjectSelectorElement;
        new (): HTMLSvObjectSelectorElement;
    };
    interface HTMLElementTagNameMap {
        "sv-echo-console": HTMLSvEchoConsoleElement;
        "sv-kb-object-name-editor": HTMLSvKbObjectNameEditorElement;
        "sv-object-selector": HTMLSvObjectSelectorElement;
    }
}
declare namespace LocalJSX {
    interface SvEchoConsole {
        /**
          * Callback invoked to call server.
         */
        "callToServerCallback": CallToServerCallback;
        /**
          * Callback invoked to cancel.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked to confirm.
         */
        "confirmCallback": ConfirmCallback;
    }
    interface SvKbObjectNameEditor {
        /**
          * Callback invoked to cancel.
         */
        "cancelCallback": CancelCallback;
        /**
          * Callback invoked to confirm.
         */
        "confirmCallback": ConfirmCallback;
        /**
          * KB Object Name value.
         */
        "value": string;
    }
    interface SvObjectSelector {
        /**
          * Callback invoked to open the context menu
         */
        "contextMenuCallback": ContextMenuCallback;
        /**
          * Callback invoked to load objects (filtered by selected type)
         */
        "loadObjectsCallback": LoadObjectsCallback;
        /**
          * The available object types.
         */
        "objectTypes"?: ObjectType[];
        /**
          * Callback invoked to open the selected objects
         */
        "openObjectCallback": OpenObjectCallback;
        /**
          * Callback invoked when selection is changed
         */
        "selectObjectCallback": SelectObjectCallback;
    }
    interface IntrinsicElements {
        "sv-echo-console": SvEchoConsole;
        "sv-kb-object-name-editor": SvKbObjectNameEditor;
        "sv-object-selector": SvObjectSelector;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sv-echo-console": LocalJSX.SvEchoConsole & JSXBase.HTMLAttributes<HTMLSvEchoConsoleElement>;
            "sv-kb-object-name-editor": LocalJSX.SvKbObjectNameEditor & JSXBase.HTMLAttributes<HTMLSvKbObjectNameEditorElement>;
            "sv-object-selector": LocalJSX.SvObjectSelector & JSXBase.HTMLAttributes<HTMLSvObjectSelectorElement>;
        }
    }
}
