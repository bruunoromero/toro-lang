import { AST } from "./ast";
import { ImportClause } from "./import-clause";
import { BaseVisitor } from "./parser";

export class Visitor extends BaseVisitor {
  ast: AST;
  constructor() {
    super();

    this.ast = new AST();
    this.validateVisitor();
  }

  program(ctx: any) {
    console.log(ctx);
    // if (ctx.importClause) {
    //   console.log(ctx.importClause);
    // }
    // return this.visit(ctx.program);
  }

  importClause(ctx: any) {
    console.log("asaasa");
    return ctx;
  }
}
