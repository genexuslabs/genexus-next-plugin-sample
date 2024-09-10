import { MaybeUndefined, ISelectionContainer, Disposable, MaybeArray, AnyObject, MaybePromise, EventHandler, CompositeDisposable, Guid, Mode, DisposableUrl, IComparable, IEquatable } from '@genexusm-sdk/common' 
import { EtchComponent, StructColumns, StructEditorSettings, StructItem, StructItemCancelableEventArgs, StructItemCellEventArgs, StructItemEventArgs, StructItemKind, VirtualItem, StructEditor, StructItemCellDefault, StructColumn, StructItemCell, FileUploaderDialog, FileUploaderDialogBaseOptions, UploadFunction, DialogResult } from '@genexusm-sdk/common-components' 
import { KBObject, KBModel, KBObjectInfo, KBEnvironment, KBObjectPart, KBObjectDescriptor, RemotePropertiesObject, IGXService, IKBObject, EntityKey, EntityVersionInfo, KnowledgeBase, KBCategory } from '@genexusm-sdk/architecture-common' 
import { PropertyValueChangedEventArgs, IPropertyDescriptor, StringConverter, TypeDescriptorContext, UITypeEditor, UITypeEditorEditOptions, UITypeEditorEditStyle } from '@genexusm-sdk/common-properties' 
import { KBInfoData } from '@genexusm-sdk/common-comm-layer' 

export declare class CommandDelegator implements ICommandTarget {
    private _commandMap;
    constructor();
    addCommand(commandId: string, execHandler: MaybeUndefined<CommandExecHandler>, queryHandler: MaybeUndefined<CommandQueryHandler>): void;
    removeCommand(commandId: string): boolean;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
}

export declare class CommandTargetChain implements ICommandTarget {
    private _basicDelegator;
    private _targets;
    private get basicDelegator();
    addCommandTarget(target: ICommandTarget): void;
    removeCommandTarget(target: ICommandTarget): boolean;
    addCommand(commandId: string, execHandler: MaybeUndefined<CommandExecHandler>, queryHandler: MaybeUndefined<CommandQueryHandler>): void;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
}

export declare type CommandData = {
    parameters?: any[];
    context?: any;
};
export declare enum CommandStatus {
    Enabled = 0,
    Disabled = 1,
    Invisible = 2
}
export declare type CommandState = {
    status: CommandStatus;
    checked: boolean;
};
export declare type CommandExecHandler = (data: CommandData) => boolean;
export declare type CommandQueryHandler = (data: CommandData, state: CommandState) => boolean;
export interface ICommandTarget {
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
}
export declare namespace ICommandTarget {
    function is(arg: MaybeUndefined<object>): arg is ICommandTarget;
}

export abstract class AbstractToolWindow extends EtchComponent implements IToolWindow, ICommandTarget {
    private _selection;
    private _commandChain;
    private _title;
    private _iconName;
    constructor();
    get name(): string;
    get iconName(): string;
    get title(): string;
    set title(value: string);
    reset(): void;
    activate(): void;
    deactivate(): void;
    titleChanged(callback: (args: {
        oldValue: string;
    }) => void): Disposable;
    get selectionCount(): number;
    get selectedObject(): any;
    get selectedObjects(): any[];
    get selectedObjectsToSave(): any[];
    get keepSelection(): boolean;
    get selectionContext(): any;
    selectionChanged(callback: () => void): Disposable;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
    addCommand(commandId: string, execHandler?: CommandExecHandler, queryState?: CommandQueryHandler): void;
    addCommandTarget(target: ICommandTarget): void;
    removeCommandTarget(target: ICommandTarget): boolean;
    set iconName(value: string);
    iconNameChanged(callback: (args: {
        oldValue: string;
    }) => void): Disposable;
    get selectionContainer(): ISelectionContainer;
    setSelection(objs: MaybeArray<AnyObject>, objsToSave?: MaybeArray<AnyObject>): void;
}

export interface IOutliner {
    setRoot(item: IOutlinerItem | undefined): MaybePromise<void>;
    clear(): void;
    selectItem(resolver: IOutlinerSelectionResolver | undefined): MaybePromise<void>;
    readonly selected: IOutlinerItem | undefined;
}

export interface IPropertyInspector {
    readonly selectedObject: any;
    setSelectedObject(object: any): MaybePromise<void>;
    enabled: boolean;
    currentProperty: string;
    resetSelectedProperty(): MaybePromise<void>;
    clear(): void;
    selectedObjectsModified(callback: Function): Disposable;
}

export interface IToolWindow extends ISelectionContainer, ICommandTarget {
    readonly name: string;
    readonly iconName: string;
    title: string;
    destroy(): MaybePromise<void>;
    reset(): MaybePromise<void>;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    titleChanged(callback: (args: {
        oldValue: string;
    }) => void): Disposable;
}

export interface IToolbox extends IToolWindow {
    readonly selectedItem: ToolboxItem | undefined;
    addToolboxItems(items: ToolboxItem[], category: string, sort?: boolean): void;
    removeAll(): void;
}

export class ReportItem {
    /**
     * @typedef {Object} ReportItemOptions
     * @property {string} id
     * @property {string} name
     * @property {string} iconName
     * @property {string} [status] Valid values are 'unchanged', 'warning', 'error', 'success'. Default value is 'success'
     * @property {function} [clickCallback]
     */
    /**
     *
     * @param {ReportItemOptions} options
     */
    constructor(options: {
        id: string;
        name: string;
        iconName: string;
        /**
         * Valid values are 'unchanged', 'warning', 'error', 'success'. Default value is 'success'
         */
        status?: string | undefined;
        clickCallback?: Function | undefined;
    });
    _id: string;
    _name: string;
    _iconName: string;
    _status: string;
    _clickCallback: Function | undefined;
    /**
     *
     * @return {string}
     */
    get id(): string;
    /**
     *
     * @return {string}
     */
    get name(): string;
    /**
     *
     * @return {string}
     */
    get iconName(): string;
    /**
     *
     * @return {string}
     */
    get status(): string;
    /**
     * @virtual
     */
    onClick(): void;
}

export class ReportToolWindow extends AbstractToolWindow {
    private _name;
    private _rootItems;
    private _itemsDataMap;
    private _topPanelVisible;
    private _initialized;
    private _showErrors;
    private _showWarnings;
    private _showSuccess;
    private _showAll;
    private _topPanelContainer;
    private _pattern;
    private _topPanel;
    private _content;
    private _tree;
    private _errorCount;
    private _warningCount;
    private _successCount;
    private _shadowRoot;
    private _btnErrors;
    private _btnWarnings;
    private _btnSuccess;
    constructor(name: string);
    get name(): string;
    render(): JSX.Element;
    onDomReady(): void;
    writeAfterUpdate(): void;
    get topPanelVisible(): boolean;
    setTopPanelVisible(value: boolean): Promise<void>;
    get topPanel(): any;
    setTopPanel(value: any): Promise<void>;
    addItem(item: ReportItem, parentId: string): void;
    clear(): void;
    setHtmlContent(html: string, extraCss?: string[]): void;
    private _onTreeCreated;
    private _focusFirst;
    private _onTreeNodeClick;
    private _onTreeNodeActivated;
    private _onTreeSelectionChanged;
    private _doDefaultItemAction;
    private _addItemUINode;
    private _updateCounters;
    private _getTree;
    private _reloadTree;
    private _setItemNodesVisibility;
    private _setItemNodeVisibility;
    private _onFilterClick;
}

