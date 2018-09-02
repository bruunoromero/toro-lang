import { Body } from "./body";
import { Statement } from "./statement";
import { JSNode } from "../generator/js-node";
import { Location } from "./location";

export class IfStatement extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly test: Statement,
    public readonly consequent: Body,
    public readonly alternate: Body,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
