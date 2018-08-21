import { Identifier } from "./identifier";
import { Primitive } from "./primitive";
import { Location } from "../parser/location";

export class Macro {
  constructor(
    public readonly loc: Location,
    public readonly identifier: Identifier,
    public readonly params: Identifier[],
    public readonly value: Primitive<any>[],
    public readonly read: boolean = false,
  ) {}
}
