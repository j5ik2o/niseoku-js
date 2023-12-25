class UserAccountId {
  static readonly brand: unique symbol = Symbol("UserAccountId");

  private constructor(readonly value: string) {
    if (!value) {
      throw new Error("UserAccountId must not be empty");
    }
  }

  static of(value: string): UserAccountId {
    return new UserAccountId(value);
  }
}

export { UserAccountId };
