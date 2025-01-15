
import { BaseEditor } from '@genexus/ide-sdk/architecture-ui-framework';
import { PatternBasePart, PatternEditorHelper, PatternInstanceElement, PatternTreeEditor } from '@genexus/ide-sdk/patterns-common';
import { ElementTypes } from './element-types';

export class WorkWithWebEditorHelper extends PatternEditorHelper {

    get replaceBaseEditor() {
        return false;
    }

    get baseEditorCaption() {
        return 'Advanced';
    }

    createEditors(site: BaseEditor, part: PatternBasePart) {
        return [
            new PatternTreeEditor({
                rootElement: part.rootElement,
                site: site,
                hasCommandManager: true
            })
        ];
    }

    customShowElement(element: PatternInstanceElement, data: { caption: string, iconName: string }): boolean {

        data.caption += '_2';

        switch (element.name) {
            case ElementTypes.ACTION:
            case ElementTypes.ACTIONS:
                data.iconName = 'objects-parts/events';
                break;

            case ElementTypes.ATTRIBUTE:
                data.iconName = 'objects/attribute';
                break;

            case ElementTypes.ATTRIBUTES:
                data.iconName = 'patterns/attributes';
                break;

            case ElementTypes.CONDITION:
                data.iconName = 'objects-parts/condition';
                break;

            case ElementTypes.CONDITIONS:
                data.iconName = 'objects-parts/conditions';
                break;

            case ElementTypes.DESCRIPTION_ATTRIBUTE:
                data.iconName = 'editing-structures/attribute-description';
                break;

            case ElementTypes.FILTER:
                data.iconName = 'patterns/filters';
                break;

            case ElementTypes.FILTER_ATTRIBUTE:
                data.iconName = 'objects/attribute';
                break;

            case ElementTypes.FIXED_DATA:
                data.iconName = 'patterns/fixed-data';
                break;

            case ElementTypes.LEVEL:
                data.iconName = 'patterns/structure';
                break;

            case ElementTypes.MODES:
                data.iconName = 'objects-parts/events';
                break;

            case ElementTypes.ORDER:
            case ElementTypes.ORDERS:
                data.iconName = 'patterns/orders';
                break;

            case ElementTypes.PARAMETER:
                data.iconName = 'patterns/parameter';
                break;

            case ElementTypes.PARAMETERS:
                data.iconName = 'patterns/parameters';
                break;

            case ElementTypes.TAB:
                data.iconName = 'patterns/tab';
                break;

            case ElementTypes.TABS:
                data.iconName = 'patterns/tabs';
                break;

            case ElementTypes.TRANSACTION:
                data.iconName = 'objects/transaction';
                break;

            default:
                return false;
        }

        return true;
    }
}

