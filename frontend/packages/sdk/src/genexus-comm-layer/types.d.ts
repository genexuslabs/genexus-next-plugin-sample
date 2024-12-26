import { IGXCommLayer, KeyValueData, KBObjectData, KBObjectInfoData, KBObjectInfoFiltersData } from '../common-comm-layer' 
import { MaybePromise, AnyObject } from '../common' 

export declare class Services {
    build: IBuildCommService;
    dataStores: IDataStoresCommService;
    designSystem: IDesignSystemCommService;
    documentation: IDocumentationCommService;
    gam: IGAMCommService;
    images: IImagesCommService;
    inspectors: IInspectorsCommService;
    language: ILanguageCommService;
    layout: ILayoutCommService;
    launchpad: ILaunchpadCommService;
    localization: ILocalizationCommService;
    patterns: IPatternsCommService;
    tables: ITablesCommService;
    userControls: IUserControlsCommService;
    static createInstance(commLayer: IGXCommLayer): Services;
    private constructor();
}

export interface IBuildCommService {
    createDatabase(kbGuid: string): MaybePromise<void>;
    impactDatabase(kbGuid: string): MaybePromise<void>;
    getBuildState(kbGuid: string): MaybePromise<number>;
    build(kbGuid: string, options: BuildOptionsData): MaybePromise<void>;
    buildBPDiagram(kbGuid: string, guid: string, rebuild: boolean): MaybePromise<void>;
    prepareWFEnvironment(kbGuid: string, guid: string): MaybePromise<string>;
    cancelBuild(kbGuid: string): MaybePromise<void>;
    executeReorg(kbGuid: string): MaybePromise<void>;
    cancelReorg(kbGuid: string): MaybePromise<void>;
    getNavigation(kbGuid: string, file: string): MaybePromise<string>;
}

export interface IDataStoresCommService {
    getDataStores(): MaybePromise<DataStoreData[]>;
}

export interface IDesignSystemCommService {
    getDesignSystemObjectReferences(kbGuid: string, modelGuid: string, guid: string): MaybePromise<string>;
}

export interface IGAMCommService {
    getInstallationSettings(kbGuid: string, modelGuid: string): MaybePromise<GAMInstallationSettings>;
    setInstallationSettings(kbGuid: string, modelGuid: string, forceInstall: boolean, settings: GAMInstallationSettings): MaybePromise<boolean>;
}

export interface IImagesCommService {
    getAll(kbGuid: string, modelGuid: string): MaybePromise<ImageInfoData[]>;
    getFilterValues(kbGuid: string, modelGuid: string): MaybePromise<ImageFilterValues>;
    searchImages(kbGuid: string, modelGuid: string, imagesFilter: ImagesFilterData): MaybePromise<ImageInfoData[]>;
}

export interface IInspectorsCommService {
    designImport(kbGuid: string, modelGuid: string, data: DesignImportData): MaybePromise<void>;
    designInspect(kbGuid: string, modelGuid: string, data: DesignInspectOptionsData): MaybePromise<DesignInspectionData>;
}

export interface ILanguageCommService {
    getGXDataTypes(kbGuid: string, path: string, propertyName: string, includeDomains: boolean): MaybePromise<GXDataTypeCategoryData[]>;
    resolveGXDataTypeProperties(kbGuid: string, path: string, propertyName: string, dataType: string, includeDomains: boolean): MaybePromise<KeyValueData[]>;
    searchGXDataTypes(kbGuid: string, filter: GXDataTypesFilterData): MaybePromise<string[]>;
    getIntellisenseChoices(kbGuid: string, contextData: IntellisenseContextData): MaybePromise<IntellisenseChoiceData[]>;
    getStructItemIntellisenseChoices(kbGuid: string, modelGuid: string, type: string, baseName: string): MaybePromise<StructItemIntellisenseChoiceData[]>;
    getAttributesAndVariables(kbGuid: string, selector: AttributeVariableSelectorData): MaybePromise<AttributeVariableData[]>;
    getSDMenuActionCode(kbGuid: string, modelGuid: string, guid: string): MaybePromise<string>;
    getStructureLevelsInfo(kbGuid: string, modelGuid: string, guid: string): MaybePromise<StructureLevel>;
}

export interface ILayoutCommService {
    getLabelCaption(kbGuid: string, modelGuid: string, guid: string, labelCaption: string): MaybePromise<string>;
}

export interface ILaunchpadCommService {
    getData(kbGuid: string, modelGuid: string): MaybePromise<string>;
}

export interface ILocalizationCommService {
    getLocalizationDefinitions(): MaybePromise<string[]>;
    importTemplate(kbGuid: string, languageName: string): MaybePromise<void>;
}

export interface IPatternsCommService {
    getPatternDefinitions(kbGuid: string, modelGuid: string): MaybePromise<PatternDefinitionData[]>;
    getPatternSettings(kbGuid: string, modelGuid: string, patternId: string): MaybePromise<KBObjectData>;
}

export interface IUserControlsCommService {
    getControlDefinitions(kbGuid: string, modelGuid: string): MaybePromise<UserControlDefinitionData[]>;
    getControlDefinition(kbGuid: string, modelGuid: string, userControlName: string): MaybePromise<UserControlDefinitionData>;
    getControlContent(kbGuid: string, modelGuid: string, userControlName: string): MaybePromise<string>;
}

