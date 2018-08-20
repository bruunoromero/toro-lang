import { Primitive } from "./primitive";

export class Vector extends Primitive<Primitive<any>[]> {
  constructor(
    public readonly length: number,
    public readonly value: Primitive<any>[],
  ) {
    super(null, value);
  }
}
