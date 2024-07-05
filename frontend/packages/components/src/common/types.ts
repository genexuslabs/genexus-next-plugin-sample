export type GxOption = {
  id: string;
  label?: string;
  name?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  checked?: boolean;
  selected?: boolean;
  icon?: string; // same as iconName
  iconName?: string;
  iconColor?: string;
};

export type ImportCategoryData = {
  id: string;
  name: string;
  icon: string;
  items: ImportItemData[];
};

export type ImportItemData = {
  id: string;
  name: string;
};

export type ImportItemResultData = {
  id: string;
  name: string;
  status: "warning" | "error" | "success";
  messages?: string[];
};

export type Position = "above" | "end" | "below" | "start";

export type LabelPosition = "start" | "above";

export type FormElementValidation = {
  key: string;
  message: string;
  hasError: boolean;
};

export type FormSubmitResult = {
  success: boolean;
  fieldErrors: FormElementValidation[];
};

/* this replaces FormSubmitResult */
export type ConnectionResultData = {
  success: boolean;
  fieldErrors: FormElementValidation[];
};

export type ObjectState = "inserted" | "modified" | "deleted" | "conflicted";

export type ObjectType = {
  id: string;
  name: string;
  icon?: string;
};

/* Used for providing the selected items id's on 'contextmenu' event on a component that provides items such as a tree, or a grid. */
export type ContextMenuInfo = {
  selection: string[];
  clientX: number;
  clientY: number;
};

export type ItemsCheckedState = {
  itemsChecked: string[];
  itemsUnchecked: string[];
};
export type ItemsCheckedResult = {
  itemsToCheck: string[];
  itemsToUncheck: string[];
};

export type ResultState = "info" | "success" | "warning" | "error";

export type EntityData = {
  id: string; // Internal ID of the entity
  name: string; // Name that will be displayed in the interface
  iconSrc?: string; // The icon gemini name
  // iconColor?: IconColor; // Indicates the icon color
};

export type GxServerAuthenticationType = "genexus" | "local";
