import { Guid, MaybePromise, AnyObject, Disposable } from '@genexusm-sdk/common' 
import { KBObjectInfo, KBObject, KBObjectPart, KBModel, KBObjectPartElement, RemoteCommandData, KBObjectPartCommand, KBObjectPartCompositeCommand, IKBObject, KBObjectDescriptor } from '@genexusm-sdk/architecture-common' 
import { BaseEditor, GXDocumentPartEditor, CommandData, CommandState, ICommandsRegistry, IMenuRegistry } from '@genexusm-sdk/architecture-ui-framework' 
import { EditorCommand, EditorCommandManager, UndoRedoEventArgs, TreeItem } from '@genexusm-sdk/common-components' 
import { KBObjectData, CommandListResultData, CommandResultData, KBObjectPartData } from '@genexusm-sdk/common-comm-layer' 
import { PropertiesObjectData, PropertyValueChangedEventArgs } from '@genexusm-sdk/common-properties' 
import { PatternDefinitionData, PatternSpecificationAttributeData, PatternSpecificationChildData, PatternSpecificationRootData, PatternSpecificationTypeData, SpecificationTypeInitializationData } from '@genexusm-sdk/genexus-comm-layer' 

export declare namespace PatternCategory {
    const ID: Guid;
    const NAME = "Patterns";
    const ICON_NAME = "icon icon-square";
    const NAMESPACE = "Patterns";
}

export declare namespace PatternObjectTypes {
    const SETTINGS: Guid;
}

export declare namespace PatternPartTypes {
    const INSTANCE: Guid;
    const SETTINGS: Guid;
    const VIRTUAL: Guid;
}

export declare namespace Commands {
    const REMOVE_ELEMENT: {
        id: string;
        label: string;
    };
}

export declare namespace Menus {
    const CONTEXT: string[];
    const ADD_SUBMENU: string[];
}

export declare const IPatternHelperDescriptor: unique symbol;
export interface IPatternHelperDescriptor {
    patternId: Guid;
    iconName?: string;
    settingsEditorHelper?: PatternEditorHelper;
    instanceEditorHelper?: PatternEditorHelper;
}

export interface IPatternEditor {
    readonly iconName: string;
    readonly caption: string;
    updateView(): MaybePromise<void>;
    updateData(): MaybePromise<void>;
    activate(): MaybePromise<void>;
    deactivate(): MaybePromise<void>;
    destroy(): MaybePromise<void>;
}

export class PatternEditorHelper {
    get partName(): string | undefined;
    get partDescription(): string | undefined;
    get replaceBaseEditor(): boolean;
    get baseEditorCaption(): string | undefined;
    initializeElement(element: PatternInstanceElement, sourceObject?: KBObjectInfo): MaybePromise<void>;
    customShowElement(element: PatternInstanceElement, data: {
        caption: string;
        iconName: string;
    }): MaybePromise<boolean>;
    createEditors(site: BaseEditor, part: PatternBasePart): MaybePromise<IPatternEditor[] | undefined>;
}

export declare type PatternFragmentEditorOptions = {
    site?: BaseEditor;
    rootElement: PatternInstanceElement;
    hasCommandManager?: boolean;
    readOnly?: boolean;
};
export declare class PatternFragmentEditor extends BaseEditor {
    private _rootElement;
    private _commandManager;
    constructor(props: PatternFragmentEditorOptions);
    private _getEditorForUndoRedo;
    get rootElement(): PatternInstanceElement;
    get patternPart(): PatternInstancePart;
    get patternInstance(): KBObject | undefined;
    protected get commandManager(): PatternInstanceEditorCommandManager | undefined;
    initialize(properties: AnyObject, children: AnyObject[]): void;
    refreshView(from?: PatternInstanceElement): MaybePromise<void>;
    beginUpdate(): void;
    endUpdate(): Promise<void>;
    destroy(): Promise<void>;
    createCommandManager(): PatternInstanceEditorCommandManager;
    protected onUndoRedo(undo: boolean): Promise<void>;
}

export class PatternCompositeEditor extends BaseEditor {
    private _part;
    private _editors;
    private _currentEditor;
    private _currentEditorIdx;
    constructor(props: {
        site?: BaseEditor;
        part: PatternBasePart;
    });
    render(): JSX.Element;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
    updateData(): Promise<void>;
    destroy(): Promise<void>;
    _createEditors(): Promise<void>;
    private _createBaseEditor;
    private _activateCurrentEditor;
    private _activateEditor;
    private _getEditorId;
    private _onTabSelected;
    private _getTabId;
}

