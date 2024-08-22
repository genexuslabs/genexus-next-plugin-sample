import { IGXCommLayer, KBObjectData, KBObjectInfoData, EntityKeyData, KBContextData, KBModelData, KBObjectHeaderData, ResolveKeyResultData, ResolveResultData, EntityInfoData, EntityReferenceInfoData, KBModelPartData, KBObjectPartData, CreateKBOptionsData, KBInfoData, KBData, KBConnectionInfoData, CommandListItemResultData, CommandListResultData, CommandResultData, PropertyData, ShareKBInfoData, GeneXusServerInfoData, KBObjectsHistoryInfoData, CommitInfoData, TeamDevUpdateItemData, UpdateInfoData, KBVersionData, KBVersionActivityRevisionData, KBVersionRevisionData, CheckLocalChanges, CheckRemoteChanges, TeamDevData, AccessTokenInfo, NewKBInfoData, TeamDevKBData, CreateKBResultData, ServerBLInfoData } from '@genexusm-sdk/common-comm-layer' 
import { Services } from '@genexusm-sdk/core-comm-layer' 
import { interfaces } from 'inversify' 
import { MaybePromise, Guid, Disposable, MaybeArray, AnyObject, CustomSymbolValueArgument, OutputMessages, CompositeDisposable, Emitter, OutputError, IOutputMessages } from '@genexusm-sdk/common' 
import { IPropertyDescriptor, PropertyValueChangedEventArgs, PropertiesObject, PropertiesObjectData, PropertyValue, PropertyDefinitionCollection, PropertyManager, UITypeEditor, PropertyDefinition, TypeConverter, TypeDescriptorContext, IUIValidator, StringConverter } from '@genexusm-sdk/common-properties' 

export declare namespace BLEvents {
    const BEFORE_CREATE_KB = "event://KnowledgeBase/BeforeCreateKB";
    const AFTER_CREATE_KB = "event://KnowledgeBase/AfterCreateKB";
    const BEFORE_OPEN_KB = "event://KnowledgeBase/BeforeOpenKB";
    const AFTER_OPEN_KB = "event://KnowledgeBase/KBOpened";
    const BEFORE_CLOSE_KB = "event://KnowledgeBase/BeforeCloseKB";
    const AFTER_BATCH_OPERATION = "event://KnowledgeBase/AfterBatchOperation";
    const BEFORE_BATCH_OPERATION = "event://KnowledgeBase/BeforeBatchOperation";
    const AFTER_CLOSE_KB = "event://KnowledgeBase/AfterCloseKB";
    const AFTER_SAVE_KB_OBJECT = "event://KnowledgeBase/AfterSaveKBObject";
    const AFTER_DELETE_KB_OBJECT = "event://KnowledgeBase/AfterDeleteKBObject";
    const AFTER_RELOAD_KB_MODEL = "event://KnowledgeBase/AfterReloadKBModel";
    const AFTER_SAVE_KB_MODEL = "event://KnowledgeBase/AfterSaveKBModel";
    const KB_CONTEXT_CHANGED = "ContextChanged";
    const AFTER_KBOBJECT_IMPORT = "event://KnowledgeBase/AfterKBObjectImport";
    const AFTER_EXPORT = "event://KnowledgeBase/AfterExport";
    const AFTER_IMPORT = "event://KnowledgeBase/AfterImport";
    const KB_ENVIRONMENT_CHANGED = "event://KnowledgeBase/KBEnvironmentChanged";
    const KB_OBJECT_PART_CHANGED = "event://KBObjectPartChanged";
}
export declare type KMEventArgs = {
    success: boolean;
};
export declare type AfterExportEventArgs = KMEventArgs & {
    fileId: string;
    fileDownloadName: string;
};

export declare class GXCommLayer {
    private static _instance;
    static set(value: IGXCommLayer | undefined): void;
    static get(): IGXCommLayer | undefined;
}

export declare class GXCommCoreServices {
    private static _instance;
    static get(): Services | undefined;
    static set(value: Services | undefined): void;
}

export declare const ContributionProvider: unique symbol;
export interface ContributionProvider<T extends object> {
    /**
     * @param recursive `true` if the contributions should be collected from the parent containers as well. Otherwise, `false`. It is `false` by default.
     */
    getContributions(recursive?: boolean): T[];
    clear(): void;
}
export declare type Bindable = interfaces.Bind | interfaces.Container;
export declare namespace Bindable {
    function isContainer(arg: Bindable): arg is interfaces.Container;
}
export declare function bindContributionProvider(bindable: Bindable, id: symbol): void;

export declare const IApplicationContribution: unique symbol;
export interface IApplicationContribution {
    /**
     * Called when the application is started. The application shell is not attached yet when this method runs.
     * Should return a promise if it runs asynchronously.
     */
    onStart?(): MaybePromise<void>;
    /**
     * Called when an application is stopped or unloaded.
     *
     * Note that this is implemented using `window.beforeunload` which doesn't allow any asynchronous code anymore.
     * I.e. this is the last tick.
     */
    onStop?(): void;
    /**
     * An event is emitted when a layout is initialized, but before the shell is attached.
     */
    onPostInitialize?(): MaybePromise<void>;
}

export interface IBaseDescriptor {
    id: Guid;
    iconName: string;
}

export declare const IKBModelPartDescriptor: unique symbol;
export interface IKBModelPartDescriptor extends IBaseDescriptor {
    factory: (kbModel: KBModel) => KBModelPart;
}

export declare const IKBObjectCategoryDescriptor: unique symbol;
export interface IKBObjectCategoryDescriptor extends IBaseDescriptor {
    visible?: boolean;
}

export declare const IKBObjectDerivedDescriptor: unique symbol;
export interface IKBObjectDerivedDescriptor extends IBaseDescriptor {
    flags?: number;
    name: string;
    properties: {
        name: string;
        value: any;
    }[];
}

export declare const IKBObjectDescriptor: unique symbol;
export interface IKBObjectDescriptor extends IBaseDescriptor {
    flags?: number;
    factory: (model: KBModel) => KBObject;
    sortParts?: (parts: Guid[]) => void;
}

export declare const IKBObjectPartDescriptor: unique symbol;
export interface IKBObjectPartDescriptor extends IBaseDescriptor {
    description?: string;
    isInterface: boolean;
    factory: (kbOBject: KBObject) => KBObjectPart;
}

export declare type BaseDescriptorOptions = {
    id: Guid;
    name: string;
    description: string;
    helpString?: string;
    iconName: string;
};
export declare class BaseDescriptor {
    id: Guid;
    name: string;
    description: string;
    helpString?: string;
    iconName: string;
    constructor(options: BaseDescriptorOptions);
}

export declare type KBModelPartDescriptorOptions = BaseDescriptorOptions & {
    factory: (kbModel: KBModel) => KBModelPart;
};
export declare class KBModelPartDescriptor extends BaseDescriptor {
    private _factory;
    constructor(options: KBModelPartDescriptorOptions);
    get factory(): (kbModel: KBModel) => KBModelPart;
    static add(descriptor: KBModelPartDescriptor): Disposable;
    static remove(id: Guid): boolean;
    static get(id: Guid): KBModelPartDescriptor | undefined;
    static getAll(): KBModelPartDescriptor[];
    static clear(): void;
}

