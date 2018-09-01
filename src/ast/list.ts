import { Location } from "./../parser/location";
import { Statement } from "./statement";
import { JSNode } from "../generator/js-node";

export class ListLiteral extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly elements: Statement[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
