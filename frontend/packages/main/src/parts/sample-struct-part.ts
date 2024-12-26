
import { KBObject, StructPart } from "@genexusm/sdk/architecture-common";
import { Consts } from "../consts";

export class SampleStructPart extends StructPart {

    constructor(kbObject: KBObject) {
        super(kbObject, Consts.PartClasses.SAMPLE_STRUCT_PART);
    }
}