export declare type KBObjectCategoryDescriptorOptions = BaseDescriptorOptions & {
    visible?: boolean;
};
export declare class KBObjectCategoryDescriptor extends BaseDescriptor {
    visible: boolean;
    constructor(options: KBObjectCategoryDescriptorOptions);
    static add(descriptor: KBObjectCategoryDescriptor): Disposable;
    static remove(id: Guid): boolean;
    static get(id: Guid): any;
    static getAll(): any[];
    static clear(): void;
}

export declare type KBObjectDerivedDescriptorOptions = KBObjectDescriptorOptions & {
    properties: {
        name: string;
        value: any;
    }[];
};
export declare class KBObjectDerivedDescriptor extends KBObjectDescriptor {
    private _properties;
    constructor(options: KBObjectDerivedDescriptorOptions);
    createInstance(options: CreateKBObjectInstanceOptions): Promise<KBObject>;
    isObject(kbObject: IKBObject): Promise<boolean>;
}

export declare type KBObjectDescriptorOptions = BaseDescriptorOptions & {
    categories?: Guid[];
    parts?: Guid[];
    namespace: string;
    flags: number;
    isDefault?: boolean;
    moduleAssociation?: ModuleAssociation;
    factory: (model: KBModel) => KBObject;
    sortParts?: (parts: Guid[]) => void;
};
export declare type CreateKBObjectInstanceOptions = {
    model: KBModel;
    copyFrom?: Guid;
    name?: string;
    description?: string;
    parent?: IKBObject;
    properties?: {
        name: string;
        value: any;
    }[];
    parts?: {
        type: Guid;
        content: string;
    }[];
};
export declare class KBObjectDescriptor extends BaseDescriptor {
    private _categories;
    private _parts;
    private _namespace;
    private _flags;
    private _isDefault;
    private _factory;
    private _sortPartsFunc;
    private _moduleAssociation;
    constructor(options: KBObjectDescriptorOptions);
    get category(): Guid;
    get categories(): Guid[];
    _getPartIndex(id: Guid): number;
    get namespace(): string;
    set namespace(value: string);
    get flags(): number;
    set flags(value: number);
    get creatable(): boolean;
    get openable(): boolean;
    get isDefault(): boolean;
    set isDefault(value: boolean);
    get factory(): (model: KBModel) => KBObject;
    set factory(value: (model: KBModel) => KBObject);
    get moduleAssociation(): ModuleAssociation;
    set moduleAssociation(value: ModuleAssociation);
    get parts(): Guid[];
    hasPart(id: Guid): boolean;
    addPart(id: Guid): void;
    removePart(id: Guid): void;
    createInstance(options: CreateKBObjectInstanceOptions): Promise<KBObject>;
    isObject(kbObject: IKBObject): Promise<boolean>;
    static add(descriptor: KBObjectDescriptor): Disposable;
    static get(id: Guid): KBObjectDescriptor;
    static getAllOfBaseType(id: Guid): KBObjectDescriptor[];
    static findOfBaseType(id: Guid, name: string): KBObjectDescriptor;
    static remove(id: Guid): boolean;
    static getAll(): KBObjectDescriptor[];
    static clear(): void;
    static getByNamesapces(namespaces: MaybeArray<string>): KBObjectDescriptor[];
}

export declare type KBObjectPartDescriptorOptions = BaseDescriptorOptions & {
    isInterface: boolean;
    factory: (kbOBject: KBObject) => KBObjectPart;
};
export declare class KBObjectPartDescriptor extends BaseDescriptor {
    private _factory;
    private _isInterface;
    constructor(options: KBObjectPartDescriptorOptions);
    get factory(): (kbObject: KBObject) => KBObjectPart;
    get isInterface(): boolean;
    static add(descriptor: KBObjectPartDescriptor): Disposable;
    static remove(id: Guid): boolean;
    static get(id: Guid): KBObjectPartDescriptor;
    static getAll(): any[];
    static clear(): void;
}

export class KBObjectReferenceHelper {
    static get NONE_DESCRIPTION(): string;
    static getSettings(descriptor: IPropertyDescriptor): KBObjectReferenceSettings | undefined;
}

export class ObjectModuleHelper {
    static getModuleAssociation(target: Guid | IKBObject | KBObjectDescriptor): ModuleAssociation | undefined;
    static usesModule(target: Guid | IKBObject | KBObjectDescriptor): boolean;
}

export class PropertyContextHelper {
    static setKBModel(instance: AnyObject, model: KBModel): void;
    static setKBObject(instance: AnyObject, kbObject: KBObject): void;
    static getKBModelFrom(instance: AnyObject): KBModel | undefined;
    static getKBObjectFrom(instance: AnyObject): KBObject | undefined;
    static getModuleFrom(instance: AnyObject): Promise<Module | undefined>;
}

export declare type FlagsData = AnyObject;
export declare type ConfigData = AnyObject & {
    flags?: FlagsData;
};
export declare class ConfigHelper {
    private static _config;
    static load(): Promise<ConfigData>;
    static get config(): ConfigData;
    static getFlagValue<TValue>(flag: string, defaultValue: TValue): TValue;
    private static _fetchConfig;
}

export declare type KBObjectInfoOptions = {
    key: EntityKey;
    guid: Guid;
    name: string;
    description: string;
    qualifiedName?: QualifiedName;
    parentKey?: EntityKey;
    hasChildren: boolean;
    modulePath?: EntityKey[];
    isInterface: boolean;
    versionId: number;
    properties?: AnyObject<string>;
    typeName: string;
};
export declare class KBObjectInfo extends EntityInfo implements IKBObject {
    private _qualifiedName;
    private _parentKey;
    private _hasChildren;
    private _modulePath;
    private _isInterface;
    private _typeDescriptor;
    private _properties;
    constructor(model: KBModel, options: KBObjectInfoOptions);
    get type(): Guid;
    get typeDescriptor(): KBObjectDescriptor;
    getInfo(): Promise<this>;
    getObject(): Promise<KBObject>;
    get qualifiedName(): QualifiedName;
    get parentKey(): EntityKey | undefined;
    get hasChildren(): boolean;
    get modulePath(): EntityKey[];
    get isInterface(): boolean;
    get properties(): AnyObject<string>;
    static fromData(model: KBModel, data: KBObjectInfoData): KBObjectInfo;
}
export declare class KBObject extends RemotePropertiesObject implements IKBObject {
    private _sessionId;
    private __model;
    private __key;
    private __guid;
    private __isCurrentVersion;
    private __versionId;
    private __typeDescriptor;
    private __deserializing;
    private __parts;
    private __objectsService;
    private __modelingService;
    static getByGuid(model: KBModel, guid: Guid, headerOnly: boolean): MaybePromise<KBObject | undefined>;
    static getByKey(model: KBModel, key: EntityKey, headerOnly?: boolean): Promise<KBObject | undefined>;
    static create(options: CreateKBObjectInstanceOptions & {
        type: Guid | KBObjectDescriptor;
    }): Promise<KBObject | undefined>;
    static delete(objects: IKBObject[]): Promise<boolean>;
    protected constructor(model: KBModel, type: Guid);
    get model(): KBModel;
    get kb(): KnowledgeBase;
    get sessionId(): Guid;
    get key(): EntityKey;
    get isCurrentVersion(): boolean;
    get versionId(): number;
    get id(): number;
    get type(): Guid;
    get guid(): Guid;
    get typeDescriptor(): KBObjectDescriptor;
    getInfo(): Promise<KBObjectInfo>;
    getObject(): Promise<this>;
    get remotePath(): string;
    getTypeInfo(): Promise<import("@genexusm/common-properties").CustomTypeDescriptorInfo>;
    getModule(): Promise<Module | undefined>;
    getName(): Promise<string>;
    setName(value: string): Promise<void>;
    getDescription(): Promise<string>;
    setDescription(value: string): Promise<void>;
    getQualifiedName(): Promise<QualifiedName>;
    getParts(): Promise<KBObjectPart[]>;
    getPart(type: Guid): Promise<KBObjectPart | undefined>;
    onPropertyValueChanged(args: PropertyValueChangedEventArgs): Promise<void>;
    save(): Promise<boolean>;
    dispose(): Promise<void>;
    serialize(): Promise<KBObjectData>;
    deserialize(data: KBObjectData): Promise<void>;
    protected executeRemoteCommand(data: RemoteCommandData): Promise<RemoteCommandResultData>;
    protected executeRemoteCommandList(commands: RemoteCommandData[]): Promise<RemoteCommandListResultData>;
    static executeRemoteCommand(kbObject: KBObject, data: RemoteCommandData): Promise<RemoteCommandResultData>;
    static executeRemoteCommandList(kbObject: KBObject, commands: RemoteCommandData[]): Promise<RemoteCommandListResultData>;
    private _deserializeParts;
    private _getPart;
    private _createParts;
    private _refreshTypeDescriptor;
    private _setSessionId;
}

