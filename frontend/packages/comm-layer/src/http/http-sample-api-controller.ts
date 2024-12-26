import * as url from 'url';
import { GXHttpCommLayer } from '@genexusm/sdk/common-comm-layer'; 
import { EchoData } from '../types'; 

import { ISampleApiController } from '../isample-api-controller';

const _REMOTE_NAME =  'sample.core/';

export class HttpSampleApiController implements ISampleApiController {   

   private _commLayer: GXHttpCommLayer;

   constructor(commLayer: GXHttpCommLayer) {
      this._commLayer = commLayer;
   }

   async getData(kbId: string ): Promise<string> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpGet(this._getOperationUrl(`get_datakb_id=${encodeURIComponent(kbId)}`), httpOptions)).data;   
   }

   async echo(kbId: string , value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(`echo?kb_id=${encodeURIComponent(kbId)}&value=${encodeURIComponent(value)}`), undefined, httpOptions)).data;   
   }

   async echo2(value: string ): Promise<EchoData> {
      let httpOptions = this._commLayer.createHttpOptions();   

      return (await this._commLayer.httpPostJson(this._getOperationUrl(`echo2?value=${encodeURIComponent(value)}`), undefined, httpOptions)).data;   
   }

   private _getOperationUrl(operation: string) {
      return url.resolve(this._getServiceUrl(), operation);
   }

   private _getServiceUrl(): string {
      return url.resolve(this._commLayer.blServerInfo.location, _REMOTE_NAME);
   }
}