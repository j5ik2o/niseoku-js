import { describe } from "node:test";
import { Auction } from "./auction";

afterEach(() => {
  jest.useRealTimers();
});

describe("Auction", () => {
  test("初期化できる（作成できる）", () => {
    const auction = new Auction("1", new Date(), new Date());
    expect(auction.id).toBe("1");
  });
  test("開始時刻が過去の場合は、オークションは作成できない", () => {
    const past = new Date();
    past.setHours(past.getHours() - 1);
    expect(() => new Auction("1", past, new Date())).toThrow();
  });
  test("終了時刻が開始時刻より過去の場合は、オークションは作成できない", () => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startDate.getHours() + 1);
    endDate.setHours(endDate.getHours() - 1);
    expect(() => new Auction("1", startDate, endDate)).toThrow();
  });
  test("オークションを開始する", () => {
    const now = new Date();
    const startDate = now;
    const endDate = now;
    startDate.setHours(startDate.getHours() + 1);
    endDate.setHours(endDate.getHours() + 10);
    let auction = new Auction("1", startDate, endDate, false, now);
    const now1 = startDate;
    now1.setSeconds(startDate.getSeconds() + 1)
    auction = auction.start(now1);
    expect(auction.isStarted).toBe(true);
  });
  test("開始時刻前にオークションを開始できない", () => {
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(startDate.getHours() + 1);
    endDate.setHours(endDate.getHours() + 10);
    const auction = new Auction("1", startDate, endDate, false, now);
    const now1 = new Date(startDate);
    now1.setSeconds(now1.getSeconds() - 1)
    expect(() => auction.start(now1)).toThrow();
  });
  // test("オークションが開始していない場合は、入札できない", () => {
  //   fail();
  // });
  // test("最高額にてオークションに入札する", () => {
  //   fail();
  // });
  // test("最高額より少ない価格では入札できない", () => {
  //   fail();
  // });
  // test("オークションを終了できる_落札者が存在する場合", () => {
  //   fail();
  // });
  // test("オークションを終了できる_落札者が不在の場合", () => {
  //   fail();
  // });
  // test("出品者の販売価格を取得する_2パーセントの手数料を引く", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_一般商品には10ドルの配送料を追加する", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_ダウンロードソフトウェア", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_自動車(1000ドルの送料が追加)", () => {
  //   fail();
  // });
  // test("落札者の購入価格を取得する_5万ドル以上の自動車(4%の贅沢税追加)", () => {
  //   fail();
  // });
});
