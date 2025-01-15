
import { injectable, interfaces } from 'inversify';
import { CommonMenus, IMenuContribution, IMenuRegistry } from '@genexus/ide-sdk/architecture-ui-framework';
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

        menus.registerMenuAction(Menus.SAMPLE_TOOLWINDOW_MENU, {
            commandId: Commands.SAMPLE_OPEN_OBJECT.id
        });
    }
}

export namespace Menus {
    export const PLUGIN_SAMPLE_MENU = [...CommonMenus.FILE_SAVE];
    export const SAMPLE_TOOLWINDOW_MENU = [ 'sv_sample_toolwindow' ];
}