export class PatternInstanceEditorCommand extends EditorCommand {
    private _command;
    constructor(command: PatternCommand);
    do(): Promise<boolean>;
    undo(): Promise<boolean>;
    get itemsAffected(): PatternInstanceElement[];
}

export class PatternInstanceEditorCommandManager extends EditorCommandManager {
    private _rootElement;
    private _disposables;
    constructor(editor: PatternFragmentEditor);
    get rootElement(): PatternInstanceElement | undefined;
    set rootElement(value: PatternInstanceElement | undefined);
    afterCommand(callback: (element: PatternInstanceElement) => void): Disposable;
    onAfterCommand(itemsAffected: any[]): Promise<void>;
    onBeforeUndoRedo(args: UndoRedoEventArgs): Promise<void>;
    onAfterUndoRedo(args: UndoRedoEventArgs): Promise<void>;
    mustRegisterChange(command: PatternCommand): boolean | undefined;
    dispose(): void;
    private _instanceChanged;
}

export class PatternPartEditor extends GXDocumentPartEditor {
    private _patternPart;
    render(): JSX.Element;
    updateView(): Promise<void>;
    updateData(): Promise<void>;
    activate(): Promise<void>;
}

export declare type PatternTreeEditorOptions = {
    site?: BaseEditor;
    hasCommandManager: boolean;
    rootElement: PatternInstanceElement;
    caption?: string;
    iconName?: string;
};
export declare class PatternTreeEditor extends PatternFragmentEditor implements IPatternEditor {
    private _caption;
    private _iconName;
    private _helper;
    private _rootItem;
    private _treeElement;
    private _treeItems;
    private _selectedElements;
    private _elementToSelect;
    constructor(props: PatternTreeEditorOptions);
    get helper(): PatternEditorHelper;
    onDomReady(): void;
    refreshView(from?: PatternInstanceElement): Promise<void>;
    render(): JSX.Element;
    get iconName(): string;
    get caption(): string;
    get icon(): string;
    updateView(): Promise<void>;
    updateData(): void;
    executeRemoveSelectedElement(): boolean;
    queryRemoveSelectedElement(data: CommandData, state: CommandState): boolean;
    registerCommands(registry: ICommandsRegistry): void;
    registerMenus(registry: IMenuRegistry): void;
    private _lazyLoadTreeItems;
    private _selectedItemsChange;
    private _itemContextMenu;
    private _dropItems;
    private _checkDroppableZone;
    private _getDropInfo;
    _getChildrenNodes(id: string): Promise<TreeItem[]>;
    private _setRootItem;
    private _setItem;
    getUINodeData(element: PatternInstanceElement, order?: number): Promise<TreeItem | undefined>;
    getSelectedElement(): PatternInstanceElement | undefined;
    getDefaultIconName(): string;
    executeAddNewElement(type: string): Promise<boolean>;
    private _reloadElement;
    private _getIdFromElement;
    private _reloadItems;
    private _selectElement;
}

export class PatternVirtualPartEditor extends GXDocumentPartEditor {
    private _activeItemEditor;
    private _currentItemEditorIdx;
    get virtualPart(): PatternVirtualPart;
    updateView(): Promise<void>;
    updateData(): Promise<void>;
    activate(): Promise<void>;
    render(): JSX.Element;
    private _renderTabs;
    private _onTabSelected;
    private _activateCurrentItemEditor;
    private _getItemEditorId;
    private _getItemEditor;
    private _onItemChanged;
    private _getTabId;
}

