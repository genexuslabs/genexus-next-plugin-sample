import { injectable } from "inversify";
import { ISourceEditorAstNodeHelpersContribution, ISourceEditorAstNodeHelpersRegistry } from "@genexusm-sdk/language-common";
import { AssetsManager } from "@genexusm-sdk/common-components";
import { Consts } from "../consts";

@injectable()
export class SourceEditorAstNodeHelpersContribution implements ISourceEditorAstNodeHelpersContribution {
    registerNodeHelpers(registry: ISourceEditorAstNodeHelpersRegistry): void {
        registry.registerNodeHelper('SampleStructPartItemNode', {
            getData: (node) => undefined,
            getOutlinerInfo: (node) => ({
                text: node.id,
                iconName: AssetsManager.getIconPath({
                    category: 'objects',
                    name: 'attribute'
                }, Consts.Assets.VENDOR_ALIAS)
            })
        });
    }
}