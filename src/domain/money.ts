type CurrencyCode = "USD" | "EUR" | "JPY";

const symbolMoney = Symbol("Money");

class Money {
  readonly symbol: typeof symbolMoney = symbolMoney;
  private constructor(
    readonly amount: number,
    readonly currency: CurrencyCode,
  ) {}

  static of(amount: number, currency: CurrencyCode): Money {
    return new Money(amount, currency);
  }

  static zero(currency: CurrencyCode): Money {
    return new Money(0, currency);
  }

  static ofUSD(amount: number): Money {
    return new Money(amount, "USD");
  }

  static ofEUR(amount: number): Money {
    return new Money(amount, "EUR");
  }

  static ofJPY(amount: number): Money {
    return new Money(amount, "JPY");
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Currencies must be same");
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    return this.add(other.negated);
  }

  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor: number): Money {
    if (divisor === 0) {
      throw new Error("Cannot divide by zero");
    }
    return new Money(this.amount / divisor, this.currency);
  }

  abs(): Money {
    return new Money(Math.abs(this.amount), this.currency);
  }

  get negated(): Money {
    return new Money(-this.amount, this.currency);
  }

  get isZero(): boolean {
    return this.amount === 0;
  }

  get isPositive(): boolean {
    return this.amount > 0;
  }

  get isNegative(): boolean {
    return this.amount < 0;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  compare(other: Money): number {
    if (this.currency !== other.currency) {
      throw new Error("通貨単位が異なります");
    }
    return this.amount - other.amount;
  }

  isGreaterThan(other: Money): boolean {
    return this.compare(other) > 0;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this.compare(other) >= 0;
  }

  isLessThan(other: Money): boolean {
    return this.compare(other) < 0;
  }

  isLessThanOrEqual(other: Money): boolean {
    return this.compare(other) <= 0;
  }

  toString(): string {
    return `${this.amount} ${this.currency}`;
  }
}

export { Money, CurrencyCode };
