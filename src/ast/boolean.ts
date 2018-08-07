import { BooleanType } from "./primitives";
import { Value } from "./value";

export class BooleanLiteral extends Value<boolean> {
  constructor(public readonly ctx: any, public readonly value: boolean) {
    super(ctx, new BooleanType(ctx), value);
  }
}
