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

defineCustomElements(window);

export default new PluginModule(
    (bind: interfaces.Bind) => {
        bindCommands(bind);
        bindMenus(bind);
        bindTypes(bind);
        bindToolWindows(bind);
        bindPartEditors(bind);
        bindPatternHelpers(bind);
    },
    () => {
        console.log('Activate plugin ');
        CommServices.setCommLayer(GXCommLayer.get());
    }
);
