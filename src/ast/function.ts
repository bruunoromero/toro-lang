import { Vector } from "./vector";
import { Primitive } from "./primitive";

export class FunctionLiteral extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly params: Vector,
    public readonly value: Primitive<any>[],
  ) {
    super(null, value);
  }
}
