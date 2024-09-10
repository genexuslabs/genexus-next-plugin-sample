import { KBModel, KBModelPart, RemotePropertiesObject, KBObject, KBObjectInfo, KBObjectPart, RemoteCommandData, KBObjectPartCommand, KBObjectPartElement, StructPartItem, StructPart, RemotePropertyManager, StructPartItemOptions } from '@genexusm-sdk/architecture-common' 
import { DataStoreData, DeploymentUnitData, GeneratorData, DesignSystemReferences } from '@genexusm-sdk/genexus-comm-layer' 
import { ComparableProperties, IComparableModelPart } from '@genexusm-sdk/architecture-ui-framework' 
import { Guid, MaybePromise } from '@genexusm-sdk/common' 
import { KBObjectData, KBObjectPartData, CommandResultData } from '@genexusm-sdk/common-comm-layer' 
import { ResolveValueResult, ISourceRegionPart, ResolveValueData, MultiRegionSourcePart, SourcePart } from '@genexusm-sdk/language-common' 
import { PropertiesObjectData, CustomTypeDescriptorInfo, PropertyManager, IPropertyDescriptor, PropertiesObject } from '@genexusm-sdk/common-properties' 
import { PatternInstance, PatternInstanceElement, PatternInstancePart } from '@genexusm-sdk/patterns-common' 
import { UploadedFile } from '@genexusm-sdk/common-components' 

export declare namespace Commands {
    const SHOW_LAST_NAVIGATION: {
        id: string;
        label: string;
    };
    const SHOW_LAST_IMPACT: {
        id: string;
        label: string;
    };
    const SHOW_LAUNCHPAD: {
        id: string;
        label: string;
    };
    const BUILD_ALL: {
        id: string;
        label: string;
    };
    const REBUILD_ALL: {
        id: string;
        label: string;
    };
    const RUN: {
        id: string;
        label: string;
        keybinding: string;
    };
    const RUN_WITHOUT_BUILDING: {
        id: string;
        label: string;
    };
    const CREATE_DB: {
        id: string;
        label: string;
    };
    const IMAPCT_DB: {
        id: string;
        label: string;
    };
    const CANCEL_BUILD: {
        id: string;
        label: string;
    };
    const SET_AS_STARTUP_OBJECT: {
        id: string;
        label: string;
    };
    const SKETCH_IMPORT: {
        id: string;
        label: string;
    };
    const SHOW_LIVE_INSPECTOR: {
        id: string;
        label: string;
    };
    const TOGGLE_LIVE_EDITING: {
        id: string;
        label: string;
    };
    const REFERENCES: {
        id: string;
        label: string;
    };
}
export declare namespace DiagramsEditorCommands {
    const BRING_TO_FRONT: {
        id: string;
        label: string;
    };
    const SEND_TO_BACK: {
        id: string;
        label: string;
    };
    const ALIGN_LEFT: {
        id: string;
        label: string;
    };
    const ALIGN_CENTER: {
        id: string;
        label: string;
    };
    const ALIGN_RIGHT: {
        id: string;
        label: string;
    };
    const ALIGN_TOP: {
        id: string;
        label: string;
    };
    const ALIGN_MIDDLE: {
        id: string;
        label: string;
    };
    const ALIGN_BOTTOM: {
        id: string;
        label: string;
    };
    const SAME_WIDTH: {
        id: string;
        label: string;
    };
    const SAME_HEIGHT: {
        id: string;
        label: string;
    };
    const SAME_SIZE: {
        id: string;
        label: string;
    };
    const ZOOM_IN: {
        id: string;
        label: string;
    };
    const ZOOM_OUT: {
        id: string;
        label: string;
    };
    const ZOOM_50: {
        id: string;
        label: string;
    };
    const ZOOM_100: {
        id: string;
        label: string;
    };
    const ZOOM_150: {
        id: string;
        label: string;
    };
    const ZOOM_200: {
        id: string;
        label: string;
    };
    const ZOOM_300: {
        id: string;
        label: string;
    };
    const ZOOM_400: {
        id: string;
        label: string;
    };
    const ZOOM_800: {
        id: string;
        label: string;
    };
    const SAVE_AS_IMAGE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const COPY_IMAGE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const PRINT: {
        id: string;
        label: string;
    };
    const PRINT_PREVIEW: {
        id: string;
        label: string;
        keybinding: string;
    };
}
export declare namespace LayoutEditorCommands {
    const INSERT_ROW_BEFORE: {
        id: string;
        label: string;
    };
    const INSERT_ROW_AFTER: {
        id: string;
        label: string;
    };
    const INSERT_CELL_BEFORE: {
        id: string;
        label: string;
    };
    const INSERT_CELL_AFTER: {
        id: string;
        label: string;
    };
    const INSERT_COLUMN_BEFORE: {
        id: string;
        label: string;
    };
    const INSERT_COLUMN_AFTER: {
        id: string;
        label: string;
    };
    const DELETE_ROW: {
        id: string;
        label: string;
    };
    const DELETE_COLUMN: {
        id: string;
        label: string;
    };
    const DELETE_CELL: {
        id: string;
        label: string;
    };
}
export declare namespace ActionGroupsCommands {
    const INSERT_ACTION: {
        id: string;
        label: string;
        iconClass: string;
    };
    const INSERT_DATA: {
        id: string;
        label: string;
        iconClass: string;
    };
    const INSERT_IMAGE: {
        id: string;
        label: string;
        iconClass: string;
    };
    const INSERT_TEXT_BLOCK: {
        id: string;
        label: string;
        iconClass: string;
    };
    const INSERT_ACTION_GROUP: {
        id: string;
        label: string;
        iconClass: string;
    };
    const DELETE: {
        id: string;
        label: string;
        iconClass: string;
    };
    const GO_TO_EVENT: {
        id: string;
        label: string;
        iconClass: string;
    };
}
export declare namespace LanguageObjectCommands {
    const NEW_LANGUAGE: {
        id: string;
        label: string;
    };
    const ADD_TO_KB: {
        id: string;
        label: string;
    };
    const COPY_CODE_TO_VALUE: {
        id: string;
        label: string;
    };
}
export declare namespace WorkWithDevicesCommands {
    const REMOVE_ELEMENT: {
        id: string;
        label: string;
    };
}
export declare namespace WorkWithImagesCommands {
    const OPEN_IMAGE: {
        id: string;
        label: string;
    };
}
export declare namespace PreferenceCommands {
    const NEW_ENVIRONMENT: {
        id: string;
        label: string;
    };
    const SET_AS_CURRENT_ENVIRONMENT: {
        id: string;
        label: string;
    };
}
export declare namespace TransactionStructPartEditorCommands {
    const INSERT_LEVEL: {
        id: string;
        label: string;
        keybinding: string;
    };
    const TOGGLE_KEY: {
        id: string;
        label: string;
        keybinding: string;
    };
    const TOGGLE_DESCRIPTION: {
        id: string;
        label: string;
        keybinding: string;
    };
}
export declare namespace GAMCommands {
    const ENABLE_INTEGRATED_SECURITY: {
        id: string;
        label: string;
    };
    const INSTALLATION_SETTINGS: {
        id: string;
        label: string;
    };
}
export declare namespace TableObjectCommands {
    namespace Common {
        const REFERENCES: {
            id: string;
            label: string;
        };
    }
    namespace Indexes {
        const ADD_INDEX: {
            id: string;
            label: string;
        };
        const DELETE_INDEX: {
            id: string;
            label: string;
        };
        const ADD_ATTRIBUTE: {
            id: string;
            label: string;
        };
        const DELETE_ATTRIBUTE: {
            id: string;
            label: string;
        };
    }
}
export declare namespace SDTObjectCommands {
    const INSERT_MEMBER: {
        id: string;
        label: string;
    };
    const INSERT_SUBSTRUCTURE: {
        id: string;
        label: string;
        keybinding: string;
    };
    const INSERT_SIBLING_SUBSTRUCTURE: {
        id: string;
        label: string;
        keybinding: string;
    };
}

