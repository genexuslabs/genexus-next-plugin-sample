import { MaybePromise, Emitter, CompositeDisposable, AnyObject, Disposable, IDisposable } from '../common' 

export class CompositeResolver implements IDefaultResolver, IApplyResolver, IVisibleResolver, IValidResolver, IValuesResolver, IReadOnlyResolver, IAfterSetValueHandler {
    private _definition;
    private _propertyName;
    private _dependencies;
    private _defaultResolvers;
    private _applyResolvers;
    private _visibleResolvers;
    private _validResolvers;
    private _valuesResolvers;
    private _readOnlyResolvers;
    private _afterSetValueHandlers;
    /**
     *
     * @param {PropertyDefinition} definition
     */
    constructor(definition: PropertyDefinition);
    addDefaultResolver(resolver: IDefaultResolver): void;
    addApplyResolver(resolver: IApplyResolver): void;
    addVisibleResolver(resolver: IVisibleResolver): void;
    addValidResolver(resolver: IValidResolver): void;
    addValuesResolver(resolver: IValuesResolver): void;
    addReadOnlyResolver(resolver: IReadOnlyResolver): void;
    addAfterSetValueHandler(handler: IAfterSetValueHandler): void;
    private _addResolver;
    removeDefaultResolver(resolver: IDefaultResolver): void;
    removeApplyResolver(resolver: IApplyResolver): void;
    removeVisibleResolver(resolver: IVisibleResolver): void;
    removeValidResolver(resolver: IValidResolver): void;
    removeValuesResolver(resolver: IValuesResolver): void;
    removeReadOnlyResolver(resolver: IReadOnlyResolver): void;
    removeAfterSetValueHandler(handler: IAfterSetValueHandler): void;
    addDependency(propName: string | string[]): void;
    removeDependency(propName: string | string[]): void;
    private _addSingleDependency;
    private _removeSingleDependency;
    getDefaultValue(properties: PropertiesObject, definition: PropertyDefinition): Promise<any>;
    isReadOnly(properties: PropertiesObject): Promise<any>;
    isApplicable(properties: PropertiesObject): Promise<any>;
    isVisible(properties: PropertiesObject, definition: PropertyDefinition): Promise<any>;
    isValid(properties: PropertiesObject, value: any): Promise<any>;
    getValues(properties: PropertiesObject): Promise<any>;
    getValueFromName(properties: PropertiesObject, name: string): Promise<any>;
    getNameFromValue(properties: PropertiesObject, value: any): Promise<any>;
    getNonExclusiveValuesSupport(properties: PropertiesObject): Promise<any>;
    onAfterSetValueHandler(properties: PropertiesObject, e: PropertyValueChangedEventArgs): void;
    onAfterResetValueHandler(properties: PropertiesObject, e: PropertyValueChangedEventArgs): void;
    getDependencies(): string[];
    _evalResolvers(resolvers: any[], executor: (r: any) => any, postProcessor: (v: any[]) => any): Promise<any>;
}

export interface IAfterSetValueHandler {
    onAfterSetValueHandler(properties: PropertiesObject, args: PropertyValueChangedEventArgs): void;
    onAfterResetValueHandler(properties: PropertiesObject, args: PropertyValueChangedEventArgs): void;
}

export interface IApplyResolver {
    isApplicable(properties: PropertiesObject): MaybePromise<boolean>;
    getDependencies(): string[] | undefined;
}

export interface IPropertyDescriptor {
    readonly name: string;
    readonly isChild: boolean;
    readonly children: string[];
    readonly displayName: string;
    readonly description: string;
    readonly category: string | undefined;
    readonly type: string | (new (...args: any[]) => any);
    readonly typeConverter: TypeConverter | undefined;
    getEditor(): UITypeEditor | undefined;
    getUIValidator(): IUIValidator | undefined;
    isDefault(): MaybePromise<boolean>;
    isApplicable(): MaybePromise<boolean>;
    isReadOnly(): MaybePromise<boolean>;
    isVisible(): MaybePromise<boolean>;
    getValue(): MaybePromise<any>;
    setValue(value: any): MaybePromise<boolean>;
    resetValue(): MaybePromise<void>;
}

