import { Double } from "../ast/double";
import { Integer } from "../ast/integer";

export const generateNumber = ({ value }: Integer | Double) => {
  return value;
};
