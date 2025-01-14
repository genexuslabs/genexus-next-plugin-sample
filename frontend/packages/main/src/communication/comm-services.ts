
import { IGXCommLayer } from '@genexusm/sdk/common-comm-layer';
import { Services} from  '@genexusm-plugin-sample/comm-layer';

export class CommServices {

   private static _instance: Services;

   static get() {
      return CommServices._instance;
   }

   static setCommLayer(value?: IGXCommLayer) {
      CommServices._instance = Services.createInstance(value);
   }
}