export interface IReadOnlyResolver {
    isReadOnly(properties: PropertiesObject): MaybePromise<boolean>;
    getDependencies(): string[] | undefined;
}

export interface IValidResolver {
    isValid(properties: PropertiesObject, value: any): MaybePromise<boolean>;
    getDependencies(): string[] | undefined;
}

export interface IValuesResolver {
    getValues(properties: PropertiesObject): MaybePromise<ValuesItem[]>;
    getValueFromName(properties: PropertiesObject, name: string): MaybePromise<any>;
    getNameFromValue(properties: PropertiesObject, value: any): MaybePromise<string>;
    getNonExclusiveValuesSupport(properties: PropertiesObject): MaybePromise<boolean>;
}

export interface IVisibleResolver {
    isVisible(properties: PropertiesObject, definition?: PropertyDefinition): MaybePromise<boolean>;
    getDependencies(): string[] | undefined;
}

export class LocalPropertyDescriptor implements IPropertyDescriptor {
    /**
     *
     * @param {PropertiesObject} propertiesObject
     * @param {PropertyDefinition} definition
     */
    constructor(propertiesObject: PropertiesObject, definition: PropertyDefinition);
    _propertiesObject: PropertiesObject;
    _definition: PropertyDefinition;
    _cache: Map<any, any>;
    /**
     *
     * @return {PropertiesObject}
     */
    get propertiesObject(): PropertiesObject;
    /**
     *
     * @return {PropertyDefinition}
     */
    get definition(): PropertyDefinition;
    get name(): any;
    get isChild(): boolean;
    get children(): never[];
    get displayName(): any;
    get description(): any;
    get category(): any;
    get type(): any;
    get typeConverter(): any;
    getEditor(): any;
    getUIValidator(): any;
    isDefault(): any;
    isReadOnly(): Promise<any>;
    isVisible(): Promise<any>;
    isApplicable(): boolean;
    getValue(): Promise<any>;
    setValue(value: any): Promise<boolean>;
    silentSetValue(value: any): Promise<boolean>;
    resetValue(): any;
    /**
     * @typedef {Object} CachedValue
     * @property {boolean} hasValue
     * @property {*} value
     */
    /**
     *
     * @param {string} key
     * @return {CachedValue}
     * @private
     */
    private _getCachedValue;
    /**
     *
     * @param {string} key
     * @param {*} value
     * @private
     */
    private _setCachedValue;
    /**
     *
     * @param {string} cacheKey
     * @param {function} executor
     * @return {Promise<*>}
     * @private
     */
    private _calculateValue;
}

export class LocalPropertyManager extends PropertyManager {
    private _store;
    private _typeDescriptors;
    constructor(object: PropertiesObject, definitions?: PropertyDefinitionCollection);
    getCachedPropertyDescriptors(): IPropertyDescriptor[];
    getPropertyDescriptors(): Promise<LocalPropertyDescriptor[]>;
    getPropertyDescriptorByName(name: string): Promise<LocalPropertyDescriptor | undefined>;
    private _getPropertyDescriptor;
    isPropertyDefault(name: string): Promise<boolean>;
    isPropertyReadOnly(name: string): Promise<boolean>;
    isPropertyVisible(name: string): Promise<boolean>;
    setPropertyValue(name: string, value: any): Promise<void>;
    silentSetPropertyValue(name: string, value: string): Promise<void>;
    getPropertyValue(name: string): Promise<any>;
    resetProperty(name: string): Promise<void>;
    reset(): Promise<void>;
    loadPropertiesDefinition(): MaybePromise<PropertyDefinitionCollection>;
    serializeProperties(destinationType?: string | (new () => IStringInitialize)): Promise<PropertiesObjectData>;
    deserializeProperties(data: PropertiesObjectData, sourceType?: string | (new () => IStringInitialize)): Promise<void>;
    invalidateDescriptors(): void;
}

