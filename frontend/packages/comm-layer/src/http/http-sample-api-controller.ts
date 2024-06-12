import * as url from 'url';
import { Guid, MaybePromise } from '@genexusm-sdk/common'; 
import { GXHttpCommLayer } from '@genexusm-sdk/common-comm-layer'; 
import { EchoData } from '../types'; 

import { ISampleApiController } from '../isample-api-controller';

const _REMOTE_NAME =  'sample.core/';

export class HttpSampleApiController implements ISampleApiController {   

   private _commLayer: GXHttpCommLayer;

   constructor(commLayer: GXHttpCommLayer) {
      this._commLayer = commLayer;
   }

   async getData(servicesUrl: string, kbId: string ): Promise<string> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpGet(this._getOperationUrl(servicesUrl, `get_data?kb_id=${encodeURIComponent(kbId)}`), httpOptions)).data;   
   }

   async echo(servicesUrl: string, kbId: string , value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(servicesUrl, `echo?kb_id=${encodeURIComponent(kbId)}&value=${encodeURIComponent(value)}`), undefined, httpOptions)).data;   
   }

   async echo2(servicesUrl: string, value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(servicesUrl, `echo2?value=${encodeURIComponent(value)}`), undefined, httpOptions)).data;   
   }

   private _getOperationUrl(servicesUrl: string, operation: string) {
      return url.resolve(this._getServiceUrl(servicesUrl), operation);
   }

   private _getServiceUrl(servicesUrl: string): string {
      return url.resolve(servicesUrl, _REMOTE_NAME);
   }
}