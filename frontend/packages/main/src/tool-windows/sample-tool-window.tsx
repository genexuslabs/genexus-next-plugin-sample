/** @jsx SampleToolWindow.dom */

import { ContextMenuInfo, ObjectDescription } from "@genexusm-plugin-sample/components/dist/types/components/object-selector/types";
import { ObjectType } from "@genexusm-plugin-sample/components/loader";
import { Consts } from "../consts";
import { Menus } from "../contributions/bind-menus";

import { Guid } from "@genexus/ide-sdk/common";
import { AbstractToolWindow, UIServices } from "@genexus/ide-sdk/architecture-ui-framework";
import { AssetsManager } from "@genexus/ide-sdk/common-components";
import { KBObjectDescriptor, KBObjectInfo, ObjectTypeFlags } from "@genexus/ide-sdk/architecture-common";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [tagName: string]: any; // Any tag element is valid (could be defined by extension)
        }
    }
}

export class SampleToolWindow extends AbstractToolWindow {
    private static readonly ALL_TYPE: ObjectType = {
        id: '*',
        name: '*All'
    }

    constructor() {
        super();
        this._subscribeToEvents();
    }

    get name() {
        return 'gx.plugin_sample.sampleToolWindow'
    }

    get title() {
        return 'Sample Tool Window';

    }

    get iconName() {
        return AssetsManager.getIconPath({
            category: 'objects',
            name: 'data-selector'
        }, Consts.Assets.VENDOR_ALIAS);
    }

    private _subscribeToEvents() {
        UIServices.kb.currentKBChanged(() => this.update());
    }

    private _getAllTypes(): KBObjectDescriptor[] {
        return KBObjectDescriptor.getAll().filter(descriptor =>
            (descriptor.flags & ObjectTypeFlags.NO_OPENABLE) === 0 && (descriptor.flags & ObjectTypeFlags.NO_SHOW) === 0);
    }

    private _getDescriptorId(descriptor: KBObjectDescriptor): string {
        return descriptor.id.toString();
    }

    private _getTypes(): ObjectType[] {
        const types: ObjectType[] = [SampleToolWindow.ALL_TYPE];
        const descriptors = this._getAllTypes();
        descriptors.map(descriptor => types.push({
            id: this._getDescriptorId(descriptor),
            name: descriptor.name,
            icon: descriptor.iconName
        }));

        return types;
    }

    private async _getObjects(type: string) {
        if (!type)
            return [];

        const model = UIServices.kb.currentModel;
        if (!model)
            return [];

        let objectsInfo: KBObjectInfo[] = [];
        if (type === SampleToolWindow.ALL_TYPE.id) {
            const result = await model.objects.searchInfos({
                typeIds: this._getAllTypes().map(type => type.id)
            });
            objectsInfo = result.objects;
        }
        else {
            const typeGuid = new Guid(type);
            const resultObjects: Iterable<KBObjectInfo> = await model.objects.getObjectsInfoByType(typeGuid);
            for (let obj of resultObjects)
                objectsInfo.push(obj);
        }

        return objectsInfo;
    }

    private _contextMenuCallback = async (contextMenuInfo: ContextMenuInfo) => {
        UIServices.menu.showContextMenu({
            menuPath: Menus.SAMPLE_TOOLWINDOW_MENU,
            anchor: {
                x: contextMenuInfo.clientX,
                y: contextMenuInfo.clientY
            },
            data: {
                context: {
                    objectGuid: new Guid(contextMenuInfo.id)
                }
            }
        });
    }

    private _loadObjectsCallback = async (type: string) => {
        const objects: ObjectDescription[] = [];
        const objectsInfo: KBObjectInfo[] = await this._getObjects(type);
        for (let obj of objectsInfo) {
            objects.push({
                id: obj.guid.toString(),
                name: obj.name,
                description: obj.description,
                typeId: this._getDescriptorId(obj.typeDescriptor)
            })
        }
        return objects;
    }

    private _openObjectCallback = async (id: string) => {
        const model = UIServices.kb.currentModel;
        if (model) {
            const guid = new Guid(id);
            const obj = await model.objects.getByGuid(guid);
            if (obj)
                UIServices.documentManager.open(obj);
        }
    }

    private _selectObjectCallback = async (id: string) => {
        const model = UIServices.kb.currentModel;
        if (model) {
            const guid = new Guid(id);
            const obj = await model.objects.getByGuid(guid);
            if (obj)
                this.setSelection([obj]);
        }
    }

    render() {
        if (!UIServices.kb.currentKB)
            return (<div />);

        return (<sv-object-selector
            style={{ height: "100%" }}
            objectTypes={this._getTypes()}
            contextMenuCallback={this._contextMenuCallback}
            loadObjectsCallback={this._loadObjectsCallback}
            openObjectCallback={this._openObjectCallback}
            selectObjectCallback={this._selectObjectCallback}
        />);
    }
}