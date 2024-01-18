export class Auction {
  private constructor(
    readonly id: string,
    readonly startDateTime: Date,
    readonly endDateTime: Date,
    readonly bidPrice: number,
    readonly isStarted: boolean = false,
    readonly now: Date = new Date(),
  ) {
    if (startDateTime < now) {
      throw new Error("開始時刻が過去です");
    }
    if (endDateTime < startDateTime) {
      throw new Error("終了時刻が開始時刻より過去です");
    }
  }

  static create(
    id: string,
    startDateTime: Date,
    endDateTime: Date,
    startBidPrice: number,
    isStarted: boolean = false,
    now: Date = new Date(),
  ): Auction {
    return new Auction(id, startDateTime, endDateTime, startBidPrice, isStarted, now);
  }

  start(now: Date = new Date()): Auction {
    if (this.startDateTime > now) {
      throw new Error("開始時刻前にオークションを開始できません");
    }
    return new Auction(this.id, this.startDateTime, this.endDateTime, 100, true);
  }

  bid(price: number): Auction {
    if (!this.isStarted) {
      throw new Error("オークションが開始していません");
    }
    if (price <= this.bidPrice) {
      throw new Error("現在の最高額より低い金額で入札することはできません");
    }
    
    return new Auction(this.id, this.startDateTime, this.endDateTime, price, this.isStarted, this.now);
  }
}