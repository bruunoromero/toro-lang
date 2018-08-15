import { parse } from "../src/parser";
import { pprint } from "../src/utils/print";

describe("Import", () => {
  it("Should parse imports", () => {
    const sample = `
import List
import List.Core
      `;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});

describe("Definition", () => {
  it("Should parse definitions", () => {
    const sample = `
def main = {
  def t = {}
}
export def teste<T, E>() = {}
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});

describe("Conditional", () => {
  it("Should parse if expresion", () => {
    const sample = `
def main =
  if(true) {

  } else {
    
  }
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});

describe("Expression", () => {
  it("Should parse function call", () => {
    const sample = `
def main = teste(true, false)
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse boolean expression", () => {
    const sample = `
def main = !true || false
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse arithmetic expression", () => {
    const sample = `
def main = (1 + -2)
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
