import { SessionId } from "./session-id";
import { UserAccountId } from "./user-account-id";

const symbolSession = Symbol("Session");

class Session {
  readonly symbol: typeof symbolSession = symbolSession;
  private constructor(
    readonly id: SessionId,
    readonly userAccountId: UserAccountId,
  ) {}
  static of(id: SessionId, userAccountId: UserAccountId): Session {
    return new Session(id, userAccountId);
  }
}

export { Session };
