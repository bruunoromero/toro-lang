import { Node } from "./node";
import { Location } from "../parser/location";

export abstract class Primitive<T> extends Node {
  constructor(public readonly loc: Location, public readonly value: T) {
    super(loc);
  }

  transform() {
    return {};
  }
}
