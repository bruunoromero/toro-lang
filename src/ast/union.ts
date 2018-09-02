import { Type } from "./type";
import { ContextNode } from "./node";
import { Identifier } from "./identifier";
import { Location } from "./location";

export class Constructor extends ContextNode {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly params: Type[],
  ) {
    super(loc);
  }
}

export class Union extends Type {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly params: Identifier[],
    public readonly constructors: Constructor[],
  ) {
    super(loc);
  }
}
