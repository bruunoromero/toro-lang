import { Primitive } from "./primitive";
import { Location } from "./location";

export class CharLiteral extends Primitive<string> {
  constructor(public readonly loc: Location, public readonly value: string) {
    super(loc, "Char", value);
  }
}