export declare enum ModuleAssociation {
    STANDARD = 0,
    INHERITED = 1,
    NO_MODULE = 2,
    GLOBAL_NAME = 4,
    ONLY_ROOT_MODULE = 8
}

export declare namespace Namespaces {
    const DEFAULT = "Objects";
    const FOLDER = "Folders";
    const CATEGORY = "Categories";
    const VERSION = "Versions";
    const IMAGES = "Images";
}

export class EntityKey {
    private _type;
    private _id;
    constructor(type?: Guid, id?: number);
    get type(): Guid;
    get id(): number;
    toData(): EntityKeyData;
    toString(): string;
    static fromString(str: string): EntityKey;
    static fromData(data: EntityKeyData): EntityKey;
}

export class Folder extends KBObject {
    constructor(model: KBModel);
}

export interface IKBObject extends IModelable {
    readonly type: Guid;
    readonly typeDescriptor: KBObjectDescriptor;
    readonly model: KBModel;
    readonly key: EntityKey;
    readonly guid: Guid;
    getInfo(): MaybePromise<KBObjectInfo>;
    getObject(): MaybePromise<KBObject>;
}

export class KBCategory extends KBObject {
    constructor(model: KBModel);
    static getAll(model: KBModel): MaybePromise<Iterable<KBObjectInfo>>;
}

export class KBContext {
    private _kb;
    private _properties;
    constructor(kb: KnowledgeBase, data: KBContextData);
    getPropertyValue(name: string): string | undefined;
    setPropertyValue(name: string, value: string): Promise<void>;
    private _loadData;
}

export class KBEnvironment {
    private _kb;
    private _designModel;
    constructor(kb: KnowledgeBase, designModel: KBModel);
    get kb(): KnowledgeBase;
    get designModel(): KBModel;
    get targetModel(): KBModel;
    setCurrentEnvironment(target: KBModel): Promise<void>;
    onKBEnvironmentChanged(callback: () => MaybePromise<void>): void;
}

export class KBModel extends RemotePropertiesObject {
    private _key;
    private _kb;
    private _environment;
    private _objects;
    private _guid;
    private _name;
    private _parts;
    private _isCurrentVersion;
    private _versionId;
    constructor(kb: KnowledgeBase, data: KBModelData);
    get remotePath(): string;
    getTypeInfo(): {
        type: string;
        description: string;
        isReadOnly: boolean;
    };
    get key(): EntityKey;
    get model(): this;
    get kb(): KnowledgeBase;
    get guid(): Guid;
    get name(): string;
    get objects(): IKBModelObjects;
    get environment(): KBEnvironment;
    get parts(): KBModelPart[];
    get isCurrentVersion(): boolean;
    get versionId(): number;
    getPart(type: Guid): KBModelPart | undefined;
    getRootModuleInfo(): MaybePromise<KBObjectInfo>;
    getRootInterfacesInfo(): MaybePromise<KBObjectInfo[]>;
    getRootModule(): MaybePromise<Module>;
    getDesignModel(): KBModel;
    reloadData(data: KBModelData): void;
    private _createParts;
}

export class KBModelObjects implements IKBModelObjects {
    private _model;
    private _modelObjectsService;
    constructor(model: KBModel);
    getRootModuleInfo(): Promise<KBObjectInfo>;
    getRootInterfacesInfo(): Promise<KBObjectInfo[]>;
    getInfoByKey(key: EntityKey): Promise<KBObjectInfo | undefined>;
    getInfoByGuid(guid: Guid): Promise<KBObjectInfo | undefined>;
    getInfoByTypeQName(type: Guid | undefined, qname: QualifiedName): Promise<KBObjectInfo | undefined>;
    getReferencesInfoByKey(key: EntityKey, to: boolean): Promise<EntityReferenceInfo[] | undefined>;
    getVersionsInfoByKey(key: EntityKey): Promise<EntityVersionInfo[] | undefined>;
    getExportReferencesInfo(options: ExportReferencesOptions): Promise<KBObjectInfo[] | undefined>;
    getChildrenInfoByKey(parentKey: EntityKey): Promise<KBObjectInfo[]>;
    getChildrenInfoByGuid(parentGuid: Guid): Promise<KBObjectInfo[]>;
    getObjectsInfoByType(type: Guid): Promise<KBObjectInfo[]>;
    resolveNameToInfos(fromModuleKey: EntityKey, types: Guid[] | Guid, name: string): Promise<ResolveResult | undefined>;
    resolveNameToKeys(fromModuleKey: EntityKey, types: Guid[] | Guid, name: string): Promise<ResolveKeyResult | undefined>;
    searchInfos(filters: KBObjectInfoFilters): Promise<{
        objects: KBObjectInfo[];
        truncated: boolean;
    }>;
    getRootModule(): Promise<Module>;
    getByKey(key: EntityKey, headerOnly: boolean): Promise<KBObject | undefined>;
    getVersion(key: EntityKey, version: number): Promise<KBObject | undefined>;
    getByGuid(guid: Guid, headerOnly: boolean): Promise<KBObject | undefined>;
    getByTypeQName(type: Guid, qname: QualifiedName, headerOnly: boolean): Promise<KBObject | undefined>;
    getBySessionId(sessionId: Guid): Promise<KBObject | undefined>;
    getByType(type: Guid): Promise<any>;
    search(filters: KBObjectFilters): Promise<{
        objects: any;
        truncated: boolean;
    }>;
    setAsActive(key: EntityKey, version: number): Promise<boolean>;
    getObjectModuleByKey(key: EntityKey): Promise<Module | undefined>;
    getQNameByKey(key: EntityKey): Promise<string>;
    getFullQNameByKey(key: EntityKey): Promise<string>;
    _createObjectFromData(data: KBObjectHeaderData | KBObjectData): Promise<KBObject | undefined>;
    private _createObjectInfoIteratorFromData;
}

