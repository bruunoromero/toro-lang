import { Node } from "./node";
import { Pattern } from "./pattern";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export class IdentifierPattern extends Pattern {
  constructor(public readonly pattern: Identifier) {
    super(pattern.loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class Identifier extends Node {
  constructor(public readonly loc: Location, public readonly name: string) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
