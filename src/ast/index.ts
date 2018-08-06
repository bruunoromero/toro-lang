import { ImportClause } from "./import-clause";
import { Definition } from "./definition";

export class AST {
  exports: string[];
  imports: Map<string[], ImportClause>;
  definitions: Map<string, Definition>;

  constructor() {
    this.exports = [];
    this.imports = new Map();
    this.definitions = new Map();
  }
}