export declare type GeneratorData = {
    id: number;
    name: string;
    generatorType: number;
    enablePropertyName: string;
    isExtension: boolean;
    isDefaultFrontend: boolean;
};
export declare type DataStoreData = {
    id: number;
    name: string;
    dbms: number;
};
export declare type DeploymentUnitData = {
    id: string;
    name: string;
};
export declare type AttributeVariableSelectorData = {
    path: string;
    pattern?: string;
    objectGuid?: string;
};
export declare type AttributeVariableData = {
    name: string;
    description: string;
    isCollection: boolean;
    isStructuredDataType: boolean;
    type: string;
    typedObjectKey: string;
    typedObjectBaseType: string;
};
export declare type StructureMember = {
    displayName: string;
    name: string;
    type: string;
    description: string;
    isCollection: boolean;
};
export declare type StructureLevel = {
    name: string;
    levels: StructureLevel[];
    members: StructureMember[];
    isCollection: boolean;
};
export declare type ImageInfoData = KBObjectInfoData & {
    lastUpdate: string;
    items: string[];
    user: string;
};
export declare type ImageFilterValue = {
    key: string;
    value: string;
};
export declare type ImageFilterValues = {
    densities: ImageFilterValue[];
    layers: ImageFilterValue[];
};
export declare type ImagesFilterData = KBObjectInfoFiltersData & {
    searchContents?: string;
    style?: string;
    language?: string;
    density?: string;
    layer?: string;
};
export declare type UserControlDefinitionData = {
    name: string;
    description: string;
    id: string;
    type: string;
    categories: string[];
    platforms: string[];
    inludeInControlInfo: boolean;
    isContainer: boolean;
    slots: string[];
    events: string[] | null;
};
export declare type DesignImportData = {
    fileId: string;
    fileSettings: DesignFileSettings;
    artboards: string[];
    stencils: string[];
    images: string[];
    fonts: string[];
    createMenu: boolean;
    createPalette: boolean;
    relativeLayouts: boolean;
    createPanelsAsStencils: boolean;
    createImportForWeb: boolean;
    createDesignSystem: boolean;
    style: string;
};
export declare type DesignCodeData = {
    layout: string;
    source: string;
};
export declare type DesignPanelData = {
    preview: string;
    code: DesignCodeData;
    controls: DesignControlItemData;
    children: DesignPanelsData;
};
export declare type DesignSystemData = {
    tokens: string;
    styles: string;
};
export declare type DesignClassData = {
    code: string;
    classes: DesignClassesItemData;
};
export declare type DesignItemData = {
    id: string;
    value: string;
};
export declare type DesignControlData = {
    type: string;
    controls: DesignControlItemData[];
};
export declare type DesignPanelsData = AnyObject<DesignPanelData>;
export declare type DesignImageItemData = AnyObject<DesignItemData>;
export declare type DesignDesignSystemItemData = AnyObject<DesignSystemData>;
export declare type DesignControlItemData = AnyObject<DesignControlData>;
export declare type DesignColorItemData = AnyObject<string>;
export declare type DesignFontItemData = AnyObject<string>;
export declare type DesignClassesItemData = AnyObject<DesignClassData>;
export declare type DesignFontData = AnyObject<DesignItemData>;
export declare type DesignErrorData = {
    message: string;
    detail: string;
};
export declare type DesignFileSettings = {
    Key: string;
    Value: string;
}[];
export declare type DesignInspectionData = {
    panels: DesignPanelsData;
    stencils: DesignPanelsData;
    images: DesignImageItemData;
    fonts: DesignFontData;
    designSystem: DesignDesignSystemItemData;
    error: DesignErrorData;
};
export declare type DesignInspectOptionsData = {
    fileId: string;
    fileSettings: DesignFileSettings;
    styleName: string;
    importAsWebPanels: boolean;
    importAsDesignSystem: boolean;
};
export declare type IntellisenseContextData = {
    path: string;
    text: string;
    languageType?: string;
    propertyName?: string;
};
export declare type IntellisenseChoiceData = {
    name: string;
    text: string;
    type: number;
    description: string;
};
export declare type StructItemIntellisenseChoiceData = {
    type: string;
    text: string;
};
export declare type GXDataTypeCategoryData = {
    id: string;
    name: string;
    types: string[];
};
export declare type GXDataTypesFilterData = {
    includeDomains: boolean;
    path: string;
    propertyName: string;
    prefix: string;
};
export declare type PatternDefinitionData = {
    publisher: string;
    id: string;
    category: string;
    name: string;
    description: string;
    defaultName: string;
    version: string;
    parentTypes: string[];
    standalone: boolean;
    settingsSpecification: PatternSpecificationRootData;
    instanceSpecification: PatternSpecificationRootData;
};
export declare type PatternSpecificationChildData = {
    name: string;
    type: string;
    description: string;
    multiple: boolean;
    optional: boolean;
};
export declare type PatternSpecificationRootData = {
    name: string;
    version: string;
    rootTypeName: string;
    isEmpty: boolean;
    types: PatternSpecificationTypeData[];
};
export declare type SpecificationTypeInitializationData = {
    type: string;
    referenceProperty: string;
    propertyValues: string;
};
export declare type PatternSpecificationAttributeData = {
    name: string;
    exportable: boolean;
};
export declare type PatternSpecificationTypeData = {
    name: string;
    keyAttributeName: string;
    initialization: SpecificationTypeInitializationData[];
    attributes: PatternSpecificationAttributeData[];
    childrenType: number;
    children: PatternSpecificationChildData[];
};
export declare type BuildOptionsData = {
    build: boolean;
    execute: boolean;
    forced: boolean;
    objectGuid: string;
};
export declare type DesignSystemReferences = {
    [className: string]: DesignSystemReference[];
};
export declare type DesignSystemReference = {
    name: string;
    guid: string;
    type: string;
    typeName: string;
};
export declare enum GAMUpdateMode {
    Never = 0,
    Always = 1,
    Prompt = 2
}
export declare type GAMInstallationSettings = {
    includeWebPanels: boolean;
    includePanels: boolean;
    updateMode: GAMUpdateMode;
};
