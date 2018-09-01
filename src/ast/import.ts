import { Node } from "./node";
import { Identifier } from "./identifier";
import { JSNode } from "../generator/js-node";
import { Location } from "../parser/location";

export class Import extends Node {
  constructor(
    public readonly loc: Location,
    public readonly ids: Identifier[],
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
    public readonly loc: Location,
    public readonly path: string,
    public readonly alias?: Identifier,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
