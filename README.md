# Google Spread Sheet Lab for Vite

Google Spread Sheet に Vite + React + TypeScript から書き込みを行うテストファイルです。(for [Suiran Sell](https://github.com/suiranfes/sell.suiranfes.blue))

## 使い方

### 1. Google Spread Sheet の準備

1. Google Spread Sheet で適当なファイルを作成
1. アクセス権限を"リンクを知っている全員"、"編集者"に変更[^hint1]
1. ID をメモしておく  
(ID とは、リンク `https://docs.google.com/spreadsheets/d/<ID>/edit?gid=0#gid=0` の `<ID>` の部分  
例: `https://docs.google.com/spreadsheets/d/abcdefghijklmn/edit?gid=0#gid=0` では `abcdefghijklmn`)

[^hint1]: 後述する、"作成したアカウントのメールアドレス (`***@***.***.gserviceaccount.com`)"を追加し、そのアカウントのみに編集権限を付与するのでも、動く可能性あり。

### 2. Google Cloud の準備

1. 18歳以上のアカウントを準備 / [Google Cloud](https://console.cloud.google.com) にアクセス
1. `新しいプロジェクト`を作成

<!-- 
1. `API とサービス`から <kbd>API とサービスを有効にする</kbd>ボタンを押し、`Google Sheets API` を追加
1. また、サイドバーの `API とサービス`から`認証情報`を開き、`サービス アカウントを管理`を開く
1. <kbd>サービス アカウントを作成</kbd>ボタンを押し、適当に作成する
1. 作成したアカウントのメールアドレス (`***@***.***.gserviceaccount.com`) をメモする
1. また、作成したアカウントの`鍵を管理`から、新しい鍵 (JSON) を作成する
1. 自動的にダウンロードされた `.json` ファイル内の `private_key` をメモする
 -->

> 追記します

### 3. プログラムの動作

1. `npm` と `git` をインストール
1. このリポジトリをクローンする
1. `.env.local` ファイルを作成し、先ほどメモした情報を利用し、入力する  
    ```.env
    # スプレッドシートのURLに含まれる文字列
    VITE_GOOGLE_SPREADSHEET_ID='シートのID'
    # サービスアカウントのアドレス (**.apps.googleusercontent.com)
    VITE_GOOGLE_CLIENT_ID='メアド'
    # API キー
    VITE_GOOGLE_API_KEY='キー'
    ```
1. `npm i`
1. `npm run start`
1. これで、表示される下のボタンを押すと、`Sheet1` の `A1`-`A2` に *Hello World* と表示されます。(これにより、書き込み実験成功です)

## 注意

Google Spread Sheets API の制限 ([公式ページ](https://developers.google.com/sheets/api/limits?hl=ja)より引用)

| 読み取りリクエスト|  |
| - | - |
| 1プロジェクト、1分あたり | 300 |
| 1プロジェクト、1ユーザー、1分あたり | 60 |

| 書き込みリクエスト|  |
| - | - |
| 1プロジェクト、1分あたり | 300 |
| 1プロジェクト、1ユーザー、1分あたり | 60 |

## 参考

- [GSheetLab | SUIRANFES](https://github.com/suiranfes/GSheetLab)
