## アクター

ユーザアカウントを持つ販売者、入札者、購入者。

## ユーザストーリ

### ユーザアカウントと認証関連

- ユーザアカウントを作成できる(Test_CreateUserAccount)
- ユーザアカウントを登録できる(Test_RegisterUserAccount)
- ユーザアカウントを検索する(ID)(Test_FindById)
- ユーザアカウントを検索する(FullName)(Test_FindByFullName)
- 登録済みの未ログインユーザがログインできる(Test_RegisteredNonLoggedInUserCanLogin)
- 登録されていないユーザはログインできない(Test_NonRegisteredUserCantLogin)
- 登録済みユーザがパスワードを間違うとログインできない(Test_RegisteredUserCantLoginIfPasswordIsWrong)
- 登録済みのログイン済みユーザがログアウトできる(Test_RegisteredLoggedInUserCanLogout)

### オークション関連

- 販売者はオークションを作成できる(Test_CreateAuction)
    - オークションはオークションID, 販売者ID, 商品情報、オークション開始日時、終了日時、開始価格、現在価格、入札者ID、購入者ID, 購入価格などを保持する
- 開始時刻が過去の場合は、オークションは作成できない(Test_CantCreateAuctionIfStartTimeLessThanNow)
- 終了時刻が開始時刻より過去の場合は、オークションは作成できない(Test_CantCreateAuctionIfEndTimeLessThanStartTime)
- 開始日時以後にオークションを開始する(Test_StartAuction)
- 開始時刻より前にオークションを開始できない(Test_CantStartAuctionBeforeStartTime)
- オークションに最高額にて入札する(Test_BidHighestAmountInAuction)
- オークションが開始していない場合は入札できない(Test_CantBidBeforeStartTime)
- オークションに最高額より少ない価格では入札できない(Test_CantBidWithMinimumAmountLessThanHighestAmount)
- オークションを終了できる
	- 落札者が存在する場合(Test_AuctionCanBeClosed_WhenThereAreWinningBidders)
	- 落札者が不在の場合(Test_AuctionCannotBeClosed_WhenThereAreNoWinningBidders)
- 2パーセントの手数料を引いた出品者の販売価格を取得する(Test_GetSellingPrice_With2PercentCommissionDeducted)
- 落札者の購入価格を取得する
	- 一般商品には10ドルの配送料を追加する(Test_GetSellingPrice_WithRegularItem)
	- ダウンロードソフトウェア(Test_GetSellingPrice_WithDownloadableSoftware)
	- 自動車(1000ドルの送料が追加)(Test_GetSellingPrice_WithCar)
	- 5万ドル以上の自動車(4%の贅沢税追加)(Test_GetSellingPrice_WithCarOver50K)





