import { ImportClause } from "./import-clause";
import { DefinitionClause } from "./definition-clause";

export class AST {
  exports: string[];
  imports: Map<string[], ImportClause>;
  definitions: Map<string, DefinitionClause>;

  constructor() {
    this.exports = [];
    this.imports = new Map();
    this.definitions = new Map();
  }
}
