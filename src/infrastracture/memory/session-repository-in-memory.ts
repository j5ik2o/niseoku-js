import { SessionId } from "../../domain/session-id";
import { SessionRepository } from "../session-repository";
import { Session } from "../../domain/session";

const symbolSessionRepositoryInMemory = Symbol("SessionRepositoryInMemory");

class SessionRepositoryInMemory implements SessionRepository {
  readonly symbol: typeof symbolSessionRepositoryInMemory =
    symbolSessionRepositoryInMemory;

  private sessions = new Map<string, Session>();
  async findById(id: SessionId): Promise<Session | undefined> {
    return this.sessions.get(id.value);
  }
  async save(session: Session): Promise<void> {
    this.sessions.set(session.id.value, session);
  }
  async deleteById(sessionId: SessionId): Promise<void> {
    this.sessions.delete(sessionId.value);
  }
}

export { SessionRepositoryInMemory };
