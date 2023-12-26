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
    const repository = new UserAccountRepositoryInMemory();
    const userAccount = UserAccount.of(
      UserAccountId.generate(),
      "Yamada", "Taro", "password",
    );
    // When
    await repository.save(userAccount);
    // Then
    const actual = await repository.findById(userAccount.id);
    expect(actual).toBe(userAccount);
  });
  test("ユーザアカウントを検索する(ID)", () => {
    fail();
  });
  test("ユーザアカウントを検索する(FullName)", () => {
    fail();
  });
});
