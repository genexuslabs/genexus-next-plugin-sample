
import { interfaces } from 'inversify';

import {
    IKBObjectCategoryDescriptor,
    IKBObjectDescriptor,
    IKBObjectPartDescriptor,
} from '@genexusm-sdk/architecture-common';
import { Consts } from '../consts';
import { SampleObject } from '../objects/sample-object';
import { SamplePart } from '../parts/sample-part';
import { PartClasses } from '@genexusm-sdk/language-common';
import { Guid } from '@genexusm-sdk/common';

export function bindTypes(bind: interfaces.Bind) {

    bind<IKBObjectCategoryDescriptor>(IKBObjectCategoryDescriptor).toConstantValue({
        id: Consts.Categories.SAMPLE_CATEGORY,
        iconName: '',
        visible: true
    });

    // KBObject descriptors

    bind<IKBObjectDescriptor>(IKBObjectDescriptor).toConstantValue({
        id: Consts.ObjectClasses.SAMPLE_OBJECT,
        iconName: 'sv/objects/data-provider',
        factory: (model) => new SampleObject(model),
        sortParts: (parts) => moveToFirstPosition(parts, PartClasses.MULTI_REGION_SOURCE_PART)
    });

    // KBObjectPart Descriptors

    bind<IKBObjectPartDescriptor>(IKBObjectPartDescriptor).toConstantValue({
        id: Consts.PartClasses.SAMPLE_PART,        
        iconName: '',
        isInterface: false,
        factory: (kbObject) => new SamplePart(kbObject)
    });
}

const moveToFirstPosition = (guids:Guid[], target:Guid) => {
    return guids.sort((g1, g2) => Guid.equals(g1, g2) ? 0 : Guid.equals(g1, target) ? -1 : 1);
}