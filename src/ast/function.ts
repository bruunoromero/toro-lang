import { Vector } from "./vector";
import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class FunctionLiteral extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly loc: Location,
    public readonly params: Vector,
    public readonly value: Primitive<any>[],
  ) {
    super(loc, value);
  }
}
