/** @jsx WindowForm.dom  */

import { WindowForm } from "@genexusm-sdk/common-components";
import { CommServices } from "../communication/comm-services";
import { UIServices } from "@genexusm-sdk/architecture-ui-framework";

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
        const connInfo = UIServices.kb.currentKB.connectionInfo;
        const data = await CommServices.get().sample.echo(connInfo.location, connInfo.id, text);
        return data ? `${data.id.toString()}: ${data.value}` : text;  
    }

    render() {
        return (
            <sv-echo-console 
                callToServerCallback={this._callToServerCallback}
            />
        )
    }
}