import { AnyObject, Disposable, Guid, MaybePromise, MessageLevel, CancelablePromise } from '../common' 
import { PropertiesObjectData, PropertyData } from '../common-properties' 

export declare type GXCommLayerConnectionOptions = AnyObject & {
    type: 'user' | 'session';
    userId?: string;
    userPassword?: string;
    session?: any;
    refreshSessionUri?: string;
    refreshSessionBeforeConnect?: boolean;
};
export declare type GXCommLayerEventHandler = () => MaybePromise<void>;
export declare const IGXCommLayer: unique symbol;
export interface IGXCommLayer {
    readonly guid: Guid;
    connect(provisioningUri: string, options: GXCommLayerConnectionOptions): MaybePromise<void>;
    disconnect(): MaybePromise<void>;
    tryRestoreConnection(): MaybePromise<void>;
    readonly isConnected: boolean;
    /**
     * Name of the concrete implementation of a communication layer
     */
    readonly name: string;
    readonly provisioningUri: string;
    readonly session: string | undefined;
    readonly status: GXCommLayerStatus;
    readonly blServerInfo: BLServerInfoData | undefined;
    beforeConnect(callback: GXCommLayerEventHandler): Disposable;
    afterConnect(callback: GXCommLayerEventHandler): Disposable;
    beforeDisconnect(callback: GXCommLayerEventHandler): Disposable;
    afterDisconnect(callback: GXCommLayerEventHandler): Disposable;
    connectionInterrupted(callback: GXCommLayerEventHandler): Disposable;
    connectionRestored(callback: GXCommLayerEventHandler): Disposable;
    startingBLServer(callback: GXCommLayerEventHandler): Disposable;
}

