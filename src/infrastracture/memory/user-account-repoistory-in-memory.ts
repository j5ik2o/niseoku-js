import { UserAccountRepository } from "../user-account-repository";
import { UserAccountId } from "../../domain/user-account-id";
import { UserAccount } from "../../domain/user-account";
class UserAccountRepositoryInMemory implements UserAccountRepository {
  private userAccounts = new Map<UserAccountId, UserAccount>();

  async findById(id: UserAccountId):  Promise<UserAccount | undefined> {
    return this.userAccounts.get(id);
  }
  async save(userAccount: UserAccount): Promise<void> {
    this.userAccounts.set(userAccount.id, userAccount);
  }
  async deleteById(userAccountId: UserAccountId): Promise<void> {
    this.userAccounts.delete(userAccountId);
  }
}

export { UserAccountRepositoryInMemory };