export declare namespace Menus {
    const VIEW_REPORTS: string[];
    const BUILD: string[];
    const BUILD_ALL: string[];
    const RUN: string[];
    const CREATE_AND_IMPACT_DB: string[];
    const CANCEL_BUILD: string[];
    const LIVE_EDITING: string[];
    const TOOLS: string[];
}
export declare namespace LayoutEditorMenus {
    const CONTEXT: string[];
    const CONTEXT_CONTROL: string[];
}
export declare namespace ActionGroupsMenus {
    const CONTEXT_SD: string[];
    const CONTEXT_WEB: string[];
}
export declare namespace LanguageObjectMenus {
    const CONTEXT_MODEL_TREE: string[];
    const LANGUAGE_ITEM_MODEL_TREE: string[];
    const STRUCTURE_EDITOR_CONTEXT: string[];
}
export declare namespace WorkWithImagesMenu {
    const CONTEXT: string[];
}
export declare namespace DiagramsEditorMenus {
    const CONTEXT: string[];
    const ALIGN: string[];
    const SIZE: string[];
    const ZOOM: string[];
}
export declare namespace PreferenceMenus {
    const CONTEXT: string[];
    const CONFIGURATION_NODE_CONTEXT: string[];
}
export declare namespace WorkWithDevicesMenus {
    const CONTEXT: string[];
    const ADD: string[];
}
export declare namespace GAMMenus {
    const GAM: string[];
}
export declare namespace TableObjectMenus {
    const STRUCTURE: string[];
    const INDEXES: string[];
}
export declare namespace SDTObjectMenus {
    const STRUCTURE: string[];
}

export declare type IarResultEventArgs = {
    result: number;
};
export declare type NavigationReportEventArgs = {
    key: string;
    name: string;
    status: number;
    uri: string;
};
export declare type BuildResultEventArgs = {
    status: number;
    task: number;
    state: number;
    exit: number;
    uri: string;
};

export declare namespace GXBLEvents {
    const IAR_RESULT = "event://GenexusM/Genexus/IARResult";
    const IMPACT_REPORT = "event://GenexusM/Genexus/ImpactReport";
    const NAVIGATION_REPORT = "event://GenexusM/Genexus/Navigation";
    const AFTER_BUILD = "event://GenexusM/Genexus/AfterBuild";
}

