import { parse } from "../src/parser";

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
  it("Should parse function definition", () => {
    const sample = `
def main = {
  let t = () => 10
}

export def teste<T, E>(a: List<Int>): List<Int> = List.merge(a, [1, 2])
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse constant definition", () => {
    const sample = `
def main = {
  print(t)
}
let t: Int = 10
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse union definition", () => {
    const sample = `
type Something<T> = This(List<Maybe<T>>) | That
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

  it("Should parse pipe expression", () => {
    const sample = `
def main = 1 |> 2
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse match expression", () => {
    const sample = `
def main = match(x) {
  Just(a) -> true 
  _ -> false
}
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
