
import { interfaces } from "inversify";

import { Consts } from "../consts";
import { SampleStructPartEditor } from "../editors/sample-struct-part-editor";
import { IGXDocumentPartEditorDescriptor } from "@genexus/ide-sdk/architecture-ui-framework";
import { SourcePartEditor } from "@genexus/ide-sdk/language-common";

export function bindPartEditors(bind: interfaces.Bind) {

    bind<IGXDocumentPartEditorDescriptor>(
        IGXDocumentPartEditorDescriptor
    ).toDynamicValue((ctx) => ({
        type: Consts.PartClasses.SAMPLE_STRUCT_PART,
        factory: () => new SampleStructPartEditor(),
    }));

    bind<IGXDocumentPartEditorDescriptor>(
        IGXDocumentPartEditorDescriptor
    ).toDynamicValue((ctx) => ({
        type: Consts.PartClasses.SAMPLE_SOURCE_PART,
        factory: () => new SourcePartEditor(),
    }));
}