export class ToolWindowNames {
    static get OUTPUT(): string;
    static get INSPECTOR(): string;
    static get MODEL_TREE(): string;
    static get PREFERENCES(): string;
    static get TOOLBOX(): string;
    static get START_PAGE(): string;
    static get EXPORT(): string;
    static get IMPORT(): string;
    static get MANAGE_MODULE_REFERENCES(): string;
    static get HISTORY(): string;
}

export declare enum ToolboxAction {
    None = 0,
    Drag = 1
}

export declare type ToolboxItemOptions = {
    iconName: string;
    name: string;
    dragDataObject: any;
    dragWidth?: number;
    dragHeight?: number;
    useIconClass?: boolean;
    dragStartHandler?: (data: any) => void;
    dragEndHandler?: () => void;
};
export class ToolboxItem {
    private _iconName;
    private _name;
    private _dragDataObject;
    private _dragWidth;
    private _dragHeight;
    private _useIconClass;
    private _dragStartHandler;
    private _dragEndHandler;
    constructor(options: ToolboxItemOptions);
    get iconName(): string;
    get name(): string;
    get dragDataObject(): any;
    get dragWidth(): number;
    get dragHeight(): number;
    get useIconClass(): boolean;
    get dragStartHandler(): ((data: any) => void) | undefined;
    get dragEndHandler(): (() => void) | undefined;
    select(): ToolboxAction;
}

export interface ISavableNodeData {
    save(): MaybePromise<void>;
}
export declare namespace ISavableNodeData {
    function is(arg: any): arg is ISavableNodeData;
}

export declare type ModelTreeEditStatus = {
    success: boolean;
    errorMessage?: string;
};
export interface IModelTreeNode extends ICommandTarget {
    readonly key: string;
    readonly text: string;
    readonly iconName: string;
    getData(): MaybePromise<any>;
    getDropData(): MaybePromise<string | undefined>;
    readonly dataToSave: MaybeUndefined<ISavableNodeData>;
    shouldReload: boolean;
    readonly isRoot: boolean;
    readonly hasChildren: boolean;
    readonly reloadParentOnDelete: boolean;
    getSelectionData: MaybePromise<any>;
    getNodes(): MaybePromise<IModelTreeNode[]>;
    doDefaultAction(): MaybePromise<void>;
    readonly defaultActionCommand: MaybeUndefined<string>;
    getContextMenuPath(): MenuPath | undefined;
    dispose(): void;
    readonly isEditable: boolean;
    onEdit(value: string): MaybePromise<ModelTreeEditStatus>;
    readonly hasCheck: boolean;
    isChecked: boolean;
    onCheckedCallback(value: boolean): MaybePromise<ModelTreeEditStatus>;
}

export interface IModelTree extends IToolWindow {
    expandOnReload: boolean;
    readonly rootNode: IModelTreeNode | undefined;
    readonly selectedNode: IModelTreeNode | undefined;
    readonly selectedNodes: IModelTreeNode[];
    reload(): MaybePromise<void>;
    clear(): void;
    onTreeNodeChanged(args: ModelTreeNodeEventArgs): void;
    navigateToKBObject(kbObject: KBObject): MaybePromise<void>;
}
export declare type ModelTreeNodeEventArgs = {
    node: IModelTreeNode;
};

export declare type ModuleFolderEditItemActionCallback = (args: KBObjectInfo) => void;
export declare type ModuleFolderEditItemKeyDownCallback = (args: Event) => void;
export declare type ModuleFolderEditOptions = {
    allAllowed?: boolean;
    foldersAllowed?: boolean;
};
export declare class ModuleFolderEdit extends EtchComponent {
    private _allAllowed;
    private _foldersAllowed;
    private _id;
    private _model;
    private _selectedItem;
    private _treeView;
    private _dropDown;
    constructor(options?: ModuleFolderEditOptions);
    render(): JSX.Element;
    get model(): KBModel | undefined;
    setModel(value: KBModel | undefined): Promise<void>;
    get selectedItem(): KBObjectInfo | undefined;
    set selectedItem(value: KBObjectInfo | undefined);
    open(): void;
    close(): void;
    opened(callback: EventHandler): Disposable;
    closed(callback: EventHandler): Disposable;
    itemClick(callback: ModuleFolderEditItemActionCallback): Disposable;
    itemDoubleClick(callback: ModuleFolderEditItemActionCallback): Disposable;
    itemSelected(callback: ModuleFolderEditItemActionCallback): Disposable;
    keyDown(callback: ModuleFolderEditItemKeyDownCallback): Disposable;
    protected onOpen(): void;
    protected onClose(): void;
    protected onItemSelected(args: KBObjectInfo | undefined): void;
    protected onItemClick(args: KBObjectInfo): void;
    protected onItemDoubleClick(args: KBObjectInfo): void;
    protected onKeyDown(evt: any): void;
    _loadTree(): Promise<void>;
    _onComboOpen(): void;
    _onComboClose(): void;
    _onTreeCreate(evt: any, evtData: any): Promise<void>;
    _onTreeLazyLoad(evt: any, evtData: any): void;
    _onTreeClick(evt: any, evtData: any): void;
    _onTreeDoubleClick(evt: any, evtData: any): void;
    _onTreeKeyDown(evt: any, evtData: any): void;
    _onTreeActivated(evt: any, evtData: any): void;
    _onTreeSelectionChanged(evt: any, evtData: any): void;
    _createTreeNodeData(info?: KBObjectInfo): any;
    private _isParentType;
}

export interface IOutlinerItem {
    readonly iconName: string;
    readonly text: string;
    readonly hasChildren: boolean;
    readonly parent?: IOutlinerItem;
    readonly children: IOutlinerItem[];
    readonly hasCustomMenu: boolean;
    onSelect(): MaybePromise<void>;
    childrenChanged(callback: Function): Disposable;
    propertyChanged(callback: Function): Disposable;
    dispose(): void;
    getContextMenuPath(): string[];
    getData(): any;
    showContextMenu(x: number, y: number): void;
}

export interface IOutlinerSelectionResolver {
    readonly selectionCount: number;
    readonly selectionRoot: IOutlinerItem | undefined;
    isSelected(item: IOutlinerItem): boolean;
    itemInSelection(nDeep: number, item: IOutlinerItem): boolean;
}

