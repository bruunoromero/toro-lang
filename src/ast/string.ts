import { Pattern } from "./pattern";
import { Location } from "./location";
import { Primitive } from "./primitive";
import { JSNode } from "../generator/js-node";

export class StringPattern extends Pattern {
  constructor(public readonly pattern: StringLiteral) {
    super(pattern.loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class StringLiteral extends Primitive<string> {
  constructor(loc: Location, value: string) {
    super(loc, "String", value);
  }
}