export class KBObjectReference {
    constructor(key: EntityKey);
    key: EntityKey | undefined;
}

export class KBObjectReferenceSettings {
    private _typeDescriptors;
    useDesignModel: boolean;
    selfExclude: boolean;
    allowNone: boolean;
    allowMissingObject: boolean;
    showOnlyRootModule: boolean;
    noneText: string | undefined;
    hideInterfaces: boolean;
    constructor(args: KBObjectDescriptor[] | Guid[] | CustomSymbolValueArgument);
    get descriptors(): KBObjectDescriptor[];
    get types(): Guid[];
    private _addType;
}

export class KBProperties extends PropertiesObject {
    private _kb;
    constructor(kb: KnowledgeBase);
    get kb(): KnowledgeBase;
}

export class Module extends KBObject {
    constructor(model: KBModel);
}

export class KBObjectPartCommand {
    do(): MaybePromise<void>;
    undo(): MaybePromise<void>;
    getRemoteCommands(): MaybePromise<RemoteCommandData[]>;
}

export class KBObjectPartCompositeCommand extends KBObjectPartCommand {
    private _part;
    private _commands;
    constructor(part: KBObjectPart);
    addCommand(command: KBObjectPartCommand): void;
    get count(): number;
    get commands(): KBObjectPartCommand[];
    do(): Promise<void>;
    undo(): Promise<void>;
    getRemoteCommands(): Promise<RemoteCommandData[]>;
}

export class ResolveKeyResult {
    private _errorMessage;
    private _matches;
    constructor(errorMessage: string, matches: EntityKey[]);
    get errorMessage(): string;
    get matches(): EntityKey[];
    get match(): EntityKey | undefined;
    static fromData(data: ResolveKeyResultData): ResolveKeyResult;
}

export class ResolveResult {
    private _errorMessage;
    private _matches;
    constructor(errorMessage: string, matches: KBObjectInfo[]);
    get errorMessage(): string;
    get matches(): KBObjectInfo[];
    get match(): KBObjectInfo | undefined;
    static fromData(model: KBModel, data: ResolveResultData): ResolveResult | undefined;
}

export declare namespace BuiltInTypes {
    const MODEL_ID = "00000000-0000-0000-0000-000000000002";
    const KNOWLEDGEBASE_ID = "00000000-0000-0000-0000-000000000009";
}

export declare namespace Decorators {
    function kbObjectReferenceSettings(value: KBObjectReferenceSettings): (target: any) => void;
}

export declare type EntityInfoOptions = {
    key: EntityKey;
    guid: Guid;
    versionId: number;
    name: string;
    description: string;
};
export declare class EntityInfo {
    private _model;
    private _key;
    private _guid;
    private _versionId;
    private _name;
    private _description;
    constructor(model: KBModel, options: EntityInfoOptions);
    get model(): KBModel;
    get key(): EntityKey;
    get guid(): Guid;
    get versionId(): number;
    get name(): string;
    get description(): string;
    static fromData(model: KBModel, data: EntityInfoData): EntityInfo;
}

export declare class EntityReferenceInfo {
    private _description;
    private _hasMoreReferences;
    private _key;
    private _typeId;
    constructor(description: string, hasMoreReferences: boolean, key: EntityKey, typeId: string);
    get description(): string;
    get hasMoreReferences(): boolean;
    get key(): EntityKey;
    get typeId(): string;
    static fromData(data: EntityReferenceInfoData): EntityReferenceInfo;
}

export declare class KBModelPart extends RemotePropertiesObject implements IModelable {
    private _kbModel;
    private _type;
    constructor(kbModel: KBModel, type: Guid);
    get remotePath(): string;
    get model(): KBModel;
    get kb(): KnowledgeBase;
    get type(): Guid;
    get typeDescriptor(): KBModelPartDescriptor | undefined;
    protected executeRemoteCommandList(commands: RemoteCommandData[]): Promise<RemoteCommandListResultData>;
    protected executeRemoteCommand(data: RemoteCommandData): Promise<RemoteCommandResultData>;
    serialize(): Promise<KBObjectPartData>;
    deserialize(data: KBModelPartData): Promise<void>;
    protected serializeContent(): MaybePromise<string | undefined>;
    protected deserializeContent(value: string): void;
}

export declare namespace KBObjectClasses {
    const FOLDER: Guid;
    const MODULE: Guid;
    const CATEGORY: Guid;
}

export declare namespace KBObjectModifiedFilterOptions {
    const AFTER_DATE_TIME = "afterDateTime";
    const AFTER_DATE_TIME_VALUE = 1;
    const AFTER_LAST_BUILD = "afterLastBuild";
    const AFTER_LAST_BUILD_VALUE = 2;
    const AFTER_IMPORT = "afterImport";
    const AFTER_IMPORT_VALUE = 3;
}
export declare namespace KBObjectFilterProperties {
    const DATE_IMPORTED = "Date Imported";
    const FOLDER = "folder";
    const LAST_UPDATE_DATE = "lastUpdateDate";
    const USER = "user";
}

export declare type RemoteKBObjectPartChangedEventArgs = {
    part: KBObjectPart;
    command?: KBObjectPartCommand;
};
export declare class KBObjectPart extends RemotePropertiesObject implements IModelable {
    private __kbObject;
    private __type;
    private __updateCount;
    private __executedCommands;
    private __compositeCommand;
    private __remoteSyncCount;
    private __remoteSyncPromise;
    private _currentElements;
    constructor(kbObject: KBObject, type: Guid);
    registerChanges: boolean;
    get remotePath(): string;
    get model(): KBModel;
    get kbObject(): KBObject;
    get kb(): KnowledgeBase;
    get type(): Guid;
    get typeDescriptor(): KBObjectPartDescriptor;
    isDefault(): Promise<boolean>;
    reload(): Promise<void>;
    validate(output: OutputMessages): boolean;
    get isUpdating(): boolean;
    beginUpdate(): void;
    endUpdate(): Promise<void>;
    protected createCompositeCommand(): KBObjectPartCompositeCommand;
    remoteSync(): Promise<RemoteCommandListResultData>;
    protected onBeforeRemoteSync(): void;
    protected onAfterRemoteSync(): void;
    protected getAllElements(): KBObjectPartElement[];
    executeRemoteCommandList(commands: RemoteCommandData[]): Promise<RemoteCommandListResultData>;
    executeRemoteCommand(data: RemoteCommandData): Promise<RemoteCommandResultData>;
    static executeRemoteCommand(part: KBObjectPart, data: RemoteCommandData): Promise<RemoteCommandResultData>;
    static executeRemoteCommandList(part: KBObjectPart, commands: RemoteCommandData[]): Promise<RemoteCommandListResultData>;
    private _remoteSync;
    serialize(): Promise<KBObjectPartData>;
    deserialize(data: KBObjectPartData): Promise<void>;
    protected serializeContent(): MaybePromise<string | undefined>;
    protected deserializeContent(value: string): void;
    onChanged(command?: KBObjectPartCommand): void;
    changed(callback: (args: RemoteKBObjectPartChangedEventArgs) => void): Disposable;
    broadcastPartChangedEvent(): void;
    remoteChanged(callback: () => void): Disposable;
    private _fireChangedEvent;
    private _onRemoteChangedEvent;
    private static _getModelingService;
}

