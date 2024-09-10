import { IGXCommLayer, CreateKBModelOptionsData, CreateKBOptionsData, CreateKBResultData, EntityVersionInfoData, ExportData, ExportInfoData, ImportExportPropertiesData, InstallModuleRequestData, KBConnectionInfoData, KBContextData, KBContextPropertyValueData, KBData, KBInfoData, KBModelData, ModulePackageData, ModuleServerData, PropertiesObjectData, ServerBLInfoData, TeamData, EntityReferenceInfoData, ExportReferencesOptionsData, KBObjectData, KBObjectFiltersData, KBObjectFindResultData, KBObjectHeaderData, KBObjectInfoData, KBObjectInfoFiltersData, KBObjectInfoFindResultData, ResolveKeyResultData, ResolveParametersData, ResolveResultData, CommandData, CommandListResultData, CommandResultData, CreateKBObjectData, CreateKBObjectResultData, KBObjectPartData, ObjectsPropertiesFilterData, PropertiesObjectDefinitionData, PropertyValueData, ValidationResultData } from '@genexusm-sdk/common-comm-layer' 
import { AnyObject, Disposable, DisposableUrl, Guid, MaybePromise } from '@genexusm-sdk/common' 

export declare enum ServerMessageType {
    LOG = 0,
    MESSAGE = 1,
    WARNING = 2,
    ERROR = 3,
    NEW_LINE = 4,
    START_SECTION = 5,
    END_SECTION = 6,
    CLEAR = 7,
    EVENT = 8
}

export declare class Services {
    descriptors: IDescriptorsCommService;
    kb: IKBCommService;
    kbModelObjects: IKBModelObjectsCommService;
    modeling: IModelingCommService;
    news: INewsCommService;
    static createInstance(commLayer: IGXCommLayer): Services;
    private constructor();
}

export declare type ImportOptionsData = {
    fileId: string;
    objectIds: Guid[] | string[];
    options: PropertiesObjectData;
};
export interface IKBCommService {
    create(options: CreateKBOptionsData): MaybePromise<CreateKBResultData>;
    open(data: KBInfoData): MaybePromise<KBData>;
    close(connInfo: KBConnectionInfoData): MaybePromise<void>;
    getCatalog(projectId?: string): MaybePromise<KBInfoData[]>;
    getTeams(): MaybePromise<TeamData[]>;
    setTargetModel(connInfo: KBConnectionInfoData, modelGuid: string): MaybePromise<void>;
    createModel(connInfo: KBConnectionInfoData, data: CreateKBModelOptionsData): MaybePromise<void>;
    getModel(connInfo: KBConnectionInfoData, path: string): MaybePromise<KBModelData>;
    getModelVersions(connInfo: KBConnectionInfoData, key: string): MaybePromise<EntityVersionInfoData[]>;
    getModelVersion(connInfo: KBConnectionInfoData, key: string, versionId: number): MaybePromise<KBModelData>;
    import(connInfo: KBConnectionInfoData, data: ImportOptionsData): MaybePromise<void>;
    exploreImportFile(connInfo: KBConnectionInfoData, remoteId: string): MaybePromise<ExportInfoData[] | undefined>;
    cancelImport(connInfo: KBConnectionInfoData): MaybePromise<void>;
    getImportProperties(connInfo: KBConnectionInfoData, isImport: boolean): MaybePromise<ImportExportPropertiesData | undefined>;
    export(connInfo: KBConnectionInfoData, data: ExportData): MaybePromise<void>;
    cancelExport(connInfo: KBConnectionInfoData): MaybePromise<void>;
    downloadTempFile(connInfo: KBConnectionInfoData, id: string): MaybePromise<DisposableUrl>;
    uploadTempFile(connInfo: KBConnectionInfoData, file: File, progressCallback?: (percentage: number) => void): MaybePromise<string>;
    getModuleServers(connInfo: KBConnectionInfoData): MaybePromise<ModuleServerData[]>;
    getServerModules(connInfo: KBConnectionInfoData, modelGuid: string, serverId: string, filter: string, forceReload: boolean): MaybePromise<ModulePackageData[]>;
    installModule(connInfo: KBConnectionInfoData, modelGuid: string, data: InstallModuleRequestData): MaybePromise<void>;
    getContext(connInfo: KBConnectionInfoData): MaybePromise<KBContextData>;
    setContextProperty(connInfo: KBConnectionInfoData, data: KBContextPropertyValueData): MaybePromise<KBContextData>;
    getBLInfo(): MaybePromise<ServerBLInfoData>;
    tryReconnect(connInfo: KBConnectionInfoData): MaybePromise<void>;
    connectionEstablished(connInfo: KBConnectionInfoData, callback: Function): Disposable;
    connectionClosed(connInfo: KBConnectionInfoData, callback: Function): Disposable;
    connectionError(connInfo: KBConnectionInfoData, callback: Function): Disposable;
    outputMessage(connInfo: KBConnectionInfoData, callback: (message: AnyObject) => void): Disposable;
}