export declare enum GXCommLayerStatus {
    DISCONNECTED = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    INTERRUPTED = 3
}
export declare enum CreateKBStatus {
    OK = 0,
    ERROR = 1,
    PENDING = 2
}
export declare type KBContextData = {
    id: string;
    properties: KeyValueData[];
};
export declare type KBContextPropertyValueData = {
    name: string;
    value: string;
};
export declare type KeyValueData = {
    key: string;
    value: string;
};
export declare type PropertyTypeEditorData = {
    name: string;
    settings: KeyValueData[];
};
export declare type PropertyUIValidatorData = {
    name: string;
    checkOnRender: boolean;
};
export declare type PropertyDefinitionData = {
    name: string;
    displayName: string;
    category: string;
    type: string;
    flags: KeyValueData[];
    editor?: PropertyTypeEditorData;
    uiValidator?: PropertyUIValidatorData;
};
export declare type PropertiesObjectDefinitionData = {
    objectClass: string;
    name: string;
    definitions: PropertyDefinitionData[];
};
export { PropertiesObjectData, PropertyData };
export declare type PropertyValueData = {
    name: string;
    value: string;
};
export declare type ObjectsPropertiesFilterData = {
    paths: string[];
    properties: string[];
};
export declare type EntityKeyData = {
    type: string;
    id: number;
};
export declare type QualifiedNameData = {
    objectType?: string;
    fullName?: string;
    moduleKey?: EntityKeyData;
    objectName?: string;
};
export declare type EntityBaseInfoData = {
    key?: EntityKeyData;
    description?: string;
};
export declare type EntityInfoData = EntityBaseInfoData & {
    guid?: string;
    isCurrentVersion?: boolean;
    versionId?: number;
    parentKey?: EntityKeyData;
    name?: string;
};
export declare type EntityReferenceInfoData = EntityBaseInfoData & {
    hasMoreReferences?: boolean;
    typeId?: string;
};
export declare type EntityVersionInfoData = {
    createdIn: string;
    currentIn: string;
    name: string;
    revision: number;
    revisionDate: string;
    user: string;
};
export declare type KBObjectInfoData = EntityInfoData & {
    qualifiedName: string;
    hasChildren: boolean;
    modulePath: EntityKeyData[];
    isInterface: boolean;
    properties: KeyValueData[];
    typeName: string;
};
export declare type EntityInfoStatusData = EntityInfoData & {
    output: OutputMessageData[];
};
export declare type OutputMessageData = {
    text: string;
    level: MessageLevel;
};
export declare type EntityData = EntityInfoData & {
    properties?: PropertiesObjectData;
};
export declare type KBObjectPartData = {
    type: string;
    isDefault?: boolean;
    properties?: PropertiesObjectData;
    content: any;
};
export declare type KBObjectHeaderData = EntityData & {
    sessionId: string;
};
export declare type KBObjectData = KBObjectHeaderData & {
    parts?: KBObjectPartData[];
};
export declare type KBObjectResultData = {
    errorMessages: string[] | undefined;
};
export declare type CreateKBObjectResultData = KBObjectResultData & {
    kbObjectData: KBObjectData | undefined;
};
export declare type DeleteKBObjectResultData = KBObjectResultData & {
    kbObjectInfoData: KBObjectInfoData | undefined;
};
export declare type TeamData = {
    id: string;
    name: string;
};
export declare type KBInfoData = {
    guid: string;
    name: string;
    autoOpen?: boolean;
};
export declare type KBModelPartData = {
    type: string;
    content: any;
};
export declare type KBModelData = {
    key: EntityKeyData;
    guid: string;
    isCurrentVersion: boolean;
    name: string;
    isTargetEnvironment: boolean;
    parts: KBModelPartData[];
    versionId: number;
};
export declare type KBData = {
    guid: string;
    name: string;
    designModelGuid: string;
    targetModelGuid: string;
    context: KBContextData;
    models: KBModelData[];
};
export declare type ResolveParametersData = {
    fromModuleKey: EntityKeyData;
    types: string[];
    name: string;
};
export declare type ResolveResultBaseData = {
    errorMessage: string;
};
export declare type ResolveResultData = ResolveResultBaseData & {
    matches: KBObjectInfoData[];
};
export declare type ResolveKeyResultData = ResolveResultBaseData & {
    matches: EntityKeyData[];
};
export declare type CreateKBCommonOptionsData = {
    name: string;
    template?: string;
    dataStore?: number;
    enableDeployToCloud?: boolean;
    frontendGenerators?: string[];
};
export declare type CreateKBOptionsData = CreateKBCommonOptionsData & {
    gxserverKBName?: string;
    guid?: Guid;
    gxserverUrl?: string;
    username?: string;
    password?: string;
    rememberToken?: boolean;
    language?: string;
};
export declare type CreateKBModelOptionsData = CreateKBCommonOptionsData & {
    setAsCurrent: boolean;
};
export declare type CreateKBResultData = {
    status: number;
    statusDescription: string;
    info: KBInfoData;
    data?: KBData;
};
export declare type CreateKBObjectData = {
    type: string;
    copyFrom?: string;
    name?: string;
    description?: string;
    parentGuid?: string;
    properties?: PropertyValueData[];
    parts?: KBObjectPartData[];
};
export declare type ModelSelectorInfoData = {
    id: number;
    name: string;
};
export declare type KBTemplateInfo = {
    code: string;
    name: string;
    description: string;
    isDefault: boolean;
    dataStores: number[];
    defaultFrontEndGenerator: string;
    generatorType: number;
};
export declare type FrontendGeneratorInfoData = {
    id: string;
    name: string;
};
export declare type BLServerInfoData = {
    status: string;
    id: string;
    location: string;
    kbTemplates: KBTemplateInfo[];
    dataStores: ModelSelectorInfoData[];
    deployToCloudDataStore: ModelSelectorInfoData;
    frontendGenerators: FrontendGeneratorInfoData[];
    languages: string[];
    options: KeyValueData[];
};
export declare type CommandData = {
    id: string;
    data?: string;
};
export declare type CommandResultData = {
    success: boolean;
    errorMessage: string;
    data?: string;
};
export declare type CommandListResultData = {
    success: boolean;
    errorMessage?: string;
    data: CommandListItemResultData[];
};
export declare type CommandListItemResultData = {
    index: number;
    data: string;
};
export declare type ValidationResultData = {
    isValid: boolean;
    message: string;
};
export declare type KBObjectTypeInfoData = {
    id: string;
    name?: string;
};
export declare type KBObjectFiltersData = {
    search?: string;
    pattern?: string;
    categoryIds?: number[];
    moduleIds?: number[];
    includeSubmodules?: boolean;
    folderIds?: number[];
    typeIds?: Guid[] | string[];
    typesInfo?: KBObjectTypeInfoData[];
    excludeReferencedModulesChildren?: boolean;
};
export declare type KBObjectInfoFiltersData = KBObjectFiltersData & {
    includeProperties?: string[];
    modifiedByUser?: string;
    modified?: number;
    modifiedDate?: string;
};
export declare type KBObjectInfoFindResultData = {
    objects: KBObjectInfoData[];
    truncated: boolean;
};
export declare type KBObjectFindResultData = {
    objects: KBObjectData[];
    truncated: boolean;
};
export declare type DescriptorsData = {
    kbObjectCategories: DescriptorData[];
    kbModelParts: DescriptorData[];
    kbObjects: KBObjectDescriptorData[];
    kbObjectParts: DescriptorData[];
};
export declare type DescriptorData = {
    id: string;
    name: string;
    description: string;
    helpString: string;
};
export declare type ShortObjectClassDescriptorData = {
    id: number;
};
export declare type KBObjectDescriptorData = DescriptorData & {
    categories: string[];
    isDerived: boolean;
    namespace: string;
    namespaceDescription: string;
    flags: number;
    moduleAssociation: number;
    parts: string[];
    shortObjectClass?: ShortObjectClassDescriptorData;
};
export declare type KBObjectPartChangedEventData = {
    objectGuid: string;
    partType: string;
};
export declare type ExportData = {
    fileName: string;
    objects: EntityKeyData[];
    options: PropertiesObjectData;
    exportKBProperties?: boolean;
    exportVersionProperties?: boolean;
    exportEnvironmentProperties?: boolean;
    exportAll: boolean;
};
export declare type ExportReferencesOptionsData = {
    keys: string[];
    dependencyType: number;
    references: number;
};
export declare type ExportInfoData = {
    name: string;
    type: string;
    typeName: string;
    guid: string;
    itemProperties: KeyValueData[];
};
export declare type ImportExportPropertiesData = {
    definition: PropertiesObjectDefinitionData;
    properties: PropertiesObjectData;
};
export declare type ModuleServerData = {
    id: string;
    type: ServerType;
    name: string;
    source: string;
    authenticated: boolean;
};
export declare enum ServerType {
    Directory = 0,
    Nexus = 1,
    NexusNuGet = 2,
    ModuleServer = 3
}
export declare type ModulePackageData = {
    id: string;
    currentVersionId?: string;
    versions: ModulePackageVersionData[];
};
export declare type ModulePackageVersionData = {
    author: string;
    dependencies: string[];
    description: string;
    licenseUrl: string;
    name: string;
    owner: string;
    platforms: string[];
    projectUrl: string;
    serverUrl: string;
    status: ModuleStatus;
    statusMessage: string;
    tags: string;
    version: string;
};
export declare enum ModuleStatus {
    Installed = 0,
    Outdated = 1,
    Incompatible = 2,
    None = 3,
    Null = 4,
    NotInstallable = 5
}
export declare type InstallModuleRequestData = {
    serverId: string;
    moduleId: string;
    moduleVersion: string;
    overwrite: boolean;
};
export declare type TaskProgressData = {
    id: string;
    message: string;
    progress: number;
    type: ProgressType;
};
export declare enum ProgressType {
    InProgress = 0,
    Success = 1,
    Error = 2
}
export declare type AuthenticationProviderInfoData = {
    readonly id: string;
    readonly name: string;
    readonly sessions: AuthenticationSessionData[];
};
export declare type AuthenticationAccountData = {
    readonly id: string;
    readonly name: string;
};
export declare type AuthenticationSessionOriginData = {
    readonly name: string;
    readonly uri: string;
};
export declare type AuthenticationSessionData = {
    readonly id: string;
    readonly account: AuthenticationAccountData;
    readonly origin: AuthenticationSessionOriginData | undefined;
    readonly scopes: string[] | undefined;
};
export declare type AuthenticationSessionsChangedEventArgsData = {
    readonly providers: AuthenticationProviderInfoData[];
};
export declare type MasterSessionData = {
    teamId: string;
};
export declare type ShareKBInfoData = {
    serverUrl: string;
    kbAlias: string;
    username: string;
    password: string;
    rememberToken: boolean;
    wwLock: boolean;
    allVersions: boolean;
};
export declare type TeamDevData = {
    serverUrl: string;
    authenticationType: string;
    username: string;
    password: string;
    rememberToken: boolean;
};
export declare type TeamDevKBData = TeamDevData & {
    kbGuid: string | undefined;
};
export declare type AccessTokenInfo = {
    accessToken: string;
    scope: string;
    userGuid: string;
    refreshToken: string;
    exitcode: string;
    errorMessage: string;
};
export declare type GeneXusServerInfoData = {
    isLinkedKB: boolean;
    IsLinkedVersion: boolean;
    serverURL: string;
    remoteKBName: string;
    remoteVersionName: string;
    lastFullUpdate: string;
    isLockKB: boolean;
};
export declare type NewKBInfoData = {
    name: string;
    description: string;
    publishUser: string;
    publishDate: string;
};
export declare type KBObjectsHistoryInfoData = {
    hasMoreItems: boolean;
    items: KBObjectHistoryInfoData[];
};
export declare type KBObjectHistoryInfoData = {
    lastChange: string;
    objectName: string;
    module: string;
    description: string;
    type: string;
    operation: string;
    key: EntityKeyData;
    userName: string;
    conflicted: UpdateConflict;
    versionDate: string;
    isIgnored: boolean;
    guid: string;
    lastSynchedVersion: number;
};
export declare type CheckLocalChanges = {
    selectedObjects: EntityKeyData[];
    alreadySelectedObjects: EntityKeyData[];
    isCheck: Boolean;
};
export declare type CommitInfoData = {
    comments: string;
    objectList: EntityKeyData[];
    isPartialCommit: Boolean;
};
export declare type TeamDevUpdateItemData = {
    guid: string;
    typeGuid: string;
    type: string;
    name: string;
    description: string;
    modifiedOn: string;
    status: string;
    action: string;
};
export declare type CheckRemoteChanges = {
    selectedObjects: string[];
    alreadySelectedObjects: string[];
    isCheck: Boolean;
};
export declare type UpdateInfoData = {
    objectList: string[];
    isPartialUpdate: boolean;
    lastFullUpdate: string;
};
export declare type KBVersionData = {
    guid: string;
    type: string;
    id: number;
    name: string;
    isTrunk: boolean;
    isFrozen: boolean;
    parentId: number;
};
export declare type KBVersionRevisionData = {
    guid: string;
    operation: string;
    comment: string;
    username: string;
    revisionId: number;
    commitDate: string;
    actions: RevisionActionData[];
};
export declare type RevisionActionData = {
    type: string;
    guid?: string;
    name?: string;
    key?: EntityKeyData;
    description?: string;
    username?: string;
    operation: string;
    timestamp?: string;
};
export declare type KBVersionActivityRevisionData = {
    opDate: string;
    actionList: RevisionActionData[];
};
export declare enum UpdateConflict {
    NONE = 0,
    MUST_OVERRITE = 1,
    WITH_AUTO_MERGE = 2
}

