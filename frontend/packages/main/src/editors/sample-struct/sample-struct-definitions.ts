import { AssetsManager, StructItemKind } from "@genexusm-sdk/common-components";
import { Consts } from "../../consts";

export namespace SampleObjectProperties {
    export const NAME = 'Name';
    export const DESCRIPTION = 'Description';
    export const KB_OBJECT_NAME = 'KBObjectName';
}

export namespace SamplePartColumns {
    export const NAME = SampleObjectProperties.NAME;
    export const DESCRIPTION = SampleObjectProperties.DESCRIPTION;
    export const KB_OBJECT_NAME = SampleObjectProperties.KB_OBJECT_NAME;
}

export namespace SamplePartIcons {
    export const ROOT = AssetsManager.getIconPath({
        category: 'objects',
        name: 'data-provider'
    }, Consts.Assets.VENDOR_ALIAS);
    export const ITEM = AssetsManager.getIconPath({
        category: 'objects',
        name: 'attribute'
    }, Consts.Assets.VENDOR_ALIAS);
}

export namespace SamplePartItemKinds {
    export const SamplePartItem = new StructItemKind({
        id: 'SamplePartItem',
        description: 'Item',
        iconName: SamplePartIcons.ITEM,
        children: []
    });

    export const SamplePartRoot = new StructItemKind({
        id: 'SamplePartRoot',
        description: 'Root',
        iconName: SamplePartIcons.ROOT,
        children: [
            SamplePartItemKinds.SamplePartItem
        ]
    });

}