export class PatternVirtualPartItemEditor extends BaseEditor {
    private _isActive;
    private _item;
    private _patternPart;
    constructor(props: {
        item: PatternVirtualPartItem;
    });
    render(): JSX.Element;
    updateData(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
    private _renderInstanceEditor;
    private _activateInstanceEditor;
    private _onApplyPatternChange;
    private _onApplyLabelClick;
    private _onChanged;
}

export interface IPatternsService {
    getPattern(id: Guid): PatternDefinition | undefined;
    getPatternByName(name: string): PatternDefinition | undefined;
    readonly patterns: PatternDefinition[];
    afterPatternsLoaded(callback: Function): Disposable;
}

export abstract class PatternBase extends KBObject {
    private _ownerPart;
    get ownerPart(): KBObjectPart;
    set ownerPart(value: KBObjectPart);
    abstract get definition(): PatternDefinition;
    abstract get specification(): PatternSpecificationRoot;
    abstract get patternPartType(): Guid;
    getPatternPart(): Promise<PatternBasePart>;
}

export class PatternInstance extends PatternBase {
    constructor(model: KBModel, patternId: Guid);
    get definition(): PatternDefinition;
    get specification(): PatternSpecificationRoot;
    get patternPartType(): Guid;
}

export class PatternSettings extends PatternBase {
    private _patternId;
    private _definition;
    constructor(model: KBModel, id: Guid);
    get definition(): PatternDefinition;
    get specification(): PatternSpecificationRoot;
    get patternPartType(): Guid;
    deserialize(data: KBObjectData): Promise<void>;
    static get(model: KBModel, id: Guid): Promise<PatternSettings>;
}

export abstract class PatternBasePart extends KBObjectPart {
    private _rootElement;
    constructor(patternBase: PatternBase, partType: Guid);
    get definition(): PatternDefinition;
    get specification(): PatternSpecificationRoot;
    get rootElement(): PatternInstanceElement;
    getElementByGuid(guid: Guid): PatternInstanceElement | undefined;
    createCompositeCommand(): PatternCompositeCommand;
    protected getAllElements(): KBObjectPartElement[];
    executeRemoteCommandList(commands: CommandData[]): Promise<CommandListResultData>;
    executeRemoteCommand(data: CommandData): Promise<CommandResultData>;
    private _getOwnerPart;
    deserializeContent(data: string): Promise<void>;
}

export class PatternInstancePart extends PatternBasePart {
    constructor(instance: PatternBase);
}

export class PatternSettingsPart extends PatternBasePart {
    constructor(instance: PatternInstance);
}

export class PatternVirtualPart extends KBObjectPart {
    private _items;
    constructor(kbObject: KBObject);
    get items(): PatternVirtualPartItem[];
    getItem(patternId: Guid): PatternVirtualPartItem | undefined;
    serialize(): Promise<KBObjectPartData>;
    deserializeContent(data: string): Promise<void>;
    private _getAppliedPatterns;
}

export declare type PatternVirtualPartItemData = {
    patternId: string;
    applyPattern: boolean;
    instanceSessionId: string;
};
export class PatternVirtualPartItem {
    private _part;
    private _pattern;
    private _applyPattern;
    private _instanceSessionId;
    private _patternInstance;
    constructor(part: PatternVirtualPart, pattern: PatternDefinition);
    get model(): KBModel;
    get part(): PatternVirtualPart;
    get pattern(): PatternDefinition;
    get applyPattern(): boolean;
    set applyPattern(value: boolean);
    getPatternInstance(): Promise<PatternInstance | undefined>;
    deserialize(data: PatternVirtualPartItemData): void;
    serialize(): PatternVirtualPartItemData;
    _loadRemoteItemData(): Promise<void>;
}

export declare class CommandFactory {
    static createAddElementCommand: (parent: PatternInstanceElement, child: PatternInstanceElement) => PatternCommand;
    static createInsertElementCommand: (parent: PatternInstanceElement, child: PatternInstanceElement, index: number) => PatternCommand;
    static createMoveElementCommand: (element: PatternInstanceElement, oldPosition: number, newPosition: number) => PatternCommand;
    static createRemoveElementCommand: (parent: PatternInstanceElement, child: PatternInstanceElement, position: number) => PatternCommand;
    static createReparentElementCommand: (element: PatternInstanceElement, oldParent: PatternInstanceElement, newParent: PatternInstanceElement, oldPosition: number, newPosition: number) => PatternCommand;
    static createSetPropertyValueCommand: (element: PatternInstanceElement, propName: string, oldValue: any, value: any) => PatternCommand;
}

export class AddElementCommand extends PatternCommand {
    private _parent;
    private _child;
    constructor(parent: PatternInstanceElement, child: PatternInstanceElement);
    get changeRoot(): PatternInstanceElement;
    get parent(): PatternInstanceElement;
    get child(): PatternInstanceElement;
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): Promise<RemoteCommandData[]>;
}

export class InsertElementCommand extends PatternCommand {
    private _parent;
    private _child;
    private _position;
    constructor(parent: PatternInstanceElement, child: PatternInstanceElement, position: number);
    get changeRoot(): PatternInstanceElement;
    get parent(): PatternInstanceElement;
    get child(): PatternInstanceElement;
    get position(): number;
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): Promise<RemoteCommandData[]>;
}

