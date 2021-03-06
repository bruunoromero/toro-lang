import { Node } from "./node";
import { Type } from "./type";
import { Location } from "./location";

export abstract class Statement extends Node {
  constructor(loc: Location, public type?: Type) {
    super(loc);
  }
}
