import * as R from "ramda";

import { Program } from "./../ast/program";

export const $program = ([, mod]: any): Program => {
  // mod a Module instance
  return Program.create([]);
};
