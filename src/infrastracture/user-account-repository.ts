import { UserAccount } from "../domain/user-account";
import { UserAccountId } from "../domain/user-account-id";

interface UserAccountRepository {
  findById(id: UserAccountId): Promise<UserAccount | undefined>;
  save(userAccount: UserAccount): Promise<void>;
  deleteById(userAccountId: UserAccountId): Promise<boolean>;
}

export { UserAccountRepository };
