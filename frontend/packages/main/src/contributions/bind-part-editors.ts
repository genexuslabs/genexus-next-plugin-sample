
import { interfaces } from "inversify";
import { IGXDocumentPartEditorDescriptor} from "@genexusm-sdk/architecture-ui-framework";

import { Consts } from "../consts";
import { SampleStructPartEditor } from "../editors/sample-struct-part-editor";

export function bindPartEditors(bind: interfaces.Bind) {

    bind<IGXDocumentPartEditorDescriptor>(
        IGXDocumentPartEditorDescriptor
    ).toDynamicValue((ctx) => ({
        type: Consts.PartClasses.SAMPLE_PART,
        factory: () => new SampleStructPartEditor(),
    }));
}
