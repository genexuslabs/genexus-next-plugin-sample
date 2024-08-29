import { Build } from "@stencil/core";

export class Locale {
  private static _defaultLanguage = "en";
  private static _assetsFolder = "assets/";
  private static _componentPrefix = "k2b-";
  private static _langsFolder = "langs/";
  private static _langPrefix = ".lang.";
  private static _langExt = ".json";
  public static commonAssetsPath = "";

  private static getLang(): string {
    let lang = document
      .getElementsByTagName("html")[0]
      .getAttribute("lang")
      ?.valueOf();

    // Normalize en-US
    if (lang === "en-US") {
      lang = "en";
    }
    return lang as any;
  }

  private static getStrings(component: string, lang: string): Promise<any> {
    const path = `${Locale.commonAssetsPath}${Locale._assetsFolder}${this._langsFolder}${component}${Locale._langPrefix}${lang}${Locale._langExt}`;
    console.log(path);

    return new Promise((resolve, reject): void => {
      fetch(Build.isDev ? "build/" + path : path)
        // Locale.commonAssetsPath +
        // Locale._assetsFolder +
        // folder +
        // Locale._assetsFolderSuffix +
        // component +
        // Locale._langPrefix +
        // lang +
        // Locale._langExt
        .then(
          langFile => {
            if (langFile.ok) {
              resolve(langFile.json());
            } else {
              reject();
            }
          },
          () => reject()
        );
    });
  }

  public static async getComponentStrings(
    element: HTMLElement,
    component = ""
  ): Promise<any> {
    if (component === "") {
      component = element.tagName
        .toLowerCase()
        .replace(this._componentPrefix, "");
    }
    const lang = Locale.getLang();
    let strings;

    try {
      strings = await Locale.getStrings(component, lang);
    } catch (e) {
      strings = await Locale.getStrings(component, Locale._defaultLanguage);
    }

    return strings;
  }

  public static format(text: string, parms: string[]): string {
    let ret: string = text;
    parms.forEach(parm => {
      ret = ret.replace(`{${parms.indexOf(parm)}}`, parm);
    });
    return ret;
  }
}