export declare abstract class AbstractNode implements IModelTreeNode {
    private _key;
    private _text;
    private _iconName;
    private _shouldReload;
    private _hasChildren;
    private _isReloading;
    private _nodes;
    private _disposables;
    constructor(key?: string);
    get key(): string;
    get text(): string;
    get iconName(): string;
    abstract getData(): MaybePromise<any>;
    getDropData(): Promise<string | undefined>;
    get dataToSave(): undefined;
    get shouldReload(): boolean;
    set shouldReload(value: boolean);
    get isRoot(): boolean;
    get hasChildren(): boolean;
    get disposables(): CompositeDisposable;
    get reloadParentOnDelete(): boolean;
    get isEditable(): boolean;
    get hasCheck(): boolean;
    get isChecked(): boolean;
    set isChecked(value: boolean);
    getSelectionData(): any;
    getNodes(): Promise<IModelTreeNode[]>;
    doDefaultAction(): MaybePromise<void>;
    get defaultActionCommand(): MaybeUndefined<string>;
    getContextMenuPath(): MenuPath | undefined;
    onEdit(value: string): MaybePromise<ModelTreeEditStatus>;
    onCheckedCallback(value: boolean): MaybePromise<ModelTreeEditStatus>;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
    set key(value: string);
    set text(value: string);
    set iconName(value: string);
    set hasChildren(value: boolean);
    protected reloadNodes(): MaybePromise<IModelTreeNode[]>;
    dispose(): void;
    protected disposeChildren(): void;
}

export declare class KBCategoryNode extends AbstractNode {
    private _category;
    constructor(category: KBObjectInfo);
    get text(): string;
    get hasChildren(): boolean;
    getData(): Promise<KBObject>;
    reloadNodes(): Promise<any[]>;
    doDefaultAction(): Promise<void>;
    private _getChildrenInfo;
    private _compare;
}

export declare type KBObjectNodeFactory = (obj: KBObjectInfo, showInterface: boolean) => KBObjectNode;
export declare class KBObjectNode extends AbstractNode {
    private _objInfo;
    private _obj;
    private _showInterface;
    static registerFactory(objType: Guid | string, factory: KBObjectNodeFactory): void;
    static create(obj: KBObjectInfo, showInterface?: boolean): any;
    constructor(objInfo: KBObjectInfo, showInterface?: boolean);
    get objectInfo(): MaybeUndefined<KBObjectInfo>;
    set objectInfo(value: MaybeUndefined<KBObjectInfo>);
    get text(): string;
    get hasChildren(): boolean;
    get isEditable(): boolean;
    getData(): Promise<MaybeUndefined<KBObject>>;
    getDropData(): Promise<string | undefined>;
    getContextMenuPath(): string[];
    reloadNodes(): Promise<any[]>;
    /**
     *
     * @override
     */
    doDefaultAction(): Promise<void>;
    onEdit(value: string): Promise<ModelTreeEditStatus>;
    private _getChildrenInfo;
    private _compareNodes;
}

export declare class KBObjectsNode extends AbstractNode {
    private _model;
    private _type;
    constructor(key: string, model: KBModel, type: Guid);
    get type(): Guid;
    get model(): KBModel;
    get hasChildren(): boolean;
    getData(): Promise<void>;
    reloadNodes(): Promise<any[]>;
    _compare(a: IModelTreeNode, b: IModelTreeNode): 1 | -1 | 0;
}

export declare class ModelRootNode extends AbstractNode {
    private _kbEnvironment;
    constructor(kbEnvironment: KBEnvironment);
    getData(): Promise<KBModel>;
    get isRoot(): boolean;
    reloadNodes(): Promise<any[]>;
    getContextMenuPath(): string[];
}

export declare type CommandDescriptor = {
    id: string;
    label?: string;
    keybinding?: string;
    iconClass?: string;
};
export interface ICommandsRegistry {
    registerCommand(command: CommandDescriptor, execHandler?: CommandExecHandler, queryHandler?: CommandQueryHandler): Disposable;
}
export declare const ICommandsContribution: unique symbol;
export interface ICommandsContribution {
    registerCommands(registry: ICommandsRegistry): void;
}
export declare namespace CommonCommands {
    const CREATE_KB: {
        id: string;
        label: string;
        keybinding: string;
    };
    const CREATE_OBJECT: {
        id: string;
        label: string;
        keybinding: string;
    };
    const OPEN_OBJECT: {
        id: string;
        label: string;
        keybinding: string;
    };
    const OPEN_SELECTED_OBJECT: {
        id: string;
        label: string;
    };
    const CLOSE_KB: {
        id: string;
        label: string;
    };
    const IMPORT: {
        id: string;
        label: string;
    };
    const EXPORT: {
        id: string;
        label: string;
    };
    const CLOSE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const SAVE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const SAVE_ALL: {
        id: string;
        label: string;
        keybinding: string;
    };
    const DELETE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const UNDO: {
        id: string;
        label: string;
        keybinding: string;
    };
    const REDO: {
        id: string;
        label: string;
        keybinding: string;
    };
    const COPY: {
        id: string;
        label: string;
        keybinding: string;
    };
    const PASTE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const RESET_PROPERTY_VALUE: {
        id: string;
        label: string;
    };
    const COLOR_SCHEME: {
        id: string;
        label: string;
    };
    const LOCATE_IN_KB_EXPLORER: {
        id: string;
        label: string;
    };
    const CLOSE_ALL: {
        id: string;
        label: string;
    };
    const CLOSE_ALL_BUT_THIS: {
        id: string;
        label: string;
    };
    const MANAGE_MODULE_REFERENCES: {
        id: string;
        label: string;
    };
    const ADD_MODULE_SERVER: {
        id: string;
        label: string;
    };
    const EDIT_MODULE_SERVER: {
        id: string;
        label: string;
    };
    const UPLOAD_MODULE_FROM_FILE: {
        id: string;
        label: string;
    };
    const HISTORY: {
        id: string;
        label: string;
    };
    const OPEN_REVISION: {
        id: string;
        label: string;
    };
    const COMPARE_WITH_CURRENT_REVISION: {
        id: string;
        label: string;
    };
    const SET_AS_ACTIVE: {
        id: string;
        label: string;
    };
    const SELECT_LEFT_SIDE_TO_COMPARE: {
        id: string;
        label: string;
    };
}

export declare const IGXDocumentPartEditorDescriptor: unique symbol;
export interface IGXDocumentPartEditorDescriptor {
    type: Guid;
    factory: () => IGXDocumentPartEditor;
}

export declare const IGrammarsProvider: unique symbol;
export interface IGrammarsProvider {
    getGrammars(): MaybePromise<any>;
    getLanguages(): MaybePromise<any>;
    fetchGrammar(scopeName: string): MaybePromise<any>;
}

