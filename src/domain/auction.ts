export class Auction {
  start(now: Date = new Date()): Auction {
    if (this.startDateTime > now) {
      throw new Error("開始時刻前にオークションを開始できません");
    }
    return new Auction(this.id, this.startDateTime, this.endDateTime, true);
  }
  constructor(
    readonly id: string,
    readonly startDateTime: Date,
    readonly endDateTime: Date,
    readonly isStarted: boolean = false,
    readonly now: Date = new Date()
  ) {
    if (startDateTime < now) {
      throw new Error("開始時刻が過去です");
    }
    if (endDateTime < startDateTime) {
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }
}