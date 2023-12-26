import { SessionId } from "../../domain/session-id";
import { SessionRepository } from "../session-repository";
import { Session } from "../../domain/session";

const symbolSessionRepositoryInMemory = Symbol("SessionRepositoryInMemory");

class SessionRepositoryInMemory implements SessionRepository {
  readonly symbol: typeof symbolSessionRepositoryInMemory =
    symbolSessionRepositoryInMemory;

  private sessions = new Map<SessionId, Session>();
  async findById(id: SessionId): Promise<Session | undefined> {
    return this.sessions.get(id);
  }
  async save(session: Session): Promise<void> {
    this.sessions.set(session.id, session);
  }
  async deleteById(sessionId: SessionId): Promise<void> {
    this.sessions.delete(sessionId);
  }
}

export { SessionRepositoryInMemory };