export declare type MenuPath = string[];
export declare const MAIN_MENU_BAR: MenuPath;
export interface IMenuAction {
    commandId: string;
    label?: string;
    order?: string;
}
export interface ISubmenuOptions {
    order?: string;
}
export declare const IMenuContribution: unique symbol;
export interface IMenuContribution {
    registerMenus(registry: IMenuRegistry): void;
}
export interface IMenuRegistry {
    registerMenuAction(menuPath: MenuPath, item: IMenuAction): Disposable;
    registerSubmenu(menuPath: MenuPath, label: string, options?: ISubmenuOptions): Disposable;
    unregisterMenuAction(id: string, menuPath?: MenuPath): void;
    unregisterSubMenu(menuPath: MenuPath): void;
}
export declare namespace CommonMenus {
    const MAIN_MENU_BAR: MenuPath;
    const FILE: string[];
    const FILE_SUBMENU: string[];
    const FILE_NEW: string[];
    const FILE_NEW_SUBMENU: string[];
    const FILE_CLOSE: string[];
    const FILE_SAVE: string[];
    const VIEW: string[];
    const VIEW_GENERAL: string[];
    const VIEW_OTHER_TOOLWINDOWS: string[];
    const KNOWLEDGE_MANAGER: string[];
    const CONTEXT: string[];
    const CONTEXT_MODEL_TREE: string[];
    const CONTEXT_MODEL_TREE_ROOT: string[];
    const CONTEXT_TAB_BAR: string[];
    const CONTEXT_PROPERTY_GRID: string[];
    const SETTINGS_MENU: MenuPath;
    const SETTINGS_MENU_COLOR_SCHEME: MenuPath;
    const MANAGE_MODULE_REFERENCES_CONTEXT: MenuPath;
    const MANAGE_MODULE_REFERENCES_SERVERS: MenuPath;
    const HISTORY_CONTEXT: string[];
}

export declare const IToolWindowDescriptor: unique symbol;
export declare type ToolWindowMenuOptions = {
    label: string;
    requiresKB?: boolean;
    path?: string[];
};
export interface IToolWindowDescriptor {
    name: string;
    factory: () => IToolWindow;
    location: ToolWindowDockLocation;
    menuOptions?: ToolWindowMenuOptions;
    visible?: boolean;
}
export declare enum ToolWindowDockLocation {
    Left = "left",
    Right = "right",
    Bottom = "bottom",
    Main = "main"
}

export declare const IModelTreeNodesProvider: unique symbol;
export interface IModelTreeNodesProvider {
    getModelTreeNodes(node: IModelTreeNode): MaybePromise<IModelTreeNode[]>;
    hasChildrenNodes(node: IModelTreeNode): MaybePromise<boolean>;
}

export declare const IPreferencesNodesProvider: unique symbol;
export interface IPreferencesNodesProvider {
    getPreferenceNodes(): MaybePromise<IModelTreeNode[]>;
}

export declare class BaseEditor extends EtchComponent implements ISelectionContainer, ICommandTarget, ICommandsContribution, IMenuContribution, IOutlinerItemsDescriptor, IToolboxItemsDescriptor {
    private _site;
    private _selection;
    private _activeEditor;
    private _commandChain;
    readOnly: boolean;
    constructor(props?: AnyObject, children?: AnyObject[]);
    get site(): BaseEditor | undefined;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    get selectionCount(): number;
    get selectedObject(): any;
    get selectedObjects(): any[];
    get selectedObjectsToSave(): any;
    get keepSelection(): boolean;
    get selectionContext(): any;
    selectionChanged(callback: () => void): Disposable;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
    addCommand(commandId: string, execHandler?: CommandExecHandler, queryState?: CommandQueryHandler): void;
    addCommandTarget(target: ICommandTarget): void;
    removeCommandTarget(target: ICommandTarget): boolean;
    registerCommands(registry: ICommandsRegistry): void;
    registerMenus(registry: IMenuRegistry): void;
    get outlinerRoot(): IOutlinerItem | undefined;
    get outlinerSelectionResolver(): IOutlinerSelectionResolver | undefined;
    get outlinerReadOnly(): boolean;
    getToolboxCategories(): Promise<ToolboxCategoryDescriptor[]>;
    get defaultToolboxItem(): ToolboxItem | undefined;
    setSelection(objs: MaybeArray<any>, objsToSave?: MaybeArray<any>): void;
    private _setSelection;
}

export declare class GXDocument implements IGXDocument {
    private _kbObject;
    private _descriptor;
    private _kbObjectName;
    private _title;
    private _emitter;
    private _dirty;
    private _saving;
    private _disposables;
    private _documentParts;
    constructor(kbObject: KBObject);
    get name(): string;
    get type(): Guid;
    get title(): string;
    get iconName(): string;
    get object(): KBObject;
    getDocumentParts(): Promise<IGXDocumentPart[]>;
    get dirty(): boolean;
    set dirty(value: boolean);
    save(): Promise<boolean>;
    dispose(): Promise<void>;
    dirtyChanged(callback: (dirty: boolean) => void): Disposable;
    titleChanged(callback: (title: string) => void): Disposable;
    iconChanged(callback: (iconName: string) => void): Disposable;
    _setName(name: string): void;
    _setTitle(title: string): void;
    get _isNewObject(): boolean;
    _setSaving(saving: boolean): void;
}

export declare class GXDocumentEditor extends EtchComponent implements IGXDocumentEditor {
    private _document;
    private _options;
    private _partEditors;
    private _activePartEditor;
    private _isActive;
    private _partEditorFactory;
    constructor(document: IGXDocument, partEditorFactory: (part: IGXDocumentPart) => IGXDocumentPartEditor | undefined);
    get document(): IGXDocument;
    get partEditors(): IGXDocumentPartEditor[];
    get isActive(): boolean;
    get activePartEditor(): IGXDocumentPartEditor | undefined;
    initializeEditor(options: OpenDocumentOptions): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
    activatePartEditor(part: Guid): Promise<IGXDocumentPartEditor>;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
    render(): JSX.Element;
    getPartEditorAt(index: number): IGXDocumentPartEditor;
    destroy(): Promise<void>;
    save(): Promise<void>;
    private _getPartEditorInitialized;
    private _setPartEditorInitialized;
    private _activatePartEditor;
    private _switchActiveEditorSelected;
    private _onTabActivated;
}

export declare class GXDocumentPart implements IGXDocumentPart {
    private _document;
    private _part;
    private _descriptor;
    private _emitter;
    private _dirty;
    constructor(document: IGXDocument, part: KBObjectPart);
    get name(): string;
    get type(): Guid;
    get description(): string;
    get iconName(): string;
    get dirty(): boolean;
    set dirty(value: boolean);
    get document(): IGXDocument;
    get part(): KBObjectPart;
    get visible(): boolean;
    dirtyChanged(callback: (dirty: boolean) => void): Disposable;
}

export declare class GXDocumentPartEditor extends BaseEditor implements IGXDocumentPartEditor {
    document: IGXDocumentPart;
    constructor(props?: AnyObject, children?: AnyObject[]);
    initializeEditor(info?: OpenDocumentOptions): void;
    updateView(): void;
    updateData(): void;
    setCurrentPosition(position: any): void;
    get currentPosition(): undefined;
    get part(): KBObjectPart;
    render(): JSX.Element;
}

