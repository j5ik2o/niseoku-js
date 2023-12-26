const symbolProductName = Symbol("ProductName");

class ProductName {
  readonly symbol: typeof symbolProductName = symbolProductName;
  private constructor(readonly value: string) {}

  static of(value: string): ProductName {
    return new ProductName(value);
  }
}

export { ProductName };
