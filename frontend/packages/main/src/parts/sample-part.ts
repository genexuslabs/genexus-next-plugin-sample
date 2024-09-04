import { KBObject, StructPart } from "@genexusm-sdk/architecture-common";
import { Consts } from "../consts";

export class SamplePart extends StructPart {

    constructor(kbObject: KBObject) {
        super(kbObject, Consts.PartClasses.SAMPLE_PART);
    }
}