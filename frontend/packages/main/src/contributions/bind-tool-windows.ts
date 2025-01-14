
import { interfaces } from 'inversify';
import { IToolWindowDescriptor, ToolWindowDockLocation } from '@genexusm/sdk/architecture-ui-framework';

import { SampleToolWindow } from '../tool-windows/sample-tool-window';

export function bindToolWindows(bind: interfaces.Bind) {

    bind<IToolWindowDescriptor>(IToolWindowDescriptor).toDynamicValue(ctx => ({
        name: 'gx.plugin_sample.sampleToolWinoow',
        location: ToolWindowDockLocation.Main,
        factory: () => new SampleToolWindow(),
        visible: true
    }));
}