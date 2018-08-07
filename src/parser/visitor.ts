import { Char } from "../ast/char";
import { BooleanLiteral } from "../ast/boolean";
import * as _ from "lodash";
import { tokenMatcher } from "chevrotain";

import { TIMES, PLUS } from "../lexer/operators";

import { AST } from "../ast";
import { Type } from "../ast/type";
import { List } from "../ast/list";
import { Value } from "../ast/value";
import { Block } from "../ast/block";
import { Double } from "../ast/double";
import { BaseVisitor } from "./parser";
import { Integer } from "../ast/integer";
import { Expression } from "../ast/expression";
import { Definition } from "../ast/definition";
import { ImportClause } from "../ast/import-clause";
import { FunctionLiteral } from "../ast/function-literal";
import { DivisionOperation } from "../ast/division-operation";
import { AdditionOperation } from "../ast/addition-operation";
import { SubtractionOperation } from "../ast/subtraction-operation";
import { BinaryOperation, AtomicValue } from "../ast/binary-operation";
import { MultiplicationOperation } from "../ast/multiplication-operation";

export class Visitor extends BaseVisitor {
  ast: AST;
  constructor() {
    super();

    this.ast = new AST();
    this.validateVisitor();
  }

  program({ exportableDefinitionClause, importClause }: any): AST {
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

    if (exportableDefinitionClause) {
      _.each(exportableDefinitionClause, (definition: any) => {
        const def = this.visit(definition);

        if (this.ast.definitions.has(def.name)) {
          // TODO: throw duplicated declaration error
        } else {
          this.ast.definitions.set(def.name, def);

          if (def.exports) {
            this.ast.exports.push(def.name);
          }
        }
      });
    }

    return this.ast;
  }

  importClause(ctx: any): ImportClause {
    const { reference } = ctx;
    const path = this.visit(reference[0]);

    return new ImportClause(ctx, path);
  }

  exportableDefinitionClause({ EXPORT, definitionClause }: any) {
    const def = this.visit(definitionClause);
    def.exports = !!EXPORT;

    return def;
  }

  type(ctx: any) {}

  generics({ type, IDENTIFIER }: any) {
    const s = new Set();
    const types = _.map(type, this.visit);
    _.each(types, t => {
      if (s.has(t.name)) {
      } else {
        t.add(t.name);
      }
    });

    // return s;
  }

  genericsDefinition(ctx: any) {
    const { IDENTIFIER } = ctx;
    const counts = _.countBy(IDENTIFIER, id => id.image);
    const types = _.map(IDENTIFIER, id => new Type(ctx, id.image, false));

    const pairs = _.toPairs(counts);
    const repeatedPairs = _.filter(pairs, ([key, value]) => value > 1);
    const repeats = _.fromPairs(repeatedPairs);
    const repeatedKeys = _.keys(repeats);

    _.each(repeatedKeys, key => {
      throw new Error(`Repeated generic type ${key}`);
    });

    return types;
  }

  definitionClause(ctx: any): Definition {
    const {
      type,
      block,
      expression,
      IDENTIFIER,
      genericsDefinition,
      parameterDefinition,
    } = ctx;
    let expressions!: Block;

    let parameters = new Map();
    let gensDefs = [];

    if (genericsDefinition) {
      gensDefs = this.visit(genericsDefinition);
    }

    if (parameterDefinition) {
      parameters = this.visit(parameterDefinition);
    }

    if (block) {
      expressions = this.visit(block);
    } else if (expression) {
      expressions = new Block(ctx, new Map(), [this.visit(expression[0])]);
    }

    const def = new Definition(
      ctx,
      IDENTIFIER[0].image,
      new FunctionLiteral(ctx, parameters, expressions, new Type(ctx, "ola")),
      new Type(ctx, "ola"),
      gensDefs,
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

  block(ctx: any): Block {
    const { expression, definitionClause } = ctx;
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

    return new Block(ctx, definitions, expressions);
  }

  expressionOrDefinition(ctx: any) {}

  expression({ addition }: any): Expression {
    return this.visit(addition);
  }

  precendence1(ctx: any): AtomicValue | BinaryOperation {
    const left = this.visit(ctx.lhs);
    let operatorType = new AdditionOperation(ctx, left);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, idx: any) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.ADDITION_OPERATOR[idx];

        let newOperatorType: BinaryOperation;

        if (tokenMatcher(operator, PLUS)) {
          newOperatorType = new AdditionOperation(
            ctx,
            operatorType.left,
            rhsValue,
          );
        } else {
          newOperatorType = new SubtractionOperation(
            ctx,
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

  precendence2(ctx: any): AtomicValue | BinaryOperation {
    const left = this.visit(ctx.lhs);
    let operatorType = new MultiplicationOperation(ctx, left);

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand: any, idx: any) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.MULTIPLICATION_OPERATOR[idx];

        let newOperatorType: BinaryOperation;

        if (tokenMatcher(operator, TIMES)) {
          newOperatorType = new MultiplicationOperation(
            ctx,
            operatorType.left,
            rhsValue,
          );
        } else {
          newOperatorType = new DivisionOperation(
            ctx,
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

  arithmeticExpression(ctx: any) {
    if (ctx.parenthesis) {
      // passing an array to "this.visit" is equivalent
      // to passing the array's first element
      return this.visit(ctx.parenthesis);
    } else if (ctx.value) {
      // If a key exists on the ctx, at least one element is guaranteed
      return this.visit(ctx.value);
    }
  }

  atomicValues(ctx: any) {}

  logical(ctx: any) {}

  booleanValues(ctx: any) {}

  parenthesis(ctx: any) {
    return this.visit(ctx.addition);
  }

  value(ctx: any): Value<any> {
    const {
      CHAR,
      TRUE,
      list,
      FALSE,
      MINUS,
      STRING,
      DOUBLE,
      INTEGER,
      functionCall,
      PLUS: HAS_PLUS,
    } = ctx;
    const multiplier = MINUS ? -1 : 1;

    if (STRING) {
      // return new String(_.trim(STRING[0].image, '"'));
    } else if (INTEGER) {
      const value = multiplier * parseInt(INTEGER[0].image, 10);
      return new Integer(ctx, value);
    } else if (CHAR) {
      return new Char(ctx, _.trim(CHAR[0].image, "'"));
    } else if (DOUBLE) {
      const value = multiplier * parseFloat(DOUBLE[0].image);
      return new Double(ctx, value);
    } else if (TRUE) {
      return new BooleanLiteral(ctx, true);
    } else if (FALSE) {
      return new BooleanLiteral(ctx, false);
    } else if (list) {
      return this.visit(list);
    } else if (functionCall) {
      return this.visit(functionCall);
    }

    throw Error("Could not parse value");
  }

  list(ctx: any) {}

  functionCall(ctx: any) {
    const { reference, addition } = ctx;
    const add = _.map(addition, (addi: any) => this.visit(addi));
    const ref = this.visit(reference);

    return new Expression(ctx, new Integer(ctx, 10));
  }

  reference({ IDENTIFIER }: any): string[] {
    return _.map(IDENTIFIER, id => id.image);
  }
}
