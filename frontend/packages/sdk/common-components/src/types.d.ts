import { Disposable, EventHandler, MaybePromise, AnyObject, CompositeDisposable, Emitter, Guid, IEquatable } from '@genexusm-sdk/common' 
import { IUITypeEditorService, IUITypeEditorServiceDropDownOptions, ICustomTypeDescriptor, IPropertyDescriptor, TypeConverter, TypeDescriptorContext, UITypeEditor, PropertyValueChangedEventArgs, INotifyPropertyValueChanged, UITypeEditorEditStyle, IUIValidator } from '@genexusm-sdk/common-properties' 

export declare type ColorData = {
    key: string;
    value: string;
};
export class ColorPicker extends EtchComponent {
    private _palette;
    constructor(properties?: {
        palette?: ColorData[];
    });
    render(): JSX.Element;
    get selectedColor(): string | undefined;
    set selectedColor(value: string | undefined);
    confirmed(callback: EventHandler): Disposable;
    canceled(callback: EventHandler): Disposable;
    private _containsColor;
    private _getPickerByIndex;
    private _getWebNamedColors;
    private _onOKClick;
    private _onCancelClick;
}

export class CustomColorPicker extends EtchComponent {
    private _ready;
    private _initColor;
    render(): JSX.Element;
    onDomReady(): void;
    get selectedColor(): string | undefined;
    set selectedColor(value: string | undefined);
}

export abstract class EditorCommand {
    private _description;
    constructor(description?: string);
    get description(): string;
    set description(value: string);
    abstract do(): MaybePromise<boolean>;
    abstract undo(): MaybePromise<boolean>;
    /**
     * By default just invokes the 'do' method.
     */
    redo(): MaybePromise<boolean>;
    abstract get itemsAffected(): any[];
    get size(): number;
    toString(): string;
}

export class EditorMacroCommand extends EditorCommand {
    private _commands;
    constructor(description: string, commands?: EditorCommand[]);
    add(command: EditorCommand): void;
    get description(): string;
    do(): Promise<boolean>;
    undo(): Promise<boolean>;
    get itemsAffected(): any[];
    get size(): number;
}

export class ErrorViewer extends EtchComponent {
    private _toolTipCreated;
    constructor(options?: {
        invisibleIfEmpty?: boolean;
    });
    render(): JSX.Element;
    setError(message: string): Promise<void>;
    writeAfterUpdate(): void;
    destroy(): Promise<void>;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [tagName: string]: any;
        }
    }
    namespace React {
        interface HTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
            [tagName: string]: any;
        }
    }
}
export class EtchComponent {
    private _disposables;
    private _emitter;
    private _destroyed;
    private _element;
    private _refs;
    private _properties;
    private _children;
    /**
     *
     * @param {Object} [properties]
     * @param {Object[]} [children]
     */
    constructor(properties?: AnyObject, children?: AnyObject[]);
    /**
     *
     * @return {boolean}
     */
    get destroyed(): boolean;
    /**
     *
     * @return {CompositeDisposable}
     */
    get disposables(): CompositeDisposable;
    /**
     *
     * @return {Emitter}
     */
    get emitter(): Emitter;
    /**
     *
     * @return {HTMLElement}
     */
    get element(): HTMLElement;
    /**
     * For Etch's internal use only.
     *
     * @param {HTMLElement} value
     */
    set element(value: HTMLElement);
    /**
     *
     * @return {Object}
     */
    get refs(): AnyObject<any>;
    /**
     * For Etch's internal use only.
     *
     * @param {Object} value
     */
    set refs(value: AnyObject<any>);
    /**
     *
     * This property should be treated as an immutable object. Use the 'update' method to
     * re-render the component with some or all properties changed.
     *
     * @protected
     * @return {Object}
     */
    get properties(): AnyObject;
    /**
     * Intended to be used internally only. This property should be treated
     * as an immutable object.
     *
     * @protected
     * @param {Object} [value]
     */
    set properties(value: AnyObject);
    /**
     * This property should be treated as an immutable object. Use the 'update' method to
     * re-render the component with a different array of children.
     *
     */
    get children(): AnyObject[];
    /**
     * Intended to be used internally only. This property should be treated as
     * an immutable object.
     *
     * @protected
     */
    set children(value: AnyObject[]);
    /**
     * Method called internally only to initialize the component when the 'element' property is accessed
     * for the first time.
     *
     * Default implementation stores properties and
     * children and calls etch.initialize() to build the DOM element.
     *
     * @protected
     * @virtual
     */
    initialize(properties?: AnyObject, children?: AnyObject[]): void;
    update(properties?: AnyObject, children?: AnyObject[]): Promise<void>;
    /**
     * Returns the root virtual node
     */
    render(): AnyObject;
    /**
     * @virtual
     */
    writeAfterUpdate(): void;
    /**
     * @virtual
     */
    readAfterUpdate(): void;
    focus(): void;
    /**
     * This method is called when the component's root element is attached to the document. It is called only
     * once and it is intended for cases where the correct initial rendering of a component requires its root
     * element to be attached to the document.
     *
     * @virtual
     * @protected
     */
    onDomReady(): void;
    /**
     *
     * @virtual
     * @protected
     */
    onResize(): void;
    /**
     * @protected
     */
    checkDestroyed(): void;
    /**
     *
     * @param {string} eventName
     * @param {*} detail
     * @protected
     */
    emitHtmlEvent(eventName: string, detail: any): void;
    /**
     *
     * @virtual
     * @return {Promise}
     */
    destroy(): Promise<void>;
    /**
     * Shortcut function to etch.dom. Required for JSX so we can
     * add the '@jsx EtchComponent.dom' pragma comment to tell the transpiler
     * to use this function to process JSX notation.
     *
     * @param tag
     * @param props
     * @param children
     */
    static dom(tag: string, props: AnyObject, ...children: AnyObject[]): any;
    dom(tag: string, props: AnyObject, ...children: AnyObject[]): any;
    props: any;
    context: any;
    setState: any;
    forceUpdate: any;
    state: any;
}

export interface IView {
    getElement(): HTMLElement;
    destroy(): MaybePromise<void>;
}

export class NamePickerDialog extends WindowForm {
    private _initialValue;
    constructor(options?: {
        title?: string;
        value?: string;
    });
    get value(): string;
    render(): JSX.Element;
    onDomReady(): void;
    onConfirm(): void;
}

