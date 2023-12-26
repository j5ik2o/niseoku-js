import { ulid } from "ulid";

const symbolSessionId = Symbol("SessionId");

class SessionId {
  readonly symbol: typeof symbolSessionId = symbolSessionId;

  private constructor(readonly value: string) {}

  static of(value: string): SessionId {
    return new SessionId(value);
  }

  static generate(): SessionId {
    return new SessionId(ulid());
  }

  toString(): string {
    return this.value;
  }
}

export { SessionId };