export class PropertiesDefinition extends PropertyDefinitionCollection {
    constructor(objectClass: string, loader: PropertyDefinitionLoader);
}

export class PropertiesHelper {
    static getDescriptorSettings(descriptor: IPropertyDescriptor, symbol: Symbol): any;
}

export class PropertiesObject implements ICustomTypeDescriptor, INotifyPropertyValueChanged {
    private __isDisposed;
    private __disposables;
    private __emitter;
    private __owner;
    private __manager;
    constructor(options?: {
        owner?: any;
        definition?: PropertyDefinitionCollection;
    });
    getTypeInfo(): MaybePromise<CustomTypeDescriptorInfo>;
    getCachedPropertyDescriptors(): IPropertyDescriptor[];
    getPropertyDescriptors(): Promise<IPropertyDescriptor[]>;
    getPropertyDescriptorByName(name: string): Promise<IPropertyDescriptor | undefined>;
    getPropertyDescriptorByDisplayName(name: string): Promise<IPropertyDescriptor | undefined>;
    getPropertyDependants(name: string): Promise<string[]>;
    isPropertyDefault(name: string): Promise<boolean>;
    isPropertyReadOnly(name: string): Promise<boolean>;
    isPropertyVisible(name: string): Promise<boolean>;
    getPropertyValue(name: string): Promise<any>;
    getPropertyValues(names: string[]): Promise<AnyObject>;
    getStringPropertyValues(names: string[]): Promise<AnyObject>;
    getStringPropertyValue(name: string): Promise<string>;
    setPropertyValue(name: string, value: any): Promise<void>;
    silentSetPropertyValue(name: string, value: any): Promise<void>;
    invalidateDescriptors(): Promise<void>;
    setPropertyValues(values: PropertyValue[]): Promise<void>;
    silentSetPropertyValues(values: PropertyValue[]): Promise<void>;
    resetProperty(name: string): Promise<void>;
    reset(): Promise<void>;
    protected createPropertyManager(definition?: PropertyDefinitionCollection): PropertyManager;
    get owner(): any;
    /**
     *
     * For internal use only.
     */
    get manager(): PropertyManager;
    get emitter(): Emitter;
    get disposables(): CompositeDisposable;
    get isDisposed(): boolean;
    dispose(): Promise<void>;
    getDependants(propertyName: string): Promise<string[]>;
    containsPropertyDefinition(name: string): Promise<boolean>;
    getPropertiesDefinition(): Promise<PropertyDefinition[]>;
    getPropertyDefinition(name: string): Promise<PropertyDefinition | undefined>;
    getPropertyDefinitionByDisplayName(name: string): Promise<PropertyDefinition | undefined>;
    /**
     * @param destinationType = 'string' - If it is a constructor function, it must implement the IStringInitialize interface
     */
    serializeProperties(destinationType?: string | (new () => any)): MaybePromise<PropertiesObjectData>;
    deserializeProperties(data: PropertiesObjectData, sourceType?: string | (new () => any)): MaybePromise<void>;
    static getFrom(target: any): PropertiesObject | undefined;
    protected onBeforePropertyAccess(): MaybePromise<void>;
    protected onPropertyValueChanged(args: PropertyValueChangedEventArgs): MaybePromise<void>;
    propertyValueChanged(callback: ((args: PropertyValueChangedEventArgs) => MaybePromise<void>)): Disposable;
    protected onMissingPropertyDefinition(name: string): void;
    internalOnPropertyValueChanged(args: PropertyValueChangedEventArgs): Promise<void>;
    internalOnMissingPropertyDefinition(name: string): void;
    propertyHasDependant(callback: ((args: PropertyValueChangedEventArgs) => MaybePromise<void>)): Disposable;
    propertiesFullDependant(callback: () => void): Disposable;
    propertyValueError(callback: (args: PropertyValueErrorEventArgs) => void): Disposable;
    disposed(callback: () => void): Disposable;
}