export class NamedColorPicker extends EtchComponent {
    private _ready;
    private _initColor?;
    private _colors;
    private _ignoreAlphaChange;
    private _ignoreColorChange;
    constructor(properties?: {
        colors?: ColorData[];
    });
    render(): JSX.Element;
    onDomReady(): void;
    /**
     *
     * @param {string} value
     */
    set selectedColor(value: string | undefined);
    get selectedColor(): string | undefined;
    _setColors(colors: ColorData[]): void;
    private _colorItemRenderer;
    private _onSelectedColorChange;
    private _onAlphaSliderChange;
    private _refreshSelectedColor;
}

export abstract class UITypeEditorServiceBase implements IUITypeEditorService {
    private _container;
    private _window;
    private _keyDownListener;
    private _cancelEdit;
    private _dropDownBody;
    constructor(container: HTMLElement);
    abstract endEdit(cancel?: boolean): MaybePromise<void>;
    dropDown(content: any, options?: IUITypeEditorServiceDropDownOptions): void;
    dispose(): void;
    private _getStringSizeValue;
}

export declare type UtilsFocusableElement = {
    element: HTMLElement;
    focus: Function;
};
export declare type UtilsFocusableElementsProvider = {
    focusableElements: (HTMLElement | UtilsFocusableElement | UtilsFocusableElementsProvider)[];
};
export class Utils {
    static debounce(ms: number): Promise<void>;
    static stopEventBubbling(e: Event): boolean;
    static onElementAttachedToDocument(element: HTMLElement, callback: Function): Disposable;
    private static _checkAttachedToDocument;
    static onElementResize(element: HTMLElement, callback: Function): Disposable;
    static onTextChanged(element: HTMLElement, callback: Function, delay?: number): Disposable;
    static isHidden(el: HTMLElement): boolean;
    static contains(e1: HTMLElement, e2: HTMLElement): any;
    static containsFocus(element: HTMLElement): boolean;
    static configureFocus(container: HTMLElement, provider?: UtilsFocusableElementsProvider): void;
    private static _getAllFocusableElements2;
    private static _hasTabindex;
    private static _getAllFocusableElements;
    static focusContainer(container: HTMLElement): void;
    static focusNextElement(container: HTMLElement): void;
    static focusPreviousElement(container: HTMLElement): void;
    private static _getFocusableElement;
    static focus(target: HTMLElement | UtilsFocusableElement): void;
    static getFirstFocusableAncestor(target: HTMLElement): HTMLElement | null;
    private static _getNextFocusableElement;
    private static _getFocusedElementIndex;
    static objectAssign(target: AnyObject, properties: string[], ...sources: AnyObject[]): AnyObject;
    static createFragmentFromString(htmlString: string): DocumentFragment;
}

export declare type WindowFormOptions = {
    title?: string;
    resizable?: boolean;
    draggable?: boolean;
    modalOpacity?: number;
    showCloseButton?: boolean;
    showCollapseButton?: boolean;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    useDefaultKeyboardManager?: boolean;
};
export declare class WindowForm extends EtchComponent {
    private static _openedWindows;
    private _options;
    private _firstOpen;
    private _dialogResult;
    private _resolveModal;
    private _$window;
    private _$modalBlocker;
    static get currentWindow(): WindowForm | undefined;
    constructor(options?: WindowFormOptions);
    static getRootElement(): HTMLElement;
    get isOpen(): boolean;
    get dialogResult(): DialogResult;
    set dialogResult(value: DialogResult);
    show(parent?: HTMLElement): void;
    showModal(parent?: HTMLElement): Promise<DialogResult>;
    hide(): void;
    protected onConfirm(): void;
    protected onCancel(): void;
    protected onBeforeOpen(): void;
    protected onOpen(): void;
    protected onClose(): void;
    destroy(): Promise<void>;
    private _getWindow;
    private _showWindow;
    private _subscribeToEvents;
    private _getModalBlocker;
}

export declare type WizardNextPage = {
    page: WizardPage;
    done: boolean;
};
export abstract class WizardController {
    private _data;
    private _emitter;
    private _pageDisposables;
    private _pageStack;
    private _usedPages;
    private _currentPage;
    private _hasMorePages;
    constructor(data?: any);
    get emitter(): Emitter;
    get pageDisposables(): CompositeDisposable;
    get data(): any;
    get currentPage(): WizardPage;
    /**
     * For internal use only
     */
    set currentPage(value: WizardPage);
    get hasMorePages(): boolean;
    get title(): string | undefined;
    get description(): string | undefined;
    get canGoNext(): boolean;
    get canGoBack(): boolean;
    get canCancel(): boolean;
    get canFinish(): boolean;
    get canClose(): boolean;
    get showHelpButton(): boolean;
    get showCustomButton(): boolean;
    get backButtonCaption(): string | undefined;
    get helpButtonCaption(): string | undefined;
    get nextButtonCaption(): string | undefined;
    get finishButtonCaption(): string | undefined;
    get closeButtonCaption(): string | undefined;
    get cancelButtonCaption(): string | undefined;
    get customButtonCaption(): string | undefined;
    start(): Promise<void>;
    onBack(): Promise<void>;
    onNext(): Promise<void>;
    onFinish(): MaybePromise<DialogResult>;
    onCancel(): MaybePromise<DialogResult>;
    onClose(): MaybePromise<DialogResult>;
    onHelp(): MaybePromise<void>;
    onCustom(): MaybePromise<void>;
    protected abstract getNextPage(): MaybePromise<WizardNextPage>;
    dispose(): Promise<void>;
    pageChanged(callback: EventHandler): Disposable;
    protected onPageChanged(): void;
}

declare type WizardDialogControllerOptions = {
    data?: any;
    dialog: WizardDialog;
};
declare class WizardDialogController extends WizardController {
    private _dialog;
    constructor(options: WizardDialogControllerOptions);
    getNextPage(): MaybePromise<WizardNextPage>;
}
export declare type WizardDialogOptions = {
    title?: string;
    resizable?: boolean;
    draggable?: boolean;
    modalOpacity?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    useDefaultKeyboardManager?: boolean;
    controller?: WizardController;
    data?: any;
};
export abstract class WizardDialog extends WindowForm {
    private _controller;
    private _busy;
    private _currentPage;
    constructor(options?: WizardDialogOptions);
    get controller(): WizardController | WizardDialogController;
    render(): JSX.Element;
    writeAfterUpdate(): void;
    onBeforeOpen(): Promise<void>;
    onOpen(): void;
    protected onPageChanged(page: WizardPage): Promise<void>;
    destroy(): Promise<void>;
    onBack(): Promise<void>;
    onNext(): Promise<void>;
    onCancel(): Promise<void>;
    onClose(): Promise<void>;
    onConfirm(): Promise<void>;
    onHelp(): void;
    onCustom(): void;
    abstract getNextPage(): MaybePromise<WizardNextPage>;
}
export {};

