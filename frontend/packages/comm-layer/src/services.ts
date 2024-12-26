import { GXHttpCommLayer, IGXCommLayer } from '@genexusm/sdk/common-comm-layer';
import { ArgumentNullException, GXException } from '@genexusm/sdk/common';
import { ISampleApiController } from './isample-api-controller'; 
import { HttpSampleApiController } from './http/http-sample-api-controller'; 

export class Services {

	sample: ISampleApiController;

	static createInstance(commLayer: IGXCommLayer) {
		if (!commLayer)
			throw new ArgumentNullException('commLayer');

		if (commLayer instanceof GXHttpCommLayer) {
			let instance = new Services();
			instance.sample = new HttpSampleApiController(commLayer);

			return instance;
		}

		throw new GXException(`Unknown communication layer: ${commLayer.name}`);
	}

	private constructor() {
	}
}
