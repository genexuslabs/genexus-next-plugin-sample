import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { AssetsManager } from '@genexusm-plugin-sample/common';
import { Locale } from "../../common/locale";
import { CallToServerCallback, CancelCallback, ConfirmCallback } from "./types";

const CSS_BUNDLES = [
    "resets/box-sizing",
    "components/button",
    "components/edit",
    "utils/layout",
    "utils/typography",
];

@Component({
    tag: "sv-echo-console",
    styleUrl: "echo-console.scss",
    shadow: true,
    assetsDirs: ["assets"]
})
export class SVEchoConsole {
    // eslint-disable-next-line @stencil-community/own-props-must-be-private
    #componentLocale!: { [key in string]: any };
    #inputRef: HTMLChEditElement | undefined;
    #callServerIcon!: string;

    @Element() el!: HTMLSvEchoConsoleElement;

    @State() consoleText: string[] = [];

    /**
     * Callback invoked to call server.
     */
    @Prop() readonly callToServerCallback!: CallToServerCallback;

    /**
     * Callback invoked to cancel.
     */
    @Prop() readonly cancelCallback!: CancelCallback;

    /**
     * Callback invoked to confirm.
     */
    @Prop() readonly confirmCallback!: ConfirmCallback;

    #callToServerHandler = async () => {
        const value = this.#inputRef?.value;
        if (value) {
            const newText = await this.callToServerCallback(value);
            this.consoleText.push(newText);
            this.consoleText = [...this.consoleText];
        }


    }

    #cancelHandler = () => this.cancelCallback();

    #confirmHandler = () => this.confirmCallback();

    #getCallServerIcon = () => {
        if (!this.#callServerIcon)
            this.#callServerIcon = AssetsManager.getIconPath({
                category: 'navigation',
                name: 'bullet',
                colorType: 'blue'
            }, 'sv');
        return this.#callServerIcon;
    }

    async componentWillLoad() {
        this.#componentLocale = await Locale.getComponentStrings(this.el);
    }

    render() {
        return (
            <Host class="layout">
                <ch-theme model={CSS_BUNDLES} />
                <div class="header">
                    <ch-edit
                        id="input"
                        class="input"
                        type="text"
                        placeholder="Message to send..."
                        value="Test value"
                        ref={(el) => this.#inputRef = el}
                    />
                    <button class="button-secondary button-icon-and-text" onClick={this.#callToServerHandler}>
                        <ch-image src={this.#getCallServerIcon()} class="icon-sm"></ch-image>
                        {this.#componentLocale.callServer}
                    </button>
                </div>
                <div class="console">
                    {
                        this.consoleText.map(text =>
                            <p>{text}</p>
                        )
                    }
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