export class PropertyAccessor {
    static getDescriptor(obj: Object, name: string): Promise<IPropertyDescriptor | undefined>;
    static setValue(obj: Object, name: string, value: any): Promise<boolean>;
    static setValueString(obj: Object, name: string, value: any): Promise<boolean>;
    static getValue(obj: Object, name: string): Promise<any>;
    static getValueString(obj: Object, name: string): Promise<string | undefined>;
}

export class PropertyDefinitionCollection {
    private _objectClass;
    private _definition;
    private _definitionsByName;
    private _definitionsByDisplayName;
    private _dependencies;
    constructor(objectClass?: string);
    get objectClass(): string | undefined;
    get count(): number;
    get nameOrder(): string[];
    contains(name: string): boolean;
    getAt(index: number): PropertyDefinition;
    getByName(name: string): PropertyDefinition | undefined;
    getByDisplayName(name: string): PropertyDefinition | undefined;
    add(definition: PropertyDefinition): void;
    addRange(definitions: PropertyDefinition[]): void;
    remove(definition: PropertyDefinition): number;
    insert(definition: PropertyDefinition, index: number): void;
    clear(): void;
    getAll(): PropertyDefinition[];
    getDependants(propertyName: string): string[];
    [Symbol.iterator](): {
        next(): IteratorResult<PropertyDefinition>;
    };
    private _initializeDefinitionsByDisplayName;
    private _setDependencies;
    private _removeDependencies;
    private static _getDisplayNameKey;
    private static _normalizeName;
}

export class PropertyDescriptorWrapper {
    private _baseDescriptor;
    constructor(baseDescriptor: IPropertyDescriptor);
    get name(): string;
    get displayName(): string;
    get description(): string;
    get category(): string | undefined;
    get type(): string | (new (...args: any[]) => any);
    get typeConverter(): TypeConverter | undefined;
    get isChild(): boolean;
    get children(): string[];
    getEditor(): UITypeEditor | undefined;
    getUIValidator(): import("./iui-validator").IUIValidator | undefined;
    isDefault(): MaybePromise<boolean>;
    isApplicable(): MaybePromise<boolean>;
    isReadOnly(): MaybePromise<boolean>;
    isVisible(): MaybePromise<boolean>;
    getValue(): any;
    setValue(value: any): MaybePromise<boolean>;
    resetValue(): MaybePromise<void>;
}

