import { Type } from "./type";
import { Statement } from "./statement";
import { JSNode } from "../generator/js-node";
import { Location } from "./location";
import { DerivatedPattern } from "./pattern";

export class ListType extends Type {
  constructor(loc: Location, public readonly type: Type) {
    super(loc);
  }
}

export class ListPattern extends DerivatedPattern {
  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class ListLiteral extends Statement {
  constructor(loc: Location, public readonly elements: Statement[]) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
