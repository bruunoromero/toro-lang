import { Node } from "./node";
import { Location, Position } from "./../parser/location";

export class Program extends Node {
  private constructor(
    start: Position,
    end: Position,
    public readonly exprs: Node[],
  ) {
    super(new Location(start, end));
  }

  static create(exprs: Node[]): Program {
    const firstExpr = exprs[0];
    const lastExpr = exprs[exprs.length - 1];

    if (!firstExpr) {
      return new Program(Location.emptyPosition, Location.emptyPosition, exprs);
    }

    return new Program(firstExpr.loc.start, lastExpr.loc.end, exprs);
  }

  transform() {
    return {};
  }
}
