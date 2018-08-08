import * as R from "ramda";

import { pprint } from "./../src/utils/print";
import { parse } from "./../src/parser/index";
import { tokenize } from "./../src/lexer/index";

const sampleIncorrect1 = `
export def main = 10 - -20;
`;

const sampleIncorrect2 = `
export def main = 10 + +20;
`;
const sampleIncorrect3 = `
export def main = 10 +;
`;

const sampleIncorrect4 = `
export def main = --10;
`;

const produce = R.pipe(
  tokenize,
  parse,
);

describe("Expression", () => {
  it("Should tokenize corectly", () => {
    const sampleCorrect = `
    export def main = -10;
    `;

    let tokens;
    expect(() => {
      tokens = tokenize(sampleCorrect);
    }).not.toThrow();

    const images = tokens.map(tok => tok.image);

    expect(images).toEqual(["export", "def", "main", "=", "-", "10", ";"]);
  });

  it("Should parse correctly", () => {
    const sampleCorrect = `
    export def main = -10 + 30 -(5 + 2) * 40 / 30;
    `;

    const tokens = tokenize(sampleCorrect);

    let cst;
    expect(() => {
      cst = parse(tokens);
      console.log(pprint(cst));
    }).not.toThrow();
  });

  it("Should fail to parse all incorrect samples", () => {
    expect(() => produce(sampleIncorrect1)).toThrow();
    expect(() => produce(sampleIncorrect2)).toThrow();
    expect(() => produce(sampleIncorrect3)).toThrow();
    expect(() => produce(sampleIncorrect4)).toThrow();
  });
});