export class WizardPage extends EtchComponent {
    private _data;
    constructor(data?: any);
    get data(): any;
    get title(): string;
    get description(): string;
    get canGoNext(): boolean;
    get canGoBack(): boolean;
    get canCancel(): boolean;
    get canFinish(): boolean;
    get canClose(): boolean;
    get showHelpButton(): boolean;
    get showCustomButton(): boolean;
    get helpButtonCaption(): string;
    get backButtonCaption(): string;
    get nextButtonCaption(): string;
    get finishButtonCaption(): string;
    get closeButtonCaption(): string;
    get cancelButtonCaption(): string;
    get customButtonCaption(): string;
    onHelp(): MaybePromise<void>;
    onBack(): MaybePromise<void>;
    onNext(): MaybePromise<void>;
    onCancel(): MaybePromise<DialogResult>;
    onFinish(): MaybePromise<DialogResult>;
    onClose(): MaybePromise<DialogResult>;
    onCustom(): MaybePromise<void>;
    /**
     * Invoked to notify parent Wizard that it has to refresh state (e.g. titles, button's states)
     */
    protected onChanged(): void;
    changed(callback: EventHandler): Disposable;
    getView(): HTMLElement;
}

export class ViewRegistry {
    private static _instance;
    private _animationFrameRequest;
    private _documentReadInProgress;
    private _views;
    private _providers;
    private _nextUpdatePromise;
    private _resolveNextUpdatePromise;
    private _documentWriters;
    private _documentReaders;
    constructor();
    static get instance(): any;
    clear(): void;
    addViewProvider(modelConstructor: any, createView: any): Disposable;
    getViewProviderCount(): number;
    getView(object: any): any;
    createView(object: any): any;
    updateDocument(fn: Function): Disposable;
    readDocument(fn: Function): Disposable;
    getNextUpdatePromise(): any;
    clearDocumentRequests(): void;
    requestDocumentUpdate(): void;
    performDocumentUpdate(): void;
}

export declare namespace Constants {
    const INPUT_HEIGHT = 24;
    const LIST_ITEM_HEIGHT = 24;
}

export declare enum DialogResult {
    NONE = 0,
    OK = 1,
    CANCEL = 2,
    ABORT = 3,
    RETRY = 4,
    IGNORE = 5,
    YES = 6,
    NO = 7
}

export declare type UndoRedoEventArgs = {
    undo: boolean;
    itemsAffected: any[];
};
export declare type UndoRedoCallback = (args: UndoRedoEventArgs) => Promise<void> | void;
export declare class EditorCommandManager {
    private _editor;
    private _commands;
    private _macroCommandStack;
    private _commandIndex;
    private _undoing;
    private _redoing;
    private _maxDepth;
    private _savePoint;
    private _forceDirty;
    private _readOnly;
    private _emitter;
    constructor(editor: any);
    protected get emitter(): Emitter;
    get editor(): any;
    get maxDepth(): number;
    set maxDepth(value: number);
    get readOnly(): boolean;
    set readOny(value: boolean);
    clear(): void;
    protected clearData(): void;
    dispose(): void;
    execute(command: EditorCommand): Promise<boolean>;
    get undoingOrRedoing(): boolean;
    get currentMacroCommand(): EditorMacroCommand | undefined;
    beginMacroCommand(description: string): void;
    endMacroCommand(): Promise<void>;
    protected addCommand(command: EditorCommand): Promise<void>;
    /**
     *
     * @return Items affected
     */
    undo(): Promise<any[]>;
    /**
     *
     * @return Items affected
     */
    redo(): Promise<any[]>;
    get nextUndo(): EditorCommand | undefined;
    get nextRedo(): EditorCommand | undefined;
    canUndo(): boolean;
    canRedo(): boolean;
    postExecutedCommand(command: EditorCommand): Promise<void>;
    protected discardRedoStack(): void;
    setSavePoint(): void;
    forceDirty(): void;
    get dirty(): boolean;
    protected onAfterCommand(itemsAffected: any[]): void;
    statusChanged(callback: EventHandler): Disposable;
    protected onStatusChanged(): void;
    beforeUndoRedo(callback: UndoRedoCallback): Disposable;
    afterUndoRedo(callback: UndoRedoCallback): Disposable;
    onBeforeUndoRedo(args: UndoRedoEventArgs): Promise<void>;
    onAfterUndoRedo(args: UndoRedoEventArgs): Promise<void>;
}

export declare type FileUploadState = {
    id: string;
    name: string;
    file: File;
    remoteId?: string;
    promise?: Promise<string>;
    pending: boolean;
    progress: number;
    error?: string;
};
export declare type UploadedFile = {
    name: string;
    originalName: string;
    remoteId: string;
};
export declare type UploadFunction = (file: File, progressCallback: (percentage: number) => void) => MaybePromise<string>;
export declare type FileUploaderBaseOptions = {
    label?: string;
    accept?: string[];
    multiple?: boolean;
};
export declare type FileUploaderOptions = FileUploaderBaseOptions & {
    uploadFunction: UploadFunction;
};
export declare class FileUploader extends EtchComponent {
    private _fileStates;
    private _multiple;
    private _uploadFunction;
    private _accept;
    private _draggingFiles;
    private _fileInput;
    constructor(options: FileUploaderOptions);
    get pendingUpload(): boolean;
    get uploadedFiles(): UploadedFile[];
    render(): JSX.Element;
    stateChanged(callback: () => void): Disposable;
    private _renderSingle;
    private _renderMultiple;
    private _renderDropArea;
    private _renderFileStatesList;
    private _renderFileStateListItem;
    private _renderSingleFileState;
    openSelector(): void;
    clear(): void;
    cancelAll(): void;
    private _onDragEnter;
    private _onDragOver;
    private _onDragLeave;
    private _onDropOver;
    private _getValidFiles;
    private _isValidFile;
    private _getFileStates;
    private _getFirstFileState;
    private _startSingleFileUpload;
    private _startFilesUpload;
    private _uploadFile;
    private _removeFileState;
    private _fireStateChanged;
}

