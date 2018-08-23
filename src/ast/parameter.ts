import { Location } from "./../parser/location";
import { Node } from "./node";
import { JSNode } from "../generator/js-node";
import { Identifier } from "./identifier";
import { Type } from "./type";

export class Parameter extends Node {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public readonly type: Type,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
