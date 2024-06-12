import { Guid, MaybeArray, MaybePromise } from '@genexusm-sdk/common' 
import { KBConnectionInfoData, EntityKeyData, CreateKBResultData, CreateKBOptionsData, KBObjectData, ShareKBInfoData, GeneXusServerInfoData, KBObjectsHistoryInfoData, CommitInfoData, TeamDevUpdateItemData, UpdateInfoData, KBVersionData, KBVersionActivityRevisionData, KBVersionRevisionData, CheckLocalChanges, CheckRemoteChanges, TeamDevData, TeamDevKBData, AccessTokenInfo, NewKBInfoData, IGXCommLayer } from '@genexusm-sdk/common-comm-layer' 

export interface ITeamDevClientService {
    shareKBwithGXserver(connInfo: KBConnectionInfoData, publishKBData: ShareKBInfoData): MaybePromise<void>;
    checkoutKBFromServer(options: CreateKBOptionsData): MaybePromise<CreateKBResultData>;
    getGXServerToken(location: string, serverInfo: TeamDevKBData): MaybePromise<AccessTokenInfo>;
    getVersionInfo(connInfo: KBConnectionInfoData, modelGuid: Guid | string): MaybePromise<GeneXusServerInfoData>;
    getHostedKBs(location: string, serverInfo: TeamDevData): MaybePromise<NewKBInfoData[]>;
    getLocalChanges(connInfo: KBConnectionInfoData, modelGuid: Guid | string, properties: string): MaybePromise<KBObjectsHistoryInfoData>;
    checkLocalChangesReferences(connInfo: KBConnectionInfoData, modelGuid: Guid | string, localStatus: CheckLocalChanges): MaybePromise<EntityKeyData[]>;
    ignoreForCommit(connInfo: KBConnectionInfoData, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<void>;
    enableForCommit(connInfo: KBConnectionInfoData, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<void>;
    markAsResolved(connInfo: KBConnectionInfoData, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<boolean>;
    revertLocalchanges(connInfo: KBConnectionInfoData, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<boolean>;
    commitLocalChanges(connInfo: KBConnectionInfoData, modelGuid: Guid | string, commitInfoData: CommitInfoData): MaybePromise<void>;
    getChangeSets(connInfo: KBConnectionInfoData, modelGuid: Guid | string): MaybePromise<string[]>;
    getRemoteChanges(connInfo: KBConnectionInfoData, modelGuid: Guid | string, properties: string): MaybePromise<TeamDevUpdateItemData[]>;
    checkRemoteChangesReferences(connInfo: KBConnectionInfoData, modelGuid: Guid | string, localStatus: CheckRemoteChanges): MaybePromise<string[]>;
    getIgnoredRemoteChanges(connInfo: KBConnectionInfoData, modelGuid: Guid | string): MaybePromise<TeamDevUpdateItemData[]>;
    ignoreForUpdate(connInfo: KBConnectionInfoData, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    enableForUpdate(connInfo: KBConnectionInfoData, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    update(connInfo: KBConnectionInfoData, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    getChangePreview(connInfo: KBConnectionInfoData, modelGuid: Guid | string, objectGuid: string): MaybePromise<KBObjectData>;
    getAllVersions(connInfo: KBConnectionInfoData): MaybePromise<KBVersionData[]>;
    getVersionRevisions(connInfo: KBConnectionInfoData, modelGuid: Guid | string, versionGuid: Guid | string, properties: string): MaybePromise<KBVersionRevisionData[]>;
    getLocalActivity(connInfo: KBConnectionInfoData, modelGuid: Guid | string, properties: string): MaybePromise<KBVersionActivityRevisionData[]>;
    getServerToken(serverCredentials: any): MaybePromise<any>;
    getCredentials(connInfo: KBConnectionInfoData): MaybeArray<any>;
    setCredentials(connInfo: KBConnectionInfoData, credentials: any): MaybePromise<void>;
    disconnectKB(connInfo: KBConnectionInfoData): MaybePromise<void>;
    getServersInfo(): MaybePromise<any>;
    getVersionRevisionObjects(connInfo: KBConnectionInfoData, modelGuid: Guid | string, verGiud: Guid | string, arrayRguid: any): MaybePromise<any>;
    merge(connInfo: KBConnectionInfoData, modelGuid: Guid | string, mergeInfoData: any): MaybePromise<boolean>;
}

export declare class Services {
    private _services;
    static createInstante(commLayer: IGXCommLayer): Services;
    private constructor();
    get teamDevClient(): ITeamDevClientService;
}

export {};
