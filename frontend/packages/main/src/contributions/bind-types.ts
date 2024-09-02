
import { interfaces } from 'inversify';

import {
    IKBObjectCategoryDescriptor,
    IKBObjectDescriptor,
    IKBObjectPartDescriptor,
} from '@genexusm-sdk/architecture-common';
import { Consts } from '../consts';
import { SampleObject } from '../objects/sample-object';
import { SampleSourcePart } from '../parts/sample-source-part';

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
        factory: (model) => new SampleObject(model)
    });

    // KBObjectPart Descriptors

    bind<IKBObjectPartDescriptor>(IKBObjectPartDescriptor).toConstantValue({
        id: Consts.PartClasses.SAMPLE_SOURCE_PART,        
        iconName: '',
        isInterface: false,
        factory: (kbObject) => new SampleSourcePart(kbObject)
    });
}