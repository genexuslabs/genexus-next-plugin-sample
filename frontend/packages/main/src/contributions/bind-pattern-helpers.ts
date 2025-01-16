import { interfaces } from 'inversify';
import { IPatternHelperDescriptor } from '@genexus/ide-sdk/patterns-common';
import { GXObjectClasses } from '@genexus/ide-sdk/genexus-common';

import { WorkWithWebEditorHelper } from '../editors/ww-web-pattern/work-with-web-editor-helper';
import { WorkWithWebSettingsEditorHelper } from '../editors/ww-web-pattern/work-with-web-settings-editor-helper';

export function bindPatternHelpers(bind: interfaces.Bind) {

    bind<IPatternHelperDescriptor>(IPatternHelperDescriptor).toConstantValue({
        patternId: GXObjectClasses.WORK_WITH_WEB_PATTERN_ID,
        iconName: 'patterns/work-with-web',
        instanceEditorHelper: new WorkWithWebEditorHelper(),
        settingsEditorHelper: new WorkWithWebSettingsEditorHelper(),
    });

}