export declare abstract class KBObjectPartElement extends RemotePropertiesObject {
    private _part;
    constructor(part: KBObjectPart);
    get model(): KBModel;
    get part(): KBObjectPart;
    remoteReady: boolean;
    protected abstract readonly remoteInternalPath: string;
    get remotePath(): string;
    setPropertyValue(name: string, value: any): Promise<void>;
    setPropertyValues(values: PropertyValue[]): Promise<void>;
    getPropertyValue(name: string): Promise<any>;
    getPropertyValues(names: string[]): Promise<AnyObject<any>>;
    deserializeProperties(data: PropertiesObjectData): Promise<void>;
    private get _managger();
}

export declare namespace KBObjectProperties {
    const NAME = "Name";
    const DESCRIPTION = "Description";
    const IS_GENERATED_OBJECT = "IsGeneratedObject";
    const FULLY_QUALIFIED_NAME = "FullyQualifiedName";
    const PARENT_REFERENCE = "Folder";
    const IS_OBJECT_COMPONENT = "IsObjectComponent";
    const OBJECT_VISIBILITY = "ObjectVisibility";
    const OBJECT_IS_INTERFACE = "ObjectIsInterface";
}

export declare type RemoteEventArgsDeserializer = (kb: KnowledgeBase, args: string | AnyObject) => any;
export declare class KnowledgeBase {
    private _properties;
    private _context;
    private _connectionInfo;
    private _guid;
    private _name;
    private _models;
    private _designModel;
    private _targetModel;
    private _disposables;
    static create(options: CreateKBOptionsData): Promise<KnowledgeBase>;
    static open(data: KBInfoData): Promise<KnowledgeBase>;
    static registerRemoteEvent(name: string, deserializer: RemoteEventArgsDeserializer): void;
    protected constructor(data: KBData);
    private _initialize;
    get properties(): KBProperties;
    get context(): KBContext;
    get connectionInfo(): KBConnectionInfoData;
    get name(): string | undefined;
    get guid(): Guid;
    get designModel(): KBModel;
    get targetModel(): KBModel;
    get models(): KBModel[];
    getModel(guid: Guid): KBModel | undefined;
    reloadModel(model: KBModel): Promise<void>;
    saveObject(kbObject: KBObject, headerOnly?: boolean): Promise<boolean>;
    deleteObjects(objects: IKBObject[]): Promise<boolean>;
    /**
     * @param [localOnly] - True if the KB is clsoed locally only, server side KB will not be closed. This should
     * only be used in special cases, e.g.: the server is down.
     */
    close(localOnly?: boolean): Promise<void>;
    beforeClose(callback: () => MaybePromise<void>): Disposable;
    afterClose(callback: () => MaybePromise<void>): Disposable;
    afterSaveObject(callback: (kbObject: KBObject) => MaybePromise<void>): Disposable;
    afterDeleteObject(callback: (kbObject: KBObject) => MaybePromise<void>): Disposable;
    onKBEnvironmentChanged(callback: () => MaybePromise<void>): Disposable;
    _setTargetModel(modelGuid: string): void;
    _onOutputMessage(message: any): Promise<void>;
    private _reloadKBModel;
    static _printOutputMessage(message: any): void;
    private static _getKBService;
    private static _getModelingService;
}

export declare enum ModifiedOption {
    AfterDateTime = 1,
    AfterLastBuild = 2,
    AfterImport = 3
}
export declare enum DependencyType {
    ReferencedBy = 0,
    ReferencesTo = 1
}
export declare enum DependenciesTypes {
    None = 0,
    Minimal = 1,
    Hard = 2,
    All = 3
}
export declare type KBObjectFilters = {
    startIndex?: number;
    endIndex?: number;
    search?: string;
    pattern?: string;
    namespaces?: string;
    categoryIds?: number[];
    moduleIds?: number[];
    includeSubmodules?: boolean;
    folderIds?: number[];
    typeIds?: Guid[];
    excludeReferencedModulesChildren?: boolean;
};
export declare type KBObjectInfoFilters = KBObjectFilters & {
    includeProperties?: string[];
    modifiedByUser?: string;
    modified?: ModifiedOption;
    modifiedDate?: string;
};
export declare type KBObjectFindInfosResult = {
    objects: KBObjectInfo[];
    truncated: boolean;
};
export declare type KBObjectFindResult = {
    objects: KBObject[];
    truncated: boolean;
};
export declare type ExportReferencesOptions = {
    keys: string[];
    dependencyType: DependencyType;
    references: DependenciesTypes;
};
export declare type EntityVersionInfo = {
    createdIn: string;
    currentIn: string;
    name: string;
    revision: number;
    revisionDate: string;
    user: string;
};
export interface IKBModelObjects {
    getRootModuleInfo(): MaybePromise<KBObjectInfo>;
    getRootInterfacesInfo(): MaybePromise<KBObjectInfo[]>;
    getInfoByKey(key: EntityKey): MaybePromise<KBObjectInfo | undefined>;
    getInfoByGuid(guid: Guid): MaybePromise<KBObjectInfo | undefined>;
    getInfoByTypeQName(type: Guid, qname: QualifiedName): MaybePromise<KBObjectInfo | undefined>;
    getChildrenInfoByKey(parentKey: EntityKey): MaybePromise<Iterable<KBObjectInfo>>;
    getChildrenInfoByGuid(parentGuid: Guid): MaybePromise<Iterable<KBObjectInfo> | undefined>;
    getObjectsInfoByType(type: Guid): MaybePromise<Iterable<KBObjectInfo>>;
    getReferencesInfoByKey(key: EntityKey, to: boolean): MaybePromise<EntityReferenceInfo[] | undefined>;
    getVersionsInfoByKey(key: EntityKey): MaybePromise<EntityVersionInfo[] | undefined>;
    getExportReferencesInfo(options: ExportReferencesOptions): MaybePromise<KBObjectInfo[] | undefined>;
    resolveNameToInfos(fromModuleKey: EntityKey, types: Guid | Guid[], name: string): MaybePromise<ResolveResult | undefined>;
    resolveNameToKeys(fromModuleKey: EntityKey, types: Guid | Guid[], name: string): MaybePromise<ResolveKeyResult | undefined>;
    searchInfos(filters: KBObjectInfoFilters): MaybePromise<KBObjectFindInfosResult>;
    getRootModule(): MaybePromise<Module>;
    getByKey(key: EntityKey, headerOnly?: boolean): MaybePromise<KBObject | undefined>;
    getVersion(key: EntityKey, version: number): MaybePromise<KBObject | undefined>;
    getByGuid(guid: Guid, headerOnly?: boolean): MaybePromise<KBObject | undefined>;
    getByTypeQName(type: Guid | undefined, qname: QualifiedName, headerOnly?: boolean): MaybePromise<KBObject | undefined>;
    getBySessionId(sessionId: Guid): MaybePromise<KBObject | undefined>;
    getByType(type: Guid): MaybePromise<KBObject[]>;
    search(filters: KBObjectFilters): MaybePromise<KBObjectFindResult>;
    setAsActive(key: EntityKey, version: number): MaybePromise<boolean>;
    getObjectModuleByKey(key: EntityKey): MaybePromise<Module | undefined>;
    getQNameByKey(key: EntityKey): MaybePromise<string | undefined>;
    getFullQNameByKey(key: EntityKey): MaybePromise<string | undefined>;
}

