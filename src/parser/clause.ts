interface ClauseClass {
  TYPE: string;
}

export abstract class Clause {
  static TYPE: string;

  constructor(public type: string) {}

  is(clause: ClauseClass): boolean {
    return this.type === clause.TYPE;
  }
}
