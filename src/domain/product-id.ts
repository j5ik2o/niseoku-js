import { ulid } from "ulid";

const symbolProductId = Symbol("ProductId");

class ProductId {
  readonly symbol: typeof symbolProductId = symbolProductId;

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
