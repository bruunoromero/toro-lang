import { Body } from "./body";
import { Node } from "./node";
import { Type } from "./type";
import { Statement } from "./statement";
import { Identifier } from "./identifier";
import { JSNode } from "./../generator/js-node";
import { Location } from "./location";

export class FunctionType extends Type {
  constructor(
    loc: Location,
    public readonly params: Type[],
    public readonly type: Type,
  ) {
    super(loc);
  }
}

export class FunctionLiteral extends Statement {
  constructor(
    loc: Location,
    public readonly id: Identifier | null,
    public readonly params: FunctionParameter[],
    public readonly async = false,
    public readonly recursive = false,
    public readonly body: Body,
    type?: Type,
  ) {
    super(loc, type);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class FunctionParameter extends Node {
  constructor(
    loc: Location,
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
    loc: Location,
    public readonly callee: Statement,
    public readonly params: Statement[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
