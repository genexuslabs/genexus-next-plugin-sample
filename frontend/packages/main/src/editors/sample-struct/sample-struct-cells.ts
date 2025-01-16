
import { IPropertyDescriptor } from "@genexus/ide-sdk/common-properties";
import { StructItemCellDefault } from "@genexus/ide-sdk/common-components";

import { SampleStructPartEditor } from "../sample-struct-part-editor";
import { SampleKBObjectNamePropertyDescriptor } from "./sample-struct-descriptors";

export class SampleStructKBObjectNameCell extends StructItemCellDefault {

    async getText(): Promise<string> {
        let descriptor = await this.getDescriptor();
        return descriptor ? descriptor.getValue() : '';
    }

    async getDescriptor(): Promise<IPropertyDescriptor | undefined> {
        if (this.data)
            return new SampleKBObjectNamePropertyDescriptor(this.item.editor as SampleStructPartEditor, this.item.data);
        return super.getDescriptor();
    }
} 