export interface IGXDocument {
    readonly name: string;
    readonly type: Guid;
    readonly title: string;
    readonly iconName: string;
    readonly object: KBObject;
    getDocumentParts(): MaybePromise<IGXDocumentPart[]>;
    dirty: boolean;
    save(): MaybePromise<boolean>;
    dirtyChanged(callback: (dirty: boolean) => void): Disposable;
    titleChanged(callback: (title: string) => void): Disposable;
    iconChanged(callback: (iconName: string) => void): Disposable;
    dispose(): MaybePromise<void>;
}
export interface IGXDocumentPart {
    readonly name: string;
    readonly type: Guid;
    readonly description: string;
    dirty: boolean;
    readonly iconName: string;
    readonly document: IGXDocument;
    readonly part: KBObjectPart;
    readonly visible: boolean;
    dirtyChanged(callback: (dirty: boolean) => void): Disposable;
}

export interface IGXDocumentEditor extends ICommandTarget {
    readonly document: IGXDocument;
    readonly partEditors: IGXDocumentPartEditor[];
    readonly isActive: boolean;
    readonly activePartEditor: IGXDocumentPartEditor | undefined;
    initializeEditor(info?: OpenDocumentOptions): MaybePromise<void>;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    activatePartEditor(part: Guid): MaybePromise<IGXDocumentPartEditor>;
    save(): MaybePromise<void>;
}

export declare type OpenDocumentOptions = {
    readOnly?: boolean;
    useModelVersion?: boolean;
    part?: Guid;
    position?: any;
    activateWindow?: boolean;
    avoidRedirection?: boolean;
};
export interface IGXDocumentPartEditor extends ISelectionContainer, ICommandTarget {
    document: IGXDocumentPart;
    readOnly: boolean;
    initializeEditor(info?: OpenDocumentOptions): MaybePromise<void>;
    updateView(): MaybePromise<void>;
    updateData(): MaybePromise<void>;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    destroy(): MaybePromise<void>;
    setCurrentPosition(position: any): MaybePromise<void>;
    readonly currentPosition: any;
    readonly part: KBObjectPart;
}

export declare class CollectionStructEditor extends StructEditorPlus {
    private _title;
    private _parentEntity;
    constructor();
    get title(): string;
    set title(value: string);
    get parentEntity(): KBObject | undefined;
    get itemKind(): StructItemKind;
    set parentEntity(value: KBObject | undefined);
    defineSettings(settings: StructEditorSettings): void;
    configureColumns(columns: StructColumns): void;
    protected loadEditor(parentEntity: KBObject | undefined, objects: any[]): Promise<void>;
    onBeforeExecuteInsertItem(args: StructItemCancelableEventArgs): Promise<void>;
    onAfterExecuteInsertItem(args: StructItemEventArgs): Promise<void>;
    onAfterEditItem(args: StructItemCellEventArgs): Promise<void>;
    onBeforeExecuteRemoveItem(args: StructItemCancelableEventArgs): Promise<void>;
    onExecuteInsertNewItemCanceled(args: StructItemEventArgs): Promise<void>;
    protected updateItemData(item: StructItem, mode: Mode): Promise<boolean>;
    getObjectsToSave(): Promise<StructItem[]> | KBObject[];
}

export declare type CollectionRootItemOptions = {
    editor: CollectionStructEditor;
    iconName?: string;
};
export class CollectionRootItem extends VirtualItem {
    constructor(options: CollectionRootItemOptions);
}

export declare class StructEditorPlus extends StructEditor implements ISelectionContainer, ICommandTarget {
    private _selection;
    private _selectionMap;
    private _selectionDisposables;
    private _commandChain;
    constructor();
    protected defineCommands(): void;
    get selectionCount(): number;
    get selectedObject(): any;
    get selectedObjects(): any[];
    get selectedObjectsToSave(): any[];
    get keepSelection(): boolean;
    get selectionContext(): any;
    selectionChanged(callback: EventHandler): Disposable;
    selectionChangedItems(callback: EventHandler): Disposable;
    execute(commandId: string, data: CommandData): boolean;
    queryState(commandId: string, data: CommandData, state: CommandState): boolean;
    addCommand(commandId: string, execHandler?: MaybeUndefined<CommandExecHandler>, queryState?: MaybeUndefined<CommandQueryHandler>): void;
    addCommandTarget(target: ICommandTarget): void;
    removeCommandTarget(target: ICommandTarget): boolean;
    protected get selectionContainer(): ISelectionContainer;
    protected setSelection(objs: any, objsToSave: any): void;
    onSelectionChanged(): Promise<void>;
    getObjectsToSave(): MaybePromise<any>;
    onAfterExternalEditItem(args: StructItemEventArgs): Promise<void>;
    afterExternalEditItem(callback: StructItemValueChangedEventCallback): Disposable;
    private _onPropertyValueChanged;
}
export declare type StructItemValueChangedEventCallback = (data: StructItemCancelableEventArgs) => Promise<any> | undefined;
export declare type StructItemValueEventArgs = StructItemEventArgs & {
    changed: PropertyValueChangedEventArgs;
};

export declare abstract class StructPartEditor extends StructEditorPlus implements IGXDocumentPartEditor {
    private _updatingView;
    private _ts;
    document: IGXDocumentPart;
    protected onWillBeginUpdate(): void;
    protected onWillEndUpdate(): Promise<void>;
    protected get updatingView(): boolean;
    protected abstract loadFromPart(): MaybePromise<void>;
    get part(): KBObjectPart;
    updateView(): Promise<void>;
    initializeEditor(info?: OpenDocumentOptions | undefined): MaybePromise<void>;
    protected updateEditorStatus(dirty: boolean): void;
    updateData(): MaybePromise<void>;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    setCurrentPosition(position: any): MaybePromise<void>;
    get currentPosition(): undefined;
}

export declare class KBObjectCollectionEditor extends CollectionStructEditor implements ICommandTarget {
    private _typeId;
    private _itemsMap;
    private _filter;
    private _module;
    private _itemKind;
    constructor(title: string, typeId: Guid);
    get typeId(): Guid;
    setParentProperty(target: KBObject, parent: KBObject): MaybePromise<void>;
    queryIndent(data: CommandData, state: CommandState): boolean;
    queryUnindent(data: CommandData, state: CommandState): boolean;
    executeIndent(): Promise<void>;
    executeUnindent(): Promise<void>;
    get itemKind(): StructItemKind;
    initialize(): void;
    createItem(kind: StructItemKind): StructItem;
    isParentKeyRoot(parentKey: any): boolean;
    initializeItemData(item: StructItem): Promise<void>;
    setFilters(filter: string | undefined, module: KBObjectInfo | undefined): Promise<void>;
    defineColumns(columns: StructColumns): void;
    get parentProperty(): string | undefined;
    _loadObjects(): Promise<void>;
    loadEditor(parentEntity: KBObject | undefined, objects: KBObject[]): Promise<void>;
    onAfterExecuteInsertItem(args: any): Promise<void>;
    onBeforeExecuteRemoveItem(args: any): Promise<void>;
}