export declare type GXHttpCommLayerConnectionOptions = GXCommLayerConnectionOptions & {
    oauthVersion?: 1 | 2;
    clientId?: string;
    clientSecret?: string;
    grantType?: string;
    scope?: string;
    authenticationTypeName?: string;
};
export declare type HttpSessionData = {
    readonly accessToken: string;
    readonly provider?: string;
};
export interface ServerResult {
    readonly data: any;
    readonly httpResponse: any;
}
export interface HttpOptions {
    /**
     * A hash of HTTP headers to be sent.
     */
    headers: any;
    /**
     * If set will recursively follow redirects. Defaults to true.
     */
    followRedirects?: boolean;
    /**
     * Timeout value in milliseconds.
     */
    timeout?: number;
    body?: string | Blob;
    readResponse?: boolean;
}
export declare class GXHttpCommLayer implements IGXCommLayer {
    private _guid;
    private _status;
    private _provisioningUri;
    private _blServerInfo;
    private _sessionData;
    private _emitter;
    private _pendingRequests;
    private _sockets;
    private _pingTimerId;
    private _connectToBLServerPromise;
    private _connectToMainSocketPromise;
    private _tryRestoreConnectionPromise;
    constructor();
    get guid(): Guid;
    protected get guidStr(): string;
    get blServerInfo(): BLServerInfoData;
    connect(provisioningUri: string, options: GXCommLayerConnectionOptions): Promise<void>;
    private _getSessionData;
    private _connectWithUser;
    tryRestoreConnection(): Promise<void>;
    disconnect(): Promise<void>;
    get isConnected(): boolean;
    get name(): string;
    get provisioningUri(): string;
    get sessionData(): HttpSessionData | undefined;
    get session(): string | undefined;
    get status(): GXCommLayerStatus;
    beforeConnect(callback: () => void): Disposable;
    afterConnect(callback: () => void): Disposable;
    beforeDisconnect(callback: () => void): Disposable;
    afterDisconnect(callback: () => void): Disposable;
    connectionInterrupted(callback: () => void): Disposable;
    connectionRestored(callback: () => void): Disposable;
    startingBLServer(callback: () => void): Disposable;
    private _getBLServerInfo;
    private _getConnectionErrorMessage;
    private _getUserConnectionData;
    private _connectToBLServer;
    private _tryReconnectToMainSocket;
    private _startBLServer;
    private _connectMainSocket;
    private _isBLServerRunning;
    private _subscribeToEvents;
    createHttpOptions(): HttpOptions;
    createHttpHeaders(): any;
    httpGet(uri: string, options?: HttpOptions): Promise<ServerResult>;
    httpPutJson(uri: string, data: any, options?: HttpOptions): Promise<ServerResult>;
    httpPost(uri: string, options?: HttpOptions): Promise<ServerResult>;
    httpPostJson(uri: string, data: any, options?: HttpOptions): Promise<ServerResult>;
    httpDelete(uri: string, options?: HttpOptions): Promise<ServerResult>;
    http(uri: string, method: string, options?: HttpOptions): Promise<ServerResult>;
    uploadFile(uri: string, file: File, options?: HttpOptions, progressCallback?: (percentage: number) => void): CancelablePromise<ServerResult>;
    private _abortPendingRestRequests;
    openSocket(id: string): void;
    isSocketOpen(id: string): boolean;
    sendMainSocketMessage(message: any): void;
    sendSocketMessage(id: string, message: any): void;
    closeSocket(id: string): void;
    closeAllSockets(): void;
    socketOpened(id: string, callback: (event: Event) => void): Disposable;
    mainSocketOpened(callback: (event: Event) => void): Disposable;
    socketClosed(id: string, callback: (event: CloseEvent) => void): Disposable;
    mainSocketClosed(callback: (event: CloseEvent) => void): Disposable;
    socketError(id: string, callback: (event: ErrorEvent) => void): Disposable;
    mainSocketError(callback: (event: ErrorEvent) => void): Disposable;
    socketMessage(id: string, callback: (data: any) => void): Disposable;
    mainSocketMessage(callback: (data: any) => void): Disposable;
    private _attachInternalSocketListeners;
    private _onSocketClosed;
    private _getSocketEventId;
    private _getSocket;
    private _createSocket;
    private _closeSocket;
    private _startPingTimer;
    private _stopPingTimer;
    private _getSocketUri;
}
