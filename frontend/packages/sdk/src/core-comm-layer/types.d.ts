import { IGXCommLayer, CreateKBModelOptionsData, CreateKBOptionsData, CreateKBResultData, EntityVersionInfoData, ExportData, ExportInfoData, ImportExportPropertiesData, InstallModuleRequestData, KBContextData, KBContextPropertyValueData, KBData, KBInfoData, KBModelData, ModulePackageData, ModuleServerData, PropertiesObjectData, EntityReferenceInfoData, ExportReferencesOptionsData, KBObjectData, KBObjectFiltersData, KBObjectFindResultData, KBObjectHeaderData, KBObjectInfoData, KBObjectInfoFiltersData, KBObjectInfoFindResultData, ResolveKeyResultData, ResolveParametersData, ResolveResultData, CommandData, CommandListResultData, CommandResultData, CreateKBObjectData, CreateKBObjectResultData, DeleteKBObjectResultData, KBObjectPartData, ObjectsPropertiesFilterData, PropertiesObjectDefinitionData, PropertyValueData, ValidationResultData } from '../common-comm-layer' 
import { AnyObject, Disposable, DisposableUrl, Guid, MaybePromise } from '../common' 

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
    questions: IQuestionsService;
    authentication: IAuthenticationCommService;
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
    close(kbId: string): MaybePromise<void>;
    getCatalog(projectId?: string): MaybePromise<KBInfoData[]>;
    setTargetModel(kbGuid: string, modelGuid: string): MaybePromise<void>;
    createModel(kbGuid: string, data: CreateKBModelOptionsData): MaybePromise<void>;
    getModel(kbGuid: string, path: string): MaybePromise<KBModelData>;
    getModelVersions(kbGuid: string, key: string): MaybePromise<EntityVersionInfoData[]>;
    getModelVersion(kbGuid: string, key: string, versionId: number): MaybePromise<KBModelData>;
    import(kbGuid: string, data: ImportOptionsData): MaybePromise<void>;
    exploreImportFile(kbGuid: string, remoteId: string): MaybePromise<ExportInfoData[] | undefined>;
    cancelImport(kbGuid: string): MaybePromise<void>;
    getImportProperties(kbGuid: string, isImport: boolean): MaybePromise<ImportExportPropertiesData | undefined>;
    export(kbGuid: string, data: ExportData): MaybePromise<void>;
    cancelExport(kbGuid: string): MaybePromise<void>;
    downloadTempFile(kbGuid: string, id: string): MaybePromise<DisposableUrl>;
    uploadTempFile(kbGuid: string, file: File, progressCallback?: (percentage: number) => void): MaybePromise<string>;
    getModuleServers(kbGuid: string): MaybePromise<ModuleServerData[]>;
    getServerModules(kbGuid: string, modelGuid: string, serverId: string, filter: string, forceReload: boolean): MaybePromise<ModulePackageData[]>;
    installModule(kbGuid: string, modelGuid: string, data: InstallModuleRequestData): MaybePromise<void>;
    getContext(kbGuid: string): MaybePromise<KBContextData>;
    setContextProperty(kbGuid: string, data: KBContextPropertyValueData): MaybePromise<KBContextData>;
    remoteEvent(kbGuid: string, callback: (message: AnyObject) => void): Disposable;
}

