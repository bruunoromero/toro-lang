import * as R from "ramda";
import { Node } from "../ast/node";

interface Token {
  col: number;
  line: number;
  type: string;
  text: string;
  value: string;
  offset: number;
  lineBreaks: number;
}

export interface Position {
  line: number;
  column: number;
}

export class Location {
  constructor(public readonly start: Position, public readonly end: Position) {}

  static getPosition(
    tokens: Array<Token | Node>,
    fn: (tokens: Array<Token | Node>) => Token | Node,
  ) {
    const ts = R.flatten(tokens).filter(R.identity);
    const first = fn(ts);

    if (!first) {
      return Location.emptyPosition;
    }

    if ((first as Node).loc) {
      return (first as Node).loc.start;
    }

    return {
      line: (first as Token).line,
      column: (first as Token).col,
    };
  }

  private static getStart(tokens: Array<Token | Node>): Position {
    return Location.getPosition(tokens, R.head);
  }

  private static getEnd(tokens: Array<Token | Node>): Position {
    return Location.getPosition(tokens, R.last);
  }

  static fromToken(token: Token) {
    const end = Location.getEnd([token]);
    const start = Location.getStart([token]);

    return new Location(start, end);
  }

  static fromClause(tokens: Array<Token | Node>) {
    const end = Location.getEnd(tokens);
    const start = Location.getStart(tokens);

    return new Location(start, end);
  }

  static get emptyPosition() {
    return {
      line: 0,
      column: 0,
    };
  }
}
