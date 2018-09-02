import { Type } from "./type";
import { Statement } from "./statement";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export class TupleType extends Type {
  constructor(public readonly loc: Location, public readonly types: Type[]) {
    super(loc);
  }
}

export class TupleLiteral extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly properties: Statement[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
