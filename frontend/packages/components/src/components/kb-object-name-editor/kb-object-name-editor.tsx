import { Component, Element, h, Host, Prop } from "@stencil/core";
import { Locale } from "../../common/locale";
import { CancelCallback, ConfirmCallback } from "../../common/types";

const CSS_BUNDLES = [
    "resets/box-sizing",
    "components/button",
    "components/edit",
    "utils/form",
    "utils/layout",
    "utils/typography",
];

@Component({
    tag: "sv-kb-object-name-editor",
    styleUrl: "kb-object-name-editor.scss",
    shadow: true,
    assetsDirs: ["assets"]
})
export class SVKBObjectNameEditor {
    // eslint-disable-next-line @stencil-community/own-props-must-be-private
    #componentLocale!: { [key in string]: any };

    @Element() el!: HTMLSvKbObjectNameEditorElement;

    /**
     * KB Object Name value.
     */
    @Prop({ mutable: true }) value!: string;

    /**
     * Callback invoked to cancel.
     */
    @Prop() readonly cancelCallback!: CancelCallback;

    /**
     * Callback invoked to confirm.
     */
    @Prop() readonly confirmCallback!: ConfirmCallback;

    #cancelHandler = () => this.cancelCallback();

    #confirmHandler = () => this.confirmCallback();

    async componentWillLoad() {
        this.#componentLocale = await Locale.getComponentStrings(this.el);
    }

    render() {
        return (
            <Host>
                <ch-theme model={CSS_BUNDLES} />
                <div class="content">
                    <label class="label" htmlFor="input">
                        {this.#componentLocale.kbObjectNameLabel}
                    </label>
                    <ch-edit
                        id="input"
                        class="input"
                        type="text"
                        value={this.value}
                        onInput={(ev) => this.value = ev.detail as string}
                    />
                </div>
                <div class="footer">
                    <button class="button-secondary" onClick={this.#cancelHandler}>
                        {this.#componentLocale.cancel}
                    </button>
                    <button class="button-primary" onClick={this.#confirmHandler}>
                        {this.#componentLocale.confirm}
                    </button>
                </div>
            </Host>
        );
    }
}