class ProductName {
  private constructor(readonly value: string) {}

  static of(value: string): ProductName {
    return new ProductName(value);
  }
}

export { ProductName };
