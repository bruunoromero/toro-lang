import { ImportClause } from "./import-clause";
import { DefinitionClause } from "./definition-clause";

export class AST {
  imports: ImportClause[];
  definitions: DefinitionClause[];

  constructor() {
    this.imports = [];
    this.definitions = [];
  }
}
