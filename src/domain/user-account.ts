import { UserAccountId } from "./user-account-id";

const symbolUserAccount = Symbol("UserAccount");

class UserAccount {
  readonly symbol: typeof symbolUserAccount = symbolUserAccount;

  private constructor(
    readonly id: UserAccountId,
    readonly firstName: string,
    readonly lastName: string,
    readonly password: string,
  ) {
    if (!firstName) {
      throw new Error("UserAccount must have firstName");
    }
    if (!lastName) {
      throw new Error("UserAccount must have lastName");
    }
  }

  static of(
    id: UserAccountId,
    firstName: string,
    lastName: string,
    password: string,
  ): UserAccount {
    return new UserAccount(id, firstName, lastName, password);
  }

  isPasswordCorrect(password: string): boolean {
    return this.password === password;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }
}

export { UserAccount };
