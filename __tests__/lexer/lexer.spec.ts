import * as _ from "lodash";

import { tokenize } from "./../../src/lexer";
import { EQUALS } from "./../../src/lexer/operators";
import { IDENTIFIER, STRING } from "./../../src/lexer/literals";
import { DEF, IMPORT } from "./../../src/lexer/keywords";
import {
  LPAREN,
  RPAREN,
  LCURLY,
  RCURLY,
  SEMI_COLON,
} from "./../../src/lexer/specials";

const sample = `
import IO;
import Console;

def main = call();

def call() = {
  "ola mundo";
}
`;

const sampleError = `
import IO;
import Console;

def main = call();

def call() = \\;
`;

let tokensCorrect: any[] = [];

beforeAll(() => {
  tokensCorrect = tokenize(sample);
});

describe("lexer", () => {
  it("Should produce a token set of length 22", () => {
    expect(tokensCorrect.length).toBe(22);
  });

  it("Should produce correct images and token names", () => {
    const mapped = _.map(
      tokensCorrect,
      ({ image, tokenType: { tokenName } }) => ({ image, tokenName }),
    );

    expect(mapped).toEqual([
      { image: "import", tokenName: IMPORT.name },
      { image: "IO", tokenName: IDENTIFIER.name },
      { image: ";", tokenName: SEMI_COLON.name },
      { image: "import", tokenName: IMPORT.name },
      { image: "Console", tokenName: IDENTIFIER.name },
      { image: ";", tokenName: SEMI_COLON.name },
      { image: "def", tokenName: DEF.name },
      { image: "main", tokenName: IDENTIFIER.name },
      { image: "=", tokenName: EQUALS.name },
      { image: "call", tokenName: IDENTIFIER.name },
      { image: "(", tokenName: LPAREN.name },
      { image: ")", tokenName: RPAREN.name },
      { image: ";", tokenName: SEMI_COLON.name },
      { image: "def", tokenName: DEF.name },
      { image: "call", tokenName: IDENTIFIER.name },
      { image: "(", tokenName: LPAREN.name },
      { image: ")", tokenName: RPAREN.name },
      { image: "=", tokenName: EQUALS.name },
      { image: "{", tokenName: LCURLY.name },
      { image: '"ola mundo"', tokenName: STRING.name },
      { image: ";", tokenName: SEMI_COLON.name },
      { image: "}", tokenName: RCURLY.name },
    ]);
  });

  it("Should fail to tokenize an unexpected token", () => {
    expect(() => {
      tokenize(sampleError);
    }).toThrowError();
  });
});