export declare class GAMHelper {
    private static _isEnabled;
    private static _disposables;
    static isEnabled(): boolean;
    static subscribeToEvents(): void;
    private static _afterOpenKB;
    private static _propertyValueChanged;
    private static _beforeCloseKB;
    private static _loadIsEnabled;
    private static _checkIsEnabled;
}

export declare class DataStoresPart extends KBModelPart implements IComparableModelPart {
    private _dataStores;
    constructor(model: KBModel);
    protected deserializeContent(value: string): void;
    get dataStores(): DataStore[];
    getComparableProperties(): Promise<ComparableProperties[]>;
}
export declare class DataStore extends RemotePropertiesObject {
    private _part;
    private _id;
    private _name;
    private _dbms;
    constructor(part: DataStoresPart, data: DataStoreData);
    get model(): KBModel;
    get part(): DataStoresPart;
    get remotePath(): string;
    get id(): number;
    get name(): string;
    get dbms(): number;
    getTypeInfo(): {
        type: string;
        description: string;
        isReadOnly: boolean;
    };
}

export declare class DeploymentUnitsPart extends KBModelPart {
    private _deploymentUnits;
    constructor(model: KBModel);
    protected deserializeContent(value: string): void;
    get deploymentUnits(): DeploymentUnitCategory[];
    private _subscribeEvents;
    private _afterSaveKBObject;
    private _existsDU;
}
export declare class DeploymentUnitCategory extends RemotePropertiesObject {
    private _part;
    private _id;
    private _name;
    constructor(part: DeploymentUnitsPart, data: DeploymentUnitData);
    get model(): KBModel;
    get remotePath(): string;
    get id(): string;
    get name(): string;
}

export declare class GeneratorsPart extends KBModelPart implements IComparableModelPart {
    private _generators;
    constructor(model: KBModel);
    protected deserializeContent(value: string): void;
    get generators(): Generator[];
    getComparableProperties(): Promise<ComparableProperties[]>;
}
export declare class Generator extends RemotePropertiesObject {
    private _part;
    private _id;
    private _name;
    private _generatorType;
    private _enablePropertyName;
    private _isExtension;
    private _isDefaultFrontend;
    constructor(part: GeneratorsPart, data: GeneratorData);
    get model(): KBModel;
    get part(): GeneratorsPart;
    get remotePath(): string;
    get id(): number;
    get name(): string;
    get generatorType(): number;
    get enablePropertyName(): string;
    get isExtension(): boolean;
    get isDefaultFrontend(): boolean;
    getTypeInfo(): {
        type: string;
        description: string;
        isReadOnly: boolean;
    };
}

export declare class GXModelPartClasses {
    static get DATA_STORES(): Guid;
    static get DEPLOYMENT_UNITS(): Guid;
    static get GENERATORS(): Guid;
}

export declare class API extends KBObject {
    constructor(model: KBModel);
}

export declare class Attribute extends KBObject {
    constructor(model: KBModel);
    static getAll(model: KBModel): Promise<Attribute[]>;
    static getByName(model: KBModel, name: string): Promise<Attribute>;
    static getByGuid(model: KBModel, guid: Guid): Promise<Attribute>;
}

export declare class DataProvider extends KBObject {
    constructor(model: KBModel);
}

export declare class DataSelector extends KBObject {
    constructor(model: KBModel);
}

export declare class DataStoreCategory extends KBObject {
    constructor(model: KBModel);
}

export declare class DeploymentUnit extends KBObject {
    constructor(model: KBModel);
}

export declare class DesignSystem extends KBObject {
    /**
     *
     * @param {KBModel} model
     */
    constructor(model: KBModel);
    /**
     *
     * @override
     */
    deserialize(data: KBObjectData): Promise<void>;
}

export declare class Domain extends KBObject {
    constructor(model: KBModel);
}

export declare class ExternalObject extends KBObject {
    constructor(model: KBModel);
}

export declare class GeneratorCategory extends KBObject {
    constructor(model: KBModel);
}

export declare class GXObjectClasses {
    static get API(): Guid;
    static get ATTRIBUTE(): Guid;
    static get BUSINESS_PROCESS_DIAGRAM(): Guid;
    static get CATEGORY_PATTERN_ID(): Guid;
    static get COLOR_PALETTE(): Guid;
    static get DASH_BOARD_PATTERN_ID(): Guid;
    static get DATA_PROVIDER(): Guid;
    static get DATA_SELECTOR(): Guid;
    static get DATA_STORE_CATEGORY(): Guid;
    static get DEPLOYMENT_UNIT(): Guid;
    static get DESIGN_SYSTEM(): Guid;
    static get DOMAIN(): Guid;
    static get EXTERNAL_OBJECT(): Guid;
    static get IMAGE(): Guid;
    static get GENERATOR_CATEGORY(): Guid;
    static get INDEX(): Guid;
    static get LANGUAGE(): Guid;
    static get PROCEDURE(): Guid;
    static get SDT(): Guid;
    static get SD_PANEL(): Guid;
    static get STENCIL(): Guid;
    static get SUBTYPE_GROUP(): Guid;
    static get TABLE(): Guid;
    static get THEME(): Guid;
    static get THEME_CLASS(): Guid;
    static get THEME_COLOR(): Guid;
    static get TRANSACTION(): Guid;
    static get URL_REWRITE(): Guid;
    static get USER_CONTROL(): Guid;
    static get WEB_PANEL(): Guid;
    static get WIKI_FILE(): Guid;
    static get WORK_WITH_DEVICES_PATTERN_ID(): Guid;
    static get WORK_WITH_WEB_PATTERN_ID(): Guid;
    static get WORKFLOW_CALENDAR(): Guid;
    static get WORKFLOW_DOCUMENT(): Guid;
    static get WORKFLOW_ROLE(): Guid;
    static get WORKFLOW_TEMPLATE_NOTIFICATION(): Guid;
}