export abstract class PropertyManager implements INotifyPropertyValueChanged {
    private _propertiesObject;
    private _definition;
    private _emitter;
    private _dependantsSuspended;
    constructor(propertiesObject: PropertiesObject, definition?: PropertyDefinitionCollection);
    get owner(): any;
    getTypeInfo(): MaybePromise<CustomTypeDescriptorInfo>;
    get propertiesObject(): PropertiesObject;
    get emitter(): Emitter;
    protected get dependantsSuspended(): boolean;
    protected set dependantsSuspended(value: boolean);
    abstract getCachedPropertyDescriptors(): IPropertyDescriptor[];
    abstract getPropertyDescriptors(): MaybePromise<IPropertyDescriptor[]>;
    abstract getPropertyDescriptorByName(name: string): MaybePromise<IPropertyDescriptor | undefined>;
    abstract isPropertyDefault(name: string): MaybePromise<boolean>;
    abstract isPropertyReadOnly(name: string): MaybePromise<boolean>;
    abstract isPropertyVisible(name: string): MaybePromise<boolean>;
    reloadPropertyDefinitions(): void;
    getPropertiesDefinition(): Promise<PropertyDefinitionCollection>;
    getPropertyDefinitionByName(name: string): Promise<PropertyDefinition | undefined>;
    getPropertyDependants(name: string): Promise<string[]>;
    abstract setPropertyValue(name: string, value: any): MaybePromise<void>;
    setPropertyValues(values: PropertyValue[]): Promise<void>;
    silentSetPropertyValues(values: PropertyValue[]): Promise<void>;
    abstract silentSetPropertyValue(name: string, value: any): MaybePromise<void>;
    getPropertyValues(names: string[]): Promise<AnyObject>;
    abstract getPropertyValue(name: string): MaybePromise<any>;
    getStringPropertyValues(names: string[]): Promise<AnyObject>;
    getStringPropertyValue(name: string): Promise<string>;
    abstract resetProperty(name: string): MaybePromise<void>;
    abstract reset(): MaybePromise<void>;
    abstract invalidateDescriptors(): MaybePromise<void>;
    containsPropertyDefinition(name: string): Promise<boolean>;
    abstract loadPropertiesDefinition(): MaybePromise<PropertyDefinitionCollection>;
    /**
     * @param destinationType - If it is a constructor function, it must implement the IStringInitialize interface
     */
    abstract serializeProperties(destinationType: string | (new () => any)): MaybePromise<PropertiesObjectData>;
    abstract deserializeProperties(data: PropertiesObjectData, sourceType: string | (new () => any)): MaybePromise<void>;
    propertyValueChanged(callback: (args: PropertyValueErrorEventArgs) => void): Disposable;
    propertyHasDependant(callback: (args: PropertyValueErrorEventArgs) => void): Disposable;
    propertiesFullDependant(callback: () => void): Disposable;
    propertyValueError(callback: (args: PropertyValueErrorEventArgs) => void): Disposable;
    protected onMissingPropertyDefinition(name: string): void;
    protected onPropertyValueChanged(args: PropertyValueChangedEventArgs): Promise<void>;
    protected onPropertyValueError(args: PropertyValueErrorEventArgs): void;
    protected onPropertyHasDependant(args: PropertyValueChangedEventArgs): Promise<void>;
    onPropertyFullDependant(): Promise<void>;
}

export class PropertyStore {
    private _values;
    constructor();
    isPropertyDefault(name: string): boolean;
    getPropertyValue(name: string): any;
    setPropertyValue(name: string, value: any): void;
    setPropertyValues(values: PropertyValue[]): void;
    resetProperty(name: string): void;
    get properties(): PropertyValue[];
    reset(): void;
}

export class SourceCodeString extends StringStorage {
}

export class StringStorage implements IStringInitialize {
    private _data;
    constructor(data?: string);
    initialize(data: string): void;
    get data(): string;
    set data(value: string);
    toString(): string;
}

export class TypeConverter {
    canConvertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    canConvertFrom(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    convertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
        value: any;
    }): MaybePromise<any>;
    convertFrom(options: {
        context?: TypeDescriptorContext;
        value: any;
    }): MaybePromise<any>;
    getStandardValuesSupported(context: TypeDescriptorContext): boolean;
    getStandardValuesExclusive(context?: TypeDescriptorContext): boolean;
    getStandardValues(context?: TypeDescriptorContext): MaybePromise<any[]>;
}

export class TypeDescriptor {
    static getTypeName(target: Object): Promise<string | undefined>;
    static getDescription(target: Object): Promise<string | undefined>;
    static getIsReadOnly(target: Object): Promise<boolean>;
    static getProperties(target: Object): Promise<IPropertyDescriptor[]>;
    static getConverterForType(type: string | (new () => any)): TypeConverter | undefined;
    static getConverterForValue(value: any): TypeConverter | undefined;
    static getEditor(target: Object | (new () => any) | string): UITypeEditor | undefined;
    static getDescriptor(target: Object): ICustomTypeDescriptor | undefined;
}

export class TypeDescriptorContext {
    private _descriptor;
    private _instance;
    constructor(descriptor: IPropertyDescriptor, instance: any);
    get descriptor(): IPropertyDescriptor;
    get instance(): any;
}

export class ValuesItem {
    name: string;
    value: any;
    constructor(name: string, value: any);
}