export interface IModelable {
    readonly model: KBModel | undefined;
}
export declare namespace IModelable {
    function is(arg: any): arg is IModelable;
}

export declare enum ObjectTypeFlags {
    NO_CREATABLE = 1,
    NO_OPENABLE = 2,
    NO_SHOW = 4,
    NO_FOLDER = 8,
    NO_DELETABLE = 16,
    DEFAULT = 0,
    INTERNAL = 5
}

export declare type QualifiedNameOptions = {
    type?: Guid;
    fullName?: string;
    module?: Module;
    name?: string;
};
export declare class QualifiedName {
    private _name;
    private _moduleKey;
    private _type;
    private _fullName;
    private _moduleFullName;
    constructor(options: QualifiedNameOptions);
    get name(): string;
    getModule(model: KBModel): Promise<Module | undefined>;
    getFullName(model: KBModel): Promise<string>;
    private static _partition;
}

export declare enum ReferenceType {
    WEAK = 0,
    HARD = 1,
    WEAK_EXTERNAL = 2,
    NONE = -1
}

export declare type RemoteCommandData = {
    id: string;
    data?: any;
};
export declare type RemoteCommandResultData = CommandResultData;
export declare type RemoteCommandListResultData = CommandListResultData;
export declare type RemoteCommandListItemResultData = CommandListItemResultData;

export declare type ItemPredicate = (item: StructPartItem) => boolean;
export declare type StructPartItemOptions = {
    type: string;
    guid?: Guid;
    parent?: StructPartItem;
};
export declare type StructPartItemData = {
    type: string;
    guid: string;
    properties?: PropertiesObjectData;
    items: StructPartItemData[];
};
export declare class StructPartItem extends KBObjectPartElement {
    private _type;
    private _guid;
    private _parent;
    private _items;
    constructor(part: StructPart, options: StructPartItemOptions);
    get structPart(): StructPart;
    get model(): KBModel;
    get remoteInternalPath(): string;
    get type(): string;
    get guid(): Guid;
    get parent(): StructPartItem | undefined;
    get count(): number;
    private _setParent;
    getItems(predicate?: ItemPredicate | undefined): StructPartItem[];
    hasItem(predicate: ItemPredicate): boolean;
    getAllItems(predicate?: ItemPredicate | undefined): StructPartItem[];
    insertItem(index: number, item: StructPartItem): void;
    removeItem(item: StructPartItem): boolean;
    remove(): void;
    protected canInsertItem(item: StructPartItem): boolean;
    protected canRemoveItem(item: StructPartItem): boolean;
    serialize(includeProperties?: boolean, includeChildren?: boolean): Promise<StructPartItemData>;
    deserialize(data: StructPartItemData): Promise<void>;
}

export declare abstract class StructPart extends KBObjectPart {
    protected _rootItem: StructPartItem;
    constructor(kbObject: KBObject, type: Guid);
    get rootItem(): StructPartItem;
    protected getAllElements(): KBObjectPartElement[];
    canInsertItem(item: StructPartItem, parent: StructPartItem): boolean;
    canRemoveItem(item: StructPartItem): boolean;
    getItem(guid: Guid): StructPartItem | undefined;
    deserializeContent(data: string): Promise<void>;
    createItem(options: StructPartItemOptions): StructPartItem;
    reloadItem(item: StructPartItem): Promise<boolean>;
}

export abstract class RemotePropertiesObject extends PropertiesObject {
    abstract readonly model: KBModel;
    abstract readonly remotePath: string;
    createPropertyManager(definitions?: PropertyDefinitionCollection): PropertyManager;
}

export class RemotePropertyTypeEditorRegistry {
    static add(name: string, factory: () => UITypeEditor): void;
    static get(name: string): (() => UITypeEditor);
}

export declare class RemotePropertyManager extends PropertyManager {
    private _objectClass;
    private _type;
    private _description;
    private _isReadOnly;
    private _localStore;
    private _getModelFunc;
    private _getRemotePathFunc;
    static get FLAG_SRC_CODE_STRING(): string;
    static cacheProperties(objects: PropertiesObject[], properties: string[], forced?: boolean): Promise<void>;
    constructor(object: PropertiesObject, getModelFunc: () => KBModel, getRemotePathFunc: () => string, definitions?: PropertyDefinitionCollection);
    get model(): KBModel;
    get remotePath(): string;
    getTypeInfo(): {
        type: string;
        description: string;
        isReadOnly: boolean;
    };
    setLocalPropertyValues(values: PropertyValue[]): void;
    setLocalPropertyValue(name: string, value: any): void;
    getLocalProperyValue(name: string): any;
    getLocalPropertyValues(): PropertyValue[];
    getCachedPropertyDescriptors(): IPropertyDescriptor[];
    getPropertyDescriptors(): Promise<IPropertyDescriptor[]>;
    getPropertyDescriptorByName(name: string): Promise<RemotePropertyDescriptor | undefined>;
    isPropertyDefault(name: string): Promise<boolean>;
    isPropertyReadOnly(name: string): Promise<boolean>;
    isPropertyVisible(name: string): Promise<boolean>;
    setPropertyValue(name: string, value: any): Promise<void>;
    silentSetPropertyValue(name: string, value: any): Promise<void>;
    _setPropertyValue(name: string, value: any): Promise<void>;
    getPropertyValue(name: string): Promise<string | undefined>;
    resetProperty(name: string): Promise<void>;
    reset(): Promise<void>;
    invalidateDescriptors(): Promise<void>;
    loadPropertiesDefinition(): Promise<PropertyDefinitionCollection>;
    deserializeProperties(data: PropertiesObjectData, sourceType?: string | (new () => any)): Promise<void>;
    serializeProperties(destinationType?: string | (new () => any)): Promise<PropertiesObjectData>;
    private _getRemoteProperties;
    private static _getRemoteProperties;
    private _createPropertyDescriptors;
    private _createDefinitionFromData;
    invalidateLocalDescriptors(): void;
    private static _getModelingService;
}
export declare class RemotePropertyTypeConverter extends StringConverter {
    private _stdValues;
    constructor(stdValues: string[]);
    supportsSourceCodeString(context: TypeDescriptorContext): boolean;
    getStandardValuesSupported(context: TypeDescriptorContext): boolean;
    getStandardValuesExclusive(context: TypeDescriptorContext): boolean;
    getStandardValues(context: TypeDescriptorContext): Promise<string[]>;
}
export declare class RemotePropertyDescriptor implements IPropertyDescriptor {
    private _propertiesObject;
    private _definition;
    private _data;
    private _typeConverter;
    constructor(propertiesObject: PropertiesObject, definition: PropertyDefinition, data: PropertyData);
    get data(): PropertyData;
    get propertiesObject(): PropertiesObject;
    get definition(): PropertyDefinition;
    get name(): string;
    get displayName(): string;
    get description(): string;
    get category(): string | undefined;
    get type(): string | (new () => any);
    get typeConverter(): TypeConverter;
    get isChild(): boolean;
    get children(): string[];
    getEditor(): UITypeEditor | undefined;
    getUIValidator(): IUIValidator | undefined;
    isDefault(): Promise<boolean>;
    isReadOnly(): Promise<boolean>;
    isVisible(): Promise<boolean>;
    isApplicable(): boolean;
    getValue(): Promise<string>;
    setValue(value: any): Promise<boolean>;
    silentSetValue(value: any): Promise<boolean>;
    resetValue(): Promise<void>;
}