export declare class Image extends KBObject {
    constructor(model: KBModel);
}

export declare class IndexObject extends KBObject {
    constructor(model: KBModel);
}

export declare class Language extends KBObject {
    constructor(model: KBModel);
}

export declare class Procedure extends KBObject {
    constructor(model: KBModel);
}

export declare class SDPanel extends KBObject {
    constructor(model: KBModel);
}

export declare class Sdt extends KBObject {
    constructor(model: KBModel);
}

export declare class Stencil extends KBObject {
    constructor(model: KBModel);
}

export declare class SubtypeGroup extends KBObject {
    constructor(model: KBModel);
}

export declare class Table extends KBObject {
    constructor(model: KBModel);
}

export declare class Transaction extends KBObject {
    constructor(model: KBModel);
    getAssociatedTables(): Promise<KBObjectInfo[]>;
}

export declare class URLRewrite extends KBObject {
    constructor(model: KBModel);
}

export declare class UserControl extends KBObject {
    constructor(model: KBModel);
}

export declare class WebPanel extends KBObject {
    constructor(model: KBModel);
}

export declare class WikiFileKBObject extends KBObject {
    constructor(model: KBModel);
    getBlobPart(): Promise<WikiBlobPart>;
}

export declare class DeploymentUnitDefinitionPart extends KBObjectPart implements ISourceRegionPart {
    constructor(kbObject: KBObject);
    resolveValue(data: ResolveValueData): Promise<ResolveValueResult>;
    private _getDepoyableObjectName;
}

export declare class DesignSystemElementsPart extends DesignSystemPart {
    constructor(object: KBObject);
}

export declare class DesignSystemGxPropertyReference {
    Id: string;
    Description: string;
    IsClassRef: string;
    Values: string[];
    TypesSupport: string[];
}

export declare class DesignSystemPart extends KBObjectPart {
    source: string;
    lastSavedSource: string;
    validateData: Function;
    constructor(object: KBObject, type: Guid);
    /**
     * @override
     */
    serializeContent(): Promise<string>;
    /**
     * @override
     */
    deserialize(data: any): Promise<void>;
    deserializeContent(value: string): Promise<void>;
    private _setLastSavedSource;
    setSource(value: string): void;
    getSource(): string;
    getLastSavedSource(): string;
}

export declare class DesignSystemData {
    source: string;
    classes: string[];
    images: string[];
    references: DesignSystemReferences;
    tokens: {
        [group: string]: string[];
    };
    gxProperties: DesignSystemGxPropertyReference[];
}

export declare class DesignSystemStylesPart extends DesignSystemPart {
    partData: DesignSystemData;
    constructor(object: KBObject);
    /**
     * @override
     */
    deserializeContent(data: any): Promise<void>;
    getClasses(): string[];
    setReferences(): Promise<void>;
    getTokens(group: string): string[];
    getImages(): string[];
    getGXProperties(): DesignSystemGxPropertyReference[];
    /**
     * @override
     */
    setSource(value: string): void;
    /**
     * @override
     */
    getSource(): string;
}

export declare class DesignSystemTokensPart extends DesignSystemPart {
    constructor(object: KBObject);
}

export declare type InsertDiagramElementCommandOptions = {
    element: DiagramElement;
    parent?: DiagramElement;
    slotId?: string;
    index: number;
};
export declare class InsertDiagramElementCommand extends KBObjectPartCommand {
    private _element;
    private _parent;
    private _slotId;
    private _index;
    constructor(options: InsertDiagramElementCommandOptions);
    get element(): DiagramElement;
    get parent(): DiagramElement | undefined;
    get slotId(): string | undefined;
    get index(): number;
    getRemoteCommands(): Promise<RemoteCommandData[]>;
}

export declare class RemoveDiagramElementCommand extends KBObjectPartCommand {
    private _element;
    constructor(element: DiagramElement);
    get element(): DiagramElement;
    getRemoteCommands(): RemoteCommandData[];
}

export declare class SetGraphicalPropertiesCommand extends KBObjectPartCommand {
    private _elment;
    private _properties;
    constructor(element: DiagramElement, properties: GraphicalProperties);
    getRemoteCommands(): RemoteCommandData[];
}

export declare class SetLinkTerminalCommand extends KBObjectPartCommand {
    private _link;
    private _terminal;
    private _source;
    constructor(link: DiagramElement, terminal: DiagramElement | undefined, source: boolean);
    getRemoteCommands(): RemoteCommandData[];
}