export class MoveElementCommand extends PatternCommand {
    private _element;
    private _oldPosition;
    private _newPosition;
    constructor(element: PatternInstanceElement, oldPosition: number, newPosition: number);
    get changeRoot(): PatternInstanceElement;
    get element(): PatternInstanceElement;
    get oldPosition(): number;
    get newPosition(): number;
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): {
        id: string;
        data: {
            guid: string;
            position: number;
        };
    }[];
}

export abstract class PatternCommand extends KBObjectPartCommand {
    abstract get changeRoot(): PatternInstanceElement;
}

export class PatternCompositeCommand extends KBObjectPartCompositeCommand {
    get changeRoot(): PatternInstanceElement;
}

export class RemoveElementCommand extends PatternCommand {
    private _parent;
    private _child;
    private _position;
    constructor(parent: PatternInstanceElement, child: PatternInstanceElement, position: number);
    get changeRoot(): PatternInstanceElement;
    get parent(): PatternInstanceElement;
    get child(): PatternInstanceElement;
    get position(): number;
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): {
        id: string;
        data: {
            guid: string;
        };
    }[];
}

export class ReparentElementCommand extends PatternCommand {
    private _element;
    private _oldParent;
    private _newParent;
    private _oldPosition;
    private _newPosition;
    constructor(element: PatternInstanceElement, oldParent: PatternInstanceElement, newParent: PatternInstanceElement, oldPosition: number, newPosition: number);
    get changeRoot(): PatternInstanceElement;
    get element(): PatternInstanceElement;
    get oldParent(): PatternInstanceElement;
    get newParent(): PatternInstanceElement;
    get oldPosition(): number;
    get newPosition(): number;
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): {
        id: string;
        data: {
            guid: string;
            newParentGuid: string;
            position: number;
        };
    }[];
}

export class SetPropertyValueCommand extends PatternCommand {
    private _element;
    private _propName;
    private _oldValue;
    private _value;
    constructor(element: PatternInstanceElement, propName: string, oldValue: any, value: any);
    get changeRoot(): PatternInstanceElement;
    get element(): PatternInstanceElement;
    get propertyName(): string;
    get oldValue(): any;
    get value(): any;
    do(): Promise<void>;
    undo(): Promise<void>;
    _setValue(value: any): Promise<void>;
}

export declare type PatternInstanceElementOptions = {
    part: PatternBasePart;
    guid?: Guid;
    name: string;
    specification: PatternSpecificationType;
    parent?: PatternInstanceElement;
    skipChildrenInit?: boolean;
};
export declare class PatternInstanceElement extends KBObjectPartElement {
    private _guid;
    private _name;
    private _specification;
    private _parent;
    private _children;
    private _caption;
    private _sourceObjectGuid;
    constructor(options: PatternInstanceElementOptions);
    get patternPart(): PatternBasePart;
    get ownerKBObject(): KBObject;
    get remoteInternalPath(): string;
    get remotePath(): string;
    getTypeInfo(): Promise<{
        type: string;
        description: string;
        isReadOnly: boolean;
    }>;
    get guid(): Guid;
    get name(): string;
    get specification(): PatternSpecificationType;
    get childSpecification(): PatternSpecificationChildElement | undefined;
    get parent(): PatternInstanceElement | undefined;
    get children(): PatternInstanceElement[];
    get count(): number;
    get depth(): number;
    getElement(name: string): PatternInstanceElement | undefined;
    getElementAt(position: number): PatternInstanceElement | undefined;
    getElementPosition(element: PatternInstanceElement): number;
    containsElement(element: PatternInstanceElement): boolean;
    getAllElements(includeSelf?: boolean): PatternInstanceElement[];
    isDescendantOf(ancestor: PatternInstanceElement): boolean;
    addNewElement(name: string, source?: IKBObject, guid?: Guid, skipChildrenInit?: boolean): PatternInstanceElement;
    addNewElementFromData(data: PatternInstanceElementData, reassignGuids?: boolean): Promise<PatternInstanceElement>;
    addElement(element: PatternInstanceElement): void;
    internalInsertElement(position: number, child: PatternInstanceElement): void;
    removeElement(element: PatternInstanceElement): void;
    moveElement(element: PatternInstanceElement, newPosition: number): void;
    reparent(newParent: PatternInstanceElement, position?: number): void;
    reload(): Promise<void>;
    createChildElement(name: string, guid?: Guid, skipChildrenInit?: boolean): PatternInstanceElement;
    getCaption(): Promise<string | undefined>;
    onPropertyValueChanged(args: PropertyValueChangedEventArgs): void;
    onBeforePropertyAccess(): Promise<void>;
    static getCommonRoot(elements: PatternInstanceElement[]): PatternInstanceElement;
    private static _getCommonRootOf;
    /**
     *
     * @return {PatternSpecificationChildElement[]}
     */
    getChildrenToAdd(): PatternSpecificationChildElement[];
    canBeRemoved(): boolean | undefined;
    canBeReordered(): boolean | undefined;
    canAddNewElement(child: string | PatternSpecificationChildElement): boolean;
    serialize(includeProperties?: boolean, includeChildren?: boolean): Promise<PatternInstanceElementData>;
    deserialize(data: PatternInstanceElementData, reassignGuids?: boolean): Promise<void>;
    private _initializeChildren;
    private _sortChildren;
    private _remove;
    private _insert;
}
export declare type PatternInstanceElementData = {
    guid: string;
    name: string;
    type: string;
    caption?: string;
    sourceObjectGuid?: string;
    properties?: PropertiesObjectData;
    children?: PatternInstanceElementData[];
};

