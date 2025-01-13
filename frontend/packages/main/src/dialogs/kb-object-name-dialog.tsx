/** @jsx WindowForm.dom  */

import { WindowForm } from "@genexusm/sdk/common-components";

export class KBObjectNameDialog extends WindowForm {

    private _inputEl: HTMLInputElement;
    private _value: string;

    constructor(value: string) {
        super({
            title: 'KBObjectName',
            width: 800,
            height: 460,
            resizable: false,
            showCloseButton: true
        });

        this._value = value;
    }

    get value() {
        return this._inputEl.value;
    }

    render() {
        return (
            <ch-edit value={this._value} ref={(e: HTMLInputElement) => this._inputEl = e} />
        )
    }
}