export interface IKBModelObjectsCommService {
    getRootModuleInfo(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<KBObjectInfoData>;
    getRootInterfacesInfo(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<KBObjectInfoData[]>;
    getInfoByGuid(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<KBObjectInfoData>;
    getInfoByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectInfoData>;
    getInfoByTypeQName(servicesUrl: string, kbId: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectInfoData>;
    getChildrenInfoByGuid(servicesUrl: string, kbId: string, modelGuid: string, parentGuid: string): MaybePromise<KBObjectInfoData[]>;
    getChildrenInfoByKey(servicesUrl: string, kbId: string, modelGuid: string, parentType: string, parentId: number): MaybePromise<KBObjectInfoData[]>;
    getInfosByType(servicesUrl: string, kbId: string, modelGuid: string, type: string): MaybePromise<KBObjectInfoData[]>;
    getReferencesInfoByKey(servicesUrl: string, kbId: string, modelGuid: string, key: string, to: boolean): MaybePromise<EntityReferenceInfoData[]>;
    getVersionsInfoByKey(servicesUrl: string, kbId: string, modelGuid: string, key: string): MaybePromise<EntityVersionInfoData[]>;
    getExportReferencesInfo(servicesUrl: string, kbId: string, modelGuid: string, data: ExportReferencesOptionsData): MaybePromise<KBObjectInfoData[]>;
    resolveNameToInfo(servicesUrl: string, kbId: string, modelGuid: string, parameters: ResolveParametersData): MaybePromise<ResolveResultData>;
    resolveNameToKey(servicesUrl: string, kbId: string, modelGuid: string, parameters: ResolveParametersData): MaybePromise<ResolveKeyResultData>;
    searchInfos(servicesUrl: string, kbId: string, modelGuid: string, filters: KBObjectInfoFiltersData): MaybePromise<KBObjectInfoFindResultData>;
    getHeaderByGuid(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<KBObjectHeaderData>;
    getHeaderByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectHeaderData>;
    getHeaderByTypeQName(servicesUrl: string, kbId: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectHeaderData>;
    getHeadersByType(servicesUrl: string, kbId: string, modelGuid: string, type: string): MaybePromise<KBObjectHeaderData[]>;
    search(servicesUrl: string, kbId: string, modelGuid: string, filters: KBObjectFiltersData): MaybePromise<KBObjectFindResultData>;
    getRootModule(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<KBObjectData>;
    getByGuid(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<KBObjectData>;
    getByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectData>;
    getVersion(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number, version: number): MaybePromise<KBObjectData>;
    getByTypeQName(servicesUrl: string, kbId: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectData>;
    getBySessionId(servicesUrl: string, kbId: string, sessionId: string): MaybePromise<KBObjectData>;
    getModuleByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectData>;
    getQNameByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<string>;
    getFullQNameByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<string>;
    setAsActive(servicesUrl: string, kbId: string, modelGuid: string, key: string, version: number): MaybePromise<boolean>;
}

export interface IModelingCommService {
    createObject(servicesUrl: string, kbId: string, modelGuid: string, data: CreateKBObjectData): MaybePromise<CreateKBObjectResultData>;
    saveObjectHeader(servicesUrl: string, kbId: string, modelGuid: string, data: KBObjectHeaderData): MaybePromise<KBObjectHeaderData>;
    saveObject(servicesUrl: string, kbId: string, modelGuid: string, data: KBObjectData): MaybePromise<KBObjectData>;
    deleteObjectByGuid(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<KBObjectInfoData>;
    deleteObjectByKey(servicesUrl: string, kbId: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectInfoData>;
    invalidateObjectPropertyDescriptors(servicesUrl: string, kbId: string, path: string): MaybePromise<void>;
    getPropertiesDefinition(servicesUrl: string, kbId: string, objectClass: string): MaybePromise<PropertiesObjectDefinitionData>;
    getProperties(servicesUrl: string, kbId: string, path: string): MaybePromise<PropertiesObjectData>;
    getPropertiesMultiple(servicesUrl: string, kbId: string, data: ObjectsPropertiesFilterData): MaybePromise<PropertiesObjectData[]>;
    setPropertyValue(servicesUrl: string, kbId: string, path: string, data: PropertyValueData): MaybePromise<PropertiesObjectData>;
    isValidObjectPropertyValue(servicesUrl: string, kbId: string, path: string, data: PropertyValueData): MaybePromise<ValidationResultData>;
    executeCommandList(servicesUrl: string, kbId: string, path: string, data: CommandData[]): MaybePromise<CommandListResultData>;
    executeCommand(servicesUrl: string, kbId: string, path: string, data: CommandData): MaybePromise<CommandResultData>;
    updateObjectPart(servicesUrl: string, kbId: string, path: string, data: KBObjectPartData): MaybePromise<void>;
    getObjectPart(servicesUrl: string, kbId: string, path: string, reload: boolean): MaybePromise<KBObjectPartData>;
    isDefaultObjectPart(servicesUrl: string, kbId: string, path: string): MaybePromise<boolean>;
    disposeObjectSession(servicesUrl: string, kbId: string, sessionId: string): MaybePromise<void>;
}
