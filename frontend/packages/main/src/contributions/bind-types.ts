
import { interfaces } from 'inversify';
import { Guid } from '@genexus/ide-sdk/common';
import { AssetsManager } from '@genexus/ide-sdk/common-components';
import { IKBObjectCategoryDescriptor, IKBObjectDescriptor, IKBObjectPartDescriptor } from '@genexus/ide-sdk/architecture-common';
import { PartClasses, SourcePart } from '@genexus/ide-sdk/language-common';

import { Consts } from '../consts';
import { SampleObject } from '../objects/sample-object';
import { SampleStructPart } from '../parts/sample-struct-part';
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
        iconName: AssetsManager.getIconPath({
            category: 'objects',
            name: 'data-provider'
        }, Consts.Assets.VENDOR_ALIAS),
        factory: (model) => new SampleObject(model),
        sortParts: (parts) => moveToFirstPosition(parts, PartClasses.MULTI_REGION_SOURCE_PART)
    });

    bind<IKBObjectDescriptor>(IKBObjectDescriptor).toConstantValue({
        id: Consts.ObjectClasses.SAMPLE_SOURCE_OBJECT,
        iconName: AssetsManager.getIconPath({
            category: 'objects',
            name: 'category'
        }, Consts.Assets.VENDOR_ALIAS),
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

const moveToFirstPosition = (guids: Guid[], target: Guid) => {
    return guids.sort((g1, g2) => Guid.equals(g1, g2) ? 0 : Guid.equals(g1, target) ? -1 : 1);
}