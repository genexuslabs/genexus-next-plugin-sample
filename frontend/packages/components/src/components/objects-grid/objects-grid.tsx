import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { LoadObjectsCallback, ObjectDescription, OpenObjectCallback } from "./types";
import { Locale } from "../../common/locale";
import { ObjectType } from "../../common/types";
import { ChTabularGridCustomEvent, ComboBoxModel, TabularGridRowClickedEvent } from "@genexus/chameleon-controls-library";

const CSS_BUNDLES = [
    "resets/box-sizing",
    "utils/layout",
    "utils/typography",
    "components/combo-box",
    "components/tabular-grid"
];

@Component({
    tag: "sv-objects-grid",
    styleUrl: "objects-grid.scss",
    shadow: true,
    assetsDirs: ["assets"]
})
export class SVObjectsGrid {
    /**
     * The component strings translations.
     */
    // eslint-disable-next-line @stencil-community/own-props-must-be-private
    #componentLocale!: { [key in string]: any };
    #objectTypesModel!: ComboBoxModel;
    #typesSelectorRef!: HTMLChComboBoxRenderElement;

    @Element() el!: HTMLSvKbManagerImportElement;

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
                    startImgSrc: objectType.icon,
                    value: objectType.id
                }
            });
        }
        return this.#objectTypesModel;
    }

    #loadObjectsHandler = async () => {
        this.objects = await this.loadObjectsCallback(this.#typesSelectorRef?.value ?? '')
    }

    #openObjectHandler = (event:ChTabularGridCustomEvent<TabularGridRowClickedEvent>) => {
        this.openObjectCallback(event.detail.rowId)
    }

    async componentWillLoad() {
        this.#componentLocale = await Locale.getComponentStrings(this.el);
    }

    async componentDidLoad() {
        this.#loadObjectsHandler();
    }

    render() {
        const locale = this.#componentLocale;
        const types = this.#getTypesModel();
        return (
            <Host class="layout">
                <ch-theme model={CSS_BUNDLES} />
                <p class="header">{locale.header}</p>
                <ch-combo-box-render
                    id="type-selector"
                    class="type-selector combo-box"
                    accessibleName="Type Selector"
                    placeholder={locale.comboPlaceHolder}
                    model={types}
                    value={types.length > 0 ? types[0].value : ''}
                    ref={el =>
                        (this.#typesSelectorRef = el as HTMLChComboBoxRenderElement)
                    }
                    onInput={this.#loadObjectsHandler}
                />
                <ch-tabular-grid
                    class="tabular-grid objects-grid"
                    onRowDoubleClicked={this.#openObjectHandler}
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
                            return (
                                <ch-tabular-grid-row 
                                    class="tabular-grid-row"
                                    rowid={obj.id}
                                >
                                    <ch-tabular-grid-cell class="tabular-grid-cell">
                                        <ch-image src={obj.icon}/>
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
            </Host>
        )
    }
}