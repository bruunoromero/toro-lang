import { Pattern } from "./pattern";
import { Location } from "./location";
import { Primitive } from "./primitive";
import { JSNode } from "../generator/js-node";

export class DoublePattern extends Pattern {
  constructor(public readonly pattern: DoubleLiteral) {
    super(pattern.loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class DoubleLiteral extends Primitive<number> {
  constructor(public readonly loc: Location, public readonly value: number) {
    super(loc, "Double", value);
  }
}
