import { injectable, interfaces } from 'inversify';
import { CommandData, CommandState, CommandStatus, ICommandsContribution, ICommandsRegistry, UIServices } from "@genexusm-sdk/architecture-ui-framework";
import { SampleDialog } from '../dialogs/sample-dialog';
import { DialogResult } from '@genexusm-sdk/common-components';

export function bindCommands(bind: interfaces.Bind) {
    bind(CommmandsContribution).toSelf().inSingletonScope();
    bind(ICommandsContribution).to(CommmandsContribution);
}

export namespace Commands {

    export const SAMPLE_CMD = {
        id: 'plugin_sample.sample_cmd',
        label: 'Plugin Sample Command',
    };
}


@injectable()
export class CommmandsContribution implements ICommandsContribution {

    registerCommands(registry: ICommandsRegistry): void {

        registry.registerCommand(Commands.SAMPLE_CMD, 
            (_data: CommandData,) => {
                this.echo();
                return true;
            },
            (_data: CommandData, state: CommandState) => {
                state.status = UIServices.kb.currentKB ? CommandStatus.Enabled : CommandStatus.Disabled;
                return true;
            }
        );
    }

    private async echo() {
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
}