export declare type FileUploaderDialogBaseOptions = WindowFormOptions & FileUploaderBaseOptions;
export declare type FileUploaderDialogOptions = WindowFormOptions & FileUploaderOptions;
export declare class FileUploaderDialog extends WindowForm {
    private _selectOnOpen;
    private _accept;
    private _multiple;
    private _uploadFunction;
    private _uploader;
    constructor(options: FileUploaderDialogOptions);
    get uploadedFiles(): UploadedFile[];
    render(): JSX.Element;
    _renderSingleFileUploader(): JSX.Element;
    _renderUploader(): JSX.Element;
    onOpen(): void;
    clear(): void;
    onConfirm(): void;
    onCancel(): void;
}

export declare type GridColumn = {
    id: string;
    icoName?: string;
    title?: string;
    check?: boolean;
    visible?: boolean;
    cellRenderer?: (row: GridRow, cell: GridCell) => HTMLElement | string;
};
export declare type GridRow = {
    id: string;
    cells: GridCell[];
};
export declare type GridCell = {
    iconName?: string;
    value?: any;
};
export declare type GridRowEventArgs = {
    rowId: string;
    columnId: string;
    point?: {
        x: number;
        y: number;
    };
};
export declare type GridSelectionEventArgs = {
    rowIds: string[];
};
export declare type GridEventHandlers = {
    rowClick?: (e: GridRowEventArgs) => void;
    rowDoubleClick?: (e: any) => void;
    rowContextMenu?: (e: any) => void;
    selectionChanged?: (e: any) => void;
};
export declare type GridOptions = {
    selectionMode?: 'none' | 'single' | 'multiple';
    columns: GridColumn[];
    rows: GridRow[];
    on?: GridEventHandlers;
};
export declare class Grid extends EtchComponent {
    private _selectionMode;
    private _columns;
    private _rows;
    private _lastRowClicked;
    constructor(options: GridOptions);
    get selectedRowIds(): string[];
    set selectedRowIds(value: string[]);
    get checkedRowIds(): string[];
    set checkedRowIds(value: string[]);
    render(): JSX.Element;
    private _renderColumn;
    private _renderRow;
    private _renderCell;
    private _renderCellContent;
    private _onRowClick;
    private _onDoubleClick;
    private _onContextMenu;
    private _onSelectionChanged;
    private _onCheckClick;
}

export declare class PropertyGrid extends EtchComponent {
    private _rowMap;
    private _object;
    private _grid;
    private _updateGridPromise;
    private _objTypeInfo;
    private _alphabetical;
    private _onlySetted;
    private _currentProperty;
    private _valueEditor;
    private _propValueChangedHandler;
    private _propertyFilter;
    private _gridKey;
    constructor();
    enabled: boolean;
    currentProperty: string;
    get selectedObject(): ICustomTypeDescriptor | undefined;
    setSelectedObject(obj?: any): Promise<void>;
    propertyValueChanged(callback: PropertyGridPropertyValueChangedEventCallback): Disposable;
    resetSelectedProperty(): Promise<void>;
    beginEdit(propertyName?: string): Promise<void>;
    endEdit(cancel?: boolean, focusGrid?: boolean): Promise<void>;
    onDomReady(): void;
    private _onOrderFilterClick;
    private _onSettedFilterClick;
    private _onGridFocusOut;
    private _onCellSelectionChanged;
    private _onRowClicked;
    private _onGridKeyDown;
    private _onGridKeyDownCapture;
    private _onPropertyValueChanged;
    private _updateGrid;
    private _createRowDataMap;
    private _getVisibleDescriptors;
    private _getDescriptorRowData;
    private _getRootCategoryRowData;
    private _getCategoryRowData;
    private _getPropertyFilter;
    private _getCategoryRowId;
    private _getPropertyRowId;
    private _getPropertyValueCellId;
    private _getNextPropertyName;
    private _getSelectedProperty;
    writeAfterUpdate(): void;
    private _parseHtml;
    render(): JSX.Element;
    private _renderFilters;
    private _renderGrid;
    private _renderGridRows;
    private _renderPropertyRowsAlphabetical;
    private _renderGridRow;
    private _renderCategoryRow;
    private _renderPropertyRow;
    private _renderValueEditor;
    private _renderPropertyChildren;
    private _renderValue;
    private _renderValueDefault;
}
export declare type PGRowData = {
    rendered: any;
    isCategory: boolean;
    id: string;
    name: string;
    children: PGRowData[];
    value?: any;
    valueString?: string;
    converter?: TypeConverter;
    context?: TypeDescriptorContext;
    editor?: UITypeEditor;
    descriptor?: IPropertyDescriptor;
    html: string | HTMLElement;
    readOnly?: boolean;
    isDefault?: boolean;
    valueElement?: HTMLElement;
    grid: PropertyGrid;
};
export declare type PropertyGridPropertyValueChangedEventCallback = (args: PropertyGridPropertyValueChangedEventArgs) => void;
export declare type PropertyGridPropertyValueChangedEventArgs = {
    name: string;
    value: any;
};

export declare enum CellEditEndAction {
    CANCEL = 1,
    POST = 2,
    SUSPEND = 3
}

export declare type EditItemCellCommandOptions = {
    item: StructItem;
    cell: StructItemCell;
    value: any;
    oldValue: any;
};
export class EditItemCellCommand extends EditorCommand {
    private _item;
    private _cell;
    private _value;
    private _oldValue;
    constructor(options: EditItemCellCommandOptions);
    do(): Promise<boolean>;
    undo(): Promise<boolean>;
    get itemsAffected(): StructItem[];
}

export declare type EditItemDirectCommandOptions = {
    item: StructItem;
    dataObject: AnyObject;
    property: string;
    oldValue: any;
    value: any;
};
export class EditItemDirectCommand extends EditorCommand {
    private _item;
    private _dataObject;
    private _property;
    private _oldValue;
    private _value;
    constructor(options: EditItemDirectCommandOptions);
    do(): Promise<boolean>;
    undo(): Promise<boolean>;
    get itemsAffected(): StructItem[];
}

