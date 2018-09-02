import { Node } from "./node";
import { Location } from "./location";
import { Identifier } from "./identifier";
import { JSNode } from "../generator/js-node";

export abstract class Pattern extends Node {}

export abstract class DerivatedPattern extends Pattern {
  constructor(
    public readonly loc: Location,
    public readonly patterns: Pattern[],
  ) {
    super(loc);
  }
}

export class ConcatPattern extends DerivatedPattern {
  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
