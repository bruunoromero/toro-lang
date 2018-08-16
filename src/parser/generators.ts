import * as R from "ramda";
import { pprint } from "../utils/print";
import { ImportClause } from "../untyped-ast/import-clause";

export const $import = (data: any) => {
  const imp = data[3];
  $reference(imp);
  return data;
};

export const $reference = (data: any) => {
  R.map($identifier, data[0]);
};

export const $identifier = (data: any) => {
  return;
};
