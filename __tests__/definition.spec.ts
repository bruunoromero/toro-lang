import * as R from "ramda";

import { pprint } from "./../src/utils/print";
import { parse } from "./../src/parser/index";
import { tokenize } from "./../src/lexer/index";

const sampleCorrect = `
export def main = {
    def inner = {}
}
def noop() = {}
def noopTyped<T>(first: T): T = {}
`;

const sampleIncorrect1 = `
export def def = {
    def inner = {}
}
def noop() = {}
`;

const sampleIncorrect2 = `
exporti def main = {
    def inner = {}
}

`;

const sampleIncorrect3 = `
export def main = {
def noop() = {}
`;

const sampleIncorrect4 = `
export def main
def noop() = {}
`;

const produce = R.pipe(
  tokenize,
  parse,
);

describe("Definition", () => {
  it("Should tokenize corectly", () => {
    let tokens;
    expect(() => {
      tokens = tokenize(sampleCorrect);
    }).not.toThrow();

    const images = tokens.map(tok => tok.image);

    expect(images).toEqual([
      "export",
      "def",
      "main",
      "=",
      "{",
      "def",
      "inner",
      "=",
      "{",
      "}",
      "}",
      "def",
      "noop",
      "(",
      ")",
      "=",
      "{",
      "}",
      "def",
      "noopTyped",
      "<",
      "T",
      ">",
      "(",
      "first",
      ":",
      "T",
      ")",
      ":",
      "T",
      "=",
      "{",
      "}",
    ]);
  });

  it("Should parse correctly", () => {
    const tokens = tokenize(sampleCorrect);

    let cst;
    expect(() => {
      cst = parse(tokens);
    }).not.toThrow();
  });

  it("Should fail to parse all incorrect samples", () => {
    expect(() => produce(sampleIncorrect1)).toThrow();
    expect(() => produce(sampleIncorrect2)).toThrow();
    expect(() => produce(sampleIncorrect3)).toThrow();
    expect(() => produce(sampleIncorrect4)).toThrow();
  });
});
