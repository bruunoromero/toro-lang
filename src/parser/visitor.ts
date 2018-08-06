import * as _ from "lodash";

import { AST } from "../ast/ast";
import { BaseVisitor } from "./parser";
import { ValueClause } from "../ast/value-clause";
import { DoubleClause } from "../ast/double-clause";
import { StringClause } from "../ast/string-clause";
import { ImportClause } from "../ast/import-clause";
import { IntegerClause } from "../ast/integer-clause";
import { ExpressionClause } from "../ast/expression-clause";
import { DefinitionClause } from "../ast/definition-clause";

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

  expression({ value, ...res }: any): ExpressionClause[] {
    let exps: ExpressionClause[] = [];
    console.log(res);
    if (value) {
      exps = [this.visit(value[0])];
    }

    return exps;
  }

  functionCall(ctx: any) {}

  value({ STRING, INTEGER, DOUBLE }: any): ValueClause<string | number> {
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

  addition(ctx: any) {}
  multiplication(ctx: any) {}
  atomic(ctx: any) {}
  parenthesis(ctx: any) {}
  arithmetic(ctx: any) {}

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
