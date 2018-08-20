import { Primitive } from "./primitive";

export class List extends Primitive<Primitive<any>[]> {
  constructor(public readonly value: Primitive<any>[]) {
    super(null, value);
  }
}
