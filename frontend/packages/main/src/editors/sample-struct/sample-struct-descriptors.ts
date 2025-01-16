import { IPropertyDescriptor, StringConverter, TypeConverter, TypeDescriptorContext, UITypeEditor, IUIValidator } from "@genexus/ide-sdk/common-properties";
import { UIServices } from "@genexus/ide-sdk/architecture-ui-framework";
import { KBObjectDescriptor, KBObjectInfoFilters, PropertyContextHelper, StructPartItem } from "@genexus/ide-sdk/architecture-common";

import { SampleStructPartEditor } from "../sample-struct-part-editor";
import { SampleObjectProperties } from "./sample-struct-definitions";

export class SampleKBObjectNamePropertyDescriptor implements IPropertyDescriptor {

    private _data: StructPartItem;
    private _editor: SampleStructPartEditor;

    constructor(editor: SampleStructPartEditor, data: StructPartItem) {
        this._editor = editor;
        this._data = data;
    }

    //#region IPropertyDescriptor

    get name(): string {
        return SampleObjectProperties.KB_OBJECT_NAME;
    }

    get isChild(): boolean {
        return false;
    }

    get children(): [] {
        return [];
    }

    get displayName(): string {
        return 'KB Object Name';
    }

    get description(): string {
        return '';
    }

    get category(): string {
        return '';
    }

    get type(): string {
        return 'string';
    }

    get typeConverter(): TypeConverter {
        return new StringConverter();
    }

    getEditor(): UITypeEditor | undefined {
        return new SampleKBObjectNameTypeEditor();
    }

    getUIValidator(): IUIValidator | undefined {
        return undefined;
    }

    isDefault(): boolean {
        return true;
    }

    isApplicable(): boolean {
        return true;
    }

    isReadOnly(): boolean {
        return false;
    }

    isVisible(): boolean {
        return true;
    }

    async getValue(): Promise<string> {
        return this._data.getStringPropertyValue(SampleObjectProperties.KB_OBJECT_NAME) || '';
    }

    async setValue(value: any) {
        this._data.part.beginUpdate();
        this._data.setPropertyValue(SampleObjectProperties.KB_OBJECT_NAME, value);
        await this._data.part.endUpdate();
        this._data.manager.reloadPropertyDefinitions();
        await this._data.getPropertyDescriptors();

        UIServices.trackSelection.onSelectionChanged();
        setTimeout(() => this._editor.onSelectionChanged(), 10);

        return true;
    }

    resetValue() {
    }

    //#endregion
}


export class SampleKBObjectNameTypeEditor extends UITypeEditor {

    getAutocompleteSupported(context: TypeDescriptorContext): boolean {
        return true;
    }

    async getAutoCompleteValues(context: TypeDescriptorContext, prefix: string): Promise<string[]> {
        const values = [];
        const model = PropertyContextHelper.getKBModelFrom(context);
        if (model) {
            const filters: KBObjectInfoFilters = {
                pattern: prefix,
                typeIds: KBObjectDescriptor.getAll().map(descriptor => descriptor.id)
            };

            const findResult = await model.objects.searchInfos(filters);
            if (findResult) {
                for (let objInfo of findResult.objects)
                    values.push(objInfo.name);
            }
        }

        return values;
    }
}