export declare class NewObjectCell extends StructItemCellDefault {
    getText(): Promise<string>;
    getDescriptor(): Promise<IPropertyDescriptor>;
}

export declare class ObjectItem extends StructItem {
    private _createPromise;
    constructor(editor: KBObjectCollectionEditor, object?: KBObject, insertAsSiblingPreferred?: boolean);
    createCell(column: StructColumn): StructItemCell;
    beginObjectCreation(): void;
    get createPromise(): Promise<KBObject | undefined> | undefined;
}

export declare class TemporaryObjectDescriptor implements IPropertyDescriptor {
    private _item;
    private _name;
    constructor(item: ObjectItem, name: string);
    get name(): string;
    get isChild(): boolean;
    get children(): never[];
    get displayName(): string;
    get description(): string;
    get category(): string;
    get type(): string;
    get typeConverter(): StringConverter;
    getEditor(): undefined;
    getUIValidator(): undefined;
    isDefault(): boolean;
    isApplicable(): boolean;
    isReadOnly(): boolean;
    isVisible(): boolean;
    getValue(): string;
    setValue(value: any): Promise<boolean>;
    resetValue(): void;
}

export declare class EditorServicesHelper {
    private static _commands;
    private static _menus;
    static updateServices(target: any): Promise<void>;
    static updateOutliner(target: any): void;
    static updateToolbox(target: any): Promise<void>;
    static updateCommands(target: any): void;
    static updateMenus(target: any): void;
    private static _getInspector;
    private static _isCommandContribution;
    private static _isMenuContribution;
}

export declare class KBFilesHelper {
    static createUploader(options?: FileUploaderDialogBaseOptions): FileUploaderDialog | undefined;
    static downloadFile(url: DisposableUrl | string, targetFileName: string): void;
    static createUploadFunction(): UploadFunction | undefined;
    private static _createUploadFunction;
}

export declare namespace SettingsKeys {
    const COLOR_SCHEME = "color-scheme";
}
export declare namespace SettingsValues {
    const COLOR_SCHEME_DARK = "dark";
    const COLOR_SCHEME_LIGHT = "light";
}

export class RecentKB extends RecentObject {
    constructor(name: string, lastAccess?: Date);
}

export class RecentKBObject extends RecentObject {
    private _guid;
    private _type;
    private _id;
    constructor(kbObject: KBObjectInfo);
    get guid(): Guid;
    get type(): Guid;
    get id(): any;
    serialize(): void;
    deserialize(data: any): void;
}

export class RecentList {
    private _items;
    private _maxItems;
    constructor(maximumItems: number);
    get maximumItems(): number;
    set maximumItems(value: number);
    get count(): number;
    add(item: RecentObject): void;
    remove(item: RecentObject): boolean;
    removeAt(index: number): void;
    indexOf(item: RecentObject): number;
    get(index: number): RecentObject;
    [Symbol.iterator](): {
        next(): {
            done: boolean;
            value: RecentObject | undefined;
        };
    };
    private _checkItem;
    private _trimToMaximumItems;
}

export class RecentObject implements IComparable, IEquatable {
    private _key;
    private _name;
    private _lastAccess;
    constructor(key: string, name: string, lastAccess?: Date);
    get key(): string;
    get name(): string;
    get lastAccess(): Date;
    serialize(): any;
    deserialize(data: any): void;
    compareTo(other: any): number;
    equals(other: any): boolean;
}

export declare type ICreateObjectOptions = {
    types?: (KBObjectDescriptor | Guid)[];
    showCategories?: boolean;
    openAfterwards?: boolean;
    ignoreBuilder?: boolean;
    copyFrom?: Guid;
};
export declare class CreateObjectOptions {
    private _types?;
    private _showCategories;
    private _openAfterwards;
    private _ignoreBuilder;
    private _copyFrom?;
    constructor(options?: ICreateObjectOptions);
    get types(): MaybeUndefined<KBObjectDescriptor[]>;
    get showCategories(): boolean;
    get openAfterwards(): boolean;
    get ignoreBuilder(): boolean;
    get copyFrom(): MaybeUndefined<Guid>;
}

export declare class DefaultModelTreeResolver implements IModelTreeResolver {
    getRootNode(): IModelTreeNode | undefined;
    get hasRootModule(): boolean;
    getRootObjects(): Promise<never[]>;
    getNode(kbObject: KBObjectInfo): IModelTreeNode;
}

export declare const ICommandsService: unique symbol;
export interface ICommandsService {
    registerCommand(command: CommandDescriptor, execHandler?: CommandExecHandler, queryHandler?: CommandQueryHandler): Disposable;
    dispatch(commandId: string, data?: CommandData): void;
}

export declare type ComparableProperties = {
    header: string;
    properties: RemotePropertiesObject;
};
export interface IComparableModelPart {
    getComparableProperties(): MaybePromise<ComparableProperties[]>;
}
export interface IComparerService {
    canCompare(descriptor: KBObjectDescriptor): boolean;
    compareKBObjects(left: KBObject, right: KBObject): MaybePromise<void>;
    compareKBModels(left: KBModel, right: KBModel): MaybePromise<void>;
}

export declare const ICreateKBDialogService: unique symbol;
export declare type CreateKBOptions = {
    gxserverKBName?: string;
    guid?: Guid;
    gxserverUrl?: string;
    username?: string;
    password?: string;
    rememberToken?: boolean;
    language?: string;
    name: string;
    template?: string;
    dataStore?: number;
    enableDeployToCloud?: boolean;
    frontendGenerators?: string[];
};
export interface ICreateKBDialogService {
    getCreateKBOptions(): MaybePromise<CreateKBOptions | undefined>;
}

export declare const IDocumentManagerService: unique symbol;
export interface IDocumentManagerService extends IGXService {
    open(kbObject: IKBObject, options?: OpenDocumentOptions): MaybePromise<void>;
    isOpenable(descriptor: KBObjectDescriptor): boolean;
    saveAll(showUI: boolean): MaybePromise<boolean>;
    save(showUI: boolean, kbObjects: IKBObject[]): MaybePromise<boolean>;
    closeAll(discardChanges?: boolean, keepOpenObject?: IKBObject): MaybePromise<boolean>;
    close(kbObject: IKBObject, discardChanges: boolean): MaybePromise<boolean>;
    readonly openedDocuments: IGXDocument[];
    getOpenedDocument(kbObject: IKBObject): MaybeUndefined<IGXDocument>;
    getOpenedDocumentEditor(kbObject: IKBObject): MaybeUndefined<IGXDocumentEditor>;
}