export class Symbols {
    static get typeConverter(): symbol;
    static get typeEditor(): symbol;
    static get objectPropertyDefinition(): symbol;
    static get objectPropertyDefinitionNoCache(): symbol;
}

export class NotifyValueChangedHelper {
    static getFrom(target: Object): INotifyPropertyValueChanged | undefined;
}

export class BooleanConverter extends BuiltInTypeConverter {
    constructor();
    getStandardValuesSupported(context: TypeDescriptorContext): boolean;
    getStandardValuesExclusive(context: TypeDescriptorContext): boolean;
    getStandardValues(context: TypeDescriptorContext): Promise<boolean[]>;
}

export class BooleanObjectConverter extends BuiltInTypeConverter {
    constructor();
}

export abstract class BuiltInTypeConverter extends TypeConverter {
    private _type;
    private _parseFunc;
    private _toStringFunc;
    constructor(type: string | (new (...args: any[]) => any), parseFunc: (v: string) => MaybePromise<any>, toStringFunc: (v: any) => MaybePromise<string>);
    canConvertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    canConvertFrom(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    convertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
        value: any;
    }): any;
    convertFrom(options: {
        context?: TypeDescriptorContext;
        value: any;
    }): any;
}

export class DateConverter extends BuiltInTypeConverter {
    constructor();
}

export declare type FixedValueData = {
    id: any;
    text: string;
};
export class GenericFixedValuesConverter extends TypeConverter {
    private _valuesData;
    private _defaultValue;
    constructor(valuesData: FixedValueData[], defaultValueId: any);
    canConvertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    canConvertFrom(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    convertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
        value: any;
    }): Promise<string | StringStorage | undefined>;
    convertFrom(options: {
        context?: TypeDescriptorContext;
        value: any;
    }): Promise<any>;
    getStandardValuesSupported(context: TypeDescriptorContext): boolean;
    getStandardValuesExclusive(context: TypeDescriptorContext): boolean;
    getStandardValues(context: TypeDescriptorContext): Promise<any[]>;
    _getValueById(id: any): FixedValueData | undefined;
    _getValueByIdString(idStr: string): FixedValueData | undefined;
    _getValueByText(text: string): FixedValueData | undefined;
    _getTextById(id: any): string | undefined;
    _getIdByText(text: string): any;
    _normalizeText(text: string): string;
}

export class NumberConverter extends BuiltInTypeConverter {
    constructor();
}

export class NumberObjectConverter extends BuiltInTypeConverter {
    constructor();
}

export class StringConverter extends BuiltInTypeConverter {
    constructor();
    protected supportsSourceCodeString(context: TypeDescriptorContext): boolean;
    canConvertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    canConvertFrom(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
    }): boolean;
    convertTo(options: {
        context?: TypeDescriptorContext;
        type: string | (new () => any);
        value: any;
    }): any;
    convertFrom(options: {
        context?: TypeDescriptorContext;
        value: any;
    }): any;
    static _unEscape(str: string, delimiter: string): string;
    static _escape(str: string, delimiter?: string): string;
}

export class StringObjectConverter extends BuiltInTypeConverter {
    constructor();
}

export declare namespace Decorators {
    function typeConverter(value: string | Function): (target: any) => void;
    function typeEditor(value: String | Function): (target: any) => void;
    function objectPropertyDefinition(objectClass: string, loader: string | PropertyDefinitionLoader): (target: any) => void;
    function objectPropertyDefinitionNoCache(): (target: any) => void;
}

export declare type CustomTypeDescriptorInfo = {
    type: string;
    description: string;
    isReadOnly: boolean;
};
export interface ICustomTypeDescriptor {
    getTypeInfo(): MaybePromise<CustomTypeDescriptorInfo>;
    getPropertyDescriptors(): MaybePromise<IPropertyDescriptor[]>;
}
export declare namespace ICustomTypeDescriptor {
    function is(arg: object | undefined): arg is ICustomTypeDescriptor;
}