export declare type StructColumnOptions = {
    name: string;
    displayName?: string;
    isEssential?: boolean;
    isDefault?: boolean;
    allowSort?: boolean;
    width?: number | string;
    tabStop?: boolean;
    tabStopEditing?: boolean;
    isValueRequired?: boolean;
    isValueUniqueAmongKindred?: boolean;
    isValueUniqueAmongSiblings?: boolean;
    isValueUniqueAmongKindredSiblings?: boolean;
    isValueUniqueAmongAll?: boolean;
    visible?: boolean;
};
export declare type StructColumnCalculateSettingEventArgs = {
    column: StructColumn;
    setting: string;
    value: any;
};
export declare type StructColumnCalculateSettingEventCallback = (args: StructColumnCalculateSettingEventArgs) => void;
export class StructColumn {
    private _columns;
    private _name;
    private _displayName;
    private _isEssential;
    private _isDefault;
    private _allowSort;
    private _width;
    private _tabStop;
    private _tabStopEditing;
    private _isValueRequired;
    private _isValueUniqueAmongAll;
    private _isValueUniqueAmongKindred;
    private _isValueUniqueAmongSiblings;
    private _isValueUniqueAmongKindredSiblings;
    private _visible;
    private _emitter;
    constructor(columns: StructColumns, options: StructColumnOptions);
    get editor(): StructEditor | undefined;
    get columns(): StructColumns | undefined;
    /**
     * For internal use only.
     */
    set columns(value: StructColumns | undefined);
    get name(): string;
    get displayName(): string;
    set displayName(value: string);
    get isEssential(): boolean;
    set isEssential(value: boolean);
    get isDefault(): boolean;
    set isDefault(value: boolean);
    get allowSort(): boolean | undefined;
    set allowSort(value: boolean | undefined);
    get width(): string | number;
    set width(value: string | number);
    get tabStop(): any;
    set tabStop(value: any);
    get tabStopEditing(): any;
    set tabStopEditing(value: any);
    get isValueRequired(): boolean;
    set isValueRequired(value: boolean);
    get isValueUniqueAmongKindred(): boolean;
    set isValueUniqueAmongKindred(value: boolean);
    get isValueUniqueAmongSiblings(): boolean;
    set isValueUniqueAmongSiblings(value: boolean);
    get isValueUniqueAmongKindredSiblings(): boolean;
    set isValueUniqueAmongKindredSiblings(value: boolean);
    get isValueUniqueAmongAll(): boolean;
    set isValueUniqueAmongAll(value: boolean);
    get visible(): boolean;
    set visible(value: boolean);
    get index(): number;
    get visibleIndex(): number | undefined;
    getAdjacent(onlyVisible?: boolean, forward?: boolean): StructColumn | undefined;
    calculateTabStop({ callback }: {
        callback: StructColumnCalculateSettingEventCallback;
    }): Disposable;
    calculateTabStopEditing(callback: StructColumnCalculateSettingEventCallback): Disposable;
    dispose(): void;
    private _onCalculateSetting;
    static get BASE_WIDTH(): number;
}

export class StructColumns {
    private _editor;
    private _columns;
    constructor(editor: StructEditor);
    get editor(): StructEditor;
    get count(): number;
    [Symbol.iterator](): Iterator<StructColumn>;
    iterator(): Iterator<StructColumn>;
    get(index: number): StructColumn;
    getByName(name: string): StructColumn | undefined;
    getIndex(column: StructColumn): number;
    getVisibleIndex(name: string): number;
    insert(index: number, column: StructColumn | StructColumnOptions): void;
    add(column: StructColumn | StructColumnOptions): void;
    remove(column: StructColumn | number): boolean;
    reorder(index: number, newIndex: number): void;
}

export declare type StructEditorOperationItemCheckCallback = (item: StructItem) => MaybePromise<boolean>;
export declare type StructEditorOperationCallback = (item: StructItem, context: StructEditorOperation) => MaybePromise<boolean>;
export declare type StructEditorOperationOptions = {
    description?: string;
    itemCheck?: StructEditorOperationItemCheckCallback;
    operation?: StructEditorOperationCallback;
    removeDescendants?: boolean;
    reverseOrder?: boolean;
    selectAtEnd?: boolean;
};
export class StructEditorOperation {
    private _description;
    private _itemCheck;
    private _operation;
    private _removeDescendants;
    private _reverseOrder;
    private _selectAtEnd;
    constructor(options: StructEditorOperationOptions);
    get description(): string | undefined;
    get itemCheck(): StructEditorOperationItemCheckCallback | undefined;
    get removeDescendants(): boolean;
    set removeDescendants(value: boolean);
    get reverseOrder(): boolean;
    set reverseOrder(value: boolean);
    get selectAtEnd(): boolean;
    set selectAtEnd(value: boolean);
    /**
     * Internal use only.
     */
    executeOn(item: StructItem): MaybePromise<boolean>;
}

export class StructEditorSettings {
    showRootItem: boolean;
    supportsEdit: boolean;
    supportsIndent: boolean;
    supportsReorder: boolean;
    supportsUndoRedo: boolean;
    supportsDrag: boolean;
    supportsDrop: boolean;
    supportsCopy: boolean;
    supportsPaste: boolean;
    preserveColumnSettings: boolean;
    confirmDelete: boolean;
    immediateEdit: boolean;
    editOnEnter: boolean;
    editOnClick: boolean;
    insertAfterLastColumn: boolean;
    pendingSelectionChanged: boolean;
}

export class StructEditorState {
    cellEditor?: StructItemCellEditor;
    cellEditorState: any;
    currentCell?: StructItemCell;
    disposing: boolean;
    editingInsertedItem: boolean;
    editCellTriggerEvent?: Event;
    endingCellEdit: boolean;
    focusCellInputEditor: boolean;
    initializing: boolean;
    itemDataMap: Map<string, StructItemData>;
    pendingInitialization: boolean;
    pendingSelectionChanged: boolean;
    readOnly: boolean;
    rootItem?: StructItem;
    suspendedCellEdit?: StructItemCell;
    updatingItem: boolean;
    pendingCalculateItemData: StructItem[];
    pendingCollapseItemIds: Set<string>;
    pendingExpandItemIds: Set<string>;
    private _lockForUpdatesCount;
    get lockedForUpdates(): boolean;
    lockForUpdates(): void;
    unlockForUpdates(): void;
}

