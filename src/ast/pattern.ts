import { Node } from "./node";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export abstract class Pattern extends Node {}

export abstract class DerivatedPattern extends Pattern {
  public readonly patterns: Pattern[];

  constructor(loc: Location, patterns: Pattern[] = []) {
    super(loc);

    this.patterns = patterns.filter((p: any) => p);
  }
}

export class ConcatPattern extends DerivatedPattern {
  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
