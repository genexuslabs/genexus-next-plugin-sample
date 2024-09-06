import { injectable } from "inversify";
import { ISourceEditorAstNodeHelpersContribution, ISourceEditorAstNodeHelpersRegistry } from "@genexusm-sdk/language-common";

@injectable()
export class SourceEditorAstNodeHelpersContribution implements ISourceEditorAstNodeHelpersContribution {
    registerNodeHelpers(registry: ISourceEditorAstNodeHelpersRegistry): void {
        registry.registerNodeHelper('SampleStructPartItemNode', {
            getData: (node) => undefined,
            getOutlinerInfo: (node) => ({
                text: node.id,
                iconName: 'sv/objects/attribute'
            })
        });
    }
}