import { KBObject, KBObjectPart } from "@genexusm-sdk/architecture-common";
import { Consts } from "../consts";

export class SampleSourcePart extends KBObjectPart {

    constructor(kbObject: KBObject) {
        super(kbObject, Consts.PartClasses.SAMPLE_SOURCE_PART);
    }
}