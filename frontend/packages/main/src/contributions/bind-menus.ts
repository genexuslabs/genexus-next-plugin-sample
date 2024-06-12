import { CommonMenus, IMenuContribution, IMenuRegistry } from '@genexusm-sdk/architecture-ui-framework';
import { injectable, interfaces } from 'inversify';
import { Commands } from './bind-commands';

export function bindMenus(bind: interfaces.Bind) {
    bind(MenuContribution).toSelf().inSingletonScope();
    bind(IMenuContribution).to(MenuContribution);
}

@injectable()
export class MenuContribution implements IMenuContribution {
    registerMenus(menus: IMenuRegistry): void {

        menus.registerMenuAction(CommonMenus.FILE_SAVE, {
            commandId: Commands.SAMPLE_CMD.id
        });
    }
}

export namespace Menus {
    export const PLUGIN_SAMPLE_MENU = [...CommonMenus.FILE_SAVE];
}