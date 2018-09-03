import { Location } from "./location";
import { FirstTypeNode } from "./type";
import { Statement } from "./statement";
import { Identifier } from "./identifier";

export abstract class Primitive<T> extends Statement {
  constructor(loc: Location, type: string, public readonly value: T) {
    super(loc, new FirstTypeNode(new Identifier(loc, type)));
  }

  transform() {
    return {};
  }
}
