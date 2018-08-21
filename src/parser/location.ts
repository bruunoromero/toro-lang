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

  private static getStart(token: Token): Position {
    return {
      line: token.line,
      column: token.col,
    };
  }

  private static getEnd(token: Token): Position {
    return {
      line: token.line + token.lineBreaks,
      column: token.col + token.text.length - 1,
    };
  }

  static fromToken(token: Token) {
    const end = Location.getEnd(token);
    const start = Location.getStart(token);

    return new Location(start, end);
  }

  static fromClause(token: Token[]) {
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
