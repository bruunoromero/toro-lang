import { Clause } from "./clause";
import { Reference } from "./reference";
import { Expression } from "./expression";

export class Call extends Clause {
  constructor(
    public readonly ref: Reference,
    public readonly args?: Expression[],
  ) {
    super(null);
  }
}
