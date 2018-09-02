import { Primitive } from "./primitive";
import { Location } from "./location";

export class StringLiteral extends Primitive<string> {
  constructor(public readonly loc: Location, public readonly value: string) {
    super(loc, "String", value);
  }
}
