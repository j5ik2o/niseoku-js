import { Session } from "../domain/session";
import { SessionId } from "../domain/session-id";

interface SessionRepository {
  findById(id: SessionId): Promise<Session | undefined>;
  save(session: Session): Promise<void>;
  deleteById(id: SessionId): Promise<void>;
}

export { SessionRepository };
