import { ImportClause } from "./import-clause";
import { BaseVisitor } from "./parser";

export class Visitor extends BaseVisitor {
  constructor() {
    super();

    this.validateVisitor();
  }

  importClause(ctx: any) {
    return ctx;
    // return this.visit(ctx.importClause);
  }
}
