import { describe } from "node:test";
import { UserAccountId } from "../../domain/user-account-id";
import { SessionRepositoryInMemory } from "./session-repository-in-memory";
import { Session } from "../../domain/session";
import { SessionId } from "../../domain/session-id";

afterEach(() => {
  jest.useRealTimers();
});

describe("SessionRepositoryInMemory", () => {
  test("セッションを登録できる", async () => {
    // Given
    const repository = new SessionRepositoryInMemory();
    const session = Session.of(
      SessionId.generate(),
      UserAccountId.generate(),
    );
    // When
    await repository.save(session);
    // Then
    const actual = await repository.findById(session.id);
    expect(actual).toBe(session);
  })
  test("セッションを検索する(ID)", () => {
    fail();
  });
  test("セッションを検索する(FullName)", () => {
    fail();
  });
})
