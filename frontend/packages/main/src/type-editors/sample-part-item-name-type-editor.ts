

import { TypeDescriptorContext, UITypeEditor, UITypeEditorEditOptions, UITypeEditorEditStyle } from '@genexusm/sdk/common-properties';
import { DialogResult } from '@genexusm/sdk/common-components';
import { KBObjectNameDialog } from '../dialogs/kb-object-name-dialog';

export  class SamplePartItemKBObjectNameTypeEditor extends UITypeEditor {
    private _options: UITypeEditorEditOptions;
    private _value: string;

    getEditStyle(context: TypeDescriptorContext) {
        return UITypeEditorEditStyle.MODAL;
    }

    async beginEditValue(options: UITypeEditorEditOptions) {
        this._options = options;
        this._value = options.value;

        let dialog = new KBObjectNameDialog(this._value || ''); 
        try {
            if (await dialog.showModal() === DialogResult.OK) {
                this._value = dialog.value;
                await this._options.service.endEdit();
            }
            else
                await this._options.service.endEdit(true);
        }
        finally {
            await dialog.destroy();
        }
    }

    endEditValue() {
        return this._value;
    }
}
