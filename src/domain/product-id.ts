import { ulid } from "ulid";

class ProductId {
  static readonly brand: unique symbol = Symbol("ProductId");

  private constructor(readonly value: string) {
    if (!value) {
      throw new Error("ProductId must not be empty");
    }
  }

  static of(value: string): ProductId {
    return new ProductId(value);
  }

  static generate(): ProductId {
    return new ProductId(ulid());
  }
}

export { ProductId };
