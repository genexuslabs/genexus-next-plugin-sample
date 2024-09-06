import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { LoadObjectsCallback, ObjectDescription, ObjectType, OpenObjectCallback } from "./types";
import { Locale } from "../../common/locale";
import { ChTabularGridCustomEvent, ChTreeViewRenderCustomEvent, ComboBoxModel, TabularGridRowClickedEvent, TreeViewItemModel, TreeViewItemOpenReferenceInfo, TreeViewModel } from "@genexus/chameleon-controls-library";

const CSS_BUNDLES = [
    "resets/box-sizing",
    "utils/layout",
    "utils/typography",
    "components/combo-box",
    "components/tabular-grid",
    "components/tree-view"
];

const OBJECT_ID_METADATA = 'object';

@Component({
    tag: "sv-object-selector",
    styleUrl: "object-selector.scss",
    shadow: true,
    assetsDirs: ["assets"]
})
export class SVObjectSelector {
    /**
     * The component strings translations.
     */
    // eslint-disable-next-line @stencil-community/own-props-must-be-private
    #componentLocale!: { [key in string]: any };
    #objectTypesModel!: ComboBoxModel;
    #typesSelectorRef!: HTMLChComboBoxRenderElement;

    @Element() el!: HTMLSvObjectSelectorElement;

    @State() objects: ObjectDescription[] = [];

    /**
     * The available object types.
     */
    @Prop() readonly objectTypes: ObjectType[] = [];

    /**
     * Callback invoked to load objects (filtered by selected type)
     */
    @Prop() readonly loadObjectsCallback!: LoadObjectsCallback;

    /**
     * Callback invoked to open the selected objects
     */
    @Prop() readonly openObjectCallback!: OpenObjectCallback;

    #getTypesModel = () => {
        if (!this.#objectTypesModel) {
            this.#objectTypesModel = this.objectTypes.map(objectType => {
                return {
                    caption: objectType.name,
                    value: objectType.id
                }
            });
        }
        return this.#objectTypesModel;
    }

    #getType = (id:string) => {
        return this.objectTypes.find(type => type.id === id);
    }

    #getTreeModel = () => {
        const treeModel:TreeViewModel = [];
        const typedObjectsMap:Map<string, ObjectDescription[]> = new Map<string, ObjectDescription[]>();

        for(let object of this.objects) {
            let objectsInMap:ObjectDescription[] = [];
            if (typedObjectsMap.has(object.typeId))
                objectsInMap = typedObjectsMap.get(object.typeId) as ObjectDescription[];
            objectsInMap.push(object);
            typedObjectsMap.set(object.typeId, objectsInMap);
        }

        for(const [key, value] of typedObjectsMap.entries()) {
            const type = this.#getType(key);
            if (type){
                const typeNode: TreeViewItemModel = {
                    id: type.id,
                    caption: type.name,
                    startImgSrc: type.icon,
                    items: [],
                    leaf: false
                }

                for (const objectDescription of value) {
                    typeNode.items?.push({
                        id: objectDescription.id,
                        caption: objectDescription.name,
                        startImgSrc: type.icon,
                        leaf: true,
                        metadata: OBJECT_ID_METADATA
                    })
                }

                treeModel.push(typeNode);
            }            
        }

        return treeModel;
    }

    #loadObjectsHandler = async () => {
        const selectorValue = this.#typesSelectorRef?.value;
        this.objects = await this.loadObjectsCallback(
            selectorValue ? selectorValue : this.objectTypes.length > 0 ? this.objectTypes[0].id : ''
        );
    }

    #rowDoubleClickedHandler = (event:ChTabularGridCustomEvent<TabularGridRowClickedEvent>) => {
        this.openObjectCallback(event.detail.rowId)
    }

    #itemOpenReferenceHandler = (event: ChTreeViewRenderCustomEvent<TreeViewItemOpenReferenceInfo>) => {
        if (event.detail.metadata === OBJECT_ID_METADATA)
            this.openObjectCallback(event.detail.id)
    }

    #renderGrid = () => {
        return (
            <ch-tabular-grid
                class="tabular-grid"
                onRowDoubleClicked={this.#rowDoubleClickedHandler}
                >
                <ch-tabular-grid-columnset class="tabular-grid-column-set">
                    <ch-tabular-grid-column
                        class="tabular-grid-column"
                        column-id="icon"
                        column-name="Icon"
                        size='auto'
                        settingable={false}                            
                    />
                    <ch-tabular-grid-column
                        class="tabular-grid-column"
                        column-id="name"
                        column-name="Name"
                        size='1fr'
                        settingable={false} 
                    />
                    <ch-tabular-grid-column
                        class="tabular-grid-column"
                        column-id="name"
                        column-name="Description"
                        size='1fr'
                        settingable={false} 
                    />
                </ch-tabular-grid-columnset>
                {
                    this.objects.map(obj => {
                        const type = this.#getType(obj.typeId);
                        return (
                            <ch-tabular-grid-row 
                                class="tabular-grid-row"
                                rowid={obj.id}
                            >
                                <ch-tabular-grid-cell class="tabular-grid-cell">
                                    <ch-image src={type?.icon}/>
                                </ch-tabular-grid-cell> 
                                <ch-tabular-grid-cell class="tabular-grid-cell">
                                    {obj.name}
                                </ch-tabular-grid-cell> 
                                <ch-tabular-grid-cell class="tabular-grid-cell">
                                    {obj.description}
                                </ch-tabular-grid-cell> 
                            </ch-tabular-grid-row>
                        )
                    })
                }
            </ch-tabular-grid>
        );
    }

    #renderTree = () => {
        return (
            <ch-tree-view-render
                class="tree-view"
                model={this.#getTreeModel()}
                showLines="last"
                onItemOpenReference={this.#itemOpenReferenceHandler}
            />
        );
    }

    async componentWillLoad() {
        this.#componentLocale = await Locale.getComponentStrings(this.el);
        this.#loadObjectsHandler();
    }

    render() {
        const types = this.#getTypesModel();
        return (
            <Host class="layout">
                <ch-theme model={CSS_BUNDLES} />
                <p class="header">{this.#componentLocale.header}</p>
                <ch-combo-box-render
                    id="type-selector"
                    class="type-selector combo-box"
                    accessibleName="Type Selector"
                    placeholder={this.#componentLocale.comboPlaceHolder}
                    model={types}
                    value={types.length > 0 ? types[0].value : ''}
                    ref={el =>
                        (this.#typesSelectorRef = el as HTMLChComboBoxRenderElement)
                    }
                    onInput={this.#loadObjectsHandler}
                />
                <div class="objects">
                    { this.#renderGrid() }
                    { this.#renderTree() }
                </div>
            </Host>
        )
    }
}