export abstract class AbstractService implements IGXService {
    readonly disposables: CompositeDisposable;
    readonly emitter: Emitter;
    constructor();
    get name(): string;
    dispose(): void;
}

export interface IGXService {
    readonly name: string;
    dispose(): void;
}

export interface IOutputService extends IOutputTarget {
    /**
     * Adds a listener to the default output.
     */
    addListener(target: IOutputTarget): Disposable;
    /**
     * Adds a listener to a selected output.
     */
    addListenerToOutput(outputId: string, target: IOutputTarget): Disposable;
    /**
     * Adds a listener that supports multiple IOutputTargets.
     */
    addMultipleOutputListener(target: IMultipleOutputTarget): Disposable;
    /**
     * Removes the specified listener.
     */
    removeListener(target: IOutputTarget): void;
    /**
     * Removes the specified listener, and all the IOutputTargets that its contains.
     */
    removeMultipleOutputListener(target: IMultipleOutputTarget): void;
    /**
     * Selects the specified output.
     */
    selectOutput(outputId: string): void;
    /**
     * Un-selects the specified output.
     */
    unselectOutput(outputId: string): void;
    /**
     * Returns the selected output.
     */
    readonly selectedOutput: string;
    /**
     * Clears the specified output.
     */
    clearOutput(outputId: string | undefined | null): void;
    /**
     * Makes visible the specified output.
     */
    showOutput(outputId: string): void;
    /**
     * Writes the specified text with 'start section' style in the specified output. Useful to specify the start of an action
     * that can be successful or not.
     */
    startSectionInOutput(outputId: string | undefined | null, sectionId: string, sectionName: string): void;
    /**
     * Writes the specified text with 'end section' format in the specified output. Useful to specify the result of an action
     * that can be successful or failed.
     */
    endSectionInOutput(outputId: string | undefined | null, sectionId: string, sectionName: string, success: boolean): void;
    /**
     * Adds the given message to the specified output.
     */
    addInOutput(outputId: string | undefined | null, message: OutputError): void;
    /**
     * Adds the given text in the specified output.
     */
    addTextInOutput(outputId: string | undefined | null, value: string): void;
    /**
     * Adds the given text and a break line character in the specified output.
     */
    addLineInOutput(outputId: string | undefined | null, value: string): void;
    /**
     * Adds the given text with 'warning' style in the specified output.
     */
    addWarningLineInOutput(outputId: string | undefined | null, value: string): void;
    /**
     *
     * Adds the given text with 'error' style or the data of the exception (including any nested exceptions)
     * in the specified output.
     */
    addErrorLineInOutput(outputId: string | undefined | null, value: string | Error): void;
}

export interface IOutputTarget {
    /**
     * Clears the text in the current output.
     */
    clear(): void;
    /**
     * Makes visible the current output.
     */
    show(): void;
    /**
     * Writes the specified text with 'start section' style. Useful to specify the start of an operation
     * that can be successful or not.
     */
    startSection(sectionId: string, sectionName: string, reuseSection?: boolean): void;
    /**
     * Writes the specified text with 'end section' style. Useful to specify the result of an operation
     * (successful or failed).
     */
    endSection(sectionId: string, sectionName: string, success: boolean): void;
    /**
     * Writes the given message with the corresponding style (depending if it is a warning, error or other kind of message).
     */
    add(value: OutputError): void;
    /**
     * Adds the given text with 'error' style or the data of the exception (including any nested exceptions).
     */
    addErrorLine(error: string | Error): void;
    /**
     * Writes the given text.
     */
    addText(value: string): void;
    /**
     * Writes the given text and a break line character.
     */
    addLine(value: string): void;
    /**
     * Writes the given text with 'warning' style.
     */
    addWarningLine(value: string): void;
    /**
     * Writes each message in the given list.
     *
     * @param {IOutputMessages} output - List of messages.
     * @param {boolean} textOnly - 'true' if the output must show only the message text; 'false' if the
     * output can process the message info to, g.e., show a link.
     */
    addAll(output: IOutputMessages, textOnly: boolean): void;
}

export class OutputService extends AbstractService implements IOutputService {
    static get DEFAULT_OUTPUT(): string;
    private _selectedOutput;
    private _listeners;
    private _multipleOutputListeners;
    constructor();
    get name(): string;
    dispose(): void;
    addListener(target: IOutputTarget): Disposable;
    addListenerToOutput(outputId: string, target: IOutputTarget): Disposable;
    addMultipleOutputListener(target: IMultipleOutputTarget): Disposable;
    removeListener(target: IOutputTarget): void;
    removeMultipleOutputListener(target: IMultipleOutputTarget): void;
    selectOutput(outputId: string): void;
    unselectOutput(outputId: string): void;
    get selectedOutput(): string;
    clearOutput(outputId: string | null | undefined): void;
    showOutput(outputId: string | null | undefined): void;
    startSectionInOutput(outputId: string | null | undefined, sectionId: string, sectionName: string): void;
    endSectionInOutput(outputId: string | null | undefined, sectionId: string, sectionName: string, success: boolean): void;
    addInOutput(outputId: string | null | undefined, message: OutputError): void;
    addTextInOutput(outputId: string | null | undefined, value: string): void;
    addLineInOutput(outputId: string | null | undefined, value: string): void;
    addWarningLineInOutput(outputId: string | null | undefined, value: string): void;
    addErrorLineInOutput(outputId: string | null | undefined, value: string | Error): void;
    clear(): void;
    show(): void;
    startSection(sectionId: string, sectionName: string, reuseSection: boolean): void;
    endSection(sectionId: string, sectionName: string, success: boolean): void;
    add(value: OutputError): void;
    addText(value: string): void;
    addLine(value: string): void;
    addWarningLine(value: string): void;
    addErrorLine(value: string | Error): void;
    addAll(output: IOutputMessages, textOnly: boolean): void;
    private _forEachListener;
    private _onOutputAdded;
}

export interface IStorageService extends IGXService {
    get(key: string): MaybePromise<string | undefined>;
    set(key: string, value: string): MaybePromise<void>;
}

