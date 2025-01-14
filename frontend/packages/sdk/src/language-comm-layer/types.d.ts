import { IGXCommLayer } from '../common-comm-layer' 
import { MaybePromise } from '../common' 

export declare type SourceChange = {
    rangeOffset: number;
    rangeLength: number;
    text: string;
};
export declare type MultiRegionSourceNodeChangedEventData = {
    objectGuid: string;
    change: SourceChange;
    rootNode: any;
};
export declare type SourcePosition = {
    readonly index: number;
    readonly line: number;
    readonly column: number;
};
export declare type SourceRange = {
    readonly start: SourcePosition;
    readonly stop: SourcePosition;
};
export declare enum IntellisenseChoiceType {
    Variable = 0,
    Property = 1,
    Value = 2,
    Method = 3,
    Function = 4,
    Event = 5,
    Object = 6,
    Namespace = 7,
    Snippet = 8
}
export declare type IntellisenseChoice = {
    type: IntellisenseChoiceType;
    label: string;
    insertText: string;
    documentation: string;
};
export declare type IntellisenseChoiceList = {
    choices: IntellisenseChoice[];
    incomplete: boolean;
};
export declare type InlineChoice = {
    insertText: string;
};
export declare type InlineChoiceContext = {
    position: SourcePosition;
    hint: string;
};
export declare type ExpressionIntellisenseContext = {
    path: string;
    propertyName: string;
    lineBefore: string;
};

export declare class Services {
    language: ILanguageCommService;
    static createInstance(commLayer: IGXCommLayer): Services;
    private constructor();
}

export interface ILanguageCommService {
    getExpressionIntellisenseChoices(kbGuid: string, context: ExpressionIntellisenseContext): MaybePromise<IntellisenseChoiceList>;
}
