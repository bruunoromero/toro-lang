import { ContextNode } from "./node";
import { Location } from "./location";
import { Identifier } from "./identifier";
import { Type, FirstTypeNode } from "./type";
import { JSNode } from "../generator/js-node";
import { DerivatedPattern, Pattern } from "./pattern";

export class ConstructorPattern extends DerivatedPattern {
  constructor(
    loc: Location,
    public readonly id: FirstTypeNode,
    patterns: Pattern[],
  ) {
    super(loc, patterns);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class Constructor extends ContextNode {
  constructor(
    loc: Location,
    public readonly id: Identifier,
    public readonly params: Type[] = [],
  ) {
    super(loc);
  }
}

export class Union extends Type {
  constructor(
    loc: Location,
    public readonly id: Identifier,
    public readonly params: Identifier[] = [],
    public readonly constructors: Constructor[],
  ) {
    super(loc);
  }
}
