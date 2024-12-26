
import { interfaces } from "inversify";

import { Consts } from "../consts";
import { SampleStructPartEditor } from "../editors/sample-struct-part-editor";
import { IGXDocumentPartEditorDescriptor } from "@genexusm/sdk/architecture-ui-framework";
import { SourcePartEditor } from "@genexusm/sdk/language-common";

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
