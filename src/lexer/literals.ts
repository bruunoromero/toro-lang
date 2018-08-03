import { createToken } from "chevrotain";

export const IDENTIFIER = createToken({
  name: "IDENTIFIER",
  pattern: /([a-z]|[A-Z]|[$_])([a-z]|[A-Z]|[$_])*/,
});

export const LITERALS = [IDENTIFIER];
