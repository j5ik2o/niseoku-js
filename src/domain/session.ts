import { SessionId } from "./session-id";
import { UserAccountId } from "./user-account-id";

const symbolSession = Symbol("Session");

class Session {
  readonly symbol: typeof symbolSession = symbolSession;

  constructor(
    readonly id: SessionId,
    readonly userAccountId: UserAccountId,
  ) {}
}

export { Session };
