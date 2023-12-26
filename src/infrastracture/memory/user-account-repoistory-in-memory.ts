import { UserAccountRepository } from "../user-account-repository";
import { UserAccountId } from "../../domain/user-account-id";
import { UserAccount } from "../../domain/user-account";

const symbolUserAccountRepositoryInMemory = Symbol(
  "UserAccountRepositoryInMemory",
);

class UserAccountRepositoryInMemory implements UserAccountRepository {
  readonly symbol: typeof symbolUserAccountRepositoryInMemory =
    symbolUserAccountRepositoryInMemory;

  private userAccounts: Map<string, UserAccount>;

  private constructor(sessions: Map<UserAccountId, UserAccount>) {
    this.userAccounts = new Map<string, UserAccount>(
      Array.from(sessions).map(([key, value]) => [key.value, value]),
    );
  }

  static create(
    userAccounts: Map<UserAccountId, UserAccount> = new Map(),
  ): UserAccountRepositoryInMemory {
    return new UserAccountRepositoryInMemory(userAccounts);
  }

  async findById(id: UserAccountId): Promise<UserAccount | undefined> {
    return this.userAccounts.get(id.value);
  }
  async save(userAccount: UserAccount): Promise<void> {
    this.userAccounts = this.userAccounts.set(
      userAccount.id.value,
      userAccount,
    );
  }
  async deleteById(userAccountId: UserAccountId): Promise<boolean> {
    return this.userAccounts.delete(userAccountId.value);
  }
}

export { UserAccountRepositoryInMemory };
