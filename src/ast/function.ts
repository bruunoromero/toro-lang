import { Body } from "./body";
import { Node } from "./node";
import { Type } from "./type";
import { Definition } from "./definition";
import { Identifier } from "./identifier";
import { JSNode } from "./../generator/js-node";
import { Location } from "../parser/location";
import { Statement } from "./statement";

export class FunctionExpression extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly params: FunctionParameter[],
    public readonly async = false,
    public readonly body: Node[],
    public readonly returns?: Type,
  ) {
    super(loc, returns);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class FunctionParameter extends Node {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly type: Type,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class CallExpression extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly callee: Statement,
    public readonly params: Statement[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
