export type GXServerConnectionDefault = {
  serverUrl: string;
  userName: string;
  password: string;
};

export type GXServerConnectionData = GXServerConnectionDefault & {
  continueWithGeneXusAccount: boolean;
};

export type ConnectionResultData = {
  success: boolean;
  // errorMessages: [FormElementValidation];
};
