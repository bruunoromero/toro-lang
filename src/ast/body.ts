import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class Body extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly loc: Location,
    public readonly value: Primitive<any>[],
  ) {
    super(loc, value);
  }
}