export declare type Point = {
    x: number;
    y: number;
};
export declare type GraphicalProperties = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    points?: Point[];
};
export declare type DiagramElementData = {
    guid: string;
    type: string;
    properties?: PropertiesObjectData;
    graphicalProperties?: GraphicalProperties;
    slots?: DiagramElementSlotData[];
    fromGuid?: string;
    toGuid?: string;
};
export declare type DiagramElementOptions = {
    part: DiagramPart;
    type?: string;
    guid?: Guid;
    parentSlot?: DiagramElementSlot;
};
export declare class DiagramElement extends KBObjectPartElement {
    private _guid;
    private _type;
    private _parentSlot;
    private _graphicalProperties;
    private _slots;
    private _from;
    private _to;
    constructor(options: DiagramElementOptions);
    get diagramPart(): DiagramPart;
    get parent(): DiagramElement | undefined;
    get parentSlot(): DiagramElementSlot | undefined;
    /**
     * For internal use only
     *
     */
    set parentSlot(value: DiagramElementSlot | undefined);
    get remoteInternalPath(): string;
    get guid(): Guid;
    get type(): string;
    get graphicalProperties(): GraphicalProperties;
    set graphicalProperties(value: GraphicalProperties);
    get slots(): DiagramElementSlot[];
    get fromGuid(): Guid | undefined;
    get from(): DiagramElement | undefined;
    set from(value: DiagramElement | undefined);
    get toGuid(): Guid | undefined;
    get to(): DiagramElement | undefined;
    set to(value: DiagramElement | undefined);
    getSlot(id: string, create?: boolean): DiagramElementSlot | undefined;
    addSlot(id: string): void;
    getAllChildren(): DiagramElement[];
    remove(): boolean;
    silentRemove(): boolean;
    serialize(includeProperties?: boolean, includeChildren?: boolean): Promise<DiagramElementData>;
    deserialize(data: DiagramElementData): Promise<void>;
    deserializeDelayedState(data: DiagramElementData): Promise<void>;
}

export declare class DiagramElementSlot {
    private _element;
    private _id;
    private _elements;
    constructor(element: DiagramElement, id: string);
    get part(): DiagramPart;
    get element(): DiagramElement;
    get id(): string;
    get elements(): DiagramElement[];
    silentInsertElement(element: DiagramElement, index: number): void;
    insertElement(element: DiagramElement, index: number, insertChildren?: boolean): void;
    removeElement(element: DiagramElement): boolean;
    silentRemoveElement(element: DiagramElement): boolean;
    serialize(includeProperties?: boolean): Promise<DiagramElementSlotData>;
    deserialize(data: DiagramElementSlotData): Promise<void>;
}
export declare type DiagramElementSlotData = {
    id: string;
    elements: DiagramElementData[];
};

export declare class DiagramPart extends KBObjectPart {
    private _allElements;
    private _elements;
    syncGraphicalProperties: boolean;
    insertElement(element: DiagramElement, index?: number, notifyChildren?: boolean): void;
    silentInsertelement(element: DiagramElement): void;
    removeElement(element: DiagramElement): boolean;
    silentRemoveElement(element: DiagramElement): boolean;
    get elements(): DiagramElement[];
    getElement(guid: Guid | string): DiagramElement | undefined;
    getAllElements(): DiagramElement[];
    onChanged(command: KBObjectPartCommand): void;
    deserializeContent(data: string): Promise<void>;
    deserializeDiagramProperties(data: PropertiesObjectData): MaybePromise<void>;
}

export declare namespace ExternalObjectStructItemTypes {
    const ROOT = "Root";
    const PROPERTIES = "Properties";
    const PROPERTY = "Property";
    const EVENTS = "Events";
    const EVENT = "Event";
    const METHODS = "Methods";
    const METHOD = "Method";
    const PARAMETER = "Parameter";
}
export declare namespace ExoProperties {
    const NAME = "IntName";
    const DESCRIPTION = "ExoItemDesc";
    const DATA_TYPE = "ExoItemType";
    const DECIMALS = "ExoItemDecimals";
    const LENGTH = "ExoItemLength";
    const MAX_LENGTH = "ExoItemLength";
    const BASED_ON = "ExoItemBasedOn";
    const IS_COLLECTION = "ExoItemIsCollection";
}
export declare class ExternalObjectStructurePart extends StructPart {
    constructor(kbObject: KBObject);
    canInsertItem(item: StructPartItem, parent: StructPartItem): boolean;
    canRemoveItem(item: StructPartItem): boolean;
    cacheProperties(items: StructPartItem[]): Promise<void>;
    deserialize(data: KBObjectPartData): Promise<void>;
}

export declare namespace GXCategoryClasses {
    const DATA_MANAGEMENT: Guid;
    const USER_INTERFACE: Guid;
    const RESOURCES: Guid;
    const DEPLOY: Guid;
    const DOCUMENTATION: Guid;
    const EXTENSIBILITY: Guid;
    const BPM: Guid;
    const REPORTING: Guid;
}

