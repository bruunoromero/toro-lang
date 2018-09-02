import { ContextNode } from "./node";
import { Type, Generic } from "./type";
import { Identifier } from "./identifier";
import { Location } from "./../parser/location";

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
    public readonly params: Generic[],
    public readonly constructors: Constructor[],
  ) {
    super(loc, id);
  }
}
