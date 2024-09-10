

export class ArgumentNullException extends GXException {
    constructor(arg: string);
}

export class CompositeDisposable {
    private _composite;
    constructor();
    add(disposable: Disposable): void;
    remove(disposable: Disposable): void;
    dispose(): void;
}

export class CustomSymbolValueArgument {
    private _data;
    private _arguments;
    constructor(data: string);
    get data(): string;
    getValue(name: string): string | undefined;
    getValues(name: string): string[];
    _parseData(): void;
}

export class EventBroker {
    static on(eventName: string, callback: EventHandler, target?: Object): Disposable;
    static emit(eventName: string, args?: any, target?: Object): void;
    static emitAsync(eventName: string, args?: any, target?: Object): Promise<void>;
    private static _getEmitterForTarget;
}

export class ExceptionManager {
    static logException(ex: Error): void;
    static afterException(callback: (exception: Error) => void): IDisposable;
}

export class Guid {
    private _value;
    constructor(value: string);
    equals(other: Guid): boolean;
    toString(): string;
    static newInstance(): Guid;
    static get EMPTY(): Guid;
    static equals(g1: any, g2: any): boolean;
}

export class GXException extends Error {
    innerException?: Error;
    additionalData?: AnyObject;
    constructor(message?: string, innerException?: Error, additionalData?: Object);
    toString(): string;
}

export interface ISelectionContainer {
    readonly selectionCount: number;
    readonly selectedObject: any;
    readonly selectedObjects: any[];
    readonly selectedObjectsToSave: any[];
    readonly keepSelection: boolean;
    readonly selectionContext: any;
    selectionChanged(callback: Function): Disposable;
}

export class NotImplementedException extends GXException {
    constructor();
}

export class Selection implements ISelectionContainer {
    private _emitter;
    private _selectedObjects;
    private _objectsToSave;
    private _context;
    constructor();
    get selectionCount(): number;
    get selectedObject(): any;
    get selectedObjects(): any[];
    get selectedObjectsToSave(): any;
    get keepSelection(): boolean;
    get selectionContext(): any;
    set selectionContext(value: any);
    selectionChanged(callback: EventHandler): Disposable;
    setSelection(objs?: any | any[], objsToSave?: any | any[]): void;
    clear(): void;
    contains(obj: any): boolean;
}

export class TraceManager {
    static debug(message: any): void;
    static info(message: any): void;
    static warn(message: any): void;
    static error(message: any): void;
    static fatal(message: any, error: any): void;
}

export declare class Time {
    private constructor();
    static createInstance(): Time;
    static parseDuration(text: string): Duration;
    static durationFromObject(info: IDuration): Duration;
    static parseDatetime(text: string, utc: boolean): DateTime;
    static parseCycle(text: string): Cycle;
    static cycleFromObject(info: ICycle): Cycle;
}
export interface IDuration {
    years: MaybeUndefined<number>;
    months: MaybeUndefined<number>;
    days: MaybeUndefined<number>;
    hours: MaybeUndefined<number>;
    minutes: MaybeUndefined<number>;
    seconds: MaybeUndefined<number>;
}
export interface ICycle {
    repetitions: number;
    duration: Duration | string;
    startDate: DateTime | string;
    endDate: DateTime | string;
    type: CycleType;
}
export declare class Duration {
    get years(): number;
    get months(): number;
    get days(): number;
    get hours(): number;
    get minutes(): number;
    get seconds(): number;
    private _duration;
    private constructor();
    static fromString(str: string): Duration;
    static fromObject(obj: IDuration): Duration;
    toString(): string;
}
export declare class DateTime {
    get year(): number;
    get month(): number;
    get day(): number;
    get hour(): number;
    get minute(): number;
    get second(): number;
    private _dateTime;
    private constructor();
    static fromString(str: string, utc: boolean): DateTime;
    static fromJSDate(dateTime: Date): DateTime;
    toString(): string;
}
export declare enum CycleType {
    Duration = 0,
    StartDateDuration = 1,
    DurationEndDate = 2,
    StartDateEndDate = 3
}
export declare class Cycle {
    repetitions: number;
    duration: Duration;
    startDate: DateTime;
    endDate: DateTime;
    type: CycleType;
    private constructor();
    static fromString(str: string): Cycle;
    static fromObject(object: ICycle): Cycle;
    toString(): string;
}

export declare type CancelablePromise<T> = Promise<T> & {
    cancel(): void;
};

