import { Node } from "./node";
import { Type } from "./type";
import { Location } from "./../parser/location";

export abstract class Statement extends Node {
  constructor(public readonly loc: Location, public type?: Type) {
    super(loc);
  }
}
