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

// import { Locale } from "../../../common/locale";
// import { FormElementValidation } from "../../../common/types";

@Component({
  tag: "k2b-connect-gx-server",
  styleUrl: "connect-gx-server.scss",
  shadow: true,
  assetsDirs: ["assets"]
})
export class K2BConnectGxServer {
  /**
   * The component hard-coded strings translations.
   */
  // eslint-disable-next-line @stencil-community/own-props-must-be-private
  #componentLocale: any;

  #serverURLRef!: HTMLChComboBoxElement;
  #gxAccountCheckboxRef!: HTMLChCheckboxElement;
  #usernameRef!: HTMLInputElement;
  #passwordRef!: HTMLInputElement;

  @Element() el!: HTMLK2bConnectGxServerElement;

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
    if (!this.connectCallback) {
      return;
    }
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
      <Host role="group" class="fieldset">
        <ch-theme name="mercury"></ch-theme>

        <div class="fieldset-group server-url">
          <label htmlFor="server-url" class="label label--above">
            Server URL
          </label>
          <ch-combo-box
            id="server-url"
            class="combo-box"
            accessibleName="Server URL"
            model={this.serverUrls}
            placeholder="Select the server URL"
            filterType={this.enableCustomServer ? "caption" : "none"}
            filterDebounce={100}
            value={this.defaultConnectionData?.serverUrl}
            // onFilterChange={handleFilterChange}
            ref={el => (this.#serverURLRef = el as HTMLChComboBoxElement)}
          ></ch-combo-box>
        </div>

        <ch-checkbox
          class="checkbox continue-with-genexus-account"
          accessibleName="Continue with GeneXus Account"
          checkedValue="true"
          caption="Continue with GeneXus Account"
          disabled={!this.enableUserLogged}
          value={this.enableUserLogged ? "true" : "false"}
          onInput={this.#handleCheckedChange}
          ref={el => (this.#gxAccountCheckboxRef = el as HTMLChCheckboxElement)}
        ></ch-checkbox>

        {this.showUsernameAndPassword
          ? [
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
            ]
          : null}

        <footer class="dialog-footer">
          <button class="button-primary" onClick={this.#connectClickHandler}>
            Connect
          </button>
          <button class="button-secondary" onClick={this.cancelCallback}>
            Cancel
          </button>
        </footer>
      </Host>
    );
  }
}
