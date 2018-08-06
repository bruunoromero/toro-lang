import { StringClause } from "./../ast/string-clause";

export const generateString = ({ value }: StringClause) => {
  return `"${value}"`;
};