export declare enum PatternChildrenType {
    DEFAULT = 0,
    CHOICE = 1,
    SEQUENCE = 2,
    MIXED = 3
}

export class PatternDefinition {
    private _publisher;
    private _id;
    private _iconName;
    private _category;
    private _name;
    private _description;
    private _defaultName;
    private _version;
    private _parentTypes;
    private _standalone;
    private _settingsSpecification;
    private _instanceSpecification;
    private _settingsEditorHelper;
    private _instanceEditorHelper;
    constructor(data: PatternDefinitionData);
    get publisher(): string;
    get id(): Guid;
    get iconName(): string;
    set iconName(value: string);
    get category(): Guid;
    get name(): string;
    get description(): string;
    get defaultName(): string;
    get version(): string;
    get parentTypes(): KBObjectDescriptor[];
    get settingsSpecification(): PatternSpecificationRoot;
    get instanceSpecification(): PatternSpecificationRoot;
    get standalone(): boolean;
    get settingsEditorHelper(): PatternEditorHelper | undefined;
    set settingsEditorHelper(value: PatternEditorHelper | undefined);
    get instanceEditorHelper(): PatternEditorHelper | undefined;
    set instanceEditorHelper(value: PatternEditorHelper | undefined);
}

export class PatternSpecificationAttribute {
    private _name;
    private _exportable;
    constructor(data: PatternSpecificationAttributeData);
    get name(): string;
    get exportable(): boolean;
}

export class PatternSpecificationChildElement {
    private _parentType;
    private _name;
    private _type;
    private _description;
    private _multiple;
    private _optional;
    constructor(parentType: PatternSpecificationType, data: PatternSpecificationChildData);
    get parentType(): PatternSpecificationType;
    get specification(): PatternSpecificationRoot;
    get specificationType(): PatternSpecificationType;
    get name(): string;
    get type(): string;
    get description(): string;
    get multiple(): boolean;
    get optional(): boolean;
}

export class PatternSpecificationRoot {
    private _definition;
    private _name;
    private _version;
    private _rootTypeName;
    private _isEmpty;
    private _types;
    constructor(definition: PatternDefinition, data: PatternSpecificationRootData);
    get definition(): PatternDefinition;
    get name(): string;
    get version(): string;
    get isEmpty(): boolean;
    get rootTypeName(): string;
    get types(): PatternSpecificationType[];
    getType(name: string): PatternSpecificationType | undefined;
}

export class PatternSpecificationType {
    private _name;
    private _keyAttributeName;
    private _childrenType;
    private _initialization;
    private _attributes;
    private _children;
    private _specification;
    constructor(specification: PatternSpecificationRoot, data: PatternSpecificationTypeData);
    get specification(): PatternSpecificationRoot;
    get name(): string;
    get keyAttributeName(): string;
    get childrenType(): number;
    get initialization(): SpecificationTypeInitialization[];
    get atributes(): PatternSpecificationAttribute[];
    get children(): PatternSpecificationChildElement[];
    getElement(name: string): PatternSpecificationChildElement | undefined;
    hasAttribute(name: string): boolean;
}

export class SpecificationTypeInitialization {
    private _type;
    private _referenceProperty;
    private _propertyValues;
    constructor(data: SpecificationTypeInitializationData);
    get type(): Guid;
    get referenceProperty(): string;
    get propertyValues(): string;
}

export declare class Services {
    static patterns: IPatternsService;
}
