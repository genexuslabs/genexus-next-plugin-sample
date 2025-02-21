import { StructColumn, StructItem, StructItemCell } from "@genexus/ide-sdk/common-components";
import { StructPartItem } from "@genexus/ide-sdk/architecture-common";
import { SampleStructPartEditor } from "../sample-struct-part-editor";

import { SamplePartColumns, SamplePartItemKinds } from "./sample-struct-definitions";
import { SampleStructKBObjectNameCell } from "./sample-struct-cells";

export class SampleStructItem extends StructItem {

    constructor(editor: SampleStructPartEditor, data: StructPartItem) {
        super({
            editor,
            kind: SamplePartItemKinds.SamplePartItem,
            data
        });
    }

    createCell(column: StructColumn): StructItemCell {
        if (column.name === SamplePartColumns.KB_OBJECT_NAME)
            return new SampleStructKBObjectNameCell({ cells: this.cells, column });

        return super.createCell(column);
    }
}
