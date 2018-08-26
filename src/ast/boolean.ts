import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class BooleanLiteral extends Primitive<boolean> {
  constructor(public readonly loc: Location, public readonly value: boolean) {
    super(loc, "Bool", value);
  }
}
