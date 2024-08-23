/** @jsx SampleToolWindow.dom */

import { AbstractToolWindow } from "@genexusm-sdk/architecture-ui-framework";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [tagName: string]: any; // Any tag element is valid (could be defined by extension)
        }
    }

    // namespace React {
    //     interface HTMLAttributes<T>  {
    //         [tagName: string]: any;
    //     }
    // }  
}

export class SampleToolWindow extends AbstractToolWindow {

    get name() {
        return 'gx.plugin_sample.sampleToolWindow'
    }

    get title(){
        return 'Sample Tool Window';

    }

    render() {
        return (<div>
            <my-component first="Stencil" last="'Don't call me a framework'"></my-component>
        </div>);
    }
}