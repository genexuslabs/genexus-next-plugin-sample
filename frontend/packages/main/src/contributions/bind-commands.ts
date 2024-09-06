import { injectable, interfaces } from 'inversify';
import { CommandData, CommandState, CommandStatus, ICommandsContribution, ICommandsRegistry, UIServices } from "@genexusm-sdk/architecture-ui-framework";
import { SampleDialog } from '../dialogs/sample-dialog';
import { DialogResult } from '@genexusm-sdk/common-components';
import { Guid } from '@genexusm-sdk/common';

export function bindCommands(bind: interfaces.Bind) {
    bind(CommmandsContribution).toSelf().inSingletonScope();
    bind(ICommandsContribution).to(CommmandsContribution);
}

export namespace Commands {

    export const SAMPLE_CMD = {
        id: 'plugin_sample.sample_cmd',
        label: 'Plugin Sample Command',
    };

    export const SAMPLE_OPEN_OBJECT = {
        id: 'plugin_sample.open_object',
        label: 'Open Object',
    }
}


@injectable()
export class CommmandsContribution implements ICommandsContribution {

    registerCommands(registry: ICommandsRegistry): void {

        registry.registerCommand(Commands.SAMPLE_CMD, 
            (_data: CommandData,) => {
                this._echo();
                return true;
            },
            (_data: CommandData, state: CommandState) => {
                state.status = UIServices.kb.currentKB ? CommandStatus.Enabled : CommandStatus.Disabled;
                return true;
            }
        );

        registry.registerCommand(Commands.SAMPLE_OPEN_OBJECT, 
            (data: CommandData,) => {
                if (data.context?.objectGuid)
                    this._openObject(data.context.objectGuid);
                return true;
            }
        );
    }

    private async _echo() {
        let kb = UIServices.kb.currentKB;
        if (kb) {
            const sampleDialog = new SampleDialog();
            try {
                const result = await sampleDialog.showModal();
                if (result === DialogResult.OK)
                    alert('Ok');
            }
            finally {
                sampleDialog.destroy();
            }
        }
    }

    private async _openObject(guid:Guid){
        if (UIServices.kb.currentModel){
            const obj = await UIServices.kb.currentModel.objects.getByGuid(guid);
            UIServices.documentManager.open(obj);
        }
    }
}