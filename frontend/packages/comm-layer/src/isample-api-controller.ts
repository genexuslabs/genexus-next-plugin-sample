import { Guid, MaybePromise } from '@genexus/ide-sdk/common'; 
import { EchoData } from './types'; 

export interface ISampleApiController {

	getData(kbGuid: string ): MaybePromise<string>;

	echo(kbGuid: string , modelGuid: string , value: string ): MaybePromise<EchoData>;

	echo2(value: string ): MaybePromise<EchoData>;
}