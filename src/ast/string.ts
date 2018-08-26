import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class StringLiteral extends Primitive<string> {
  constructor(public readonly loc: Location, public readonly value: string) {
    super(loc, "String", value);
  }
}
