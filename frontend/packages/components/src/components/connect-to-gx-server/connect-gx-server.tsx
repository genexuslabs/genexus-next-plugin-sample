import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";
import { ComboBoxModel } from "@genexus/chameleon-controls-library";
import {
  ConnectionResultData,
  GXServerConnectionData,
  GXServerConnectionDefault
} from "./types";
import { MercuryBundles } from "@genexus/mercury";

// import { Locale } from "../../../common/locale";
// import { FormElementValidation } from "../../../common/types";

// Best performance bundle
const CSS_BUNDLES: MercuryBundles = [
  "resets/box-sizing",
  "utils/form",
  "utils/layout",
  "components/button",
  "components/checkbox",
  "components/combo-box",
  "components/edit"
];

// More practical, but less efficient bundle
// const CSS_BUNDLES: MercuryBundles = [
//   "resets/box-sizing",
//   "utils/form--full", // Difference
//   "utils/layout",
//   "utils/typography",
// ];

@Component({
  tag: "sv-connect-gx-server",
  styleUrl: "connect-gx-server.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class SVConnectGxServer {
  /**
   * The component hard-coded strings translations.
   */
  // #componentLocale: any;

  // eslint-disable-next-line @stencil-community/own-props-must-be-private
  #serverURLRef!: HTMLChComboBoxRenderElement;
  #gxAccountCheckboxRef!: HTMLChCheckboxElement;
  #usernameRef!: HTMLInputElement;
  #passwordRef!: HTMLInputElement;

  @Element() el!: HTMLSvConnectGxServerElement;

  @State() showUsernameAndPassword: boolean = false;

  /**
   * Callback that must be invoked when the 'Connect' button is pressed.
   */
  @Prop() readonly connectCallback!: (
    data: GXServerConnectionData
  ) => Promise<ConnectionResultData>;

  /**
   * Callback that must be invoked when the 'Cancel' button is pressed.
   */
  @Prop() readonly cancelCallback!: () => Promise<void>;

  /**
   * Initial user values ​​for the case in which the user returns to the login
   * modal after successful authentication.
   */
  @Prop() readonly defaultConnectionData?: GXServerConnectionDefault;

  /**
   * `true` if the user should be allowed to manually enter a server URL.
   */
  @Prop() readonly enableCustomServer: boolean = false;

  /**
   * `true` if the user is already authenticated in the Web IDE.
   */
  @Prop() readonly enableUserLogged: boolean = false;

  /**
   * Array of cataloged server URLs to be displayed in the combo.
   */
  @Prop() readonly serverUrls!: ComboBoxModel;

  /**
   * Fired when the component has rendered for the first time.
   */
  @Event() componentDidRenderFirstTime!: EventEmitter<string>;

  #handleCheckedChange = () => {
    this.showUsernameAndPassword = !this.showUsernameAndPassword;
  };

  #connectClickHandler = async () => {
    const connectionResultData = await this.connectCallback({
      serverUrl: this.#serverURLRef.value!,
      userName: this.#usernameRef?.value,
      password: this.#passwordRef?.value,
      continueWithGeneXusAccount: this.#gxAccountCheckboxRef.value === "true"
    });

    console.log(connectionResultData);
  };

  async connectedCallback() {
    // this.#componentLocale = await Locale.getComponentStrings(this.el);
    this.showUsernameAndPassword = !this.enableUserLogged;
  }

  componentDidLoad() {
    // this.componentDidRenderFirstTime.emit(this.#componentLocale.componentName);
  }

  render() {
    return (
      <Host role="group" class="layout">
        <ch-theme model={CSS_BUNDLES}></ch-theme>

        <form>
          <div class="fieldset-group server-url">
            <label htmlFor="server-url" class="label label--above">
              Server URL
            </label>
            <ch-combo-box-render
              id="server-url"
              class="combo-box"
              accessibleName="Server URL"
              model={this.serverUrls}
              placeholder="Select the server URL"
              suggest={this.enableCustomServer}
              suggestDebounce={100}
              value={this.defaultConnectionData?.serverUrl}
              // onFilterChange={handleFilterChange}
              ref={(el:any) => (this.#serverURLRef = el as HTMLChComboBoxRenderElement)}
            ></ch-combo-box-render>
          </div>

          <ch-checkbox
            class="checkbox continue-with-genexus-account"
            accessibleName="Continue with GeneXus Account"
            checkedValue="true"
            caption="Continue with GeneXus Account"
            disabled={!this.enableUserLogged}
            value={this.enableUserLogged ? "true" : "false"}
            onInput={this.#handleCheckedChange}
            ref={el =>
              (this.#gxAccountCheckboxRef = el as HTMLChCheckboxElement)
            }
          ></ch-checkbox>

          {this.showUsernameAndPassword && [
            <div class="fieldset-group username">
              <label class="label label--above">Username</label>
              <input
                type="text"
                class="form-input"
                value={this.defaultConnectionData?.userName}
                ref={el => (this.#usernameRef = el as HTMLInputElement)}
              />
            </div>,
            <div class="fieldset-group password">
              <label class="label label--above">Password</label>
              <input
                type="password"
                class="form-input"
                value={this.defaultConnectionData?.password}
                ref={el => (this.#passwordRef = el as HTMLInputElement)}
              />
            </div>
          ]}

          <div class="dialog-footer">
            <button
              class="button-secondary"
              type="button"
              onClick={this.cancelCallback}
            >
              Cancel
            </button>
            <button
              class="button-primary"
              type="button"
              onClick={this.#connectClickHandler}
            >
              Connect
            </button>
          </div>
        </form>
      </Host>
    );
  }
}
