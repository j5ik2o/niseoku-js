import { CurrencyCode, Money } from "./money";

const symbolProductPrice = Symbol("ProductPrice");

class ProductPrice {
  static MAX_AMOUNT = 1000_000_000;
  static MIN_AMOUNT = 0;
  readonly symbol: typeof symbolProductPrice = symbolProductPrice;
  private constructor(readonly value: Money) {
    if (value.amount < ProductPrice.MIN_AMOUNT) {
      throw new Error(
        `価格は${ProductPrice.MIN_AMOUNT}円以上でなければなりません`,
      );
    }
    if (value.amount > ProductPrice.MAX_AMOUNT) {
      throw new Error(
        `価格は${ProductPrice.MAX_AMOUNT}円以下でなければなりません`,
      );
    }
  }

  static of(value: Money): ProductPrice {
    return new ProductPrice(value);
  }

  static zero(currency: CurrencyCode): ProductPrice {
    return ProductPrice.of(Money.zero(currency));
  }

  add(other: ProductPrice): ProductPrice {
    return ProductPrice.of(this.value.add(other.value));
  }

  subtract(other: ProductPrice): ProductPrice {
    return ProductPrice.of(this.value.subtract(other.value));
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  static ofJPY(number: number): ProductPrice {
    return ProductPrice.of(Money.ofJPY(number));
  }

  static ofUSD(number: number): ProductPrice {
    return ProductPrice.of(Money.ofUSD(number));
  }

  toMoney(): Money {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

export { ProductPrice };
