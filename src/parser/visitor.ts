import * as _ from "lodash";
import { tokenMatcher } from "chevrotain";

import { TIMES, PLUS } from "../lexer/operators";

import { AST } from "../ast";
import { BaseVisitor } from "./parser";
import { ValueClause } from "../ast/value-clause";
import { BlockClause } from "../ast/block-caluse";
import { DoubleClause } from "../ast/double-clause";
import { StringClause } from "../ast/string-clause";
import { ImportClause } from "../ast/import-clause";
import { IntegerClause } from "../ast/integer-clause";
import { FunctionClause } from "../ast/function-clause";
import { ExpressionClause } from "../ast/expression-clause";
import { DefinitionClause } from "../ast/definition-clause";
import { BinaryOperation, AtomicValue } from "../ast/binary-operation";
import { DivisionOperation } from "../ast/division-operation";
import { AdditionOperation } from "../ast/addition-operation";
import { SubtractionOperation } from "../ast/subtraction-operation";
import { MultiplicationOperation } from "../ast/multiplication-operation";

export class Visitor extends BaseVisitor {
  ast: AST;
  constructor() {
    super();

    this.ast = new AST();
    this.validateVisitor();
  }

  program({ definitionClause, importClause }: any): AST {
    if (importClause) {
      _.each(importClause, (clause: any) => {
        const impt = this.visit(clause);

        if (this.ast.imports.has(impt.path)) {
          // TODO: throw duplicated import error
        } else {
          this.ast.imports.set(impt.path, impt);
        }
      });
    }

    if (definitionClause) {
      _.each(definitionClause, (definition: any) => {
        const def = this.visit(definition);

        if (this.ast.definitions.has(def.name)) {
          // TODO: throw duplicated declaration error
        } else {
          this.ast.definitions.set(def.name, def);
        }
      });
    }

    return this.ast;
  }

  importClause({ reference }: any): ImportClause {
    const path = this.visit(reference[0]);

    return new ImportClause(path);
  }

  definitionClause({
    block,
    expression,
    IDENTIFIER,
    parameterDefinition,
  }: any): DefinitionClause {
    let expressions!: BlockClause;

    let parameters = new Map();

    if (parameterDefinition) {
      parameters = this.visit(parameterDefinition);
    }

    if (block) {
      expressions = this.visit(block[0]);
    } else if (expression) {
      expressions = new BlockClause(new Map(), [this.visit(expression[0])]);
    }

    const def = new DefinitionClause(
      IDENTIFIER[0].image,
      new FunctionClause(parameters, expressions),
    );

    _.each(expression, exp => {
      exp.parent = def;
    });

    return def;
  }

  parameterDefinition({ name, type }: any) {
    const parameters = new Map();
    _.each(name, (value, idx) => {
      if (!parameters.has(value)) {
        const parameterType = type[idx].image;

        parameters.set(value.image, parameterType);
      } else {
        throw Error("Double parameter declararion");
      }
    });

    return parameters;
  }

  expression({ addition }: any): ExpressionClause {
    return this.visit(addition);
  }

  functionCall({ reference, addition }: any) {
    const add = _.map(addition, (addi: any) => this.visit(addi));
    const ref = this.visit(reference);

    return new ExpressionClause(new IntegerClause(10));
  }

  value({
    MINUS,
    STRING,
    DOUBLE,
    INTEGER,
    functionCall,
    PLUS: HAS_PLUS,
  }: any): ValueClause<string | number> {
    const multiplier = MINUS ? -1 : 1;

    if (STRING) {
      if (HAS_PLUS && MINUS) {
        throw Error("Could not parse value");
      }

      return new StringClause(_.trim(STRING[0].image, '"'));
    } else if (INTEGER) {
      const value = multiplier * parseInt(INTEGER[0].image, 10);
      return new IntegerClause(value);
    } else if (DOUBLE) {
      const value = multiplier * parseFloat(DOUBLE[0].image);
      return new DoubleClause(value);
    } else if (functionCall) {
      return this.visit(functionCall);
    }

    throw Error("Could not parse value");
  }

  addition(ctx: any): AtomicValue | BinaryOperation {
    const left = this.visit(ctx.lhs);
    let operatorType = new AdditionOperation(left);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, idx: any) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.ADDITION_OPERATOR[idx];

        let newOperatorType: BinaryOperation;

        if (tokenMatcher(operator, PLUS)) {
          newOperatorType = new AdditionOperation(operatorType.left, rhsValue);
        } else {
          newOperatorType = new SubtractionOperation(
            operatorType.left,
            rhsValue,
          );
        }

        operatorType.right = newOperatorType;
        operatorType = newOperatorType;
      });
    }

    return operatorType.squash();
  }

  multiplication(ctx: any): AtomicValue | BinaryOperation {
    const left = this.visit(ctx.lhs);
    let operatorType = new MultiplicationOperation(left);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, idx: any) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.MULTIPLICATION_OPERATOR[idx];

        let newOperatorType: BinaryOperation;

        if (tokenMatcher(operator, TIMES)) {
          newOperatorType = new MultiplicationOperation(
            operatorType.left,
            rhsValue,
          );
        } else {
          newOperatorType = new DivisionOperation(operatorType.left, rhsValue);
        }

        operatorType.right = newOperatorType;
        operatorType = newOperatorType;
      });
    }

    return operatorType.squash();
  }

  atomic(ctx: any) {
    if (ctx.parenthesis) {
      // passing an array to "this.visit" is equivalent
      // to passing the array's first element
      return this.visit(ctx.parenthesis);
    } else if (ctx.value) {
      // If a key exists on the ctx, at least one element is guaranteed
      return this.visit(ctx.value);
    }
  }

  parenthesis(ctx: any) {
    return this.visit(ctx.arithmetic);
  }

  reference({ IDENTIFIER }: any): string[] {
    return _.map(IDENTIFIER, id => id.image);
  }

  block({ expression, definitionClause }: any): BlockClause {
    const expressions = expression
      ? _.map(expression, (exp: any) => this.visit(exp))
      : [];

    const definitions = new Map();
    if (definitionClause) {
      _.each(definitionClause, def => {
        const definition = this.visit(def);
        if (definitions.has(definition.name)) {
        } else {
          definitions.set(definition.name, def);
        }
      });
    }

    return new BlockClause(definitions, expressions);
  }
}
