import { Location } from "./location";
import { FirstTypeNode } from "./type";
import { Statement } from "./statement";
import { Identifier } from "./identifier";

export abstract class Primitive<T> extends Statement {
  constructor(public loc: Location, _type: string, public readonly value: T) {
    super(loc, new FirstTypeNode(new Identifier(loc, _type)));
  }

  transform() {
    return {};
  }
}