export declare class GXPartClasses {
    static get BUSINESS_PROCESS_DIAGRAM(): Guid;
    static get BUSINESS_PROCESS_DIAGRAM_SOURCE(): Guid;
    static get COLORS(): Guid;
    static get CONVERSATIONAL_FLOWS_SOURCE(): Guid;
    static get DATA_PROVIDER_SOURCE(): Guid;
    static get DEPLOYMENT_UNIT_DEFINITION(): Guid;
    static get DESIGN_ELEMENTS_PART(): Guid;
    static get DESIGN_STYLES_PART(): Guid;
    static get DESIGN_TOKENS_PART(): Guid;
    static get DOMAIN_SOURCE(): Guid;
    static get EXTERNAL_OBJECT_STRUCTURE(): Guid;
    static get LANGUAGE_STRUCTURE_PART(): Guid;
    static get LOCALIZABLE_IMAGE(): Guid;
    static get PROCEDURE_SOURCE(): Guid;
    static get REPORT_LAYOUT(): Guid;
    static get QUERY_SOURCE(): Guid;
    static get SD_LAYOUT(): Guid;
    static get SD_MENU_SOURCE(): Guid;
    static get SD_PANEL_SOURCE(): Guid;
    static get SDT_SOURCE(): Guid;
    static get SDT_STRUCTURE(): Guid;
    static get STENCIL_LAYOUT(): Guid;
    static get STENCIL_SOURCE(): Guid;
    static get SUBTYPE_GROUP_SOURCE(): Guid;
    static get TABLE_INDEXES(): Guid;
    static get TABLE_STRUCTURE(): Guid;
    static get THEME_STYLES(): Guid;
    static get TRANSACTION_STRUCTURE(): Guid;
    static get TRANSACTION_SOURCE(): Guid;
    static get USER_CONTROL_PROPERTIES(): Guid;
    static get USER_CONTROL_SCREEN_TEMPLATE(): Guid;
    static get VARIABLES(): Guid;
    static get VIRTUAL_VARIABLES(): Guid;
    static get WEB_LAYOUT(): Guid;
    static get WEB_PANEL_SOURCE(): Guid;
    static get WIKI_BLOB(): Guid;
}

export declare type ImageItemOptions = {
    name?: string;
    guid?: Guid;
    size?: string;
};
export declare class ImageItem extends RemotePropertiesObject {
    private _part;
    private _guid;
    private _size;
    constructor(part: LocalizableImagePart, options?: ImageItemOptions);
    get part(): LocalizableImagePart;
    get model(): KBModel;
    get remotePath(): string;
    getTypeInfo(): CustomTypeDescriptorInfo;
    get guid(): Guid;
    getSize(): Promise<string | undefined>;
    getName(): Promise<string>;
    getDescription(): Promise<string>;
    getThemeName(): Promise<string>;
    getLanguageName(): Promise<string>;
    getDensity(): Promise<string>;
}

export declare namespace ImageProperties {
    const NAME = "Name";
    const DESCRIPTION = "Description";
    const DENSITY = "Density";
    const LANGUAGE = "LanguageReference";
    const THEME = "ThemeReference";
}

export declare type LanguageItem = {
    mode: 'blank' | 'inserted' | '';
    message: string;
    messageId: string;
    referencedTranslatedMessage: string;
    translatedMessage: string;
};

export declare class LanguageStructurePart extends KBObjectPart {
    translations: LanguageItem[];
    private _removedMessagesPosition;
    constructor(kbObject: KBObject);
    /**
     * @override
     */
    deserialize(data: any): Promise<void>;
    getTranslations(filter: any): Promise<void>;
    setTranslationMessage(messageId: string, newValue: string, oldValue?: string): void;
    setCodeMessage(messageId: string, newValue: string, oldValue?: string): void;
    insertNewVirtualMessage(afterId: string): string;
    addNewMessage(message: string, messageId: string): void;
    removeMessage(message: string, messageId: string): void;
    removeVirtualMessage(messageId: string): void;
    getLanguageItem(messageId: string): LanguageItem | undefined;
}

export declare class LayoutPart extends KBObjectPart {
    private _patternInstance;
    get patternInstance(): PatternInstance | undefined;
    getEventNames(element: PatternInstanceElement): Promise<string[]>;
    addEvent(element: PatternInstanceElement, eventName: string): Promise<boolean>;
    addStencilVariables(element: PatternInstanceElement, stencilGuid: Guid): Promise<boolean>;
    deserializeContent(data: string): Promise<void>;
}

export declare class LocalizableImagePart extends KBObjectPart {
    private _items;
    constructor(object: KBObject);
    get items(): ImageItem[];
    getItemByIndex(index: number): ImageItem | undefined;
    getItemByGuid(guid: Guid): ImageItem | undefined;
    addNewItem(file: UploadedFile): Promise<ImageItem | undefined>;
    removeItem(item: Guid | ImageItem): Promise<boolean>;
    cacheBasicProperties(images?: ImageItem[]): Promise<void>;
    deserializeContent(data: string): Promise<void>;
}

