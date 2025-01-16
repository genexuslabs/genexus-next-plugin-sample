
import { KBModel, KBObject } from "@genexus/ide-sdk/architecture-common";
import { Consts } from "../consts";

export class SampleSourceObject extends KBObject  {

    constructor(model: KBModel) {
        super(model, Consts.ObjectClasses.SAMPLE_SOURCE_OBJECT);        
    }
}