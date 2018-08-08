import * as R from "ramda";

import { pprint } from "./../src/utils/print";
import { parse } from "./../src/parser/index";
import { tokenize } from "./../src/lexer/index";

const sampleCorrect = `
import IO;
import Core.List;
import Toro.Tokens.Specials;
`;

const sampleIncorrect1 = `
import IO
import Core.List;
import Toro.Tokens.Specials;
`;

const sampleIncorrect2 = `
import IO;
import;
import Toro.Tokens.Specials;
`;

const sampleIncorrect3 = `
import IO;
import Core.List;
import Toro.Tokens.;
`;
const sampleIncorrect4 = `
importi IO;
import Core.List;
import Toro.Tokens.Specials;
`;

const produce = R.pipe(
  tokenize,
  parse,
);

describe("Import", () => {
  it("Should tokenize corectly", () => {
    let tokens;
    expect(() => {
      tokens = tokenize(sampleCorrect);
    }).not.toThrow();

    const images = tokens.map(tok => tok.image);

    expect(images).toEqual([
      "import",
      "IO",
      ";",
      "import",
      "Core",
      ".",
      "List",
      ";",
      "import",
      "Toro",
      ".",
      "Tokens",
      ".",
      "Specials",
      ";",
    ]);
  });

  it("Should parse correctly", () => {
    const tokens = tokenize(sampleCorrect);

    let cst;
    expect(() => {
      cst = parse(tokens);
    }).not.toThrow();

    const eachIdentifier = fn => {
      const clausesPath = R.lensPath(["children", "importClause"]);
      const clauses = R.view(clausesPath, cst);

      R.range(0, clauses.length).forEach(idx => {
        const path = R.lensPath([
          "children",
          "importClause",
          idx,
          "children",
          "reference",
          "0",
          "children",
          "IDENTIFIER",
        ]);
        const ref = R.view(path, cst);
        fn(idx, ref);
      });
    };

    eachIdentifier((idx, identifier) => {
      const images = identifier.map(id => id.image);

      if (idx === 0) {
        expect(images).toEqual(["IO"]);
      }
      if (idx === 1) {
        expect(images).toEqual(["Core", "List"]);
      }
      if (idx === 2) {
        expect(images).toEqual(["Toro", "Tokens", "Specials"]);
      }
    });
  });

  it("Should fail to parse all incorrect samples", () => {
    expect(() => produce(sampleIncorrect1)).toThrow();
    expect(() => produce(sampleIncorrect2)).toThrow();
    expect(() => produce(sampleIncorrect3)).toThrow();
    expect(() => produce(sampleIncorrect4)).toThrow();
  });
});