export declare type StructItemOptions = {
    editor: StructEditor;
    kind: StructItemKind;
    guid?: Guid;
    data?: any;
    insertAsSiblingPreferred?: boolean;
};
export class StructItem {
    private _guid;
    private _editor;
    private _kind;
    private _data;
    private _notifyChangeDisposable;
    private _parent;
    private _items;
    private _cells;
    private _insertAsSiblingPreferred;
    constructor(options: StructItemOptions);
    get guid(): Guid;
    get kind(): StructItemKind;
    get class(): string[];
    get index(): number;
    get depth(): number;
    get data(): any;
    set data(value: any);
    get selectionObject(): any;
    get trackChangesToSelectionObject(): boolean;
    get isVirtual(): boolean;
    get parent(): StructItem | undefined;
    /**
     * For internal use only.
     */
    set parent(value: StructItem | undefined);
    get isRoot(): boolean;
    get text(): string;
    get cells(): StructItemCells;
    get items(): StructItems;
    getItemsOfKind(kind: StructItemKind): StructItem[];
    getAllItems(includeSelf?: boolean): StructItem[];
    getAllItemsOfKind(kind: StructItemKind): StructItem[];
    isDescendantOf(item: StructItem): boolean;
    getIconName(): MaybePromise<string | undefined>;
    canEdit(): MaybePromise<boolean>;
    private _canEdit;
    canRemove(): MaybePromise<boolean>;
    canIndent(): MaybePromise<boolean>;
    canUnindent(): MaybePromise<boolean>;
    get editor(): StructEditor;
    createCell(column: StructColumn): StructItemCell;
    get position(): StructPosition;
    getDefaultInsertKind(): StructItemKind;
    getInsertPositionFor(kind: StructItemKind): StructPosition;
    cacheData(): MaybePromise<void>;
    toString(): string;
    protected getPropertyChangeNotifier(target: any): INotifyPropertyValueChanged | undefined;
    clearCachedCells(): void;
    protected onDataValueChanged(args: PropertyValueChangedEventArgs): Promise<void>;
}

export declare type StructItemCellOptions = {
    cells: StructItemCells;
    column: StructColumn;
    class?: string[];
    data?: any;
};
export abstract class StructItemCell {
    private _cells;
    private _column;
    private _className;
    private _notifyChangeDisposable;
    private _data;
    constructor(options: StructItemCellOptions);
    get class(): string[];
    get cells(): StructItemCells;
    get item(): StructItem;
    get column(): StructColumn;
    get name(): string;
    get index(): number;
    get visibleIndex(): number | undefined;
    get data(): any;
    set data(value: any);
    get selectionObject(): any;
    get editOnClick(): boolean;
    isValueRequired(): boolean;
    abstract getText(): MaybePromise<string>;
    abstract getDescriptor(): MaybePromise<IPropertyDescriptor | undefined>;
    getAdjacent(onlyVisible?: boolean, forward?: boolean): StructItemCell | undefined;
    protected getPropertyChangeNotifier(target: any): INotifyPropertyValueChanged | undefined;
    protected onDataValueChanged(args: PropertyValueChangedEventArgs): Promise<void>;
}

export class StructItemCellDefault extends StructItemCell {
    getText(): Promise<string>;
    getDescriptor(): Promise<IPropertyDescriptor | undefined>;
}

export class StructItemCellEditor extends EtchComponent {
    private _cellData;
    private _typeEditorService;
    private _width;
    private _height;
    private _editing;
    private _typeEditorEditing;
    private _editStyle;
    private _editorContainer;
    private _input;
    private _editOptions;
    private _error;
    private _readyPromise;
    private _resolveReadyPromise;
    constructor(options: StructItemCellEditorOptions);
    get editStyle(): UITypeEditorEditStyle;
    get item(): StructItem;
    get cellData(): StructItemCellData;
    get typeEditorEditing(): boolean;
    get editing(): boolean;
    get rootElementFocused(): boolean;
    get focusedInside(): boolean;
    get rootElement(): HTMLElement;
    get structEditor(): StructEditor;
    focus(): void;
    render(): JSX.Element;
    onDomReady(): void;
    beginEdit(options?: {
        triggerEvent?: Event;
        focusInside?: boolean;
        state?: any;
    }): Promise<void>;
    endEdit(): Promise<any>;
    setError(message?: string): Promise<void>;
    private _createCombo;
    private _loadComboValues;
    private _createReadOnlyEditor;
    private _createTextInput;
    private _onKeyDown;
    private _onKeyDownCapture;
    private _getPrefix;
}

export declare type StructItemCellLabelLabelTextCallback = () => MaybePromise<string>;
export declare type StructItemCellLabelOptions = {
    cells: StructItemCells;
    column: StructColumn;
    text: string | StructItemCellLabelLabelTextCallback;
};
export class StructItemCellLabel extends StructItemCell implements IPropertyDescriptor {
    private _text;
    constructor(options: StructItemCellLabelOptions);
    getText(): Promise<string>;
    getDescriptor(): Promise<this>;
    get name(): string;
    get displayName(): string;
    get description(): string;
    get category(): string;
    get type(): string;
    get typeConverter(): undefined;
    get isChild(): boolean;
    get children(): never[];
    getEditor(): undefined;
    getUIValidator(): IUIValidator | undefined;
    isDefault(): Promise<boolean>;
    isApplicable(): Promise<boolean>;
    isReadOnly(): Promise<boolean>;
    isVisible(): Promise<boolean>;
    getValue(): MaybePromise<string>;
    setValue(value: any): boolean;
    resetValue(): void;
}

export class StructItemCells {
    private _item;
    private _cellMap;
    constructor(item: StructItem);
    get item(): StructItem;
    get editor(): StructEditor;
    get count(): number;
    [Symbol.iterator](): Iterator<StructItemCell>;
    iterator(): Iterator<StructItemCell>;
    get(index: number): StructItemCell;
    getByVisibleIndex(index: number): StructItemCell | undefined;
    getByColumn(column: StructColumn): StructItemCell;
    getByColumnName(name: string): StructItemCell | undefined;
    private _getCellsArray;
}

export declare type StructItemKindOptions = {
    id: string;
    description?: string;
    iconName?: string;
    class?: string[];
    children?: StructItemKind[];
};
export declare class StructItemKind implements IEquatable {
    private _id;
    private _description;
    private _iconName;
    private _class;
    private _children;
    constructor(options: StructItemKindOptions);
    get id(): string;
    get description(): string;
    get iconName(): string | undefined;
    get class(): string[];
    get children(): StructItemKinds;
    toString(): string;
    static get ANY(): StructItemKind;
    static get NONE(): StructItemKind;
    equals(other: any): boolean;
}
export declare class StructItemKinds {
    private _items;
    constructor(items: StructItemKind[]);
    get count(): number;
    contains(kind: StructItemKind): boolean;
    [Symbol.iterator](): Iterator<any, any, undefined>;
    get(index: number): StructItemKind;
    getIndex(kind: StructItemKind): number;
    insert(index: number, kind: StructItemKind | StructItemKindOptions): void;
    add(kind: StructItemKind | StructItemKindOptions): void;
    remove(kind: StructItemKind | number): true | undefined;
}

