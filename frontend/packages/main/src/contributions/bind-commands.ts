import { injectable, interfaces } from 'inversify';
import { ICommandsContribution, ICommandsRegistry, UIServices } from "@genexusm-sdk/architecture-ui-framework";
import { CommServices } from '../communication/comm-services';

export function bindCommands(bind: interfaces.Bind) {
    bind(CommmandsContribution).toSelf().inSingletonScope();
    bind(ICommandsContribution).to(CommmandsContribution);
}

export namespace Commands {

    export const SAMPLE_CMD = {
        id: 'plugin_sample.sample_cmd',
        label: 'Plugin Sample Command  6',
    };
}


@injectable()
export class CommmandsContribution implements ICommandsContribution {

    registerCommands(registry: ICommandsRegistry): void {

        registry.registerCommand(Commands.SAMPLE_CMD, () => {
            console.log('Sample Command 2');
            this.echo();

            return true;
        });
    }

    private async echo() {
        let kb = UIServices.kb.currentKB;
        if (kb) {
            let connInfo = kb.connectionInfo;
            //let data = await CommServices.get().sample.echo(connInfo.location, connInfo.id, "Hello Server");
            let data = await CommServices.get().sample.getData(connInfo.location, connInfo.id);
            console.log('Data result', data);
        }
    }
}