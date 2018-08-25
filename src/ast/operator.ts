import { Node } from "./node";
import { Identifier } from "./identifier";
import { Location } from "../parser/location";
import { JSNode } from "../generator/js-node";

export abstract class Operator extends Node {
  constructor(public readonly loc: Location, public readonly name: Identifier) {
    super(loc);
  }
}

export class BinaryOperator extends Operator {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public readonly left: Node,
    public readonly right: Node,
  ) {
    super(loc, name);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
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
    public readonly left: Node,
    public readonly right: Node,
  ) {
    super(loc, new Identifier(loc, "."), left, right);
  }
}
