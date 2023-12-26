import { SessionRepository } from "./session-repository";
import { UserAccountRepository } from "./user-account-repository";
import { Session } from "../domain/session";
import { UserAccount } from "../domain/user-account";
import { UserAccountId } from "../domain/user-account-id";
import { SessionId } from "../domain/session-id";

const symbolAuthenticationService = Symbol("AuthenticationService");

class AuthenticationService {
  readonly symbol: typeof symbolAuthenticationService =
    symbolAuthenticationService;

  private constructor(
    private userAccountRepository: UserAccountRepository,
    private sessionRepository: SessionRepository,
  ) {}

  static create(
    userAccountRepository: UserAccountRepository,
    sessionRepository: SessionRepository,
  ): AuthenticationService {
    return new AuthenticationService(userAccountRepository, sessionRepository);
  }

  async login(
    email: string,
    password: string,
  ): Promise<[Session, UserAccount]> {
    return this.userAccountRepository
      .findById(UserAccountId.of(email))
      .then((userAccount) => {
        if (userAccount !== undefined && userAccount.password === password) {
          const session = new Session(SessionId.generate(), userAccount.id);
          this.sessionRepository.save(session);
          return [session, userAccount];
        } else {
          throw new Error("Invalid credentials");
        }
      });
  }

  async logout(sessionId: SessionId): Promise<void> {
    return this.sessionRepository.deleteById(sessionId);
  }
}

export { AuthenticationService };
