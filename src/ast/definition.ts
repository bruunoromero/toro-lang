import { Node } from "./node";
import { Identifier } from "./identifier";
import { Location } from "./../parser/location";

export abstract class Definition extends Node {
  constructor(public readonly loc: Location, public readonly name: Identifier) {
    super(loc);
  }
}
