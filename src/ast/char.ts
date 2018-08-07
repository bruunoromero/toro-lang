import { Value } from "./value";
import { CharType } from "./primitives";

export class Char extends Value<string> {
  constructor(public readonly value: string) {
    super(new CharType(), value);
  }
}
