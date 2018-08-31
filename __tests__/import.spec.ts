// import { Import } from "../src/ast/import";
// import { Grammar } from "../src/parser/grammar";

// describe("Import", () => {
//   it("Should parse a simple import clause", () => {
//     const sample = `
// import List
// `;

//     const { status, value } = Grammar.ImportDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Import).name.map(n => n.name)).toEqual(["List"]);
//   });

//   it("Should parse a nested path import clause", () => {
//     const sample = `
// import List.Core
// `;

//     const { status, value } = Grammar.ImportDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Import).name.map(n => n.name)).toEqual(["List", "Core"]);
//   });

//   it("Should parse a nested path import clause with as", () => {
//     const sample = `
// import List.Core
//   as L
// `;

//     const { status, value } = Grammar.ImportDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Import).name.map(n => n.name)).toEqual(["List", "Core"]);
//     expect((value as Import).alias.name).toBe("L");
//   });

//   it("Should parse a nested path import clause with exposing", () => {
//     const sample = `
// import List.Core
//   exposing
//     ( create
//     , map
//     )
// `;

//     const { status, value } = Grammar.ImportDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Import).name.map(n => n.name)).toEqual(["List", "Core"]);
//     expect((value as Import).exports.map(e => e.name)).toEqual([
//       "create",
//       "map",
//     ]);
//   });

//   it("Should parse a nested path import clause with as and exposing", () => {
//     const sample = `
// import List.Core as L exposing (create, map)
// `;

//     const { status, value } = Grammar.ImportDeclaration.parse(sample) as any;
//     expect(status).toBe(true);
//     expect((value as Import).alias.name).toBe("L");
//     expect((value as Import).name.map(n => n.name)).toEqual(["List", "Core"]);
//     expect((value as Import).exports.map(e => e.name)).toEqual([
//       "create",
//       "map",
//     ]);
//   });

//   it("Should fail to parse malformed import clause", () => {
//     const sample1 = `
// import List.Core as exposing (create, map)
// `;

//     const sample2 = `
// import List.Core as L (create, map)
// `;

//     const sample3 = `
// import List.Core exposing ()
// `;

//     const sample4 = `
// import List.Core ()
// `;

//     const sample5 = `
// import List.Core exposing
// `;

//     expect(Grammar.ImportDeclaration.parse(sample1).status).toBe(false);
//     expect(Grammar.ImportDeclaration.parse(sample2).status).toBe(false);
//     expect(Grammar.ImportDeclaration.parse(sample3).status).toBe(false);
//     expect(Grammar.ImportDeclaration.parse(sample4).status).toBe(false);
//     expect(Grammar.ImportDeclaration.parse(sample5).status).toBe(false);
//   });
// });
