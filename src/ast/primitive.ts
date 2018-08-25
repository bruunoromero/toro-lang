import { Node } from "./node";
import { Location } from "../parser/location";

export abstract class Primitive<T> extends Node {
  constructor(public loc: Location, public value: T) {
    super(loc);
  }

  transform() {
    return {};
  }
}
