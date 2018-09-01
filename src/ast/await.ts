import { Statement } from "./statement";
import { JSNode } from "../generator/js-node";
import { Location } from "./../parser/location";

export class AwaitExpression extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly argument: Statement,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
