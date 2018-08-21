import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class Vector extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly loc: Location,
    public readonly length: number,
    public readonly value: Primitive<any>[],
  ) {
    super(loc, value);
  }
}
