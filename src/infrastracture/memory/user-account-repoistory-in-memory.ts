import { UserAccountRepository } from "../user-account-repository";
import { UserAccountId } from "../../domain/user-account-id";
import { UserAccount } from "../../domain/user-account";

const symbolUserAccountRepositoryInMemory = Symbol(
  "UserAccountRepositoryInMemory",
);

class UserAccountRepositoryInMemory implements UserAccountRepository {
  readonly symbol: typeof symbolUserAccountRepositoryInMemory =
    symbolUserAccountRepositoryInMemory;

  private userAccounts = new Map<string, UserAccount>();

  async findById(id: UserAccountId): Promise<UserAccount | undefined> {
    return this.userAccounts.get(id.value);
  }
  async save(userAccount: UserAccount): Promise<void> {
    this.userAccounts = this.userAccounts.set(userAccount.id.value, userAccount);
  }
  async deleteById(userAccountId: UserAccountId): Promise<void> {
    this.userAccounts.delete(userAccountId.value);
  }
}

export { UserAccountRepositoryInMemory };