export declare class StorageService extends AbstractService implements IStorageService {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
}

export declare class CommonServices {
    static output: IOutputService;
    static storage: IStorageService;
    static plugins: IPluginsService;
    static teamDevClient: ITeamDevClientService;
}

export interface IMultipleOutputTarget {
    addOutput(outputId: string): void;
    getOutput(outputId: string): IOutputTarget | undefined;
    readonly outputIds: string[];
    outputAdded(callback: (args: OutputAddedEventArgs) => void): Disposable;
}
export declare type OutputAddedEventArgs = {
    outputId: string;
    output: IOutputTarget;
};

export interface ITeamDevClientService extends IGXService {
    shareKBwithGXserver(kb: KnowledgeBase, publishKBData: ShareKBInfoData): MaybePromise<void>;
    checkoutKBFromServer(options: CreateKBOptionsData): MaybePromise<CreateKBResultData>;
    getGXServerToken(blInfo: ServerBLInfoData, serverInfo: TeamDevKBData): MaybePromise<AccessTokenInfo>;
    getVersionInfo(kb: KnowledgeBase, modelGuid: Guid | string): MaybePromise<GeneXusServerInfoData>;
    getHostedKBs(blInfo: ServerBLInfoData, serverInfo: TeamDevData): MaybePromise<NewKBInfoData[]>;
    getLocalChanges(kb: KnowledgeBase, modelGuid: Guid | string, properties: string): MaybePromise<KBObjectsHistoryInfoData>;
    checkLocalChangesReferences(kb: KnowledgeBase, modelGuid: Guid | string, localStatus: CheckLocalChanges): MaybePromise<EntityKeyData[]>;
    ignoreForCommit(kb: KnowledgeBase, modelGuid: Guid | string, dataEntityKeys: EntityKeyData[]): MaybePromise<void>;
    enableForCommit(kb: KnowledgeBase, modelGuid: Guid | string, dataEntityKeys: EntityKeyData[]): MaybePromise<void>;
    markAsResolved(kb: KnowledgeBase, modelGuid: Guid | string, dataEntityKeys: EntityKeyData[]): MaybePromise<boolean>;
    revertLocalchanges(kb: KnowledgeBase, modelGuid: Guid | string, dataEntityKeys: EntityKeyData[]): MaybePromise<boolean>;
    commitLocalChanges(kb: KnowledgeBase, modelGuid: Guid | string, commitInfoData: CommitInfoData): MaybePromise<void>;
    getChangeSets(kb: KnowledgeBase, modelGuid: Guid | string): MaybePromise<string[]>;
    getRemoteChanges(kb: KnowledgeBase, modelGuid: Guid | string, properties: string): MaybePromise<TeamDevUpdateItemData[]>;
    checkRemoteChangesReferences(kb: KnowledgeBase, modelGuid: Guid | string, localStatus: CheckRemoteChanges): MaybePromise<string[]>;
    getIgnoredRemoteChanges(kb: KnowledgeBase, modelGuid: Guid | string): MaybePromise<TeamDevUpdateItemData[]>;
    ignoreForUpdate(kb: KnowledgeBase, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    enableForUpdate(kb: KnowledgeBase, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    update(kb: KnowledgeBase, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    getChangePreview(kb: KnowledgeBase, modelGuid: KBModel, objectGuid: string): MaybePromise<KBObject | undefined>;
    getAllVersions(kb: KnowledgeBase): MaybePromise<KBVersionData[]>;
    getVersionRevisions(kb: KnowledgeBase, modelGuid: Guid | string, versionGuid: Guid | string, properties: string): MaybePromise<KBVersionRevisionData[]>;
    getLocalActivity(kb: KnowledgeBase, modelGuid: Guid | string, properties: string): MaybePromise<KBVersionActivityRevisionData[]>;
    getServerToken(serverCredentials: any): any;
    getCredentials(kb: KnowledgeBase): any;
    setCredentials(kb: KnowledgeBase, credentials: any): MaybePromise<void>;
    disconnectKB(kb: KnowledgeBase): MaybePromise<void>;
    getVersionRevisionObjects(kb: KnowledgeBase, modelGuid: Guid | string, versionGuid: Guid | string, revGuids: Array<Guid | string>): MaybePromise<any[]>;
    merge(kb: KnowledgeBase, modelGuid: Guid | string, mergeInfoData: any): MaybePromise<boolean>;
}

export declare namespace PluginUtils {
    function injectModuleInGlobalScope(packageName: string, module: any): void;
}
export declare type PluginVersionDescriptor = {
    readonly plugin: PluginDescriptor;
    readonly version: string;
    readonly ideVersion: string;
    readonly bundleType?: 'umd' | 'esm';
    readonly bundleUrl: string;
};
export declare type PluginDescriptor = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly publisher: string;
    readonly publisherUrl: string;
    readonly keyWords: string[];
    readonly versions: PluginVersionDescriptor[];
};
export declare type InitializePluginCallback = (bind: interfaces.Bind) => void;
export declare type ActivatePluginCallback = () => void;
export declare type DeactivatePluginCallback = () => void;
export declare type PluginEventArgs = {
    plugin: GXPlugin;
};
export declare type PluginEventHandler = (args: PluginEventArgs) => void;
export declare class PluginModule {
    initializeCallback: InitializePluginCallback;
    activateCallback?: ActivatePluginCallback | undefined;
    deactivateCallback?: DeactivatePluginCallback | undefined;
    constructor(initializeCallback: InitializePluginCallback, activateCallback?: ActivatePluginCallback | undefined, deactivateCallback?: DeactivatePluginCallback | undefined);
}
export declare type PluginLoader = (bundleUrl: string) => MaybePromise<PluginModule>;
export declare type PluginOptions = {
    descriptor: PluginVersionDescriptor;
    loader: PluginLoader;
    container: interfaces.Container;
};
export declare class GXPlugin {
    private _emitter;
    private _descriptor;
    private _loader;
    private _isLoaded;
    private _isEnabled;
    private _module;
    private _container;
    constructor(options: PluginOptions);
    get descriptor(): PluginVersionDescriptor;
    get id(): string;
    get isLoaded(): boolean;
    get isEnabled(): boolean;
    get container(): interfaces.Container;
    load(): Promise<void>;
    getContributions<T extends object>(id: string | symbol): T[];
    bindContributionProvider(id: symbol): void;
    enable(): void;
    disable(): void;
    toggleEnabled(): void;
    loaded(calllback: () => void): Disposable;
    enabled(calllback: () => void): Disposable;
    disabled(calllback: () => void): Disposable;
}
export interface IPluginsService extends IGXService {
    installedPlugins: GXPlugin[];
    getEnabledPlugins(): GXPlugin[];
    pluginLoaded(callback: PluginEventHandler): Disposable;
    pluginEnabled(callback: PluginEventHandler): Disposable;
    pluginDisabled(callback: PluginEventHandler): Disposable;
}

export declare class ServiceNames {
    static get OUTPUT(): string;
    static get STORAGE(): string;
    static get PLUGINS(): string;
    static get TEAM_DEV_CLIENT(): string;
}

export declare namespace ServerBLEvents {
    const AFTER_UPDATE_ITEM = "updateitem";
}
