/** @jsx WindowForm.dom  */

import { WindowForm } from "@genexusm/sdk/common-components";

export class KBObjectNameDialog extends WindowForm {

    private _kbObjectNameEl: HTMLSvKbObjectNameEditorElement;
    private _value: string;

    constructor(value: string) {
        super({
            title: 'KBObjectName',
            width: 600,
            height: 250,
            resizable: false,
            showCloseButton: true
        });

        this._value = value;
    }

    get value() {
        return this._value;
    }

    private _cancelCallback = async () => {
        this.onCancel();
    }

    private _confirmCallback = async () => {
        this._value = this._kbObjectNameEl.value;
        this.onConfirm();
    }

    render() {
        return (
            <sv-kb-object-name-editor 
                value={this._value}
                cancelCallback={this._cancelCallback}
                confirmCallback={this._confirmCallback}
                ref={(el:HTMLSvKbObjectNameEditorElement) => this._kbObjectNameEl = el}
            /> 
        )
    }
}