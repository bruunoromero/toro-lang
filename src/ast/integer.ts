import { Pattern } from "./pattern";
import { Location } from "./location";
import { Primitive } from "./primitive";
import { JSNode } from "../generator/js-node";

export class IntegerPattern extends Pattern {
  constructor(public readonly pattern: IntegerLiteral) {
    super(pattern.loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class IntegerLiteral extends Primitive<number> {
  constructor(public readonly loc: Location, public readonly value: number) {
    super(loc, "Int", value);
  }
}
