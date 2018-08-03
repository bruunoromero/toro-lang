import { createToken } from "chevrotain";

export const PERIOD = createToken({
  pattern: /\./,
  name: "PERIOD",
});

export const EQUAL = createToken({
  pattern: /=/,
  name: "EQUAL",
});

export const MULTIPLICATION = createToken({
  pattern: /\*/,
  name: "MULTIPLICATION",
});

export const OPERATORS = [PERIOD, EQUAL, MULTIPLICATION];
