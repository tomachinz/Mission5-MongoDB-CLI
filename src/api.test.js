const calculateDiscountRate = require("./calculate-discount-rate");

describe("calculateDiscountRate experience.", () => {

  test("Should return error if no input experience.", () => {
    expect(calculateDiscountRate()).toEqual({
      discount_rate: 0,
      error: "error: need age and driving experience in years"
    });
  });

  test("Test serial 1: age: 1, 0 experience.", () => {
    expect(calculateDiscountRate(1, 0)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 2: age: 16, 0 experience.", () => {
    expect(calculateDiscountRate(16, 0)).toEqual({
      discount_rate: 0,
      error: "invalid age"
    });
  });

  test("Test serial 3: age: 24, 20 experience.", () => {
    expect(calculateDiscountRate(24, 20)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 4: age: 24, 1 experience.", () => {
    expect(calculateDiscountRate(24, 1)).toEqual({
      discount_rate: 0,
      error: ""
    });
  });

  test("Test serial 5: age: 25, 20 experience.", () => {
    expect(calculateDiscountRate(25, 20)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 6: age: 26, 10 experience.", () => {
    expect(calculateDiscountRate(26, 10)).toEqual({
      discount_rate: 0.15,
      error: ""
    });
  });

  test("Test serial 7: age: 27, 11 experience.", () => {
    expect(calculateDiscountRate(27, 11)).toEqual({
      discount_rate: 0.15,
      error: ""
    });
  });

  test("Test serial 8: age: 39, 35 experience.", () => {
    expect(calculateDiscountRate(39, 35)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 9: age: 40, 6 experience.", () => {
    expect(calculateDiscountRate(40, 6)).toEqual({
      discount_rate: 0.15,
      error: ""
    });
  });

  test("Test serial 10: age: 41, 0 experience.", () => {
    expect(calculateDiscountRate(41, 0)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 11: age: 99, 50 experience.", () => {
    expect(calculateDiscountRate(99, 50)).toEqual({
      discount_rate: 0.2,
      error: ""
    });
  });

  test("Test serial 12: age: 24, 5 experience.", () => {
    expect(calculateDiscountRate(24, 5)).toEqual({
      discount_rate: 0.05,
      error: ""
    });
  });

  test("Test serial 13: age: 25, 5 experience.", () => {
    expect(calculateDiscountRate(25, 5)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 14: age: 26, 5 experience.", () => {
    expect(calculateDiscountRate(26, 5)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 15: age: -39, 20 experience.", () => {
    expect(calculateDiscountRate(-39, 20)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 16: age: 40, 1 experience.", () => {
    expect(calculateDiscountRate(40, 1)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 18: age: 99, 1 experience.", () => {
    expect(calculateDiscountRate(99, 1)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 19: age: 60, 23 experience.", () => {
    expect(calculateDiscountRate(60, 23)).toEqual({
      discount_rate: 0.2,
      error: ""
    });
  });

  test("Test serial 20: age: 42, 10 experience.", () => {
    expect(calculateDiscountRate(42, 10)).toEqual({
      discount_rate: 0.2,
      error: ""
    });
  });

  test("Test serial 21: age: 63, 3 experience.", () => {
    expect(calculateDiscountRate(63, 3)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 22: age: 40, 0 experience.", () => {
    expect(calculateDiscountRate(40, 0)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 23: age: 63, 7 experience.", () => {
    expect(calculateDiscountRate(63, 7)).toEqual({
      discount_rate: 0.15,
      error: ""
    });
  });

  test("Test serial 24: age: 63, 12 experience.", () => {
    expect(calculateDiscountRate(63, 12)).toEqual({
      discount_rate: 0.2,
      error: ""
    });
  });

  test("Test serial 25: age: 26, 16 experience.", () => {
    expect(calculateDiscountRate(26, 16)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 26: age: 78, 0 experience.", () => {
    expect(calculateDiscountRate(78, 0)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 27: age: 67, 4 experience.", () => {
    expect(calculateDiscountRate(67, 4)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 28: age: 75, 2 experience.", () => {
    expect(calculateDiscountRate(75, 2)).toEqual({
      discount_rate: 0.1,
      error: ""
    });
  });

  test("Test serial 29: age: 30, 38 experience.", () => {
    expect(calculateDiscountRate(30, 38)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

  test("Test serial 30: age: 5, 21 experience.", () => {
    expect(calculateDiscountRate(5, 21)).toEqual({
      discount_rate: 0,
      error: "invalid experience"
    });
  });

});
