import { Guid, MaybePromise } from '@genexusm-sdk/common'; 
import { EchoData } from './types'; 

export interface ISampleApiController {

	getData(servicesUrl: string, kbId: string ): MaybePromise<string>;

	echo(servicesUrl: string, kbId: string , value: string ): MaybePromise<EchoData>;

	echo2(servicesUrl: string, value: string ): MaybePromise<EchoData>;
}