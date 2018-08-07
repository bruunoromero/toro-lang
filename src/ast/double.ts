import { DoubleType } from "./primitives";
import { Value } from "./value";

export class Double extends Value<number> {
  constructor(public readonly value: number) {
    super(new DoubleType(), value);
  }
}