export declare class ReportLayoutPart extends DiagramPart {
    private _paperProperties;
    constructor(object: KBObject);
    get paperProperties(): PaperProperties;
    deserializeDiagramProperties(data: PropertiesObjectData): import("@genexusm/common").MaybePromise<void>;
}
declare class PaperProperties extends RemotePropertiesObject {
    private _part;
    constructor(part: ReportLayoutPart);
    get model(): import("@genexusm/architecture-common").KBModel;
    get remotePath(): string;
}
export {};

export declare class SDLayoutPart extends LayoutPart {
    constructor(kbObject: KBObject);
}

export declare class SDPanelSourcePart extends MultiRegionSourcePart {
    constructor(kbObject: KBObject, type?: Guid);
}

export declare namespace SDTItemTypes {
    const COLLECTION = "Collection";
    const ITEM = "Item";
    const LEVEL = "Level";
}

export declare class SDTStructurePart extends StructPart {
    constructor(kbObject: KBObject);
    cacheProperties(items: StructPartItem[]): Promise<void>;
}

export declare class StencilLayoutPart extends KBObjectPart {
    constructor(object: KBObject);
    private _layouts;
    private _currentLayoutName;
    get layouts(): [string, PatternInstancePart][];
    get currentLayoutName(): string | undefined;
    get currentLayout(): PatternInstancePart | undefined;
    setCurrentLayout(name: string): Promise<CommandResultData>;
    deserializeContent(data: string): Promise<void>;
}

declare class TableItemPropertyManager extends RemotePropertyManager {
    constructor(item: StructPartItem);
}
declare class TableIndexesPropertyManager extends TableItemPropertyManager {
    order: string;
    deserializeProperties(data: PropertiesObjectData): Promise<void>;
}
declare class TableIndexesIndexCommon extends StructPartItem {
    constructor(part: TableIndexesPart, type: string, guid?: Guid, parent?: StructPartItem);
    createPropertyManager(): PropertyManager;
    get order(): string;
    set order(value: string);
    protected get _indexManager(): TableIndexesPropertyManager;
}
export declare class TableIndexesIndex extends TableIndexesIndexCommon {
    constructor(part: TableIndexesPart, guid?: Guid, parent?: StructPartItem);
}
export declare class TableIndexesUserIndex extends TableIndexesIndexCommon {
    constructor(part: TableIndexesPart, guid?: Guid, parent?: StructPartItem);
}
export declare class TableIndexesMember extends StructPartItem {
    constructor(part: TableIndexesPart, guid?: Guid, parent?: StructPartItem);
    cacheProperties(): Promise<void>;
    createPropertyManager(): PropertyManager;
    get order(): string;
    set order(value: string);
    get attribute(): string | undefined;
    set attribute(value: string | undefined);
    get description(): string | undefined;
    private get _memberManager();
}
export {};

export declare namespace TableIndexesItemTypes {
    const INDEX = "Index";
    const MEMBER = "Member";
    const USER_INDEX = "UserIndex";
}

export declare class TableIndexesPart extends StructPart {
    constructor(kbObject: KBObject);
    createItem(options: StructPartItemOptions): StructPartItem;
}

export declare class TableStructurePart extends StructPart {
    constructor(kbObject: KBObject);
}

export declare class TransactionItemPropertyManager extends RemotePropertyManager {
    constructor(item: StructPartItem);
}
export declare class TransactionAttributePropertyManager extends TransactionItemPropertyManager {
    attribute: string | undefined;
    isKey: boolean;
    isNullable: string;
    isInferred: boolean;
    isRedundant: boolean;
    isForeignKey: boolean;
    deserializeProperties(data: PropertiesObjectData): Promise<void>;
}
export declare class TransactionLevelPropertyManager extends TransactionItemPropertyManager {
    isDescriptionAttributeDefault: boolean;
    descriptionAttribute: string | undefined;
    isImageAttributeDefault: boolean;
    imageAttribute: string | undefined;
    deserializeProperties(data: PropertiesObjectData): Promise<void>;
}
export declare class TransactionItem extends StructPartItem {
    constructor(part: TransactionStructurePart, options: StructPartItemOptions);
    getName(): Promise<string>;
    get structurePart(): TransactionStructurePart;
    cacheProperties(): Promise<void>;
}
export declare class TransactionLevel extends TransactionItem {
    constructor(part: TransactionStructurePart, guid?: Guid, parent?: StructPartItem);
    get isDescriptionAttributeDefault(): boolean;
    set isDescriptionAttributeDefault(value: boolean);
    get descriptionAttribute(): string | undefined;
    set descriptionAttribute(value: string | undefined);
    get isImageAttributeDefault(): boolean;
    set isImageAttributeDefault(value: boolean);
    get imageAttribute(): string | undefined;
    set imageAttribute(value: string | undefined);
    getDescriptionAttribute(): Promise<TransactionAttribute | undefined>;
    getImageAttribute(): Promise<TransactionAttribute | undefined>;
    getAttributeByName(name: string): Promise<TransactionAttribute | undefined>;
    createPropertyManager(): PropertyManager;
    private get _levelManager();
}
export declare class TransactionAttribute extends TransactionItem {
    constructor(part: TransactionStructurePart, guid?: Guid, parent?: StructPartItem);
    get attribute(): string | undefined;
    set attribute(value: string | undefined);
    get isKey(): boolean;
    set isKey(value: boolean);
    get isNullable(): string;
    set isNullable(value: string);
    get isInferred(): boolean;
    get isRedundant(): boolean;
    get isForeignKey(): boolean;
    createPropertyManager(): PropertyManager;
    private get _attManager();
}

