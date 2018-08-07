import { Value } from "./value";
import { CharType } from "./primitives";

export class Char extends Value<string> {
  constructor(public readonly ctx: any, public readonly value: string) {
    super(ctx, new CharType(ctx), value);
  }
}
