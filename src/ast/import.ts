import { Node } from "./node";
import { Identifier } from "./identifier";
import { JSNode } from "../generator/js-node";
import { Location } from "../parser/location";

export class Import extends Node {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier[],
    public readonly alias?: Identifier,
    public readonly exports?: Identifier[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
