import { interfaces } from 'inversify';
import { IUITypeEditorDescriptor } from '@genexusm/sdk/common-properties';
import { SamplePartItemKBObjectNameTypeEditor } from '../type-editors/sample-part-item-name-type-editor';

export function bindUITypeEditorDescriptors(bind: interfaces.Bind) {

    bind<IUITypeEditorDescriptor>(IUITypeEditorDescriptor).toConstantValue({
        id: 'SamplePartItemKBObjectNameTypeEditor',
        factory: () => new SamplePartItemKBObjectNameTypeEditor()
    });
}