import { Grammar } from "../src/parser/grammar";

describe("Operator", () => {
  it("Should parse an unparented left associative expression", () => {
    const { status, value } = Grammar.OperatorExpression.parse(
      "1 + 2 * 3 / 4",
    ) as any;

    expect(status).toBe(true);
    expect(value.id.name).toBe("+");
    expect(value.left.value).toBe(1);
    expect(value.right.id.name).toBe("/");
    expect(value.right.left.id.name).toBe("*");
    expect(value.right.left.left.value).toBe(2);
    expect(value.right.left.right.value).toBe(3);
    expect(value.right.right.value).toBe(4);
  });
});
