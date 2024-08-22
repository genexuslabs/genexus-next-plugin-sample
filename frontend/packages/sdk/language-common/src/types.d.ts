/// <reference types="./monaco" />
import { IGXCommLayer } from '@genexusm-sdk/common-comm-layer' 
import { Services } from '@genexusm-sdk/language-comm-layer' 
import { EtchComponent, WindowForm } from '@genexusm-sdk/common-components' 
import { CommandDescriptor, CommandExecHandler, CommandQueryHandler, GXDocumentPartEditor, ICommandsRegistry, IOutlinerItem, IOutlinerItemsDescriptor, IOutlinerSelectionResolver } from '@genexusm-sdk/architecture-ui-framework' 
import { Disposable, MaybePromise, AnyObject, Guid } from '@genexusm-sdk/common' 
import { TypeDescriptorContext, PropertyValueChangedEventArgs } from '@genexusm-sdk/common-properties' 
import { KBObject, KBObjectPart, KBModel, RemotePropertiesObject } from '@genexusm-sdk/architecture-common' 

export declare class CommServices {
    private static _instance;
    static get(): Services | undefined;
    static setCommLayer(value?: IGXCommLayer): void;
}

export declare type TextComparerOptions = {
    newLanguage?: string;
    newText: string;
    oldLanguage: string;
    oldText: string;
};
export declare class TextComparer extends EtchComponent {
    private _node;
    private _monacoDiffEditor;
    private _oldText;
    private _newText;
    private _oldLanguage;
    private _newLanguage;
    constructor(options: TextComparerOptions);
    onDomReady(): Promise<void>;
    onResize(): void;
    render(): JSX.Element;
    private _createDiffEditor;
}

export declare namespace LanguageCommands {
    const COLLAPSE_PROPERTIES: {
        id: string;
        label: string;
        keybinding: string;
    };
    const EXPAND_PROPERTIES: {
        id: string;
        label: string;
        keybinding: string;
    };
    const TRANSCRIBE_AUDIO: {
        id: string;
        label: string;
        keybinding: string;
    };
}

export declare namespace LanguageMenus {
    const CONTEXT_SOURCE_EDITOR: string[];
}

export interface ISourceEditorAstNodeOutlinerInfo {
    text: string;
    iconName: string;
    region?: string;
}
export declare type SourceLineRange = {
    startLine: number;
    startColumn: number;
    stopLine: number;
    stopColumn: number;
};
export declare type WordAtPosition = {
    word: string;
    start: SourcePosition;
    stop: SourcePosition;
};
export declare type SourceContext = {
    position: SourcePosition;
    node: AstNode;
    word: WordAtPosition | undefined;
    model: ISourceModel;
};
export interface ISourceModel {
    getText(): string;
    getTextInRange(range: SourceLineRange): string;
    editText(range: SourceLineRange, text: string): void;
}
export interface ISourceEditorAstNodeHelper {
    getOutlinerInfo(node: AstNode): ISourceEditorAstNodeOutlinerInfo | undefined;
    getData(context: SourceContext): MaybePromise<any>;
}
export interface ISourceEditorAstNodeHelpersRegistry {
    registerNodeHelper(type: string, helper: ISourceEditorAstNodeHelper): Disposable;
}
export declare const ISourceEditorAstNodeHelpersContribution: unique symbol;
export interface ISourceEditorAstNodeHelpersContribution {
    registerNodeHelpers(registry: ISourceEditorAstNodeHelpersRegistry): void;
}
export declare type SourceEditorCommandContext = {
    position: SourcePosition;
    model: ISourceModel;
    sourcePart: MultiRegionSourcePart;
    node?: AstNode;
    nodeHelper?: ISourceEditorAstNodeHelper;
};
export declare type SourceEditorCommandHandler = (context: SourceEditorCommandContext) => boolean;
export interface ISourceEditorCommandsRegistry {
    registerCommand(command: CommandDescriptor, execHandler?: CommandExecHandler, queryHandler?: CommandQueryHandler): Disposable;
}
export declare const ISourceEditorCommandsContribution: unique symbol;
export interface ISourceEditorCommandsContribution {
    registerCommands(registry: ISourceEditorCommandsRegistry): void;
}

