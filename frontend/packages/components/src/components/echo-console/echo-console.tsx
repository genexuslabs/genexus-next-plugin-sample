import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import { Locale } from "../../common/locale";
import { CallToServerCallback } from "./types";

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
    #inputRef: HTMLChEditElement|undefined;

    @Element() el!: HTMLSvKbManagerImportElement;
    
    @State() consoleText:string[] = [];

    @Prop() readonly callToServerCallback!: CallToServerCallback;

    #callToServerHandler = async () => {
        const value = this.#inputRef?.value;
        if (value) {
            const newText = await this.callToServerCallback(value);
            this.consoleText.push(newText);
            this.consoleText = [ ...this.consoleText ];
        }        
    }

    async componentWillLoad() {
        this.#componentLocale = await Locale.getComponentStrings(this.el);
    }

    render(){
        return (
            <Host class="layout">
                <ch-theme model={CSS_BUNDLES} />
                <ch-edit 
                    id="input"
                    class="form-input"
                    type="text"
                    placeholder="Message to send..."
                    value="Test value"
                    ref={ (el) => this.#inputRef = el }
                />
                <button class="button-secondary button-icon-and-text" onClick={this.#callToServerHandler}>
                    <ch-image src="sv/navigation/chevron-right/blue" class="icon-sm"></ch-image>   
                    { this.#componentLocale.callServer }
                </button>
                <div class="console">
                    {
                        this.consoleText.map(text => 
                            <p>{text}</p>
                        )
                    }
                </div>
            </Host>
        );
    }
}