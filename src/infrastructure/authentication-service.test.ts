import { describe } from "node:test";
import { AuthenticationService } from "./authentication-service";
import { UserAccountRepositoryInMemory } from "./memory/user-account-repoistory-in-memory";
import { UserAccountRepository } from "./user-account-repository";
import { SessionRepositoryInMemory } from "./memory/session-repository-in-memory";
import { SessionRepository } from "./session-repository";
import { UserAccount } from "../domain/user-account";
import { UserAccountId } from "../domain/user-account-id";

afterEach(() => {
  jest.useRealTimers();
});

describe("AuthenticationService", () => {
  test("登録済みの未ログインユーザがログインできる", async () => {
    // Given
    const userAccountRepository: UserAccountRepository =
      UserAccountRepositoryInMemory.create();
    const sessionRepository: SessionRepository =
      SessionRepositoryInMemory.create();
    const authenticationService: AuthenticationService =
      AuthenticationService.create(userAccountRepository, sessionRepository);
    const userAccount = UserAccount.of(
      UserAccountId.of("taro@gmail.com"),
      "Yamada",
      "Taro",
      "password",
    );
    await userAccountRepository.save(userAccount);
    // When
    const [s, u] = await authenticationService.login(
      userAccount.id.value,
      userAccount.password,
    );
    // Then
    expect(u).toBe(userAccount);
    expect(s.userAccountId).toBe(userAccount.id);
  });
  test("登録されていないユーザはログインできない", async () => {
    // Given
    const userAccountRepository: UserAccountRepository = UserAccountRepositoryInMemory.create();
    const sessionRepository: SessionRepository = SessionRepositoryInMemory.create();
    const authenticationService: AuthenticationService =
      AuthenticationService.create(userAccountRepository, sessionRepository);
    // When
    // Then
    await expect(
      authenticationService.login("taro@gmail.com", "password"),
    ).rejects.toThrow("User not found");
  });
  test("登録済みユーザがパスワードを間違うとログインできない", async () => {
    const userAccountRepository: UserAccountRepository = UserAccountRepositoryInMemory.create();
    const sessionRepository: SessionRepository = SessionRepositoryInMemory.create();
    const authenticationService: AuthenticationService =
      AuthenticationService.create(userAccountRepository, sessionRepository);
    const userAccount = UserAccount.of(
      UserAccountId.of("taro@gmail.com"),
      "Yamada",
      "Taro",
      "password",
    );
    await userAccountRepository.save(userAccount);
    // When
    // Then
    await expect(authenticationService.login(
      userAccount.id.value,
      "wrong password",
    )).rejects.toThrow("Invalid credentials");
  })
  test("登録済みのログイン済みユーザがログアウトできる", async () => {
    // Given
    const userAccountRepository: UserAccountRepository =
      UserAccountRepositoryInMemory.create();
    const sessionRepository: SessionRepository =
      SessionRepositoryInMemory.create();
    const authenticationService: AuthenticationService =
      AuthenticationService.create(userAccountRepository, sessionRepository);
    const userAccount = UserAccount.of(
      UserAccountId.of("taro@gmail.com"),
      "Yamada",
      "Taro",
      "password",
    );
    await userAccountRepository.save(userAccount);
    const [s] = await authenticationService.login(
      userAccount.id.value,
      userAccount.password,
    );
    // When
    const result = await authenticationService.logout(s.id);
    // Then
    expect(result).toBeTruthy()
  })
});