export declare class SourcePartEditor extends GXDocumentPartEditor {
    private static _initializedLangs;
    private _monacoEditor;
    private _node;
    private _pendingChanges;
    initialized: boolean;
    private _ignoreTextEditorChanges;
    private _applyRemoteChangesPromise;
    constructor(props?: AnyObject, children?: AnyObject[]);
    get sourcePart(): SourcePart;
    get monacoEditor(): monaco.editor.IStandaloneCodeEditor;
    get grammarName(): string;
    render(): JSX.Element;
    onDomReady(): void;
    onResize(): void;
    activate(): void;
    updateView(): Promise<void>;
    updateData(): Promise<void>;
    loadSourceValue(): void;
    applyRemoteChanges(): Promise<void>;
    private _createTextEditor;
    private _subscribeToEvents;
    private _onTextEditorChanged;
    private _onTextEditorStoppedChanging;
    private _applyRemoteChanges;
    private _editorStoppedChanging;
}

export declare class MultiRegionSourcePartEditor extends GXDocumentPartEditor implements IOutlinerItemsDescriptor {
    private static _initializedLangs;
    private _isActive;
    private _outlinerItemsMap;
    private _node;
    private _monacoEditor;
    private _initialized;
    private _pendingChanges;
    private _sourceModel;
    private _selectionPromise;
    private _ignoreTextEditorChanges;
    private _ignoreCursorChange;
    private _cursorSelectPromise;
    private _applyRemoteChangesPromise;
    private _outlinerSelectionResolver;
    private _nodePropsHandler;
    private _pendingReload;
    constructor(props?: AnyObject, children?: AnyObject[]);
    get sourcePart(): MultiRegionSourcePart;
    get monacoEditor(): monaco.editor.IStandaloneCodeEditor;
    render(): JSX.Element;
    onDomReady(): void;
    onResize(): void;
    activate(): Promise<void>;
    deactivate(): void;
    private _initializeOnActivate;
    updateView(): Promise<void>;
    updateData(): Promise<void>;
    applyRemoteChanges(): Promise<void>;
    setPropertiesCollapsed(collapsed: boolean): void;
    setCurrentPosition(position: any): void;
    private _setCurrentPosition;
    private _createTextEditor;
    private _subscribeToEvents;
    private _parseDroppedData;
    private _getSourceRegionNode;
    private _getSourceRegionPart;
    private _addTextToCurrentPosition;
    private _onPartChanged;
    registerCommands(registry: ICommandsRegistry): void;
    private _createEditorCommandContext;
    private _getSourceModel;
    private _convertPosition;
    private _getWordAt;
    private _onTextEditorChanged;
    private _onTextEditorStoppedChanging;
    private _applyRemoteChanges;
    private _onTextEditorCursorChanged;
    private _setSelectedSourceNodeOnLastCursor;
    private _setSelectedSourceNodeByPosition;
    private _editorStoppedChanging;
    private _resetOutliner;
    private _getOutlinerItemForAstNode;
    private _createRootOutlinerItem;
    get outlinerRoot(): IOutlinerItem | undefined;
    get outlinerSelectionResolver(): OutlinerSelectionResolver;
    get outlinerReadOnly(): boolean;
}
declare class OutlinerSelectionResolver implements IOutlinerSelectionResolver {
    private _root;
    private _selected;
    set selectionRoot(root: IOutlinerItem | undefined);
    set selected(item: IOutlinerItem | undefined);
    get selectionCount(): 0 | 1;
    get selectionRoot(): IOutlinerItem | undefined;
    isSelected(item: IOutlinerItem): boolean;
    itemInSelection(nDeep: number, item: IOutlinerItem): boolean;
}
export {};

export declare type ExpressionEditorDialogOptions = {
    context: TypeDescriptorContext;
    title: string;
    value: string;
    language: string;
};
export declare class ExpressionEditorDialog extends WindowForm {
    private static _initalizedProviders;
    private _editOptions;
    private _monacoEditor;
    constructor(options: ExpressionEditorDialogOptions);
    getValue(): Promise<string>;
    render(): JSX.Element;
    onDomReady(): void;
    onResize(): void;
    onConfirm(): Promise<void>;
    _onKeyDown(evt: KeyboardEvent): void;
}

