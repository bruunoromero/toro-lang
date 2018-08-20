import { Primitive } from "./primitive";
import { Identifier } from "./identifier";

export class Definition {
  constructor(
    public readonly name: Identifier,
    public readonly value: Primitive<any>[],
  ) {}
}
