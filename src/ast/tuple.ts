import { Type } from "./type";
import { Statement } from "./statement";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";
import { DerivatedPattern } from "./pattern";

export class TupleType extends Type {
  constructor(loc: Location, public readonly types: Type[]) {
    super(loc);
  }
}

export class TuplePattern extends DerivatedPattern {
  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class TupleLiteral extends Statement {
  constructor(loc: Location, public readonly properties: Statement[]) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
