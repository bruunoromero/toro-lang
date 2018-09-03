import { Node } from "./node";
import { Identifier } from "./identifier";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

enum OperatorAssociativity {
  Left,
  Right,
}

export const OPERATORS_OPT = {
  "|": 1,
  "&": 2,
  "=": 3,
  "!": 3,
  ">": 4,
  "<": 4,
  ":": 5,
  "+": 6,
  "-": 6,
  "*": 7,
  "/": 7,
  "%": 7,
  "^": 8,
  ".": 9,
};

export abstract class Operator extends Node {
  constructor(loc: Location, public readonly id: Identifier) {
    super(loc);
  }
}

export class BinaryOperator extends Operator {
  constructor(
    loc: Location,
    id: Identifier,
    public left?: Node,
    public right?: Node,
  ) {
    super(loc, id);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }

  get precedence(): number {
    const start = this.id.name[0];

    return (OPERATORS_OPT as any)[start] || 0;
  }

  get associativity(): OperatorAssociativity {
    return this.id.name.endsWith(":")
      ? OperatorAssociativity.Right
      : OperatorAssociativity.Left;
  }

  push(value?: Node): BinaryOperator {
    if (value instanceof BinaryOperator) {
      const valueOp = value as BinaryOperator;
      if (
        (this.associativity === OperatorAssociativity.Left &&
          valueOp.precedence < this.precedence) ||
        (this.associativity === OperatorAssociativity.Right &&
          valueOp.precedence <= this.precedence)
      ) {
        return new BinaryOperator(
          valueOp.loc,
          valueOp.id,
          valueOp.left,
          new BinaryOperator(this.loc, this.id, valueOp.right, this.left),
        );
      } else {
        return new BinaryOperator(this.loc, this.id, valueOp, this.right);
      }
    }

    if (!this.left) {
      return new BinaryOperator(this.loc, this.id, value);
    } else if (!this.right) {
      return new BinaryOperator(this.loc, this.id, this.left, value);
    } else {
      return new BinaryOperator(
        this.loc,
        this.id,
        this.left,
        (this.right as BinaryOperator).push(value),
      );
    }
  }
}

export class UnaryMinus extends Operator {
  constructor(loc: Location, public readonly value: Node) {
    super(loc, new Identifier(loc, "-"));
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class Parenthesis extends Operator {
  constructor(loc: Location, public readonly value: Node) {
    super(loc, new Identifier(loc, "()"));
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
