import { DoubleClause } from "./../ast/double-clause";
import { IntegerClause } from "../ast/integer-clause";

export const generateNumber = ({ value }: IntegerClause | DoubleClause) => {
  return value;
};
