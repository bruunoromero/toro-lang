import { BooleanType } from "./primitives";
import { Value } from "./value";

export class BooleanLiteral extends Value<boolean> {
  constructor(public readonly value: boolean) {
    super(new BooleanType(), value);
  }
}
