import { Statement } from "./statement";
import { JSNode } from "../generator/js-node";
import { Location } from "./location";

export class AwaitExpression extends Statement {
  constructor(loc: Location, public readonly argument: Statement) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
