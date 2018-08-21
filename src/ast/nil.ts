import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class Nil extends Primitive<null> {
  constructor(public readonly loc: Location) {
    super(loc, null);
  }
}
