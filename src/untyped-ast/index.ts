import { Import } from "./import";

export class AST {
  exports: string[];
  imports: Map<string[], Import>;

  constructor() {
    this.exports = [];
    this.imports = new Map();
  }
}
