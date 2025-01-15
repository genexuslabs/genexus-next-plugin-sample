import * as url from 'url';
import { Guid, MaybePromise } from '@genexus/ide-sdk/common'; 
import { GXHttpCommLayer } from '@genexus/ide-sdk/common-comm-layer'; 
import { EchoData } from '../types'; 

import { ISampleApiController } from '../isample-api-controller';

const _REMOTE_NAME =  'sample.core/';

export class HttpSampleApiController implements ISampleApiController {   

   private _commLayer: GXHttpCommLayer;

   constructor(commLayer: GXHttpCommLayer) {
      this._commLayer = commLayer;
   }

   async getData(kbGuid: string ): Promise<string> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpGet(this._getOperationUrl(`get_data?kb_guid=${encodeURIComponent(kbGuid)}`), httpOptions)).data;   
   }

   async echo(kbGuid: string , modelGuid: string , value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(`echo?kb_guid=${encodeURIComponent(kbGuid)}&model_guid=${encodeURIComponent(modelGuid)}`), value, httpOptions)).data;   
   }

   async echo2(value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(`echo2`), value, httpOptions)).data;   
   }

   private _getOperationUrl(operation: string) {
      return url.resolve(this._getServiceUrl(), operation);
   }

   private _getServiceUrl(): string {
      return url.resolve(this._commLayer.blServerInfo.location, _REMOTE_NAME);
   }
}