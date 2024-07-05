/* STENCIL IMPORTS */
import {
  Component,
  Host,
  h,
  Prop,
  Event,
  Element,
  State,
  EventEmitter,
  Watch,
  Method
} from "@stencil/core";

import {
  CancelCallback,
  ImportCallback,
  LoadCallback,
  ObjectContextMenuCallback,
  OptionsCallback,
  StatusInfo
} from "./types";

import {
  TreeViewItemContextMenu,
  TreeViewItemModel,
  TreeViewItemModelExtended
} from "@genexus/chameleon-controls-library";

import {
  getImagePathCallbackIde,
  iconMetadataToPath
  // @ts-expect-error asdasd
} from "@genexus/mercury/dist/assets/assets-manager.js";

import { Locale } from "../../common/locale";
// import { config } from "../../common/config";
import { ImportCategoryData, ImportItemResultData } from "../../common/types";
import {
  convertImportCategoryToTreeView,
  addImportItemResultDataItem,
  KB_OBJECT
} from "./helpers";
// import { countTreeItems } from "../../common/helpers";
// import { CheckedItemsInfo } from "../_helpers/list-selector/list-selector";

@Component({
  tag: "k2b-kb-manager-import",
  styleUrl: "kb-manager-import.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class Kb2KBManagerImport {
  /**
   * The component hard-coded strings translations.
   */
  // eslint-disable-next-line @stencil-community/own-props-must-be-private
  #componentLocale: any;

  /**
   * ImportCategoryBasicData Holds the original name of category data, and its
   * id. Used to create parent nodes on the imported tree
   */
  // eslint-disable-next-line @stencil-community/own-props-must-be-private
  #importCategoryData: ImportCategoryData[] = [];
  #objectsInFileTotalNodes = 0;
  #selectedObjectsInFileIds: string[] = [];

  // Refs
  #objectsTreeEl!: HTMLChTreeViewRenderElement;
  #fileInputEl!: any;
  #objectsButtonsGroup!: any;
  #topStateBarEl!: any;

  @Element() el!: HTMLK2bKbManagerImportElement;

  @State() selectAllIndeterminate = false;
  @State() selectAllValue: "true" | "false" = "false";

  @State() checkedObjectsIds: string[] = [];
  @State() noObjects: boolean = false;
  @State() showHiddenImportsMessage = false;
  @State() statusInfo: StatusInfo = {
    error: {
      display: true,
      number: 0
    },
    warning: {
      display: true,
      number: 0
    },
    success: {
      display: true,
      number: 0
    }
  };

  @State() objectsTreeState: TreeViewItemModel[] = [];
  @Watch("objectsTreeState")
  watchObjectsTreeStateHandler(newState: TreeViewItemModel[]) {
    this.noObjects = !!(newState.length === 0 || !newState);
    // this.#objectsInFileTotalNodes = countTreeItems(newState);
  }

  // import status
  @State() importStatusMessage: string | undefined;

  @State() someStatusVisible: boolean = false;

  @State() noImport: boolean = false;

  @State() importTreeState: TreeViewItemModel[] = [];
  @Watch("importTreeState")
  watchImportTreeStateHandler() {
    this.#evaluateImport();
    if (this.noImport) {
      this.importStatusMessage =
        this.#componentLocale.main.importStatus.noImportedFiles;
    } else {
      this.importStatusMessage =
        this.#componentLocale.main.importStatus.importedButHidden;
    }
  }

  @State() importingIsInProcess = false;
  @Watch("importingIsInProcess")
  watchImportingIsInProcessHandler(isImporting: boolean) {
    if (isImporting && this.topStateBar) {
      this.#topStateBarEl.active = true;
    } else if (!isImporting && this.topStateBar) {
      this.#topStateBarEl.active = false;
    }
  }

  /**
   * If true, it will display a loader when needed.
   */
  @Prop() readonly topStateBar = true;

  /**
   * The name of the imported xml or xps file
   */
  @Prop({ mutable: true }) selectedFile: File | undefined;
  @Watch("selectedFile")
  watchSelectedFileHandler(file: File) {
    if (file?.name && file.size > 0) {
      this.#loadFileHandler();
    }
  }

  /**
   * Callback invoked when the user wants to access the export options.
   */
  @Prop() readonly optionsCallback!: OptionsCallback;

  /**
   *Callback invoked when the user wants to initiate the import process.
   */
  @Prop() readonly importCallback!: ImportCallback;

  /**
   *Callback invoked when the user wants to load the xpz information
   */
  @Prop() readonly loadCallback!: LoadCallback;

  /**
   * Callback invoked when the user wants to cancel the export process.
   * @returns It returns a boolean indicating whether the process could be
   * canceled or not.
   */
  @Prop() readonly cancelCallback!: CancelCallback;

  /**
   * It displays the status buttons (errors, warning, succeeded) with the
   * minimal ui (no captions)
   */
  @Prop() readonly statusMinimal = false;

  /**
   * It displays the status buttons (errors, warning, succeeded) with the
   * minimal ui (no captions)
   */
  @Prop() readonly objectContextMenuCallback!: ObjectContextMenuCallback;

  /**
   * This event is emitted once just after the component is fully loaded and
   * the first render() occurs
   */
  @Event() componentDidRenderFirstTime!: EventEmitter<boolean>;

  /**
   * This event is emitted once just after the component is fully loaded and
   * the first render() occurs.
   */
  @Event() componentDidLoadEvent!: EventEmitter<boolean>;

  /**
   * Add the result of importing an item
   */
  @Method()
  async addResultItem(item: ImportItemResultData) {
    this.importTreeState = addImportItemResultDataItem(
      item,
      this.#importCategoryData,
      this.importTreeState
    );
    this.statusInfo[item.status].number++;
  }

  #evaluateImportStatusMessage = () => {
    this.someStatusVisible =
      this.statusInfo.error.display ||
      this.statusInfo.warning.display ||
      this.statusInfo.success.display;
  };

  #evaluateObjects = () => {
    this.noObjects = !!(
      this.objectsTreeState?.length === 0 || !this.objectsTreeState
    );
  };

  #evaluateImport = () => {
    this.noImport = !!(
      this.importTreeState?.length === 0 || !this.importTreeState
    );
  };

  #selectFileAndLoadHandler = () => {
    this.#fileInputEl.openFile();
  };

  #loadFileHandler = async () => {
    this.#importCategoryData = await this.loadCallback(this.selectedFile!);

    this.objectsTreeState = convertImportCategoryToTreeView(
      this.#importCategoryData
    );

    // Clear the input
    if (this.#importCategoryData.length > 0) {
      this.selectedFile = undefined;
    }
  };

  #fileSelectedHandler = (event: InputEvent) => {
    this.selectedFile = (event.target as HTMLInputElement).files![0];
  };

  #importObjectsHandler = async () => {
    // First clear imported objects (this clears errors/warnings/success counts as well)
    this.#clearStatusHandler();

    // Then do the import
    this.importingIsInProcess = true;
    this.#objectsButtonsGroup.selectedButtonId = "cancel-import-btn";

    await this.importCallback(this.checkedObjectsIds);
    this.importingIsInProcess = false;
  };

  #objectsTreeCheckedItemsChangedHandler = (
    event: CustomEvent<Map<string, TreeViewItemModelExtended>>
  ) => {
    // 1. Begin of evaluate 'select/unselect checkbox' state
    if (event.detail == null) {
      this.selectAllValue = "false";
      this.selectAllIndeterminate = false;
      return;
    }

    const allItemsWithCheckbox = [...event.detail.values()];

    if (allItemsWithCheckbox.length === 0) {
      this.selectAllValue = "false";
      this.selectAllIndeterminate = false;
      return;
    }

    const firstItemCheckedValue = allItemsWithCheckbox[0].item.checked;

    const allItemsHaveTheSameCheckedValue = allItemsWithCheckbox.every(
      treeItem => treeItem.item.checked === firstItemCheckedValue
    );

    this.selectAllValue = firstItemCheckedValue ? "true" : "false";
    this.selectAllIndeterminate = !allItemsHaveTheSameCheckedValue;
    // End of evaluate 'select/unselect checkbox' state

    // 2. Begin of checked items evaluation
    const checkedItems = allItemsWithCheckbox.filter(node => node.item.checked);

    // Objects checked
    const checkedObjects = checkedItems.filter(
      node => node.item.metadata === KB_OBJECT
    );

    const checkedObjectsIds: string[] = [];
    if (checkedObjects.length > 0) {
      checkedObjects.forEach(objectChecked => {
        checkedObjectsIds.push(objectChecked.item.id);
      });
    }
    // End of checked items evaluation

    /* 3. Begin of caption update*/
    /* TO DO (when we can differentiate the caption from the number of children)*/
    // const categoryItems = allItemsWithCheckbox.filter(
    //   node => node.item.metadata === KB_CATEGORY
    // );
    // categoryItems.forEach(category => {
    //   const itemInfo = category.item;
    //   // Update the amount of checked values
    //   if (itemInfo.leaf !== true) {
    //     const totalItems = itemInfo.items.length;

    //     const totalItemsChecked = itemInfo.items.filter(
    //       itemUIModel => itemUIModel.checked
    //     ).length;

    //     const newItemCaption =
    //       totalItems !== totalItemsChecked
    //         ? `${itemInfo.caption} (${totalItemsChecked}/${totalItems})`
    //         : `${itemInfo.caption} (${totalItems})`;

    //     // Only update the item caption if needed
    //     if (newItemCaption !== itemInfo.caption) {
    //       this.objectsTreeEl.updateItemsProperties([itemInfo.id], {
    //         id: itemInfo.id,
    //         caption: newItemCaption
    //       });
    //     }
    //   }
    // });

    /* /End of caption update*/
    this.checkedObjectsIds = checkedObjectsIds;
  };

  #objectsTreeSelectedItemsChangedHandler = (
    event: CustomEvent<TreeViewItemModelExtended[]>
  ) => {
    this.#selectedObjectsInFileIds = event.detail.map(item => item.item.id);
  };

  #objectsTreeContextMenuHandler = (
    event: CustomEvent<TreeViewItemContextMenu>
  ) => {
    if (this.objectContextMenuCallback && event.detail.metadata === KB_OBJECT) {
      this.objectContextMenuCallback("imported", {
        selection: this.#selectedObjectsInFileIds,
        clientX: event.detail.contextmenuEvent.screenX,
        clientY: event.detail.contextmenuEvent.screenY
      });
    }
  };

  #cancelImportHandler = () => {
    this.cancelCallback().then((result: any) => {
      if (result) {
        this.#topStateBarEl.active = false;
      }
    });
    // returns boolean
  };

  #optionsHandler = () => this.optionsCallback();

  #clearStatusHandler = () => {
    this.importTreeState = [];
    this.statusInfo.error.number = 0;
    this.statusInfo.warning.number = 0;
    this.statusInfo.success.number = 0;
  };

  #toggleSelectionClickHandler = () => {
    this.selectAllValue = this.selectAllValue === "true" ? "false" : "true";
    this.selectAllIndeterminate = false;

    this.#objectsTreeEl.updateAllItemsProperties({
      checked: this.selectAllValue === "true"
    });
  };

  #statusButtonsSelectionChangedHandler = () =>
    // e: CustomEvent<CheckedItemsInfo>
    {
      // const activeStates = e.detail;
      // const errorIndex = activeStates.findIndex(
      //   state => state.itemId === "error"
      // );
      // const warningIndex = activeStates.findIndex(
      //   state => state.itemId === "warning"
      // );
      // const successIndex = activeStates.findIndex(
      //   state => state.itemId === "success"
      // );
      // this.statusInfo = {
      //   error: {
      //     display: errorIndex !== -1,
      //     number: this.statusInfo.error.number
      //   },
      //   warning: {
      //     display: warningIndex !== -1,
      //     number: this.statusInfo.warning.number
      //   },
      //   success: {
      //     display: successIndex !== -1,
      //     number: this.statusInfo.success.number
      //   }
      // };
      // this.#evaluateImportStatusMessage();
    };

  #evaluateCheckAllValue = (): "true" | "false" => {
    const allAreChecked =
      this.#objectsInFileTotalNodes === this.checkedObjectsIds.length;

    const conditionToUncheck =
      this.objectsTreeState.length === 0 || !allAreChecked;

    if (conditionToUncheck) {
      return "false";
    }
    return "true";
  };

  private fileClearedHandler = () => {
    this.selectedFile = undefined;
  };

  async componentWillLoad() {
    this.#componentLocale = await Locale.getComponentStrings(this.el);

    this.componentDidLoadEvent.emit(true);
    this.#evaluateObjects();
    this.#evaluateImport();
    this.importStatusMessage =
      this.#componentLocale.main.importStatus.noImportedFiles;
    this.#evaluateImportStatusMessage();
  }

  componentDidLoad() {
    this.#fileInputEl.focus();
    this.componentDidRenderFirstTime.emit(this.#componentLocale.componentName);
  }

  render() {
    const locals = this.#componentLocale;

    const disableSelectAllCheckbox =
      this.importingIsInProcess || this.objectsTreeState.length === 0;

    console.log(iconMetadataToPath({ category: "objects", name: "stencil" }));

    return (
      <Host class="layout">
        <ch-theme name="mercury"></ch-theme>

        <div class="header">
          <div class="form-group">
            <label htmlFor="select-file" class="form-label">
              {locals.header.fileNameLabel}
            </label>
            <input
              id="select-file"
              class="form-input"
              type="file"
              accept=".xpz,.xml"
              onInput={this.#fileSelectedHandler}
              ref={el => (this.#fileInputEl = el as HTMLInputElement)}
            />
          </div>

          <button
            class="button-primary"
            disabled={this.importingIsInProcess}
            type="button"
            onClick={
              !this.importingIsInProcess
                ? this.#selectFileAndLoadHandler
                : undefined
            }
          >
            {locals.header.selectFileButton}
          </button>
        </div>

        <div class="main">
          <section class="objects-in-file">
            <h2 class="heading-5">{locals.main.objectsInFile.title}</h2>

            {this.objectsTreeState.length > 0 ? (
              <ch-tree-view-render
                class="tree-view"
                checkbox={true}
                checked={true}
                dragDisabled={true}
                dropDisabled={true}
                getImagePathCallback={getImagePathCallbackIde}
                model={this.objectsTreeState}
                showLines="last"
                toggleCheckboxes={true}
                onCheckedItemsChange={
                  this.#objectsTreeCheckedItemsChangedHandler
                }
                onSelectedItemsChange={
                  this.#objectsTreeSelectedItemsChangedHandler
                }
                onItemContextmenu={this.#objectsTreeContextMenuHandler}
                ref={el =>
                  (this.#objectsTreeEl = el as HTMLChTreeViewRenderElement)
                }
              ></ch-tree-view-render>
            ) : (
              <p class="empty-import">
                {locals.main.objectsInFile.noObjects}

                <button
                  class="button-tertiary"
                  type="button"
                  onClick={this.#optionsHandler}
                >
                  {locals.main.objectsInFile.selectFile}
                </button>
              </p>
            )}

            <ch-checkbox
              caption={locals.main.objectsInFile.selectUnselect}
              class="checkbox"
              checkedValue="true"
              disabled={disableSelectAllCheckbox}
              indeterminate={this.selectAllIndeterminate}
              value={this.#evaluateCheckAllValue()}
              onInput={
                !disableSelectAllCheckbox
                  ? this.#toggleSelectionClickHandler
                  : undefined
              }
            ></ch-checkbox>
          </section>

          <section>
            <h2 class="heading-5">{locals.main.importStatus.title}</h2>
          </section>
        </div>

        <div class="footer"></div>

        <gx-ide-container noContentPadding noFooterPadding hidden>
          <header class="header" slot="header">
            <gxg-form-text
              type="file"
              class="select-file"
              label={locals.header.fileNameLabel}
              placeholder={locals.header.fileNamePlaceholder}
              part="file-name"
              acceptFile=".xpz, .xml"
              clearButton
              iconPosition="start"
              onFileSelected={this.#fileSelectedHandler}
              onClearButtonClicked={this.fileClearedHandler}
              // ref={el => (this.#fileInputEl = el as HTMLGxgFormTextElement)}
            ></gxg-form-text>

            <gxg-button
              type="primary-text-icon"
              icon="gemini-tools/file"
              part="select-file-load-button"
              onClick={this.#selectFileAndLoadHandler}
              disabled={this.importingIsInProcess}
            >
              {locals.header.selectFileButton}
            </gxg-button>
          </header>

          <main class="main">
            <div class="container-wrapper">
              {/* {this.topStateBar && (
                  <gxg-top-state-bar
                    class="top-state-bar"
                    part="top-state-bar"
                    caption={locals.loader.title}
                    ref={el =>
                      (this.#topStateBarEl = el as HTMLGxgTopStateBarElement)
                    }
                  ></gxg-top-state-bar>
                )} */}

              <gx-ide-container
                containerTitle={locals.main.objectsInFile.title}
                noContentPadding
                noBorderFooter
                class="left-container"
                slimmerFooter
                inactiveTitle={this.noObjects}
                titleType="secondary"
              >
                <div
                  class={{
                    "tree-container": true,
                    "tree-container--objects-in-file": true,
                    "tree-container--empty": this.noObjects
                  }}
                >
                  {
                    <div class="gx-ide-message">
                      {/* <gxg-text
                          textAlign={
                            config.gxgMessage.common.textAlign as TextAlign
                          }
                          padding={
                            config.gxgMessage.common.textAlign as TextPadding
                          }
                          type={config.gxgMessage.common.type as TextType}
                          maxWidth={config.gxgMessage.common.maxWidth}
                          part="objects-in-file-empty-status-message"
                        >
                          {locals.main.objectsInFile.noObjects}
                          <gxg-text
                            type="text-link-no-line"
                            onClick={this.#selectFileAndLoadHandler}
                          >
                            {locals.main.objectsInFile.selectFile}
                          </gxg-text>
                        </gxg-text> */}
                    </div>
                  }
                </div>

                {/* <gxg-buttons-container
                    reduced
                    slot="footer-end"
                    ref={el =>
                      (this.#objectsButtonsGroup =
                        el as HTMLGxgButtonsContainerElement)
                    }
                  >
                    <gxg-button
                      id="import-btn"
                      part="import-button"
                      disabled={
                        this.objectsTreeState?.length === 0 ||
                        this.importingIsInProcess
                      }
                      onClick={this.#importObjectsHandler}
                      selected
                    >
                      {locals.main.objectsInFile.importButton}
                    </gxg-button>

                    <gxg-button
                      id="cancel-import-btn"
                      part="cancel-import-button"
                      disabled={!this.importingIsInProcess}
                      onClick={this.#cancelImportHandler}
                    >
                      {locals.main.objectsInFile.cancelButton}
                    </gxg-button>
                  </gxg-buttons-container> */}

                <gxg-button
                  type="secondary-icon-only"
                  icon="gemini-tools/settings"
                  slot="footer-end"
                  part="select-kb-btn"
                  onClick={this.#optionsHandler}
                >
                  {locals.header.optionsButton}
                </gxg-button>
              </gx-ide-container>

              <gx-ide-container
                class="right-container"
                // containerTitle={locals.main.importStatus.title}
                noContentPadding
                noBorderFooter
                slimmerFooter
                inactiveTitle={this.noImport}
                titleType="secondary"
              >
                <div
                  class={{
                    "tree-container": true,
                    "tree-container--import-status": true,
                    "tree-container--empty":
                      this.noImport || !this.someStatusVisible,
                    "tree-container--no-warnings":
                      !this.statusInfo.warning.display,
                    "tree-container--no-errors": !this.statusInfo.error.display,
                    "tree-container--no-succeeded":
                      !this.statusInfo.success.display
                  }}
                >
                  {!this.noImport && this.someStatusVisible ? (
                    <ch-tree-view-render
                      model={this.importTreeState}
                      toggleCheckboxes={true}
                      showLines="last"
                      class="tree-view"
                    ></ch-tree-view-render>
                  ) : (
                    <span></span>
                    // <gxg-text
                    //   textAlign={
                    //     config.gxgMessage.common.textAlign as TextAlign
                    //   }
                    //   padding={
                    //     config.gxgMessage.common.textAlign as TextPadding
                    //   }
                    //   type={config.gxgMessage.common.type as TextType}
                    //   maxWidth={config.gxgMessage.common.maxWidth}
                    //   part="objects-in-file-empty-status-message"
                    //   class="gx-ide-message"
                    // >
                    //   {this.importStatusMessage}
                    // </gxg-text>
                  )}
                </div>

                <gxg-button
                  type="secondary-text-only"
                  slot="footer-end"
                  part="select-kb-btn"
                  onClick={this.#clearStatusHandler}
                  disabled={this.noImport || this.importingIsInProcess}
                >
                  {locals.main.importStatus.clearButton}
                </gxg-button>

                {/* ghost element (used to force the container footer heights the same as the "objects in file" container tree)*/}
                <span class="ghost-element" slot="footer-start"></span>
              </gx-ide-container>
            </div>
          </main>

          <footer slot="footer-start">
            <gx-ide-status-buttons
              errors={this.statusInfo.error.number}
              warnings={this.statusInfo.warning.number}
              successes={this.statusInfo.success.number}
              hideMessage
              compact
              minimal={this.statusMinimal}
              onSelectionChanged={this.#statusButtonsSelectionChangedHandler}
            ></gx-ide-status-buttons>
          </footer>
        </gx-ide-container>
      </Host>
    );
  }
}
