import * as _ from "lodash";

import { AST } from "./ast";
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
    if (ctx.importClause) {
      this.ast.modules = this.visit(ctx.importClause);
    }

    if (ctx.definitionClause) {
      this.visit(ctx.definitionClause);
    }
  }

  importClause(ctx: any) {
    return ctx;
  }

  definitionClause(ctx: any) {
    console.log(ctx);
    return ctx;
  }

  expression(ctx: any) {
    return ctx;
  }

  block(ctx: any) {
    return ctx;
  }
}
