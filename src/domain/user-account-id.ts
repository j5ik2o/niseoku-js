import { ulid } from "ulid";

const symbolUserAccountId = Symbol("UserAccountId");

class UserAccountId {
  readonly symbol: typeof symbolUserAccountId = symbolUserAccountId;

  private constructor(readonly value: string) {
    if (!value) {
      throw new Error("UserAccountId must not be empty");
    }
  }

  static of(value: string): UserAccountId {
    return new UserAccountId(value);
  }

  static generate(): UserAccountId {
    return UserAccountId.of(ulid());
  }
}

export { UserAccountId };
