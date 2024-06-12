
import { interfaces } from "inversify";
import { IGXDocumentPartEditorDescriptor} from "@genexusm-sdk/architecture-ui-framework";

import { Consts } from "../consts";
import { SampleSourcePartEditor } from "../editors/sample-source-part-editor";

export function bindPartEditors(bind: interfaces.Bind) {

    bind<IGXDocumentPartEditorDescriptor>(
        IGXDocumentPartEditorDescriptor
    ).toDynamicValue((ctx) => ({
        type: Consts.PartClasses.SAMPLE_SOURCE_PART,
        factory: () => new SampleSourcePartEditor(),
    }));
}
