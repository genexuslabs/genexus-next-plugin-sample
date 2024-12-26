
import { MaybePromise } from '@genexusm/sdk/common';
import { EchoData } from './types'; 

export interface ISampleApiController {

	getData(kbId: string ): MaybePromise<string>;

	echo(kbId: string , value: string ): MaybePromise<EchoData>;

	echo2(value: string ): MaybePromise<EchoData>;
}