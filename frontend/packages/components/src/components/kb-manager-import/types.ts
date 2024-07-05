import {
  ContextMenuInfo,
  ImportCategoryData,
  ImportItemResultData
} from "../../common/types";

export type LoadCallback = (file: File) => Promise<ImportCategoryData[]>;

export type ImportCallback = (itemIds: string[]) => Promise<boolean>;

export type CancelCallback = () => Promise<boolean>;

export type OptionsCallback = () => Promise<void>;
export interface SelectedObject {
  itemId: string;
  subItemsIds: string[];
}

export type ImportItemData = {
  id: string;
  name: string;
};

export type StatusInfo = {
  error: {
    display: boolean;
    number: number;
  };
  warning: {
    display: boolean;
    number: number;
  };
  success: {
    display: boolean;
    number: number;
  };
};

export type ObjectContextMenuCallback = (
  tree: ObjectsSourceType,
  contextMenuInfo: ContextMenuInfo
) => Promise<void>;

export type ObjectsSourceType = "in-file" | "imported";

export type ImportItemResultFullData = ImportItemResultData & {
  categoryId: string | undefined;
  categoryName: string | undefined;
  categoryIcon: string | undefined;
};
