import { describe } from "node:test";
import { Money } from "./money";

afterEach(() => {
  jest.useRealTimers();
});

describe("Money", () => {
  test("初期化できる", () => {
    const money = Money.ofJPY(1000);
    expect(money.amount).toBe(1000);
    expect(money.currency).toBe("JPY");
  });

  test("ゼロの金額を作成できる", () => {
    const money = Money.zero("JPY");
    expect(money.amount).toBe(0);
    expect(money.currency).toBe("JPY");
  });

  test("通貨単位が同じ場合は等価である", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofJPY(1000);
    expect(money1.equals(money2)).toBe(true);
  });

  test("通貨単位が異なる場合は等価ではない", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofUSD(1000);
    expect(money1.equals(money2)).toBe(false);
  });

  test("通貨単位が同じ場合は加算できる", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofJPY(1000);
    expect(money1.add(money2)).toEqual(Money.ofJPY(2000));
  });

  test("通貨単位が異なる場合は加算できない", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofUSD(1000);
    expect(() => money1.add(money2)).toThrowError("Currencies must be same");
  });

  test("通貨単位が同じ場合は減算できる", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofJPY(1000);
    expect(money1.subtract(money2)).toEqual(Money.ofJPY(0));
  });

  test("通貨単位が異なる場合は減算できない", () => {
    const money1 = Money.ofJPY(1000);
    const money2 = Money.ofUSD(1000);
    expect(() => money1.subtract(money2)).toThrowError(
      "Currencies must be same",
    );
  });

  test("通貨単位が同じ場合は乗算できる", () => {
    const money = Money.ofJPY(1000);
    expect(money.multiply(2)).toEqual(Money.ofJPY(2000));
  });

  test("通貨単位が同じ場合は除算できる", () => {
    const money = Money.ofJPY(1000);
    expect(money.divide(2)).toEqual(Money.ofJPY(500));
  });

  test("ゼロで割ることができない", () => {
    const money = Money.ofJPY(1000);
    expect(() => money.divide(0)).toThrowError("Cannot divide by zero");
  });
});
