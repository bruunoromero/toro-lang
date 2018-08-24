import * as P from "parsimmon";
import { capitalize } from "../utils/strings";

const operator = (token: string, name: string) =>
  P.string(token).node(`${capitalize(name)}Operator`);

export const OPERATORS = {
  DotOperator: () => operator(".", "dot"),
  MinusOperator: () => operator("-", "minus"),
};