export declare type PropertyValueChangedEventHandler = ((args: PropertyValueChangedEventArgs) => MaybePromise<void>);
export interface INotifyPropertyValueChanged {
    propertyValueChanged(callback: PropertyValueChangedEventHandler): Disposable;
}
export declare namespace INotifyPropertyValueChanged {
    function is(arg: object | undefined): arg is INotifyPropertyValueChanged;
}

export interface IStringInitialize {
    initialize(value: string): void;
}
export declare namespace IStringInitialize {
    function is(arg: object | undefined): arg is IStringInitialize;
}

export declare type IUITypeEditorServiceDropDownOptions = {
    resizable?: boolean;
    width?: string | number;
    height?: string | number;
};
export interface IUITypeEditorService extends IDisposable {
    endEdit(cancel?: boolean): MaybePromise<void>;
    dropDown(content: any, options?: IUITypeEditorServiceDropDownOptions): void;
}

export declare type DefaultValue = {
    hasValue: boolean;
    value: any;
};
export interface IDefaultResolver {
    getDefaultValue(properties: PropertiesObject, definition?: PropertyDefinition): MaybePromise<DefaultValue>;
    getDependencies(): string[] | undefined;
}

export interface IUIValidator {
    validate(instance: any, name: string, value: any): MaybePromise<boolean>;
}

export declare namespace PropertyFlags {
    const FLAG_PREFIX = "Flag";
    const ONLY_DEFAULT = "OnlyDefault";
    const ONLY_DEFAULT_IF_READONLY = "IfReadonly";
    const ONLY_DEFAULT_IF_NOT_VISIBLE = "IfNotVisible";
    const STORE_VALUE_BY_USER = "StoreValueByUser";
    const DONT_USE_HTML_DEFAULT = "DontUseHtmlDefault";
    const NO_CACHE_DEFAULT = "NoCacheDefault";
    const NO_CACHE_DEFAULT_NEVER = "Never";
    const NO_CACHE_VALUE = "NoCacheValue";
    const OLD_ID = "OldId";
}

export declare type PropertyDefinitionSetting = {
    symbol: Symbol;
    value: any;
};
export declare type PropertyDefinitionOptions = {
    name: string;
    displayName?: string;
    description?: string;
    category?: string;
    defaultValue?: string;
    type: string | (new () => any);
    typeConverter?: string | Symbol | TypeConverterFactory;
    editor?: string | Symbol | UITypeEditorFactory;
    uiValidator?: string | Symbol | UIValidatorFactory;
    settings?: PropertyDefinitionSetting[];
};
export declare class PropertyDefinition {
    private _name;
    private _displayName?;
    private _description?;
    private _category?;
    private _defaultValue?;
    private _type;
    private _typeConverter?;
    private _editor?;
    private _uiValidator?;
    private _settings;
    private _resolvers;
    private _metaFlags;
    constructor(options: PropertyDefinitionOptions);
    get settings(): PropertyDefinitionSetting[];
    get name(): string;
    get displayName(): string | undefined;
    set displayName(value: string | undefined);
    get normalizedDisplayName(): string;
    get description(): string | undefined;
    set description(value: string | undefined);
    get defaultValue(): string | undefined;
    set defaultValue(value: string | undefined);
    get category(): string | undefined;
    get type(): string | (new () => any);
    get typeConverter(): TypeConverter | undefined;
    addSettings(settings: PropertyDefinitionSetting): void;
    getEditor(): UITypeEditor | undefined;
    getUIValidator(): IUIValidator | undefined;
    getDefaultValue(properties: PropertiesObject): Promise<any>;
    resetValue(properties: PropertiesObject): Promise<void>;
    setValue(properties: PropertiesObject, value: any): Promise<void>;
    get resolvers(): CompositeResolver;
    get defaultResolver(): IDefaultResolver;
    get readOnlyResolver(): IReadOnlyResolver;
    get validResolver(): IValidResolver;
    get applyResolver(): IApplyResolver;
    get visibleResolver(): IVisibleResolver;
    get valuesResolver(): IValuesResolver;
    get afterSetValueHandler(): IAfterSetValueHandler;
    addFlag(name: string, value?: string): void;
    getFlag(name: string): string | undefined;
    hasFlag(name: string): boolean;
    getFlags(): AnyObject;
}

