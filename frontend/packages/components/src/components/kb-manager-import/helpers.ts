import {
  TreeViewItemModel,
  TreeViewModel
} from "@genexus/chameleon-controls-library";

import { ImportCategoryData, ImportItemResultData } from "../../common/types";
import { ImportItemData, ImportItemResultFullData } from "./types";

export const KB_OBJECT = "object";
export const KB_CATEGORY = "category";

const convertImportItemToTreeItem = (
  importCatIcon: string,
  importItems: ImportItemData[]
): TreeViewModel =>
  importItems.map(importItem => ({
    id: importItem.id,
    caption: importItem.name,
    expanded: true,
    leaf: true,
    startImgSrc: importCatIcon, // TODO
    metadata: KB_OBJECT
  }));

/**
 * This function converts ReferenceData[] data to TreeItemData[]
 */
export const convertImportCategoryToTreeView = (
  importCategoryData: ImportCategoryData[] | undefined
): TreeViewModel =>
  (importCategoryData ?? []).map(importCat => ({
    id: importCat.id,
    caption: `${importCat.name} (${importCat.items.length})`,
    expanded: true,
    leaf: false,
    startImgSrc: importCat.icon,
    metadata: KB_CATEGORY,
    items: convertImportItemToTreeItem(importCat.icon, importCat.items)
  }));

const createImportResultDataMessages = (
  importItemId: string,
  messagesArray: string[] | undefined
): TreeViewModel =>
  (messagesArray ?? []).map((message, i) => ({
    id: `${importItemId}-message-${i}}]`,
    caption: message,
    parts: "gemini-tools-list-view", // TODO
    leaf: true
  }));

const updateImportStatusTree = (
  importItemResultFullData: ImportItemResultFullData,
  importTreeActualState: TreeViewModel
): TreeViewModel => {
  const objectCategoryIndex = importTreeActualState.findIndex(
    objectCategoryItem =>
      objectCategoryItem.id === importItemResultFullData.categoryId
  );

  if (objectCategoryIndex === -1) {
    // object category node does not exists. We have to create it, and insert
    // the import result tree node inside.
    const importTreeItem: TreeViewItemModel = {
      id: importItemResultFullData.categoryId!, // TODO
      // the count is (1), because this is the first item for this category
      caption: `${importItemResultFullData.categoryName} (1)`,
      parts: importItemResultFullData.categoryIcon,
      expanded: true,
      items: [
        {
          id: importItemResultFullData.id,
          caption: importItemResultFullData.name,
          items: createImportResultDataMessages(
            importItemResultFullData.id,
            importItemResultFullData.messages
          ),
          parts: `tree-view-item tree-view-item--status tree-view-item--${importItemResultFullData.status}`,
          expanded: true,
          leaf:
            !importItemResultFullData.messages ||
            importItemResultFullData.messages.length === 0
        }
      ]
    };
    importTreeActualState.push(importTreeItem);
  }
  // Object category node already exists. Just create the import result node,
  // and insert into the parent category node (if it doesn't exists already).
  else {
    // First search for the importItemResult node...
    const importItemIndex = importTreeActualState[
      objectCategoryIndex
    ].items?.findIndex(({ id }) => id === importItemResultFullData.id);

    if (importItemIndex === -1) {
      // ImportItem does not exists already
      const importTreeItem: TreeViewItemModel = {
        id: importItemResultFullData.id,
        caption: importItemResultFullData.name,
        expanded: true,
        items: createImportResultDataMessages(
          importItemResultFullData.id,
          importItemResultFullData.messages
        ),
        parts: `tree-view-item tree-view-item--status tree-view-item--${importItemResultFullData.status}` // TODO
      };

      const item = importTreeActualState[objectCategoryIndex];

      // Insert the import node into the category node
      item.items!.push(importTreeItem);

      // Then, update the category node caption (the name is the same, but the
      // (count) should be the actual items.length, because we have just added a new child import node. )
      item.caption = `${importItemResultFullData.categoryName} (${
        item.items!.length
      })`;
    }
  }
  return importTreeActualState;
};

/**
 * This function takes an ImportItemResultData item, and updates it to a
 * ImportCategoryFullData, which has the same information, plus the category
 * parent needed information, that will be used for creating the "virtual"
 * parent category node on the "Import Status" section.
 */
const createImportResultFullData = (
  importItemResultData: ImportItemResultData,
  importCategoryData: ImportCategoryData[]
): ImportItemResultFullData => {
  const importCategoryFullData: ImportItemResultFullData = {
    categoryId: "",
    categoryName: "",
    categoryIcon: "",
    ...importItemResultData
  };

  importCategoryDataFor: for (let i = 0; i < importCategoryData.length; i++) {
    const categoryNode = importCategoryData[i];
    for (let j = 0; j < categoryNode.items.length; j++) {
      if (categoryNode.items[j].id === importItemResultData.id) {
        importCategoryFullData.categoryId = categoryNode.id;
        importCategoryFullData.categoryName = categoryNode.name;
        importCategoryFullData.categoryIcon = categoryNode.icon;
        break importCategoryDataFor;
      }
    }
  }
  return importCategoryFullData;
};

/**
 * @description This function adds an ImportItemResultData item to the "importTreeState", and returns the updated tree with the new item added.
 */
export const addImportItemResultDataItem = (
  importItemResultData: ImportItemResultData,
  importCategoryData: ImportCategoryData[],
  importTreeActualState: TreeViewItemModel[]
): TreeViewItemModel[] => {
  let updatedImportStatusTree: TreeViewItemModel[] = [...importTreeActualState];
  // first, update importItemResultData with the category data. It will be needed later.
  const importItemResultFullData: ImportItemResultFullData =
    createImportResultFullData(importItemResultData, importCategoryData);
  updatedImportStatusTree = updateImportStatusTree(
    importItemResultFullData,
    updatedImportStatusTree
  );
  return updatedImportStatusTree;
};
