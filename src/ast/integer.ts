import { IntType } from "./primitives";
import { Value } from "./value";

export class Integer extends Value<number> {
  constructor(public readonly ctx: any, public readonly value: number) {
    super(ctx, new IntType(ctx), value);
  }
}
