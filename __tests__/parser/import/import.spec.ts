import * as _ from "lodash";

import { parse } from "./../../../src/parser";
import { tokenize } from "../../../src/lexer";
import { AST } from "../../../src/parser/ast";

const oneImportCorrect = `
import IO;
`;

const twoImportsCorrect = `
import IO;
import Core.List;
`;

const oneImportIncorrect = `
import IO
`;

const oneImportIncorrect2 = `
import;
`;

const twoImportsIncorrect = `
import IO;
import Core.List
`;

const twoImportsIncorrect2 = `
import IO;
import; Core.List;
`;

describe("import", () => {
  it("Should contains one import and correct module name", () => {
    const tokens = tokenize(oneImportCorrect);
    const ast = parse(tokens);

    expect(ast).toBeInstanceOf(AST);
    expect(ast.imports.length).toBe(1);
    expect(ast.definitions.length).toBe(0);

    const moduleNames = _.map(ast.imports, ipt => ipt.path);

    expect(moduleNames).toEqual([["IO"]]);
  });

  it("Should contains two imports and correct module names", () => {
    const tokens = tokenize(twoImportsCorrect);
    const ast = parse(tokens);

    expect(ast).toBeInstanceOf(AST);
    expect(ast.imports.length).toBe(2);
    expect(ast.definitions.length).toBe(0);

    const moduleNames = _.map(ast.imports, ipt => ipt.path);

    expect(moduleNames).toEqual([["IO"], ["Core", "List"]]);
  });

  it("Should fail to one import and no semi-colon", () => {
    const tokens = tokenize(oneImportIncorrect);

    expect(() => {
      parse(tokens);
    }).toThrowError();
  });

  it("Should fail to one import with incorrect syntax", () => {
    const tokens = tokenize(oneImportIncorrect2);

    expect(() => {
      parse(tokens);
    }).toThrowError();
  });

  it("Should fail to two imports and no semi-colon", () => {
    const tokens = tokenize(twoImportsIncorrect);

    expect(() => {
      parse(tokens);
    }).toThrowError();
  });

  it("Should fail to two imports with incorrect syntax", () => {
    const tokens = tokenize(twoImportsIncorrect2);

    expect(() => {
      parse(tokens);
    }).toThrowError();
  });
});
