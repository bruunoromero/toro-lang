export interface Position {
  line: number;
  offset?: number;
  column: number;
}

export class Location {
  constructor(public readonly start: Position, public readonly end: Position) {}
}
