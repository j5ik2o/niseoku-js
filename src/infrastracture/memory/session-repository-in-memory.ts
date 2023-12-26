import { SessionId } from "../../domain/session-id";
import { SessionRepository } from "../session-repository";
import { Session } from "../../domain/session";

const symbolSessionRepositoryInMemory = Symbol("SessionRepositoryInMemory");

class SessionRepositoryInMemory implements SessionRepository {
  readonly symbol: typeof symbolSessionRepositoryInMemory =
    symbolSessionRepositoryInMemory;
  private sessions: Map<string, Session>;

  private constructor(sessions: Map<SessionId, Session>) {
    this.sessions = new Map<string, Session>(
      Array.from(sessions).map(([key, value]) => [key.value, value]),
    );
  }

  static create(
    sessions: Map<SessionId, Session> = new Map(),
  ): SessionRepositoryInMemory {
    return new SessionRepositoryInMemory(sessions);
  }

  async findById(id: SessionId): Promise<Session | undefined> {
    return this.sessions.get(id.value);
  }

  async save(session: Session): Promise<void> {
    this.sessions.set(session.id.value, session);
  }

  async deleteById(sessionId: SessionId): Promise<boolean> {
    return this.sessions.delete(sessionId.value);
  }
}

export { SessionRepositoryInMemory };
