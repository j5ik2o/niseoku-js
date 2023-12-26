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
    const repository = SessionRepositoryInMemory.create();
    const session = Session.of(SessionId.generate(), UserAccountId.generate());
    // When
    await repository.save(session);
    // Then
    const actual = await repository.findById(session.id);
    expect(actual).toBe(session);
  });
  test("セッションを検索する(ID)", async () => {
    const session = Session.of(SessionId.generate(), UserAccountId.generate());
    const repository = SessionRepositoryInMemory.create(
      new Map([[session.id, session]]),
    );
    const actual = await repository.findById(session.id);
    expect(actual).toBe(session);
  });
  test("セッションを削除する", async () => {
    const session = Session.of(SessionId.generate(), UserAccountId.generate());
    const repository = SessionRepositoryInMemory.create(
      new Map([[session.id, session]]),
    );
    const actual = await repository.deleteById(session.id);
    expect(actual).toBeTruthy();
  });
});