export declare type TypeConverterFactory = () => TypeConverter;
export declare const ITypeConverterDescriptor: unique symbol;
export interface ITypeConverterDescriptor {
    id: string | Symbol;
    factory: TypeConverterFactory;
}
export declare class TypeConverterRegistry {
    private static _map;
    static register(descriptor: ITypeConverterDescriptor): Disposable;
    static get(id: string | Symbol): ITypeConverterDescriptor | undefined;
}

export declare type UITypeEditorEditOptions = {
    context: TypeDescriptorContext;
    service: IUITypeEditorService;
    container: HTMLElement;
    width: number | string;
    height: number | string;
    value: any;
    valueString: string;
    triggerEvent?: Event;
    focusInside?: boolean;
};
export declare class UITypeEditor {
    getEditStyle(context: TypeDescriptorContext): UITypeEditorEditStyle;
    beginEditValue(options: UITypeEditorEditOptions): void;
    endEditValue(): any;
    getRenderValueSupported(context: TypeDescriptorContext): boolean;
    renderValue(context: TypeDescriptorContext, value: any): MaybePromise<string | HTMLElement>;
    getAutocompleteSupported(context: TypeDescriptorContext): boolean;
    getAutoCompleteValues(context: TypeDescriptorContext, prefix: string): MaybePromise<string[]>;
}

export declare type UITypeEditorFactory = () => UITypeEditor;
export declare const IUITypeEditorDescriptor: unique symbol;
export interface IUITypeEditorDescriptor {
    id: string | Symbol;
    factory: UITypeEditorFactory;
}
export declare class UITypeEditorRegistry {
    private static _map;
    static register(descriptor: IUITypeEditorDescriptor): Disposable;
    static get(id: string | Symbol): IUITypeEditorDescriptor | undefined;
}

export declare enum UITypeEditorEditStyle {
    NONE = 0,
    MODAL = 1,
    DROP_DOWN = 2,
    CUSTOM = 3
}

export declare type UIValidatorFactory = () => IUIValidator;
export declare const IUIValidatorDescriptor: unique symbol;
export interface IUIValidatorDescriptor {
    id: string | Symbol;
    factory: UIValidatorFactory;
}
export declare class UIValidatorRegistry {
    private static _map;
    static register(descriptor: IUIValidatorDescriptor): Disposable;
    static get(id: string | Symbol): IUIValidatorDescriptor | undefined;
}

export declare type PropertyDefinitionLoader = (objClass: string, properties: PropertyDefinitionCollection) => void;
export declare type ObjectPropertyDefinition = {
    objectClass: string;
    loader: PropertyDefinitionLoader;
};
export declare type PropertyValue = {
    name: string;
    value: any;
};
export declare type PropertyValueChangedEventArgs = {
    sender: any;
    name: string;
    value?: any;
    oldValue?: any;
    dependants?: string[];
};
export declare type PropertyValueErrorEventArgs = {
    sender: any;
    name: string;
    error: boolean;
};
declare type KeyValueData = {
    key: string;
    value: string;
};
export declare type PropertiesObjectData = {
    objectClass?: string;
    type?: string;
    description?: string;
    isReadOnly?: boolean;
    isComplete?: boolean;
    properties: PropertyData[];
    customFields?: KeyValueData[];
};
export declare type PropertyData = {
    name: string;
    value: string;
    isDefault?: boolean;
    isReadOnly?: boolean;
    isVisible?: boolean;
    standardValues?: string[];
    isChild?: boolean;
    children?: string[];
};
export {};
