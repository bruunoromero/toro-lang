export abstract class Clause {
  parent?: Clause;
  constructor(public readonly ctx: any) {}

  is(clause: any): boolean {
    return this instanceof clause;
  }
}
