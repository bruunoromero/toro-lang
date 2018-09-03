import { Type } from "./type";
import { Statement } from "./statement";
import { Identifier } from "./identifier";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export class AssignmentExpression extends Statement {
  constructor(
    loc: Location,
    public readonly definition = false,
    public readonly mutable = false,
    public readonly id: Identifier,
    public readonly value: Statement,
    type?: Type,
  ) {
    super(loc, type);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
