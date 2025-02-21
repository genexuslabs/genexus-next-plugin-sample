/** @jsx WindowForm.dom  */

import { WindowForm } from "@genexus/ide-sdk/common-components";
import { CommServices } from "../communication/comm-services";
import { UIServices } from "@genexus/ide-sdk/architecture-ui-framework";

export class SampleDialog extends WindowForm {
    constructor() {
        super({
            title: 'Sample Dialog',
            width: 800,
            height: 460,
            resizable: false,
            showCloseButton: true
        });
    }

    private _callToServerCallback = async (text:string) => {        
        const data = await CommServices.get().sample.echo(UIServices.kb.currentKB.guid.toString(), UIServices.kb.currentModel.guid.toString(), text);
        return data ? `${data.id.toString()}: ${data.value}` : text;  
    }

    private _cancelCallback = async () => {
        this.onCancel();
    }

    private _confirmCallback = async () => {
        this.onConfirm();
    }

    render() {
        return (
            <sv-echo-console 
                callToServerCallback={this._callToServerCallback}
                cancelCallback={this._cancelCallback}
                confirmCallback={this._confirmCallback}
            />
        )
    }
}