export declare type MessageBoxOptions = {
    type: MessageBoxType;
    title: string;
    message?: string;
    detail?: string;
    buttons: string[];
    defaultId?: number;
    cancelId?: number;
    width?: number;
    height?: number;
};
export declare type ConfirmMessageBoxOptions = {
    title: string;
    message: string;
    detail?: string;
};
export declare type ErrorMessageBoxOptions = ConfirmMessageBoxOptions;
export declare type BlockUIOptions = {
    /**
     * Default value is the BODY element
     */
    parent?: string | HTMLElement;
    /**
     * Default value is 'default'
     */
    type?: 'default' | 'loading' | 'error' | 'warning' | 'info';
    title?: string;
    message?: string;
    buttons?: [{
        id: string;
        text: string;
        callback: Function;
    }];
    confirmId?: string;
    cancelId?: string;
    /**
     * Custom content to be shown at the center of the blocked area. It will replace the default content.
     */
    content?: HTMLElement;
};
export declare const IEnvironmentService: unique symbol;
export interface IEnvironmentService extends IGXService {
    /**
     *
     * Returns index of clicked button
     */
    showMessageBox(options: MessageBoxOptions): Promise<number>;
    showConfirmMessageBox(options: ConfirmMessageBoxOptions): Promise<boolean>;
    showErrorMessageBox(options: ErrorMessageBoxOptions): Promise<void>;
    setWaitingCursor(enabled: boolean): void;
    block(options: BlockUIOptions): void;
    unblock(parent?: string | HTMLElement): void;
    readonly rootElement: HTMLElement;
    trackEvent(name: string, data: AnyObject): void;
    activeDocumentChanged(callback: (document: IGXDocument) => void): Disposable;
}

export declare type HistoryData = {
    id: string;
    name: string;
    getValueCallback?: (version: EntityVersionInfo) => {};
};
export interface IHistoryController {
    getRevisions(model: KBModel, entityKey: EntityKey): MaybePromise<EntityVersionInfo[] | undefined>;
    openRevision(model: KBModel, entityKey: EntityKey, revision: number): MaybePromise<void>;
    compare(model: KBModel, entityKey: EntityKey, leftVersion: number, rightVersion: number): MaybePromise<void>;
    setAsActive(model: KBModel, entityKey: EntityKey, revision: number): MaybePromise<void>;
    getDataItems(): HistoryData[];
    isCommandAvailable(commandId: string): boolean;
}
export interface IHistoryService {
    showHistory(entityKey: EntityKey, version: number, controller: IHistoryController): MaybePromise<void>;
}

export declare type KBEventCallback = (kb: MaybeUndefined<KnowledgeBase>) => MaybePromise<void>;
export declare type KBModelEventArgs = {
    previousModel: KBModel;
    model: KBModel;
};
export declare type KBModelEventCallback = (args: KBModelEventArgs) => MaybePromise<void>;
export declare const IKBService: unique symbol;
export interface IKBService extends IGXService {
    readonly currentKB: KnowledgeBase | undefined;
    readonly currentModel: KBModel | undefined;
    readonly workingEnvironment: KBEnvironment | undefined;
    open(data: KBInfoData): MaybePromise<KnowledgeBase>;
    closeCurrentKB(): MaybePromise<boolean>;
    kbCreated(callback: KBEventCallback): Disposable;
    /**
     * Called after a Knowledge Base is created or opened.
     */
    currentKBChanged(callback: KBEventCallback): Disposable;
    /**
     * Called after a Model is created or opened.
     */
    currentModelChanged(callback: KBModelEventCallback): Disposable;
}

export declare const IKeybindingService: unique symbol;
export interface IKeybindingService {
    dispatch(key: KeyboardEvent): void;
}

export interface IRenderContextMenuOptions {
    menuPath: MenuPath;
    anchor: MouseEvent | {
        x: number;
        y: number;
    };
    data?: CommandData;
    onHide?: () => void;
}
export declare const IMenuService: unique symbol;
export interface IMenuService extends IMenuRegistry {
    showContextMenu(options: IRenderContextMenuOptions): void;
    hideContextMenu(): void;
    reloadMainMenuBar(): void;
}

export interface IModelTreeResolver {
    getRootNode(): IModelTreeNode | undefined;
    readonly hasRootModule: boolean;
    getRootObjects(): MaybePromise<IModelTreeNode[]>;
    getNode(kbObject: KBObjectInfo): IModelTreeNode;
}

export declare const IModelTreeService: unique symbol;
export interface IModelTreeService extends IGXService {
    getModelTree(): IModelTree | undefined;
    resolver: IModelTreeResolver;
}

export interface INavigator {
    initialize(): void;
    dispose(): void;
    savePending(): MaybePromise<void>;
    readonly currentSelection: ISelectionContainer | undefined;
    onObjectCreated(kbObject: KBObject): void;
    onCurrentModelChanged(model: KBModel): void;
    objectCreated(callback: (kbOBject: KBObject) => void): Disposable;
    currentModelChanged(callback: (model: KBModel) => void): Disposable;
}

export declare const INavigatorService: unique symbol;
export interface INavigatorService extends IGXService {
    getNavigator(): INavigator;
}

export declare const INewEnvironmentDialogService: unique symbol;
export interface INewEnvironmentDialogService {
    addNewEnvironment(): MaybePromise<void>;
}

export declare const INewObjectDialogService: unique symbol;
export interface INewObjectDialogService extends IGXService {
    createObject(options?: CreateObjectOptions): MaybePromise<KBObject | undefined>;
    attachBuilder(descriptor: KBObjectDescriptor, builder: IUIObjectBuilder): void;
    readonly defaultBuilder: IUIObjectBuilder;
}

export declare const IObjectsService: unique symbol;
export interface IObjectsService extends IGXService {
    create(options?: CreateObjectOptions): MaybePromise<KBObject | undefined>;
    open(object: IKBObject, options: OpenDocumentOptions): MaybePromise<void>;
    delete(objects: IKBObject[], askConfirmation?: boolean): MaybePromise<boolean>;
    save(object: KBObject): MaybePromise<boolean>;
}

export interface IOutlinerItemsDescriptor {
    readonly outlinerRoot: IOutlinerItem | undefined;
    readonly outlinerSelectionResolver: IOutlinerSelectionResolver | undefined;
    readonly outlinerReadOnly: boolean;
}
export declare namespace IOutlinerItemsDescriptor {
    function is(arg: any): arg is IOutlinerItemsDescriptor;
}

export declare const IOutlinerService: unique symbol;
export interface IOutlinerService {
    getOutliner(): IOutliner | undefined;
    reload(descriptor: IOutlinerItemsDescriptor): MaybePromise<void>;
}

export declare const IPropertyService: unique symbol;
export declare type PropertyInspectorDialogOptions = {
    includeConfirmButton?: boolean;
    includeCancelButton?: boolean;
    propertiesObject: any;
    title: string;
};
export interface IPropertyService extends IGXService {
    getPropertyInspector(): IPropertyInspector | undefined;
    showModalPropertyGrid(options: PropertyInspectorDialogOptions): MaybePromise<DialogResult>;
}

export declare const IRecentKBsService: unique symbol;
export interface IRecentKBsService extends IGXService {
    getRecentKBs(): MaybePromise<RecentList>;
    saveRecentKBs(recentKBs: RecentList): MaybePromise<void>;
}

