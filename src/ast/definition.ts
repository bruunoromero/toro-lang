import { Primitive } from "./primitive";
import { Identifier } from "./identifier";
import { Location } from "./../parser/location";

export class Definition extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public readonly value: Primitive<any>[],
  ) {
    super(loc, value);
  }
}
