import { describe } from "node:test";
import { ProductId } from "./product-id";
import { ProductName } from "./product-name";
import { Money } from "./money";
import { Product } from "./product";

afterEach(() => {
  jest.useRealTimers();
});

describe("UserAccount", () => {
  test("初期化できる", () => {
    const productId = ProductId.generate();
    const productName = ProductName.of("iPhone");
    const productPrice = Money.ofJPY(100000);
    const product = Product.ofGeneric(productId, productName, productPrice);

    expect(product.id).toBe(productId);
    expect(product.name).toBe(productName);
    expect(product.price).toBe(productPrice);
  });
});
