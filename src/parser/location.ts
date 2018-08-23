import * as R from "ramda";
import * as P from "parsimmon";
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
  offset?: number;
  column: number;
}

export class Location {
  constructor(public readonly start: Position, public readonly end: Position) {}

  static getPosition(
    tokens: Array<P.Node<any, any> | Node>,
    key: string,
    fn: (tokens: Array<P.Node<any, any> | Node>) => P.Node<any, any> | Node,
  ) {
    const ts = R.flatten(tokens).filter(R.identity);
    const first = fn(ts);

    if (!first) {
      return Location.emptyPosition;
    }

    if ((first as Node).loc) {
      const node = (first as Node).loc as any;
      return node[key];
    }

    const pNode = (first as P.Node<any, any>) as any;
    return pNode[key];
  }

  static fromToken(token: P.Node<any, any>) {
    return new Location(token.start, token.end);
  }

  private static getStart(tokens: Array<P.Node<any, any> | Node>): Position {
    return Location.getPosition(tokens, "start", R.head);
  }

  private static getEnd(tokens: Array<P.Node<any, any> | Node>): Position {
    return Location.getPosition(tokens, "end", R.last);
  }

  static fromClause(token: any[]) {
    const startToken = token[0];
    const endToken = token[token.length - 1];

    const end = Location.getEnd(endToken);
    const start = Location.getStart(startToken);

    return new Location(start, end);
  }

  static get emptyPosition() {
    return {
      line: 0,
      column: 0,
    };
  }
}
