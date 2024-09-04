import { GXCommLayer, PluginModule } from "@genexusm-sdk/architecture-common";
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
import { IGrammarsProvider } from "@genexusm-sdk/architecture-ui-framework";
import { SourceEditorAstNodeHelpersContribution } from "./contributions/source-editor-contribution";
import { ISourceEditorAstNodeHelpersContribution } from "@genexusm-sdk/language-common";

defineCustomElements(window);
registerAssets();

export default new PluginModule(
    (bind: interfaces.Bind) => {
        bindCommands(bind);
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
        console.log('Activate plugin ');
        CommServices.setCommLayer(GXCommLayer.get());
    }
);
