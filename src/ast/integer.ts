import { IntType } from "./primitives";
import { Value } from "./value";

export class Integer extends Value<number> {
  constructor(public readonly value: number) {
    super(new IntType(), value);
  }
}
