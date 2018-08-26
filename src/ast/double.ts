import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class DoubleLiteral extends Primitive<number> {
  constructor(public readonly loc: Location, public readonly value: number) {
    super(loc, "Double", value);
  }
}