export class MultiMap {
    _map: Map<any, any>;
    /**
     *
     * @return {number}
     */
    get size(): number;
    /**
     *
     * @return {Iterable}
     */
    keys(): Iterable<any>;
    /**
     *
     * @return {Iterable}
     */
    values(): Iterable<any>;
    /**
     *
     * @param {*} key
     * @param {*} value
     */
    set(key: any, value: any): void;
    /**
     *
     * @param key
     * @return {Array}
     */
    get(key: any): any[];
    /**
     *
     * @param {*} key
     * @return {boolean}
     */
    has(key: any): boolean;
    /**
     *
     * @param {*} key
     * @return {*}
     */
    getFirst(key: any): any;
    /**
     *
     * @param {*} key
     * @return {boolean}
     */
    delete(key: any): boolean;
    clear(): void;
}

export class BaseMessage {
    private _text;
    private _level;
    constructor(text: string, level: MessageLevel);
    get text(): string;
    set text(value: string);
    get level(): MessageLevel;
    set level(value: MessageLevel);
    toString(): string;
    static levelToString(level: MessageLevel): string;
}

export interface IOutputMessages extends Iterable<BaseMessage> {
    contains(item: BaseMessage): boolean;
    readonly count: number;
    readonly hasErrors: boolean;
    readonly hasWarnings: boolean;
    readonly errorText: string;
    readonly fullText: string;
    filter(level: MessageLevel): BaseMessage[];
    readonly onlyErrors: OutputError[];
    readonly onlyWarnings: OutputError[];
}

export class OutputError extends BaseMessage {
    constructor(text: string, level: MessageLevel);
}

export class OutputMessages implements IOutputMessages {
    private _messages;
    constructor();
    contains(message: BaseMessage): boolean;
    get count(): number;
    get hasErrors(): boolean;
    get hasWarnings(): boolean;
    get errorText(): string;
    get fullText(): string;
    filter(level: MessageLevel): BaseMessage[];
    get onlyErrors(): BaseMessage[];
    get onlyWarnings(): BaseMessage[];
    [Symbol.iterator](): {
        next(): IteratorResult<BaseMessage>;
    };
    clear(): void;
    add(item: BaseMessage): void;
    private _getMessages;
    private _hasLevel;
    private _buildText;
}

export declare enum MessageLevel {
    OFF = 0,
    ERROR = 1,
    WARNING = 2,
    INFORMATION = 3
}

export interface IDisposable {
    dispose(): void;
}
export declare namespace IDisposable {
    function is(arg: any): arg is IDisposable;
}
export declare class Disposable {
    private _disposable;
    constructor(action: IDisposable | (() => void));
    dispose(): void;
}

export declare type DisposableUrl = {
    url: string;
    dispose: () => void;
};

export declare type EventHandler = (value?: any) => void;
export declare class Emitter {
    private _emitter;
    constructor();
    clear(): void;
    dispose(): void;
    on(eventName: string, handler: EventHandler): Disposable;
    preempt(eventName: string, handler: EventHandler): Disposable;
    emit(eventName: string, value?: any, catchException?: boolean): void;
    emitAsync(eventName: string, value?: any, catchException?: boolean): Promise<void>;
}

export class ArrayHelper {
    static removeItem(array: any[], item: any): boolean;
    static moveItem(array: any[], index: number, newIndex: number): any[];
    static makeIterator(array: any[]): Iterator<any>;
    static makeTypedIterator<T>(array: T[]): Iterator<T>;
    static fromIterable<T>(iterable: IterableIterator<T>): T[];
    static fromIterator<T>(iterator: Iterator<T>): T[];
}

export class ColorHelper {
    static getColorValueForCss(value: string): {
        color: string;
        opacity: number;
    };
    static getColorValueFromPalette(palette: {
        key: string;
        value: any;
    }[], name: string): any;
}

export class KeyHelper {
    static isSpecialKey(code: number): boolean;
    static specialKeyCodes(): number[];
}

export class MethodNameNormalizer {
    private _usedNames;
    constructor();
    getValidMethodName(name: string, desc?: string, constantName?: string): string;
    static normalizeString(str: string): string;
    private static _isCamel;
}

export class StringHelper {
    static normalize(str: string): string | undefined;
    static stripQuotes(str: string): string;
    static replaceAll(str: string, find: string, replace: string): string;
    static escape(str: string): string;
    static escapeRegExp(str: string): string;
    static removeDuplicates(array: string[], ignoreCase: boolean): string[];
    static isQuoted(str: string): boolean;
    static contains(array: string[], str: string, ignoreCase: boolean): boolean;
    static equals(str1: string, str2: string, ignoreCase: boolean): boolean;
    static compare(a: string, b: string): number;
    static firstLetterUpperCase(str: string): string;
    static stringToBoolean(value: string | undefined): boolean;
}

