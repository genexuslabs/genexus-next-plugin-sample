import { AssetsManager } from "@genexus/ide-sdk/common-components";

import { ASSETS } from "@genexusm-plugin-sample/components";
import { Locale } from "@genexusm-plugin-sample/components";

export function registerAssets(){
    AssetsManager.registerAssets('sample-vendor', 'sv', ASSETS);
    
    const baseUrl = AssetsManager.getBundleBaseUrl('PluginSample');
    const SAMPLE_BUNDLE = [{ name: 'sample/global', url: `${baseUrl}global.css`, themeBaseUrl: baseUrl }];
    AssetsManager.registerStylesBundle(SAMPLE_BUNDLE);

    Locale.commonAssetsPath = baseUrl;
}