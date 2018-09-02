export interface Position {
  line: number;
  column: number;
  offset?: number;
}

export class Location {
  constructor(public readonly start: Position, public readonly end: Position) {}
}
