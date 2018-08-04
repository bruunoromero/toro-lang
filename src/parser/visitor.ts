import { ExpressionClause } from "./expression-clause";
import { DefinitionClause } from "./definition-clause";
import { IToken } from "chevrotain";
import { ImportClause } from "./import-clause";
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

  program(ctx: any): AST {
    if (ctx.importClause) {
      this.ast.modules = _.map(ctx.importClause, (clause: any) =>
        this.visit(clause),
      );
    }

    if (ctx.definitionClause) {
      this.ast.definitions = _.map(ctx.definitionClause, (definition: any) =>
        this.visit(definition),
      );
    }

    return this.ast;
  }

  importClause({ IDENTIFIER }: any): ImportClause {
    const path = _.map(IDENTIFIER, (identifier: IToken) => identifier.image);
    return new ImportClause(path);
  }

  definitionClause({ IDENTIFIER, block, expression }: any): DefinitionClause {
    let definitions: DefinitionClause[] = [];
    let expressions: ExpressionClause[] = [];
    if (block) {
      const parsedBlock = this.visit(block[0]);

      expressions = parsedBlock.expressions;
      definitions = parsedBlock.definitions;
    } else if (expression) {
      expressions = [this.visit(expression[0])];
    }

    return new DefinitionClause(IDENTIFIER[0].image, definitions, expressions);
  }

  expression(ctx: any): ExpressionClause[] {
    const exps: ExpressionClause[] = [];
    console.log(ctx);

    return exps;
  }

  functionCall(ctx: any) {}

  term(ctx: any) {
    console.log(ctx);
  }

  reference(ctx: any) {}

  block({
    expression,
    definitionClause,
  }: any): {
    definitions: DefinitionClause[];
    expressions: ExpressionClause[];
  } {
    const expressions = expression
      ? _.map(expression, (exp: any) => this.visit(exp))
      : [];
    const definitions = definitionClause
      ? _.map(definitionClause, (def: any) => this.visit(def))
      : [];

    return {
      expressions,
      definitions,
    };
  }
}