export declare class CompletionItemProvider implements monaco.languages.CompletionItemProvider, monaco.languages.InlineCompletionsProvider, monaco.languages.SignatureHelpProvider, monaco.languages.FoldingRangeProvider {
    triggerCharacters: string[];
    provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken): Promise<monaco.languages.CompletionList | null | undefined>;
    resolveCompletionItem(item: monaco.languages.CompletionItem, token: monaco.CancellationToken): monaco.languages.CompletionItem;
    convertRemoteChoiceData(choiceList: IntellisenseChoiceList): monaco.languages.CompletionList;
    protected getRemoteChoiceList(model: monaco.editor.ITextModel, position: monaco.IPosition, token: monaco.CancellationToken): Promise<IntellisenseChoiceList | undefined>;
    provideInlineCompletions(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.InlineCompletionContext, token: monaco.CancellationToken): Promise<monaco.languages.InlineCompletions<monaco.languages.InlineCompletion> | null | undefined>;
    freeInlineCompletions(completions: monaco.languages.InlineCompletions): void;
    signatureHelpTriggerCharacters: string[];
    provideSignatureHelp(model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken, context: monaco.languages.SignatureHelpContext): monaco.languages.ProviderResult<monaco.languages.SignatureHelpResult>;
    private _getSignatureHelp;
    private _getParamtersInfo;
    provideFoldingRanges(model: monaco.editor.ITextModel, context: monaco.languages.FoldingContext, token: monaco.CancellationToken): Promise<monaco.languages.FoldingRange[]>;
    private _getEditor;
}

export declare class ExpressionCompletionItemProvider extends CompletionItemProvider {
    triggerCharacters: string[];
    protected getRemoteChoiceList(model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): Promise<IntellisenseChoiceList | undefined>;
}

export declare class SourcePart extends KBObjectPart {
    private _source;
    constructor(kbObject: KBObject, type?: Guid);
    get source(): string;
    protected deserializeContent(value: string): void;
    applyChanges(changes: SourceChange[]): Promise<void>;
    private _applyChangesInLocalSource;
}

export declare class MultiRegionSourcePart extends KBObjectPart {
    private _source;
    private _rootNode;
    constructor(kbObject: KBObject, type?: Guid);
    get source(): string;
    get rootNode(): AstNode;
    traverseAstTree(visitFn: (node: AstNode) => void): void;
    setSource(source: string): Promise<void>;
    applyChanges(changes: SourceChange[]): Promise<void>;
    getIntellisenseChoices(position: SourcePosition): Promise<IntellisenseChoiceList>;
    getInlineChoices(context: InlineChoiceContext): Promise<InlineChoice[]>;
    getNodeAtIndex(index: number, defaultToNearest: boolean, acceptsPredicate?: (n: AstNode) => boolean): AstNode | undefined;
    getNodeById(baseNode: AstNode, id: string): AstNode | undefined;
    private _indexInRange;
    protected deserializeContent(value: string): void;
    nodeChanged(callback: (args: SourceChange) => void): Disposable;
    private _buildTree;
    private _applyChangesInLocalSource;
    private _onSourceNodeChanged;
}

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
export declare type AstNode = {
    parent: AstNode | undefined;
    part: KBObjectPart;
    readonly type: string;
    readonly id: string;
    readonly description: string;
    readonly absoluteRange: SourceRange;
    readonly range: SourceRange;
    readonly absoluteHeaderRange: SourceRange;
    readonly headerRange: SourceRange;
    readonly idProperty?: string;
    readonly properties?: AstNodeProperties;
    readonly hasVisibleProperties?: boolean;
    readonly children: AstNode[];
};
export declare function getNodeFullId(node: AstNode): string;
export declare class AstNodeProperties extends RemotePropertiesObject {
    private _node;
    constructor(node: AstNode);
    get model(): KBModel;
    get remotePath(): string;
    protected onPropertyValueChanged(args: PropertyValueChangedEventArgs): MaybePromise<void>;
}
export declare function traverse(root: AstNode, visitFn: (node: AstNode) => void): void;

export declare namespace PartClasses {
    const SOURCE_PART: Guid;
    const MULTI_REGION_SOURCE_PART: Guid;
}

export declare type ResolveValueResult = {
    success: boolean;
    value?: string;
    message?: string;
};
export declare type ResolveValueData = {
    objectGuid: Guid;
};
export interface ISourceRegionPart {
    resolveValue(data: ResolveValueData): MaybePromise<ResolveValueResult>;
}
