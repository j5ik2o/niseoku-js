export class Auction {
  start(): Auction {
    return new Auction(this.id, this.startDateTime, this.endDateTime, true);
  }
  constructor(
    readonly id: string,
    readonly startDateTime: Date,
    readonly endDateTime: Date,
    readonly isStarted: boolean = false
  ) {
    if (startDateTime < new Date()) {
      throw new Error("開始時刻が過去です");
    }
    if (endDateTime < startDateTime) {
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }
}