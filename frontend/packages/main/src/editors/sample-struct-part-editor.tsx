
/** @jsx SampleSourcePartEditor.dom */

import { BLEvents, StructPart, StructPartItem } from "@genexusm-sdk/architecture-common";
import { StructPartEditor } from "@genexusm-sdk/architecture-ui-framework";
import { EventBroker, Guid, MaybePromise } from "@genexusm-sdk/common";
import { KBObjectPartChangedEventData } from "@genexusm-sdk/common-comm-layer";
import { SampleStructPart } from "../parts/sample-struct-part";
import { StructColumn, StructColumns, StructEditorSettings, StructItem, StructItemKind, StructPosition } from "@genexusm-sdk/common-components";
import { SamplePartColumns, SamplePartItemKinds } from "./sample-struct/sample-struct-definitions";
import { SamplePartItemTypes } from "../parts/sample-part-structure/sample-part-item-types";
import { SampleStructItem } from "./sample-struct/sample-struct-items";

export class SampleStructPartEditor extends StructPartEditor {
    private _initialized: boolean = false;
    private _isActive: boolean = false;
    private _pendingReload: boolean;

    constructor() {
        super();

        this._subscribeToEvents();
    }

    get structurePart(): SampleStructPart {
        return this.part as SampleStructPart;
    }    

    async activate(): Promise<void> {
        let initialized = this._initialized;
        this._initialized = true;
        if (this._pendingReload) {
            await this.structurePart.reload();
        }

        if (!initialized || this._pendingReload)
            await this.updateView();

        this._isActive = true;
        this._pendingReload = false;
    }

    async deactivate(): Promise<void> {
        this._isActive = false;
    }

    async updateView(): Promise<void> {
        if (!this._initialized)
            return;

        return super.updateView();
    }

    private _subscribeToEvents() {
        // TODO: improve this in a cleaner way
        this.disposables.add(EventBroker.on(BLEvents.KB_OBJECT_PART_CHANGED, (e: KBObjectPartChangedEventData) => this._onPartChanged(e)));
    }

    private _onPartChanged(e: KBObjectPartChangedEventData) {
        if (this._isActive)
            return;

        let objGuid = new Guid(e.objectGuid);
        let partGuid = new Guid(e.partType);

        if (objGuid.equals(this.part.kbObject.guid) && !partGuid.equals(this.part.typeDescriptor.id)) {
            this._pendingReload = true;
        }
    }

    //#region StructPartEditor
    defineSettings(settings: StructEditorSettings) {
        settings.showRootItem = true;
        settings.supportsUndoRedo = true;
    }

    defineColumns(columns: StructColumns) {
        super.defineColumns(columns);

        let column = new StructColumn(columns, {
            name: SamplePartColumns.NAME,
            displayName: 'Name',
            isValueUniqueAmongAll: true,
            isValueRequired: true
        });
        columns.add(column);

        column = new StructColumn(columns, {
            name: SamplePartColumns.DESCRIPTION,
            displayName: 'Description',
            width: 150,
            isValueRequired: false
        });
        columns.add(column);

        column = new StructColumn(columns, {
            name: SamplePartColumns.KB_OBJECT_NAME,
            displayName: 'KB Object Name',
            width: 150,
            isValueRequired: false
        });
        columns.add(column);
    }

    createItem(kind: StructItemKind): MaybePromise<StructItem> {
        if (kind == SamplePartItemKinds.SamplePartItem)
            return new SampleStructItem(
                this,
                new StructPartItem(this.part as StructPart, {
                    type: SamplePartItemTypes.ITEM
                })
            );
    }

    protected async onBeforeInsertItem(position: StructPosition, index: number, parent: StructItem | undefined, item: StructItem): Promise<void> {
        if (!parent)
            return;

        const parentPartItem = parent.data as StructPartItem;
        const partItem = item.data as StructPartItem;
        parentPartItem.insertItem(index, partItem);
    }

    protected onBeforeRemoveItem(item: StructItem) {
        let parentPartItem = item.parent?.data as StructPartItem;
        let partItem = item.data as StructPartItem;

        if (parentPartItem)
            parentPartItem.removeItem(partItem);
    }

    protected loadFromPart(): MaybePromise<void> {
        let rootItem = this._loadItems(this.structurePart.rootItem);
        this.insertItem(StructPosition.root(), rootItem);
    }

    private _loadItems(rootItem: StructPartItem): StructItem {
        const rootStructItem = new StructItem({
            editor: this,
            kind: SamplePartItemKinds.SamplePartRoot,
            data: rootItem
        });

        for (let samplePartItem of rootItem.getItems()) { 
            if (samplePartItem.type === SamplePartItemTypes.ITEM) {
                rootStructItem.items.add(new SampleStructItem(this, samplePartItem));
            }
        }

        return rootStructItem;
    }
    //#endregion
}