import { ulid } from "ulid";

class SessionId {
  static readonly brand: unique symbol = Symbol("SessionId");
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
