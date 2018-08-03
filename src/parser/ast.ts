import { ImportClause } from "./import-clause";

export class AST {
  modules: ImportClause[];

  constructor() {
    this.modules = [];
  }
}
