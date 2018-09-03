import { Pattern } from "./pattern";
import { Location } from "./location";
import { Primitive } from "./primitive";
import { JSNode } from "../generator/js-node";

export class CharPattern extends Pattern {
  constructor(public readonly pattern: CharLiteral) {
    super(pattern.loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class CharLiteral extends Primitive<string> {
  constructor(loc: Location, value: string) {
    super(loc, "Char", value);
  }
}
