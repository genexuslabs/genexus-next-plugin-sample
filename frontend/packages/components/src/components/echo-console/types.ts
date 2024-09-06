export type CallToServerCallback = (text:string) => Promise<string>;

export type ConfirmCallback = () => Promise<void>;

export type CancelCallback = () => Promise<void>;