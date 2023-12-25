import { SessionId } from "../../domain/session-id";
import { SessionRepository } from "../session-repository";
import { Session } from "../../domain/session";

class SessionRepositoryInMemory implements SessionRepository {
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
