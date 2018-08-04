import * as _ from "lodash";
import { IToken } from "chevrotain";

import { AST } from "./ast";
import { BaseVisitor } from "./parser";
import { ValueClause } from "./value-clause";
import { DoubleClause } from "./double-clause";
import { StringClause } from "./string-clause";
import { ImportClause } from "./import-clause";
import { IntegerClause } from "./integer-clause";
import { ExpressionClause } from "./expression-clause";
import { DefinitionClause } from "./definition-clause";

export class Visitor extends BaseVisitor {
  ast: AST;
  constructor() {
    super();

    this.ast = new AST();
    this.validateVisitor();
  }

  program(ctx: any): AST {
    if (ctx.importClause) {
      this.ast.imports = _.map(ctx.importClause, (clause: any) =>
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

  importClause({ reference }: any): ImportClause {
    const path = this.visit(reference[0]);

    return new ImportClause(path);
  }

  definitionClause({ IDENTIFIER, block, expression }: any): DefinitionClause {
    let expressions: ExpressionClause[] = [];

    if (block) {
      expressions = this.visit(block[0]);
    } else if (expression) {
      expressions = [this.visit(expression[0])];
    }

    return new DefinitionClause(IDENTIFIER[0].image, expressions);
  }

  expression({ term }: any): ExpressionClause[] {
    let exps: ExpressionClause[] = [];

    if (term) {
      exps = [this.visit(term[0])];
    }

    return exps;
  }

  functionCall(ctx: any) {}

  term({ STRING, INTEGER, DOUBLE }: any): ValueClause<string | number> {
    let value;

    if (STRING) {
      value = new StringClause(_.trim(STRING[0].image, '"'));
    } else if (INTEGER) {
      value = new IntegerClause(parseInt(INTEGER[0].image, 10));
    } else if (DOUBLE) {
      value = new DoubleClause(parseFloat(DOUBLE[0].image));
    } else {
      throw Error("Could not parse value");
    }

    return value;
  }

  reference({ IDENTIFIER }: any): string[] {
    return _.map(IDENTIFIER, id => id.image);
  }

  block({ expression }: any): ExpressionClause[] {
    const expressions = expression
      ? _.map(expression, (exp: any) => this.visit(exp))
      : [];

    return expressions;
  }
}
