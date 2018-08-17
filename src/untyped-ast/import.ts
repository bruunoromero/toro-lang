import { Clause } from "./clause";
import { Reference } from "./reference";
import { Identifier } from "./identifier";

export class Import extends Clause {
  constructor(
    public readonly reference: Reference,
    public readonly alias?: Identifier,
  ) {
    super(null);
  }
}
