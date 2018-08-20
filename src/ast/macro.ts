import { Identifier } from "./identifier";
import { Primitive } from "./primitive";

export class Macro {
  constructor(
    public readonly identifier: Identifier,
    public readonly params: Identifier[],
    public readonly value: Primitive<any>[],
    public readonly read: boolean = false,
  ) {}
}
