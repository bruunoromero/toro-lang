import { Clause } from "./clause";

export class Type extends Clause {
  constructor(public readonly name: string) {
    super();
  }
}
