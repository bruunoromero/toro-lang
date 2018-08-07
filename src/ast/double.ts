import { DoubleType } from "./primitives";
import { Value } from "./value";

export class Double extends Value<number> {
  constructor(public readonly ctx: any, public readonly value: number) {
    super(ctx, new DoubleType(ctx), value);
  }
}
