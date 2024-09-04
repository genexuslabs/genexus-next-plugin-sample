import { injectable } from 'inversify';

import { IGrammarsProvider } from "@genexusm-sdk/architecture-ui-framework";
import grammars from "../language/grammars.json";
import sampleObjectSyntax from "../language/syntaxes/object-sample-object.tmLanguage.json";

@injectable()
export class GrammarsProvider implements IGrammarsProvider {
    private _initialized:boolean;
    private _grammars: { [scopeName: string]: any/*GxScopeNameInfo*/ } = {};
    private _syntaxes: { [scopeName: string]: any } = {};

    async getGrammars(){
        if (!this._initialized){
            this._loadGrammars();
            this._setSyntaxes();
            this._initialized = true;
        }

        return grammars.contributes.grammars;
    }

    async getLanguages(){
        const languages: monaco.languages.ILanguageExtensionPoint[] = grammars.contributes.languages as any;
        return languages;
    }
    
    async fetchGrammar(scopeName:string) {
        const syntax = this._syntaxes[scopeName];
        if (syntax)
            return { type: 'json' , grammar: JSON.stringify(syntax) };
    }

    private _loadGrammars(){
        if (grammars.contributes) {
            for (const grammar of grammars.contributes.grammars) {
                this._grammars[grammar.scopeName] = grammar;
            }
        }
    }

    private _setSyntaxes(){
        this._syntaxes[sampleObjectSyntax.scopeName] = sampleObjectSyntax;
    }
}