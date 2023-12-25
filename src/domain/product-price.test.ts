import { describe } from "node:test";
import { ProductPrice } from "./product-price";

afterEach(() => {
  jest.useRealTimers();
});

describe("ProductPrice", () => {
  test("初期化できる", () => {
    const price = ProductPrice.ofJPY(1000);
    expect(price.amount).toBe(1000);
    expect(price.currency).toBe("JPY");
  });
  test(`価格が上限価格(${ProductPrice.MAX_AMOUNT}円)以上の場合は価格を作成できない`, () => {
    expect(() => ProductPrice.ofJPY(ProductPrice.MAX_AMOUNT + 1)).toThrowError(
      `価格は${ProductPrice.MAX_AMOUNT}円以下でなければなりません`,
    );
  });
  test(`価格が下限価格(${ProductPrice.MIN_AMOUNT}円)未満の場合は価格を作成できない`, () => {
    expect(() => ProductPrice.ofJPY(ProductPrice.MIN_AMOUNT - 1)).toThrowError(
      `価格は${ProductPrice.MIN_AMOUNT}円以上でなければなりません`,
    );
  });
});