export class TypeHelper {
    /**
     *
     * @param {Object} target
     * @param {Symbol} symbol
     * @param {boolean} includeType = true
     * @return {*}
     */
    static getSymbolValue: (target: Object, symbol: Symbol, includeType?: boolean) => any;
    /**
     *
     * @param {Object} target
     * @param {Symbol} symbol
     * @param {*} value
     */
    static setSymbolValue(target: Object, symbol: Symbol, value: any): void;
    /**
     *
     * @param {(string|function)} value - A function (regular or a constructor), the name of a primitive type or the
     * path to require it.
     *
     * @return {function|string|undefined} - If the value parameter is a function then it is returned as the type constructor,
     * If it is a string and is equal to the name of a primitive type then the string is returned (lowercase).
     * If it is a string and is not the name of a primitive type then the value is used to require the function.
     * In any other case 'undefined'is returned.
     */
    static getType(value: (string | Function)): Function | string | undefined;
    /**
     *
     * @param {string|function} type
     * @return {string}
     */
    static getTypeName(type: string | Function): string;
    /**
     *
     * @param {*} value
     * @return {string}
     */
    static getValueTypeName(value: any): string;
    /**
     *
     * @param {*} value
     * @return {string|function}
     */
    static getValueType(value: any): string | Function;
}

export class XmlHelper {
    static selectNodes(dom: Document | Element, xpath: string): Node[];
    static selectSingleNode(dom: Document | Element, xpath: string): Node | undefined;
}

export declare namespace EnvHelper {
    function setIsElectron(value: boolean): void;
    function isElectron(): boolean;
}

export declare enum KeyCodes {
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39,
    TAB = 9,
    ENTER = 13,
    ESC = 27,
    DELETE = 46,
    BACKSPACE = 8,
    SHIFT = 16,
    CONTROL = 17,
    ALT = 18,
    META = 91,
    CAPS_LOCK = 20,
    SPACE = 32,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123
}

export declare type KeyMap = {
    [key: string]: boolean;
};
export declare class ShortcutHelper {
    private static isMacOS;
    static parseShortcut(shortcut: string): KeyMap;
    private static isModifier;
    static isShortcutPressed(shortcut: string, event: KeyboardEvent): boolean;
}

export interface IComparable {
    /**
     *  Compares the current instance with another object and returns
     *  an integer that indicates whether the current instance precedes, follows, or
     *  occurs in the same position in the sort order as the other object.
     *
     * @param other - A value to compare with this instance.
     *
     * @return A value that indicates the relative order of the objects being compared. The
     * return value has these meanings: Value Meaning Less than zero This instance precedes
     * other in the sort order. Zero This instance occurs in the same position in the
     * sort order as other. Greater than zero This instance follows other in the sort order.
     *
     */
    compareTo(other: any): number;
}
export declare namespace IComparable {
    function is(arg: any): arg is IComparable;
}

export interface IEquatable {
    /**
     *
     * Indicates whether the current object is equal to another object of the same type.
     *
     * @param other - A value to compare with this object.
     * @return true if the current object is equal to the other parameter; otherwise, false.
     */
    equals(other: any): boolean;
}
export declare namespace IEquatable {
    function is(arg: any): arg is IEquatable;
}

export declare type TFunc = (keys: string | string[], options: Object) => string;
export declare type StringMap = {
    [key: string]: any;
};
export declare type LocalizationOptions = string | StringMap & {
    /**
     * Default value to return if a translation was not found
     */
    defaultValue?: any;
    /**
     * Count value used for plurals
     */
    count?: number;
    /**
     * Used for contexts (eg. male\female)
     */
    context?: any;
};
export declare class Locale {
    private static _lang;
    private static _emitter;
    private static _instances;
    private _i18n;
    static createInstance(): Locale;
    static get language(): string;
    static changeLanguage(lang: string): void;
    static languageChanged(callback: () => void): Disposable;
    private static _getLangFromURL;
    private constructor();
    get language(): string;
    get languages(): string[];
    t(key: string, options?: LocalizationOptions): string;
    dir(lang?: string): "ltr" | "rtl";
    changeLanguage(lang: string): void;
    addResourceBundle(options: {
        lang: string;
        ns?: string;
        resources: AnyObject;
        deep?: boolean;
        overwrite?: boolean;
    }): void;
    languageChanged(callback: () => void): Disposable;
    dispose(): void;
}

