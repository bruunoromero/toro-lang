import { Node } from "./node";
import { Identifier } from "./identifier";
import { Location } from "../parser/location";
import { JSNode } from "../generator/js-node";

export class Module extends Node {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier[],
    public readonly exports: Identifier[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