export declare type SelectObjectOptions = {
    objectTypes: KBObjectDescriptor[];
    excludeReferencedModulesChildren?: boolean;
};
export declare const ISelectObjectDialogService: unique symbol;
export interface ISelectObjectDialogService {
    selectObject(options?: SelectObjectOptions): MaybePromise<KBObjectInfo | undefined>;
    selectObjects(options?: SelectObjectOptions): MaybePromise<KBObjectInfo[] | undefined>;
    cancel(): void;
    readonly categories: SelectObjectDialogCategory[];
    getCategory(name: string): SelectObjectDialogCategory | undefined;
    registerCategory(name: string, category: SelectObjectDialogCategory): void;
    readonly allCategory: SelectObjectDialogCategory;
    readonly objectsCategory: SelectObjectDialogCategory;
}

export declare const ISettingsService: unique symbol;
export declare type SettingValueDescription = {
    value: string;
    displayName?: string;
};
export declare type SettingDescription = {
    key: string;
    values: SettingValueDescription[];
    defaultValueIndex: number;
};
export interface ISettingsService {
    setSettingValue(key: string, value: string): void;
    getSettingValue(key: string): string | undefined;
    registerSetting(description: SettingDescription): void;
    getSettingDescription(key: string): SettingDescription | undefined;
}

export declare const IToolWindowsService: unique symbol;
export interface IToolWindowsService {
    createToolWindow(name: string): MaybePromise<IToolWindow>;
    getToolWindow(name: string): IToolWindow | undefined;
    showToolWindow(name: string): MaybePromise<boolean>;
    closeToolWindow(name: string): MaybePromise<boolean>;
    closeAllToolWindows(location?: ToolWindowDockLocation, keepOpenTWName?: string): MaybePromise<void>;
    addToolWindow(toolWindow: IToolWindow, location?: ToolWindowDockLocation, visible?: boolean): MaybePromise<boolean>;
    readonly toolWindows: IToolWindow[];
    resetAll(): MaybePromise<void>;
}

export declare class ToolboxCategoryDescriptor {
    private _name;
    private _items;
    private _sort;
    constructor(options: {
        name: string;
        sort?: boolean;
        items?: ToolboxItem[];
        useIconClasses?: boolean;
    });
    get name(): string;
    get sort(): boolean;
    get items(): ToolboxItem[];
}

export declare const IToolboxService: unique symbol;
export interface IToolboxService extends IGXService {
    getToolbox(): IToolbox | undefined;
    reloadCategories(descriptor?: IToolboxItemsDescriptor): MaybePromise<void>;
}

export interface IToolboxItemsDescriptor {
    getToolboxCategories(): MaybePromise<ToolboxCategoryDescriptor[]>;
    readonly defaultToolboxItem: ToolboxItem | undefined;
}
export declare namespace IToolboxItemsDescriptor {
    function is(arg: any): arg is IToolboxItemsDescriptor;
}

export declare const ITrackSelectionService: unique symbol;
export interface ITrackSelectionService extends IGXService {
    onSelectionChanged(container?: ISelectionContainer): void;
    selectionChanged(callback: (container: ISelectionContainer) => void): Disposable;
}

export declare type UIObjectBuilderOptions = {
    model: KBModel;
    parent?: KBObjectInfo;
    type: KBObjectDescriptor;
    name: string;
    description?: string;
    category?: KBCategory;
    copyFrom?: KBObjectInfo | undefined;
};
export interface IUIObjectBuilder {
    build(options: UIObjectBuilderOptions): MaybePromise<KBObject | undefined>;
    doDefaultAction(kbObject: KBObject): MaybePromise<void>;
}

export declare enum MessageBoxType {
    NONE = "none",
    INFO = "info",
    QUESTION = "question",
    WARNING = "warning",
    ERROR = "error"
}

export declare class SelectObjectDialogCategory {
    private _name;
    private _displayName;
    private _namespaces;
    private _iconName;
    constructor(name: string, displayName?: string, namespaces?: string[], iconName?: string);
    get name(): string;
    get displayName(): string;
    get namespaces(): string[];
    get iconName(): string;
}

export declare class ServiceNames {
    static get COMMANDS(): string;
    static get DOCUMENT_MANAGER(): string;
    static get ENVIRONMENT(): string;
    static get KB(): string;
    static get MENU(): string;
    static get MODEL_TREE(): string;
    static get NAVIGATOR(): string;
    static get NEW_ENVIRONMENT_DIALOG(): string;
    static get NEW_OBJECT_DIALOG(): string;
    static get OBJECTS(): string;
    static get OUTLINER(): string;
    static get PROPERTY(): string;
    static get RECENT_KBS(): string;
    static get SELECT_OBJECT_DIALOG(): string;
    static get TOOLBOX(): string;
    static get TOOL_WINDOWS(): string;
    static get TRACK_SELECTION(): string;
}

export declare class UIServices {
    static createKBDialog: ICreateKBDialogService;
    static comparerService: IComparerService;
    static commands: ICommandsService;
    static documentManager: IDocumentManagerService;
    static kb: IKBService;
    static keybinding: IKeybindingService;
    static environment: IEnvironmentService;
    static history: IHistoryService;
    static menu: IMenuService;
    static modelTree: IModelTreeService;
    static navigator: INavigatorService;
    static newEnvironmentDialog: INewEnvironmentDialogService;
    static newObjectDialog: INewObjectDialogService;
    static objects: IObjectsService;
    static outliner: IOutlinerService;
    static properties: IPropertyService;
    static recentKBs: IRecentKBsService;
    static selectObjectDialog: ISelectObjectDialogService;
    static settingsService: ISettingsService;
    static toolbox: IToolboxService;
    static toolWindows: IToolWindowsService;
    static trackSelection: ITrackSelectionService;
}

export class KBObjectReferenceRemoteTypeEditor extends UITypeEditor {
    private _selecting;
    private _canceled;
    private _value;
    getEditStyle(): UITypeEditorEditStyle;
    beginEditValue(options: UITypeEditorEditOptions): void;
    endEditValue(): any;
    getRenderValueSupported(context: TypeDescriptorContext): boolean;
    renderValue(context: TypeDescriptorContext, value: any): import("@genexusm/common").MaybePromise<string | HTMLElement>;
    getAutocompleteSupported(context: TypeDescriptorContext): boolean;
    getAutoCompleteValues(context: TypeDescriptorContext, prefix: string): Promise<string[]>;
    private _selectObject;
    private _getSettings;
}

export declare namespace UIEvents {
    const AFTER_SETTINGS_CHANGED = "after_settings_changed";
    const AFTER_SETTINGS_REGISTERED = "after_settings_registered";
    const AFTER_DESCRIPTORS_ADDED = "after_descriptors_added";
}
export declare type AfterSettingsChangedData = {
    key: string;
    oldValue?: string;
    value: string;
};
export declare type AfterSettingsRegisteredData = {
    description: SettingDescription;
};
