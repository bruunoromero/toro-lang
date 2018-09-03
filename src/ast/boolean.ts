import { Primitive } from "./primitive";
import { Location } from "./location";

export class BooleanLiteral extends Primitive<boolean> {
  constructor(loc: Location, value: boolean) {
    super(loc, "Bool", value);
  }
}
