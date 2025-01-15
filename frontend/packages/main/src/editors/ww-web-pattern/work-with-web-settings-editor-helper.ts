
import { PatternEditorHelper, PatternInstanceElement } from '@genexus/ide-sdk/patterns-common';
import { SettingsElementTypes } from './element-types';

export class WorkWithWebSettingsEditorHelper extends PatternEditorHelper {

    customShowElement(element: PatternInstanceElement, data: { caption: string, iconName: string }): boolean {
        switch (element.name) {
            case SettingsElementTypes.CONFIG:
                data.iconName = 'general/customization';
                break;

            case SettingsElementTypes.CONTEXT:
                data.iconName = 'objects-parts/variables';
                break;

            case SettingsElementTypes.STANDARD_ACTIONS:
            case SettingsElementTypes.INSERT:
            case SettingsElementTypes.UPDATE:
            case SettingsElementTypes.DELETE:
            case SettingsElementTypes.DISPLAY:
            case SettingsElementTypes.EXPORT:
            case SettingsElementTypes.SEARCH:
                data.iconName = 'objects-parts/events';
                break;

            case SettingsElementTypes.GRID:
                data.iconName = 'controls/grid';
                break;

            case SettingsElementTypes.LABELS:
                data.iconName = 'controls/text-block';
                break;

            case SettingsElementTypes.MASTER_PAGES:
                data.iconName = 'objects/masterpage';
                break;

            case SettingsElementTypes.OBJECTS:
                data.iconName = 'window-tools/properties';
                break;

            case SettingsElementTypes.PARAMETERS:
                data.iconName = 'patterns/parameters';
                break;

            case SettingsElementTypes.SECURITY:
                data.iconName = 'patterns/fixed-data';
                break;

            case SettingsElementTypes.TEMPLATE:
                data.iconName = 'window-tools/properties';
                break;

            case SettingsElementTypes.THEME:
                data.iconName = 'objects/themes';
                break;

            case SettingsElementTypes.TRANSACTION:
                data.iconName = 'objects/transaction';
                break;

            default:
                return false;
        }

        return true;
    }
}