export declare namespace TransactionItemTypes {
    const LEVEL = "Level";
    const ATTRIBUTE = "Attribute";
}

export declare class TransactionStructurePart extends StructPart {
    constructor(kbObject: KBObject);
    createItem(options: StructPartItemOptions): StructPartItem;
    canInsertItem(item: StructPartItem, parent: StructPartItem): boolean;
    canRemoveItem(item: StructPartItem): boolean;
    cacheProperties(items: StructPartItem[]): Promise<void>;
    deserializeContent(data: string): Promise<void>;
}

export declare class UserControlPropertiesPart extends SourcePart {
    private static readonly DEFINITION_TAG;
    private static readonly AUTO_PROPERTY;
    onReloaded: Function;
    constructor(kbObject: KBObject);
    private _onAfterSaveKBObject;
    private _isAutoDefined;
}

export declare class UserControlSourcePart extends KBObjectPart {
    private _source;
    constructor(kbObject: KBObject, type: Guid);
    get source(): string;
    set source(value: string);
    deserializeContent(value: string): void;
    serializeContent(): string;
}

export declare namespace VariableItemTypes {
    const VARIABLES = "Variables";
    const VARIABLE = "Variable";
}
export declare class Variable extends StructPartItem {
    constructor(structPart: VariablesPart, options?: StructPartItemOptions);
    get variablesPart(): VariablesPart;
    isStandard(): Promise<boolean>;
    isCollection(): Promise<boolean>;
    cacheProperties(): Promise<void>;
}
export declare class VariablesPart extends StructPart {
    constructor(kbObject: KBObject, type?: import("@genexusm/common").Guid);
    createItem(options: StructPartItemOptions): StructPartItem;
    cacheProperties(items: StructPartItem[]): Promise<void>;
    deserializeContent(data: string): Promise<void>;
}

export declare class VirtualVariablesPart extends VariablesPart {
    constructor(kbObject: KBObject);
}

export declare class WebLayoutPart extends LayoutPart {
    constructor(kbObject: KBObject);
}

export declare class WikiBlobPart extends KBObjectPart {
    constructor(kbObject: KBObject);
    getFileName(): Promise<string>;
    _getContent(): Promise<string | undefined>;
}

export declare namespace GXBasicTypes {
    const NUMERIC = "Numeric";
    const CHARACTER = "Character";
    const VAR_CHAR = "VarChar";
    const LONG_VAR_CHAR = "LongVarChar";
    const BOOLEAN = "Boolean";
}

export declare namespace GXProperties {
    const ATTRIBUTE_KEY = "AttributeKey";
    const BASED_ON = "idBasedOn";
    const COLLECTION_NAME = "idCollectionItemName";
    const DATA_TYPE = "ATTCUSTOMTYPE";
    const DECIMALS = "Decimals";
    const DESCRIPTION = "Description";
    const ENABLE_INTEGRATED_SECURITY = "EnableIntegratedSecurity";
    const FORMULA = "Formula";
    const IS_COLLECTION = "AttCollection";
    const IS_STANDARD_VARIABLE = "IsStandardVariable";
    const LENGTH = "Length";
    const MAX_LENGTH = "AttMaxLen";
    const NAME = "Name";
    const NULLABLE = "Nullable";
    const ORDER = "Order";
    const THEME_TYPE = "ThemeType";
    const WF_DOCUMENT_TYPE = "PWFDocType";
    const WEB_COMP = "WEB_COMP";
}
export declare namespace GXPropertyValues {
    namespace THEME_TYPE {
        const SD = "idSD";
        const WEB = "idWeb";
    }
    namespace WEB_COMP {
        const WEB_COMPONENT = "Component";
        const MASTER_PAGE = "Master Page";
    }
    namespace ENABLE_INTEGRATED_SECURITY {
        const TRUE = "True";
    }
}

export declare type TypedObjectProperties = {
    dataType: string;
    decimals: string;
    length: string;
    maxLength: string;
    basedOn: string;
};
export declare namespace DataTypeCategories {
    const NONE = 0;
    const BASIC = 1;
    const EXTENDED = 2;
    const DOMAIN = 4;
    const SDT = 56;
    const BUSINESS_COMPONENT = 32;
    const EXTERNAL_OBJECT = 128;
}
export declare class GXPropertiesHelper {
    static get NONE_VALUE(): string;
    static isDescriptorValidInSourceCode(descriptor: IPropertyDescriptor, instance: PropertiesObject): Promise<boolean>;
    static getDataTypeConsolidatedValue(instance: PropertiesObject, typedProperties?: TypedObjectProperties): Promise<string>;
    static setDataTypeConsolidatedValue(instance: PropertiesObject, text: string, basePropertyName: string, typedProperties?: TypedObjectProperties): Promise<void>;
    private static _getShortNumberForm;
    private static _getLongNumberForm;
}

export declare class GXUIValidResolvers {
    static get ENABLE_INTEGRATED_SECURITY(): string;
}
