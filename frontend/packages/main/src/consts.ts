
import { Guid } from '@genexusm-sdk/common';

export namespace Consts {

    export namespace Categories {
        export const SAMPLE_CATEGORY = new Guid('3A69BC19-7A38-404E-B9E8-E96AAB04ADDC');
    }

    export namespace ObjectClasses {
        export const SAMPLE_OBJECT = new Guid('2757390B-863D-456E-A3DF-8C451420BC50');
        export const SAMPLE_SOURCE_OBJECT = new Guid('C0DC1820-559B-44EC-8135-B5DB7540F0CE');
    }

    export namespace PartClasses {
        export const SAMPLE_SOURCE_PART = new Guid('D74BEEDF-76C7-4617-8EC3-EFBE0A9572BB');
        export const SAMPLE_STRUCT_PART = new Guid('A8C2F988-F848-4AE4-AA4D-59E30D358CED');
    }
}