export class StructItems {
    private _item;
    private _items;
    constructor(item: StructItem);
    get item(): StructItem;
    get count(): number;
    [Symbol.iterator](): Iterator<StructItem>;
    iterator(): Iterator<StructItem>;
    get(index: number): StructItem;
    getIndex(item: StructItem): number;
    insert(index: number, item: StructItem): void;
    add(item: StructItem): void;
    remove(item: StructItem | number): boolean;
}

export class StructPosition implements IEquatable {
    private _type;
    private _item;
    constructor(type: StructPositionType, item?: StructItem);
    get type(): StructPositionType;
    get item(): StructItem | undefined;
    toString(): string;
    isChildOf(item: StructItem): boolean | undefined;
    isDescendantOf(item: StructItem): boolean | undefined;
    isSiblingOf(item: StructItem): boolean | undefined;
    getParent(): StructItem | undefined;
    getDepth(): number;
    static root(): StructPosition;
    static firstChildOf(item: StructItem): StructPosition;
    static lastChildOf(item: StructItem): StructPosition;
    static after(item: StructItem): StructPosition;
    static before(item: StructItem): StructPosition;
    static undefined(): StructPosition;
    equals(other: any): boolean;
}

export declare enum StructPositionType {
    ROOT = 0,
    FIRST_CHILD_OF = 1,
    LAST_CHILD_OF = 2,
    BEFORE = 3,
    AFTER = 4,
    UNDEFINED = 5
}

export declare type VirtualItemTextProvider = () => string;
export declare type VirtualItemOptions = {
    editor: StructEditor;
    id: string;
    text: string | VirtualItemTextProvider;
    childrenKinds?: StructItemKind[];
    iconName?: string;
    data?: any;
};
export class VirtualItem extends StructItem {
    private _text;
    constructor(options: VirtualItemOptions);
    get isVirtual(): boolean;
    canEdit(): boolean;
    canRemove(): boolean;
    createCell(column: StructColumn): StructItemCellLabel;
    get trackChangesToSelectionObject(): boolean;
}

export declare type StructItemData = {
    item: StructItem;
    iconName: string;
    cellDataMap: Map<string, StructItemCellData>;
};
export declare type StructItemCellData = {
    cell: StructItemCell;
    itemData: StructItemData;
    value: any;
    valueString: string;
    readOnly: boolean;
    isDefault: boolean;
    html: string | HTMLElement;
    context: TypeDescriptorContext;
    editor?: UITypeEditor;
    converter?: TypeConverter;
    descriptor: IPropertyDescriptor;
    editorContainer?: HTMLElement;
    rendered: boolean;
    cellElement?: HTMLElement;
};
export declare type StructItemCellEditorOptions = {
    cellData: StructItemCellData;
    width?: string | number;
    height?: string | number;
};

