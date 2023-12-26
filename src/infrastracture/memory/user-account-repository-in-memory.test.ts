import { describe } from "node:test";
import { UserAccountRepositoryInMemory } from "./user-account-repoistory-in-memory";
import { UserAccountId } from "../../domain/user-account-id";
import { UserAccount } from "../../domain/user-account";

afterEach(() => {
  jest.useRealTimers();
});

describe("UserAccountRepositoryInMemory", () => {
  test("ユーザアカウントを登録できる", async () => {
    // Given
    const repository = UserAccountRepositoryInMemory.create();
    const userAccount = UserAccount.of(
      UserAccountId.generate(),
      "Yamada",
      "Taro",
      "password",
    );
    // When
    await repository.save(userAccount);
    // Then
    const actual = await repository.findById(userAccount.id);
    expect(actual).toBe(userAccount);
  });
  test("ユーザアカウントを検索する", async () => {
    // Given
    const userAccount = UserAccount.of(
      UserAccountId.generate(),
      "Yamada",
      "Taro",
      "password",
    );
    const repository = UserAccountRepositoryInMemory.create(
      new Map([[userAccount.id, userAccount]]),
    );
    // When
    const actual = await repository.findById(userAccount.id);
    // Then
    expect(actual).toBe(userAccount);
  });
  test("ユーザアカウントを削除する", async () => {
    // Given
    const userAccount = UserAccount.of(
      UserAccountId.generate(),
      "Yamada",
      "Taro",
      "password",
    );
    const repository = UserAccountRepositoryInMemory.create(
      new Map([[userAccount.id, userAccount]]),
    );
    // When
    const actual = await repository.deleteById(userAccount.id);
    // Then
    expect(actual).toBeTruthy();
  });
});
