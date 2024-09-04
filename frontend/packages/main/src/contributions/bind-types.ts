
import { interfaces } from 'inversify';

import {
    IKBObjectCategoryDescriptor,
    IKBObjectDescriptor,
    IKBObjectPartDescriptor,
} from '@genexusm-sdk/architecture-common';
import { Consts } from '../consts';
import { SampleObject } from '../objects/sample-object';
import { SampleStructPart } from '../parts/sample-struct-part';
import { PartClasses, SourcePart } from '@genexusm-sdk/language-common';
import { Guid } from '@genexusm-sdk/common';
import { SampleSourceObject } from '../objects/sample-source-object';

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

    bind<IKBObjectDescriptor>(IKBObjectDescriptor).toConstantValue({
        id: Consts.ObjectClasses.SAMPLE_SOURCE_OBJECT,
        iconName: 'sv/objects/category',
        factory: (model) => new SampleSourceObject(model)
    });

    // KBObjectPart Descriptors

    bind<IKBObjectPartDescriptor>(IKBObjectPartDescriptor).toConstantValue({
        id: Consts.PartClasses.SAMPLE_STRUCT_PART,        
        iconName: '',
        isInterface: false,
        factory: (kbObject) => new SampleStructPart(kbObject)
    });

    bind<IKBObjectPartDescriptor>(IKBObjectPartDescriptor).toConstantValue({
        id: Consts.PartClasses.SAMPLE_SOURCE_PART,
        iconName: '',
        isInterface: true,
        factory: (kbObject) => new SourcePart(kbObject, Consts.PartClasses.SAMPLE_SOURCE_PART)
    });
}

const moveToFirstPosition = (guids:Guid[], target:Guid) => {
    return guids.sort((g1, g2) => Guid.equals(g1, g2) ? 0 : Guid.equals(g1, target) ? -1 : 1);
}