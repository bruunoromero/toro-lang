import { Statement } from "./statement";
import { Type, FirstTypeNode } from "./type";
import { JSNode } from "../generator/js-node";
import { Location } from "./location";

export class ListType extends Type {
  constructor(public readonly loc: Location, public readonly type: Type) {
    super(loc);
  }
}

export class ListLiteral extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly elements: Statement[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
