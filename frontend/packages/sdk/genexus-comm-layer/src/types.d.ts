import { IGXCommLayer, KeyValueData, KBObjectData, KBObjectInfoData, KBObjectInfoFiltersData } from '@genexusm-sdk/common-comm-layer' 
import { MaybePromise } from '@genexusm-sdk/common' 

export declare class Services {
    build: IBuildCommService;
    designSystem: IDesignSystemCommService;
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
    createDatabase(servicesUrl: string, kbId: string): MaybePromise<void>;
    impactDatabase(servicesUrl: string, kbId: string): MaybePromise<void>;
    getBuildState(servicesUrl: string, kbId: string): MaybePromise<number>;
    build(servicesUrl: string, kbId: string, options: BuildOptionsData): MaybePromise<void>;
    buildBPDiagram(servicesUrl: string, kbId: string, guid: string, rebuild: boolean): MaybePromise<void>;
    prepareWFEnvironment(servicesUrl: string, kbId: string, guid: string): MaybePromise<string>;
    cancelBuild(servicesUrl: string, kbId: string): MaybePromise<void>;
    executeReorg(servicesUrl: string, kbId: string): MaybePromise<void>;
    cancelReorg(servicesUrl: string, kbId: string): MaybePromise<void>;
    getNavigation(servicesUrl: string, kbId: string, file: string): MaybePromise<string>;
}

export interface IDesignSystemCommService {
    getDesignSystemObjectReferences(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<string>;
}

export interface IGAMCommService {
    getInstallationSettings(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<GAMInstallationSettings>;
    setInstallationSettings(servicesUrl: string, kbId: string, modelGuid: string, forceInstall: boolean, settings: GAMInstallationSettings): MaybePromise<boolean>;
}

export interface IImagesCommService {
    getAll(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<ImageInfoData[]>;
    getFilterValues(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<ImageFilterValues>;
    searchImages(servicesUrl: string, kbId: string, modelGuid: string, imagesFilter: ImagesFilterData): MaybePromise<ImageInfoData[]>;
}

export interface IInspectorsCommService {
    sketchImport(servicesUrl: string, kbId: string, modelGuid: string, data: SketchImportData): MaybePromise<void>;
    sketchInspect(servicesUrl: string, kbId: string, modelGuid: string, data: SketchInspectOptionsData): MaybePromise<SketchInspectionData>;
}

export interface ILanguageCommService {
    getGXDataTypes(servicesUrl: string, kbId: string, path: string, propertyName: string, includeDomains: boolean): MaybePromise<GXDataTypeCategoryData[]>;
    resolveGXDataTypeProperties(servicesUrl: string, kbId: string, path: string, propertyName: string, dataType: string, includeDomains: boolean): MaybePromise<KeyValueData[]>;
    searchGXDataTypes(servicesUrl: string, kbId: string, filter: GXDataTypesFilterData): MaybePromise<string[]>;
    getIntellisenseChoices(servicesUrl: string, kbId: string, contextData: IntellisenseContextData): MaybePromise<IntellisenseChoiceData[]>;
    getStructItemIntellisenseChoices(servicesUrl: string, kbId: string, modelGuid: string, type: string, baseName: string): MaybePromise<StructItemIntellisenseChoiceData[]>;
    getAttributesAndVariables(servicesUrl: string, kbId: string, selector: AttributeVariableSelectorData): MaybePromise<AttributeVariableData[]>;
    getSDMenuActionCode(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<string>;
    getStructureLevelsInfo(servicesUrl: string, kbId: string, modelGuid: string, guid: string): MaybePromise<StructureLevel>;
}

export interface ILayoutCommService {
    getLabelCaption(servicesUrl: string, kbId: string, modelGuid: string, guid: string, labelCaption: string): MaybePromise<string>;
}

export interface ILaunchpadCommService {
    getData(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<string>;
}

export interface ILocalizationCommService {
    getLocalizationDefinitions(servicesUrl: string): MaybePromise<string[]>;
    importTemplate(servicesUrl: string, kbId: string, languageName: string): MaybePromise<void>;
}

export interface IPatternsCommService {
    getPatternDefinitions(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<PatternDefinitionData[]>;
    getPatternSettings(servicesUrl: string, kbId: string, modelGuid: string, patternId: string): MaybePromise<KBObjectData>;
}

export interface IUserControlsCommService {
    getControlDefinitions(servicesUrl: string, kbId: string, modelGuid: string): MaybePromise<UserControlDefinitionData[]>;
    getControlDefinition(servicesUrl: string, kbId: string, modelGuid: string, userControlName: string): MaybePromise<UserControlDefinitionData>;
    getControlContent(servicesUrl: string, kbId: string, modelGuid: string, userControlName: string): MaybePromise<string>;
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
export declare type SketchImportData = {
    fileId: string;
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
    theme: string;
};
export declare type SketchInspectOptionsData = {
    fileId: string;
    styleName: string;
    importAsWebPanels: boolean;
    importAsDesignSystem: boolean;
};
export declare type SketchPanelItemData = {
    Key: string;
    Value: SketchPanelData;
};
export declare type SketchImageItemData = {
    Key: string;
    Value: string;
};
export declare type SketchDesignSystemItemData = {
    Key: string;
    Value: SketchDesignSystemData;
};
export declare type SketchThemeItemData = {
    Key: string;
    Value: SketchThemeData;
};
export declare type SketchControlItemData = {
    Key: string;
    Value: SketchControlData;
};
export declare type SketchColorItemData = {
    Key: string;
    Value: string;
};
export declare type SketchFontItemData = {
    Key: string;
    Value: string;
};
export declare type SketchClassesItemData = {
    Key: string;
    Value: SketchClassData;
};
export declare type SketchInspectionData = {
    panels: SketchPanelItemData[];
    stencils: SketchPanelItemData[];
    images: SketchImageItemData[];
    designSystem: SketchDesignSystemItemData[];
    theme: SketchThemeItemData[];
};
export declare type SketchPanelData = {
    preview: string;
    code: string;
    controls: SketchControlItemData[];
    children: SketchPanelItemData[];
};
export declare type SketchControlData = {
    type: string;
    controls: SketchControlItemData[];
};
export declare type SketchDesignSystemData = {
    tokens: string;
    styles: string;
};
export declare type SketchThemeData = {
    colors: SketchColorItemData[];
    fonts: SketchFontItemData[];
    classes: SketchClassesItemData[];
};
export declare type SketchClassData = {
    code: string;
    classes: SketchClassesItemData[];
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
