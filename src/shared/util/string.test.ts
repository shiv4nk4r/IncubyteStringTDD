import { add } from "./string";

describe("String Adder", () => {
  it("Handle Empty Strings", () => {
    const numbers = "";
    const result = add(numbers);

    expect(result).toBe(0);
  });

  it("Handle Single Digit Strings", () => {
    const numbers = "1";
    const result = add(numbers);

    expect(result).toBe(1);
  });

  it("Handle String Separated By Delimeter", () => {
    const numbers = "1,2";
    const result = add(numbers);

    expect(result).toBe(3);
  });

  it("Handle New Line Separated String With Delimeters", () => {
    const numbers = "1\n2,3";
    const result = add(numbers);

    expect(result).toBe(6);
  });

  it("Handle String Separated By Delimeter With Different Delimeter", () => {
    const numbers = "//;\n1;2";
    const result = add(numbers);

    expect(result).toBe(3);
  });

  it("Handle Only Delimeter", () => {
    const numbers = ",";
    const result = add(numbers);

    expect(result).toBe(0);
  });

  it("Handle Only Custom Delimeter", () => {
    const numbers = "//;\n";
    const result = add(numbers);

    expect(result).toBe(0);
  });
  it("Handle String Starting With Delimeter", () => {
    const numbers = ",1,2";
    const result = add(numbers);

    expect(result).toBe(3);
  });

  it("Handle String Ending With Delimeter", () => {
    const numbers = "1,2,";
    const result = add(numbers);

    expect(result).toBe(3);
  });

  it("Handle String with String instead of Numbers", () => {
    const numbers = "1,a";
    const result = add(numbers);

    expect(result).toBe(1);
  });

  it("Handle String with Negative Numbers", () => {
    try {
      const numbers = "1,-2";
      add(numbers);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("negative numbers not allowed -2");
    }
  });

  it("Handle String with Multiple Negative Numbers", () => {
    try {
      const numbers = "1,-2,-3";
      add(numbers);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("negative numbers not allowed -2,-3");
    }
  });

  it("Handle Multiple Delimteres", () => {
    const numbers = "1,2;3";
    const result = add(numbers);

    expect(result).toBe(3);
  });

  it("Handle Multiple Delimteres With Custom Delimeter", () => {
    const numbers = "//;\n1;2,3";
    const result = add(numbers);

    expect(result).toBe(3);
  });
});