export declare class StructEditor extends EtchComponent {
    private _settings;
    private _state;
    private _commandManager;
    private _columns;
    private _grid;
    constructor();
    get settings(): StructEditorSettings;
    protected get commandManager(): EditorCommandManager;
    get columns(): StructColumns;
    set readOnly(value: boolean);
    get readOnly(): boolean;
    get rootItem(): StructItem | undefined;
    get currentCell(): StructItemCell | undefined;
    get userEditEnabled(): boolean;
    focus(): void;
    getCurrentItem(): Promise<StructItem | undefined>;
    setCurrentItem(value: StructItem | Guid | string | undefined): Promise<void>;
    getSelectedItems(): Promise<StructItem[]>;
    setSelectedItems(items: (StructItem | Guid | string)[]): Promise<void>;
    expandItem(item: StructItem | Guid | string): Promise<void>;
    collapseItem(item: StructItem | Guid | string): Promise<void>;
    ensureItemVisible(item: StructItem | Guid | string): Promise<void>;
    getItem(guid: Guid | string): StructItem | undefined;
    getAllItems(): StructItem[];
    getAllItemsOfKind(kind: StructItemKind): StructItem[];
    getItemRelativeIndex(item: StructItem): number;
    createItem(kind: StructItemKind): MaybePromise<StructItem>;
    protected initializeItemData(item: StructItem): MaybePromise<void>;
    insertItem(position: StructPosition, item: StructItem): Promise<void>;
    repositionItem(item: StructItem, position: StructPosition): Promise<boolean>;
    removeItem(item: StructItem | Guid): Promise<boolean>;
    canRemoveItem(item: StructItem): Promise<boolean>;
    setSavePoint(): void;
    showColumn(name: string): Promise<void>;
    hideColumn(name: string): Promise<void>;
    setColumnVisibility(name: string, visible: boolean): Promise<void>;
    clear(): Promise<void>;
    reload(): Promise<void>;
    updateItems(items?: Iterable<StructItem> | StructItem, endCurrentCellEdit?: boolean): Promise<void>;
    beginUpdate(): void;
    endUpdate(): Promise<void>;
    beginMacroCommand(description?: string): void;
    endMacroCommand(): void;
    beginUpdateAndMacroCommand(description?: string): void;
    endUpdateAndMacroCommand(): void;
    beginCellEdit(options: {
        item: StructItem | Guid | string;
        columnName: string;
        focusInput?: boolean;
        triggerEvent?: Event;
    }): Promise<void>;
    endCurrentCellEdit(action?: CellEditEndAction, keepEditing?: boolean): Promise<boolean>;
    executeCommand(command: EditorCommand): Promise<boolean>;
    canUndo(): boolean;
    executeUndo(): Promise<void>;
    canRedo(): boolean;
    executeRedo(): Promise<void>;
    executeOperationOnSelectedItems(operation: StructEditorOperation, endCurrentCellEdit?: boolean): Promise<boolean>;
    executeOperation(operation: StructEditorOperation, items: StructItem[], endCurrentCellEdit?: boolean): Promise<boolean>;
    executeInsertKind(options: {
        kind: StructItemKind;
        position?: StructPosition;
        edit?: boolean;
    }): Promise<boolean>;
    executeInsertDefault(): Promise<boolean>;
    executeRemoveItem(item: StructItem): Promise<boolean>;
    canRemoveSelectedItems(): boolean;
    executeRemoveSelectedItems(): Promise<boolean>;
    protected updateEditorStatus(dirty: boolean): void;
    protected static removeDescendants(items: Iterable<StructItem>): StructItem[];
    protected defineSettings(settings: StructEditorSettings): void;
    protected defineColumns(columns: StructColumns): void;
    protected configureColumns(columns: StructColumns): void;
    protected createCommandManager(): EditorCommandManager;
    executeInsertNewItemCanceled(callback: EventHandler): Disposable;
    beforeExecuteInsertItem(callback: StructItemCancelableEventCallback): Disposable;
    afterExecuteInsertItem(callback: StructItemEventCallback): Disposable;
    beforeExecuteRemoveItem(callback: StructItemCancelableEventCallback): Disposable;
    afterExecuteRemoveItem(callback: StructItemEventCallback): Disposable;
    beforeExecuteRepositionItem(callback: StructItemCancelableEventCallback): Disposable;
    afterExecuteRepositionItem(callback: StructItemRepositionEventCallback): Disposable;
    beforeEditItem(callback: StructItemCancelableEventCallback): Disposable;
    afterEditItem(callback: StructItemCancelableEventCallback): Disposable;
    selectionChanged(callback: StructItemsEventCallback): Disposable;
    protected onWillBeginUpdate(): void;
    protected onWillEndUpdate(): MaybePromise<void>;
    protected onColumnHeaderClick(args: StructColumnPointerEventArgs): void;
    protected onColumnHeaderContextMenu(args: StructColumnPointerEventArgs): void;
    protected onCellContextMenu(args: StructItemCellPointerEventArgs): void;
    protected onExecuteInsertNewItemCanceled(args: StructItemEventArgs): Promise<void>;
    protected onBeforeExecuteInsertItem(args: StructItemCancelableEventArgs): Promise<void>;
    protected onAfterExecuteInsertItem(args: StructItemEventArgs): Promise<void>;
    protected onBeforeExecuteRemoveItem(args: StructItemCancelableEventArgs): Promise<void>;
    protected onAfterExecuteRemoveItem(args: StructItemEventArgs): Promise<void>;
    protected onBeforeInsertItem(position: StructPosition, index: number, parent: StructItem | undefined, item: StructItem): Promise<void> | void;
    protected onAfterInsertItem(position: StructPosition, index: number, parent: StructItem | undefined, item: StructItem): Promise<void> | void;
    protected onBeforeRemoveItem(item: StructItem): Promise<void> | void;
    protected onAfterRemoveItem(item: StructItem): Promise<void> | void;
    protected onBeforeExecuteRepositionItem(args: StructItemCancelableEventArgs): Promise<void> | void;
    protected onAfterExecuteRepositionItem(args: StructItemRepositionEventArgs): Promise<void> | void;
    protected onBeforeEditItem(args: StructItemValidateEditEventArgs): Promise<void> | void;
    protected onAfterEditItem(args: StructItemCellEventArgs): Promise<void> | void;
    protected onSelectionChanged(): Promise<void>;
    protected onCellEditorKeyDown(evt: KeyboardEvent): Promise<void>;
    protected onCellEditorKeyDownCapture(evt: KeyboardEvent): Promise<void>;
    private _getAdjacentVisibleCell;
    private _onCellEditorFocusOut;
    private _onCellSelectionChanged;
    private _onRowClicked;
    private _onRowContextMenu;
    private _getPreviousItem;
    private _getNexItem;
    private _calculateItemData;
    private _signalSelectionChanged;
    private _validateCellEdit;
    private _validateUniqueCellValue;
    private _setCellValue;
    render(): JSX.Element;
    writeAfterUpdate(): void;
    private _renderColumn;
    private _renderRow;
    private _renderRowSet;
    private _renderCell;
    private _renderCellEditor;
    private _parseHtml;
    private _getCellData;
    private _getCellUid;
    private _focusAndBeginItemEdit;
    private _isGridNotEmpty;
}
export declare type StructColumnPointerEventArgs = {
    column: StructColumn;
    originalEvent?: Event;
};
export declare type StructItemCellPointerEventArgs = {
    cell: StructItemCell;
    originalEvent?: Event;
};
export declare type StructItemEventCallback = (data: StructItemEventArgs) => Promise<void> | void;
export declare type StructItemsEventCallback = (data: StructItemsEventArgs) => Promise<void> | void;
export declare type StructItemCancelableEventCallback = (data: StructItemCancelableEventArgs) => Promise<void> | void;
export declare type StructItemCellEventCallback = (data: StructItemCancelableEventArgs) => Promise<void> | void;
export declare type StructItemRepositionEventCallback = (data: StructItemRepositionEventArgs) => Promise<void> | void;
export declare type StructItemBeforeEditEventCallback = (data: StructItem) => Promise<void> | void;
export declare type StructItemEventArgs = {
    item?: StructItem;
};
export declare type StructItemsEventArgs = {
    items?: StructItem[];
};
export declare type StructItemCancelableEventArgs = StructItemEventArgs & {
    position?: StructPosition;
    cancel: boolean;
};
export declare type StructItemRepositionEventArgs = {
    item: StructItem;
    position: StructPosition;
};
export declare type StructItemCellEventArgs = {
    item: StructItem;
    cell: StructItemCell;
    value: any;
};
export declare type StructItemValidateEditEventArgs = StructItemCellEventArgs & {
    valid: boolean;
    errorText?: string;
};

export declare type SuggestValuesCallback = (prefix: string) => MaybePromise<string[]>;
export declare type RenderDropDownCallback = () => HTMLElement | IView;
export declare type TextInputOptions = {
    placeHolder?: string;
    buttonVisible?: boolean;
    buttonIconName?: string;
    disabled?: boolean;
    suggestValues?: SuggestValuesCallback | string[];
    value?: string;
};
export declare class TextInput extends EtchComponent {
    private _suggestValues;
    private _suggest;
    private _suggestPromise;
    constructor(options?: TextInputOptions);
    get value(): string;
    set value(value: string);
    focus(): void;
    selectAll(): void;
    render(): JSX.Element;
    private _renderSuggest;
    private _renderButton;
    buttonClick(callback: EventHandler): void;
    suggestValueClick(callback: EventHandler): void;
    private _onSuggestKeyDown;
    private _onSuggestMouseDown;
    private _onSuggestChanged;
    private _getSuggestValues;
    private _onButtonClick;
    private get _options();
}

export declare type TreeItem = {
    caption: string;
    checkbox?: boolean;
    checked?: boolean;
    class?: string;
    dragDisabled?: boolean;
    dropDisabled?: boolean;
    editable?: boolean;
    expanded?: boolean;
    id: string;
    items?: TreeItem[];
    lazy: boolean;
    leaf?: boolean;
    startImgSrc: string;
    metadata?: string;
    order?: any;
};
