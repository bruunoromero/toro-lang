import { ImportClause } from "./import-clause";
import { DefinitionClause } from "./definition-clause";

export class AST {
  imports: Map<string[], ImportClause>;
  definitions: Map<string, DefinitionClause>;

  constructor() {
    this.imports = new Map();
    this.definitions = new Map();
  }
}
