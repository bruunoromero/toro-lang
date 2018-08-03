import { ImportClause } from "./import-clause";
import { DefinitionClause } from "./definition-clause";

export class AST {
  modules: ImportClause[];
  definitions: DefinitionClause[];

  constructor() {
    this.modules = [];
    this.definitions = [];
  }
}