export declare enum Mode {
    UNCHANGED = 0,
    NEW = 1,
    MODIFIED = 2,
    DELETED = 3,
    UNKNOWN = 4
}

export declare const NamedColors: {
    'Alice Blue': string;
    'Antique White': string;
    Aqua: string;
    Aquamarine: string;
    Azure: string;
    Beige: string;
    Bisque: string;
    Black: string;
    'Blanched Almond': string;
    Blue: string;
    'Blue Violet': string;
    Brown: string;
    Burlywood: string;
    'Cadet Blue': string;
    Chartreuse: string;
    Chocolate: string;
    Coral: string;
    Cornflower: string;
    Cornsilk: string;
    Crimson: string;
    Cyan: string;
    'Dark Blue': string;
    'Dark Cyan': string;
    'Dark Goldenrod': string;
    'Dark Gray': string;
    'Dark Green': string;
    'Dark Khaki': string;
    'Dark Magenta': string;
    'Dark Olive Green': string;
    'Dark Orange': string;
    'Dark Orchid': string;
    'Dark Red': string;
    'Dark Salmon': string;
    'Dark Sea Green': string;
    'Dark Slate Blue': string;
    'Dark Slate Gray': string;
    'Dark Turquoise': string;
    'Dark Violet': string;
    'Deep Pink': string;
    'Deep Sky Blue': string;
    'Dim Gray': string;
    'Dodger Blue': string;
    Firebrick: string;
    'Floral White': string;
    'Forest Green': string;
    Fuchsia: string;
    Gainsboro: string;
    'Ghost White': string;
    Gold: string;
    Goldenrod: string;
    Gray: string;
    'Web Gray': string;
    Green: string;
    'Web Green': string;
    'Green Yellow': string;
    Honeydew: string;
    'Hot Pink': string;
    'Indian Red': string;
    Indigo: string;
    Ivory: string;
    Khaki: string;
    Lavender: string;
    'Lavender Blush': string;
    'Lawn Green': string;
    'Lemon Chiffon': string;
    'Light Blue': string;
    'Light Coral': string;
    'Light Cyan': string;
    'Light Goldenrod': string;
    'Light Gray': string;
    'Light Green': string;
    'Light Pink': string;
    'Light Salmon': string;
    'Light Sea Green': string;
    'Light Sky Blue': string;
    'Light Slate Gray': string;
    'Light Steel Blue': string;
    'Light Yellow': string;
    Lime: string;
    'Lime Green': string;
    Linen: string;
    Magenta: string;
    Maroon: string;
    'Web Maroon': string;
    'Medium Aquamarine': string;
    'Medium Blue': string;
    'Medium Orchid': string;
    'Medium Purple': string;
    'Medium Sea Green': string;
    'Medium Slate Blue': string;
    'Medium Spring Green': string;
    'Medium Turquoise': string;
    'Medium Violet Red': string;
    'Midnight Blue': string;
    'Mint Cream': string;
    'Misty Rose': string;
    Moccasin: string;
    'Navajo White': string;
    'Navy Blue': string;
    'Old Lace': string;
    Olive: string;
    'Olive Drab': string;
    Orange: string;
    'Orange Red': string;
    Orchid: string;
    'Pale Goldenrod': string;
    'Pale Green': string;
    'Pale Turquoise': string;
    'Pale Violet Red': string;
    'Papaya Whip': string;
    'Peach Puff': string;
    Peru: string;
    Pink: string;
    Plum: string;
    'Powder Blue': string;
    Purple: string;
    'Web Purple': string;
    'Rebecca Purple': string;
    Red: string;
    'Rosy Brown': string;
    'Royal Blue': string;
    'Saddle Brown': string;
    Salmon: string;
    'Sandy Brown': string;
    'Sea Green': string;
    Seashell: string;
    Sienna: string;
    Silver: string;
    'Sky Blue': string;
    'Slate Blue': string;
    'Slate Gray': string;
    Snow: string;
    'Spring Green': string;
    'Steel Blue': string;
    Tan: string;
    Teal: string;
    Thistle: string;
    Tomato: string;
    Turquoise: string;
    Violet: string;
    Wheat: string;
    White: string;
    'White Smoke': string;
    Yellow: string;
    'Yellow Green': string;
};

export declare type MaybeArray<T> = T | T[];
export declare type MaybePromise<T> = T | PromiseLike<T>;
export declare type MaybeUndefined<T> = T | undefined;
export interface AnyObject<T = any> {
    [key: string]: T;
}
