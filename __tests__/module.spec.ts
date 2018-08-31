// import { Module } from "../src/ast/module";
// import { Grammar } from "../src/parser/grammar";
test("", () => {});
// describe("Module", () => {
//   it("Should parse correctly a simple module clause", () => {
//     const sample = `
// module Main
// `;

//     const { status, value } = Grammar.ModuleDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Module).name.map(i => i.name)).toEqual(["Main"]);
//   });

//   it("Should parse correctly a nested path module clause", () => {
//     const sample = `
// module List.Core
// `;

//     const { status, value } = Grammar.ModuleDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Module).name.map(i => i.name)).toEqual(["List", "Core"]);
//   });

//   it("Should parse correctly a nested path module clause with exposing", () => {
//     const sample = `
// module List.Core
//   exposing
//     ( List
//     , create
//     , Maybe
//     )
// `;

//     const { status, value } = Grammar.ModuleDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Module).name.map(i => i.name)).toEqual(["List", "Core"]);
//     expect((value as Module).exports.map(i => i.name)).toEqual([
//       "List",
//       "create",
//       "Maybe",
//     ]);
//   });

//   it("Should fail to parse a malformed module clause", () => {
//     const sample1 = `
// module List.
// `;

//     const sample2 = `
// module List exposing
// `;

//     const sample3 = `
// module List exposing ()
// `;

//     expect(Grammar.ModuleDeclaration.parse(sample1).status).toBe(false);
//     expect(Grammar.ModuleDeclaration.parse(sample2).status).toBe(false);
//     expect(Grammar.ModuleDeclaration.parse(sample3).status).toBe(false);
//   });
// });
