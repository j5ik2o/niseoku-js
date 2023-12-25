import { SessionId } from "./session-id";
import { UserAccountId } from "./user-account-id";

class Session {
  static readonly brand: unique symbol = Symbol("Session");
  constructor(
    readonly id: SessionId,
    readonly userAccountId: UserAccountId,
  ) {}
}

export { Session };
