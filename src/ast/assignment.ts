import { Type } from "./type";
import { Statement } from "./statement";
import { Identifier } from "./identifier";
import { Location } from "../parser/location";
import { JSNode } from "../generator/js-node";

export class AssignmentExpression extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public readonly value: Statement,
    public readonly type?: Type,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
