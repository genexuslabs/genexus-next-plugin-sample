
import { interfaces } from "inversify";

import { defineCustomElements } from "@genexusm-plugin-sample/components/loader";
import { CommServices } from "./communication/comm-services";
import { bindToolWindows } from "./contributions/bind-tool-windows";
import { bindTypes } from "./contributions/bind-types";
import { bindPartEditors } from "./contributions/bind-part-editors";
import { bindCommands } from "./contributions/bind-commands";
import { bindMenus } from "./contributions/bind-menus";
import { bindPatternHelpers } from "./contributions/bind-pattern-helpers";
import { registerAssets } from "./contributions/register-assets";
import { GrammarsProvider } from "./contributions/grammars-provider";
import { SourceEditorAstNodeHelpersContribution } from "./contributions/source-editor-contribution";
import { GXCommLayer, PluginModule } from "@genexus/ide-sdk/architecture-common";
import { IGrammarsProvider } from "@genexus/ide-sdk/architecture-ui-framework";
import { ISourceEditorAstNodeHelpersContribution } from "@genexus/ide-sdk/language-common";
import { bindUITypeEditorDescriptors } from "./contributions/bind-ui-type-editors";

defineCustomElements(window);
registerAssets();

export default new PluginModule(
    (bind: interfaces.Bind) => {
        bindCommands(bind);
        bindUITypeEditorDescriptors(bind);
        bindMenus(bind);
        bindTypes(bind);
        bindToolWindows(bind);
        bindPartEditors(bind);
        bindPatternHelpers(bind);

        // Grammars
        bind(GrammarsProvider).toSelf().inSingletonScope();
        bind<IGrammarsProvider>(IGrammarsProvider).toService(GrammarsProvider);

        // MultiRegionSourceEditor extensions
        bind(SourceEditorAstNodeHelpersContribution).toSelf().inSingletonScope();
        bind(ISourceEditorAstNodeHelpersContribution).to(SourceEditorAstNodeHelpersContribution);
    },
    () => {
        console.log('Activate plugin 2 ');
        CommServices.setCommLayer(GXCommLayer.get());
    }
);
