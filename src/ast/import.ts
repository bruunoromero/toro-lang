import { Node } from "./node";
import { FirstTypeNode } from "./type";
import { Identifier } from "./identifier";
import { JSNode } from "../generator/js-node";
import { Location } from "./location";

export class Import extends Node {
  constructor(
    loc: Location,
    public readonly id: FirstTypeNode,
    public readonly alias?: Identifier,
    public readonly exports?: Identifier[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class Extern extends Node {
  constructor(
    loc: Location,
    public readonly path: string,
    public readonly alias?: Identifier,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