export interface IKBModelObjectsCommService {
    getRootModuleInfo(kbGuid: string, modelGuid: string): MaybePromise<KBObjectInfoData>;
    getRootInterfacesInfo(kbGuid: string, modelGuid: string): MaybePromise<KBObjectInfoData[]>;
    getInfoByGuid(kbGuid: string, modelGuid: string, guid: string): MaybePromise<KBObjectInfoData>;
    getInfoByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectInfoData>;
    getInfoByTypeQName(kbGuid: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectInfoData>;
    getChildrenInfoByGuid(kbGuid: string, modelGuid: string, parentGuid: string): MaybePromise<KBObjectInfoData[]>;
    getChildrenInfoByKey(kbGuid: string, modelGuid: string, parentType: string, parentId: number): MaybePromise<KBObjectInfoData[]>;
    getInfosByType(kbGuid: string, modelGuid: string, type: string): MaybePromise<KBObjectInfoData[]>;
    getReferencesInfoByKey(kbGuid: string, modelGuid: string, key: string, to: boolean): MaybePromise<EntityReferenceInfoData[]>;
    getVersionsInfoByKey(kbGuid: string, modelGuid: string, key: string): MaybePromise<EntityVersionInfoData[]>;
    getExportReferencesInfo(kbGuid: string, modelGuid: string, data: ExportReferencesOptionsData): MaybePromise<KBObjectInfoData[]>;
    resolveNameToInfo(kbGuid: string, modelGuid: string, parameters: ResolveParametersData): MaybePromise<ResolveResultData>;
    resolveNameToKey(kbGuid: string, modelGuid: string, parameters: ResolveParametersData): MaybePromise<ResolveKeyResultData>;
    searchInfos(kbGuid: string, modelGuid: string, filters: KBObjectInfoFiltersData): MaybePromise<KBObjectInfoFindResultData>;
    getHeaderByGuid(kbGuid: string, modelGuid: string, guid: string): MaybePromise<KBObjectHeaderData>;
    getHeaderByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectHeaderData>;
    getHeaderByTypeQName(kbGuid: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectHeaderData>;
    getHeadersByType(kbGuid: string, modelGuid: string, type: string): MaybePromise<KBObjectHeaderData[]>;
    search(kbGuid: string, modelGuid: string, filters: KBObjectFiltersData): MaybePromise<KBObjectFindResultData>;
    getRootModule(kbGuid: string, modelGuid: string): MaybePromise<KBObjectData>;
    getByGuid(kbGuid: string, modelGuid: string, guid: string): MaybePromise<KBObjectData>;
    getByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectData>;
    getVersion(kbGuid: string, modelGuid: string, type: string, id: number, version: number): MaybePromise<KBObjectData>;
    getByTypeQName(kbGuid: string, modelGuid: string, type: string, qname: string): MaybePromise<KBObjectData>;
    getBySessionId(kbGuid: string, sessionId: string): MaybePromise<KBObjectData>;
    getModuleByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<KBObjectData>;
    getQNameByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<string>;
    getFullQNameByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<string>;
    setAsActive(kbGuid: string, modelGuid: string, key: string, version: number): MaybePromise<boolean>;
}

export interface IModelingCommService {
    createObject(kbGuid: string, modelGuid: string, data: CreateKBObjectData): MaybePromise<CreateKBObjectResultData>;
    saveObjectHeader(kbGuid: string, modelGuid: string, data: KBObjectHeaderData): MaybePromise<KBObjectHeaderData>;
    saveObject(kbGuid: string, modelGuid: string, data: KBObjectData): MaybePromise<KBObjectData>;
    deleteObjectByGuid(kbGuid: string, modelGuid: string, guid: string): MaybePromise<DeleteKBObjectResultData>;
    deleteObjectByKey(kbGuid: string, modelGuid: string, type: string, id: number): MaybePromise<DeleteKBObjectResultData>;
    invalidateObjectPropertyDescriptors(kbGuid: string, path: string): MaybePromise<void>;
    getPropertiesDefinition(kbGuid: string, objectClass: string): MaybePromise<PropertiesObjectDefinitionData>;
    getProperties(kbGuid: string, path: string): MaybePromise<PropertiesObjectData>;
    getPropertiesMultiple(kbGuid: string, data: ObjectsPropertiesFilterData): MaybePromise<PropertiesObjectData[]>;
    setPropertyValue(kbGuid: string, path: string, data: PropertyValueData): MaybePromise<PropertiesObjectData>;
    isValidObjectPropertyValue(kbGuid: string, path: string, data: PropertyValueData): MaybePromise<ValidationResultData>;
    executeCommandList(kbGuid: string, path: string, data: CommandData[]): MaybePromise<CommandListResultData>;
    executeCommand(kbGuid: string, path: string, data: CommandData): MaybePromise<CommandResultData>;
    updateObjectPart(kbGuid: string, path: string, data: KBObjectPartData): MaybePromise<void>;
    getObjectPart(kbGuid: string, path: string, reload: boolean): MaybePromise<KBObjectPartData>;
    isDefaultObjectPart(kbGuid: string, path: string): MaybePromise<boolean>;
    disposeObjectSession(kbGuid: string, sessionId: string): MaybePromise<void>;
}

export interface IQuestionsService {
    answer(answer: RemoteAnswerData): MaybePromise<void>;
    test(data: any): MaybePromise<any>;
}
export declare type RemoteAnswerData = {
    questionId: string;
    data: string | undefined;
};
export declare type RemoteQuestionData = {
    id: string;
    type: string;
    data: any;
};
