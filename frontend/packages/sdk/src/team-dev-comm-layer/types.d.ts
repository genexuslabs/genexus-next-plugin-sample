import { Guid, MaybeArray, MaybePromise } from '../common' 
import { EntityKeyData, CreateKBResultData, CreateKBOptionsData, KBObjectData, ShareKBInfoData, GeneXusServerInfoData, KBObjectsHistoryInfoData, CommitInfoData, TeamDevUpdateItemData, UpdateInfoData, KBVersionData, KBVersionActivityRevisionData, KBVersionRevisionData, CheckLocalChanges, CheckRemoteChanges, TeamDevData, TeamDevKBData, AccessTokenInfo, NewKBInfoData, IGXCommLayer } from '../common-comm-layer' 

export interface ITeamDevClientService {
    shareKBwithGXserver(kbGuid: string, publishKBData: ShareKBInfoData): MaybePromise<void>;
    checkoutKBFromServer(options: CreateKBOptionsData): MaybePromise<CreateKBResultData>;
    getGXServerToken(serverInfo: TeamDevKBData): MaybePromise<AccessTokenInfo>;
    getVersionInfo(kbGuid: string, modelGuid: Guid | string): MaybePromise<GeneXusServerInfoData>;
    getHostedKBs(serverInfo: TeamDevData): MaybePromise<NewKBInfoData[]>;
    getLocalChanges(kbGuid: string, modelGuid: Guid | string, properties: string): MaybePromise<KBObjectsHistoryInfoData>;
    checkLocalChangesReferences(kbGuid: string, modelGuid: Guid | string, localStatus: CheckLocalChanges): MaybePromise<EntityKeyData[]>;
    ignoreForCommit(kbGuid: string, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<void>;
    enableForCommit(kbGuid: string, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<void>;
    markAsResolved(kbGuid: string, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<boolean>;
    revertLocalchanges(kbGuid: string, modelGuid: Guid | string, entityKeys: EntityKeyData[]): MaybePromise<boolean>;
    commitLocalChanges(kbGuid: string, modelGuid: Guid | string, commitInfoData: CommitInfoData): MaybePromise<void>;
    getChangeSets(kbGuid: string, modelGuid: Guid | string): MaybePromise<string[]>;
    getRemoteChanges(kbGuid: string, modelGuid: Guid | string, properties: string): MaybePromise<TeamDevUpdateItemData[]>;
    checkRemoteChangesReferences(kbGuid: string, modelGuid: Guid | string, localStatus: CheckRemoteChanges): MaybePromise<string[]>;
    getIgnoredRemoteChanges(kbGuid: string, modelGuid: Guid | string): MaybePromise<TeamDevUpdateItemData[]>;
    ignoreForUpdate(kbGuid: string, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    enableForUpdate(kbGuid: string, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    update(kbGuid: string, modelGuid: Guid | string, updateInfoData: UpdateInfoData): MaybePromise<void>;
    getChangePreview(kbGuid: string, modelGuid: Guid | string, objectGuid: string): MaybePromise<KBObjectData>;
    getAllVersions(kbGuid: string): MaybePromise<KBVersionData[]>;
    getVersionRevisions(kbGuid: string, modelGuid: Guid | string, versionGuid: Guid | string, properties: string): MaybePromise<KBVersionRevisionData[]>;
    getLocalActivity(kbGuid: string, modelGuid: Guid | string, properties: string): MaybePromise<KBVersionActivityRevisionData[]>;
    getServerToken(serverCredentials: any): MaybePromise<any>;
    getCredentials(kbGuid: string): MaybeArray<any>;
    setCredentials(kbGuid: string, credentials: any): MaybePromise<void>;
    disconnectKB(kbGuid: string): MaybePromise<void>;
    getServersInfo(): MaybePromise<any>;
    getVersionRevisionObjects(kbGuid: string, modelGuid: Guid | string, verGiud: Guid | string, arrayRguid: any): MaybePromise<any>;
    merge(kbGuid: string, modelGuid: Guid | string, mergeInfoData: any): MaybePromise<boolean>;
}

export declare class Services {
    private _services;
    static createInstance(commLayer: IGXCommLayer): Services;
    private constructor();
    get teamDevClient(): ITeamDevClientService;
}

export {};
