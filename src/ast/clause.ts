export abstract class Clause {
  parent?: Clause;

  is(clause: any): boolean {
    return this instanceof clause;
  }
}
