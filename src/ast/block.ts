import { Clause } from "./clause";
import { Definition } from "./definition";
import { Expression } from "./expression";

export class Block extends Clause {
  constructor(
    public readonly definitions: Map<string, Definition>,
    public readonly expressions: Expression[],
  ) {
    super();
  }
}
