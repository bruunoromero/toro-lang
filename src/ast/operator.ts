import { Node } from "./node";
import { Identifier } from "./identifier";
import { Location } from "../parser/location";
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
  constructor(public readonly loc: Location, public readonly name: Identifier) {
    super(loc);
  }
}

export class BinaryOperator extends Operator {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public left?: Node,
    public right?: Node,
  ) {
    super(loc, name);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }

  get isBinaryOperator() {
    return true;
  }

  get precedence(): number {
    const start = this.name.name[0];

    return (OPERATORS_OPT as any)[start];
  }

  get associativity(): OperatorAssociativity {
    return this.name.name.endsWith(":")
      ? OperatorAssociativity.Right
      : OperatorAssociativity.Left;
  }

  private pushLeft(value: Node): BinaryOperator {
    if (!this.left) {
      return new BinaryOperator(this.loc, this.name, value);
    } else if (!this.right) {
      return new BinaryOperator(this.loc, this.name, this.left, value);
    } else {
      const valueOp = value as BinaryOperator;

      if (valueOp.precedence <= this.precedence) {
        return new BinaryOperator(valueOp.loc, valueOp.name).push(this);
      } else {
        return new BinaryOperator(this.loc, this.name)
          .push(new BinaryOperator(valueOp.loc, valueOp.name, this.right))
          .push(this.left);
      }
    }
  }

  private pushRight(value: Node): BinaryOperator {
    if (!this.right) {
      return new BinaryOperator(this.loc, this.name, undefined, value);
    } else if (!this.left) {
      return new BinaryOperator(this.loc, this.name, value, this.right);
    } else {
      const valueOp = value as BinaryOperator;

      if (valueOp.precedence <= this.precedence) {
        return new BinaryOperator(valueOp.loc, valueOp.name).push(this);
      } else {
        return new BinaryOperator(this.loc, this.name)
          .push(this.right)
          .push(
            new BinaryOperator(valueOp.loc, valueOp.name, undefined, this.left),
          );
      }
    }
  }

  push(value: Node): BinaryOperator {
    if (this.associativity === OperatorAssociativity.Left) {
      return this.pushLeft(value);
    } else {
      return this.pushRight(value);
    }
  }
}

export class UnaryMinus extends Operator {
  constructor(public readonly loc: Location, public readonly value: Node) {
    super(loc, new Identifier(loc, "-"));
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class AccessOperator extends BinaryOperator {
  constructor(
    public readonly loc: Location,
    public left?: Node,
    public right?: Node,
  ) {
    super(loc, new Identifier(loc, "."), left, right);
  }
}
