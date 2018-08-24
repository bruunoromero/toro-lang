import { Grammar } from "./grammar";
import { File } from "../ast/file";
import { expectingOneOf } from "../utils/errors";

export const parse = (str: string): File => {
  const source = Grammar.File.parse(str) as any;
  if (!source.status) {
    expectingOneOf(source.index, source.expected);
  }

  return source.value;
};
