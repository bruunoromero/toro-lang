import { Node } from "./node";
import { Statement } from "./statement";
import { Location } from "../parser/location";
import { Type } from "./type";
import { Identifier } from "./identifier";

export abstract class Primitive<T> extends Statement {
  constructor(
    public loc: Location,
    public type: string,
    public readonly value: T,
  ) {
    super(loc, new Type(loc, new Identifier(loc, type)));
  }

  transform() {
    return {};
  }
}
