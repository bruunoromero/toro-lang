import { Node } from "./node";
import { JSNode } from "../generator/js-node";
import { Location } from "../parser/location";

export class Identifier extends Node {
  constructor(public readonly loc: Location, public readonly name: string) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
