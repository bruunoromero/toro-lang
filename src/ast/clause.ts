export abstract class Clause {
  is(clause: any): boolean {
    return this instanceof clause;
  }
}
