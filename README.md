# Tech-furimaアプリ　（React + TypeScript + Vite）
<img width="1898" height="957" alt="スクリーンショット (6311)" src="https://github.com/user-attachments/assets/3eeea260-f21d-4863-af87-c843eac75de2" />
<img width="1888" height="958" alt="スクリーンショット (6312)" src="https://github.com/user-attachments/assets/2fa299c4-e5be-4202-aedd-216f8ac3d56a" />

## アプリ概要（画面構成）
Laravel API と React(TypeScript) を用いたフリマアプリです。

## 作成した目的

- Laravelで構築していたフリマアプリのフロントエンドを React + TypeScript で再構築し、Laravel APIと連携するSPA構成への理解を深めることを目的としました。
- バックエンド側のリポジトリはこちらです。   https://github.com/shoyama1010/tech-furima
- フロントエンドはVercelへのデプロイを想定しています。

## アプリケーションURL
### ローカル環境
http://localhost:5173

### 本番環境
Vercelへのデプロイを予定

### API連携
- Laravel API（Sanctum認証）

## 機能一覧

- ログイン＆ログアウト機能
- 商品一覧表示
- 検索機能
- 商品詳細表示機能
- いいね機能

## 使用技術

### フロントエンド
- React
- TypeScript
- React Router
- Tailwind CSS
- Vite
- Tailwind css 

## 環境構築

## 1. リポジトリをクローン

- git clone https://github.com/shoyama1010/frimaSite-frontend.git
- cd frimaSite-frontend

## 2.　パッケージをインストール

　npm install

## 3. 開発サーバー起動

　npm run dev

## 工夫した点

### 1. React + TypeScript によるSPA構成
- 商品一覧画面・商品詳細画面をReactで実装し、React Routerを用いて画面遷移を行えるようにしました。
- Laravel側はAPIとして利用し、フロントエンドとバックエンドを分離した構成にしています。

### 2. API連携による商品一覧・詳細表示
- 商品一覧・商品詳細は固定データではなく、Laravel APIから取得したDBデータを表示しています。
- これにより、バックエンド側のデータ更新がフロント画面に反映される構成にしています。

### 3. 非同期検索機能
- 検索フォームから入力されたキーワードをAPIに送信し、画面リロードなしで検索結果を表示できるようにしました。
- SPAらしい操作感を意識し、商品一覧画面でスムーズに絞り込みができるようにしています。

### 4. React Routerによる商品詳細遷移
- 商品カードをクリックすると、React Routerにより `/items/:id` の詳細ページへ遷移します。
- URLに商品IDを持たせることで、各商品ごとの詳細ページを直接表示できるようにしています。

### 5. Token認証によるログイン状態管理
- ログイン成功時にLaravel APIから返却されたアクセストークンを `localStorage` に保存し、認証が必要なAPI通信時に、Authorization: Bearer Token` として送信しています。
- これにより、React側からログイン状態を保持し、いいね機能などの認証必須処理を実行できるようにしました。

### 6. ログイン状態に応じたヘッダー表示切替
- localStorage` の認証トークン有無によって、ヘッダーの表示を切り替えています。
- 未ログイン時は「ログイン」、ログイン済みの場合は「ログアウト」を表示し、ユーザー状態に応じたUIになるようにしました。

### 7. いいね機能の即時反映
- 商品詳細画面でいいねボタンを押すと、API通信後に `likes_count` と `liked_by_me` を更新し、画面をリロードせずに星マークと件数が切り替わるようにしました。
-SPAの特徴である即時反映を意識しています。

### 8. Tailwind CSSによるUI構築
- Tailwind CSSを使用し、商品一覧・商品詳細・ログイン画面のレイアウトをコンポーネント単位で整えました。
- 既存のフリマアプリ画面に近い見た目を保ちながら、React側で再利用しやすいUIにしています。

## 苦労した点・解決したこと

### Laravel APIとの認証状態の連携
- Laravel側で発行されたアクセストークンをReact側で保持し、認証が必要なAPI通信時にAuthorization Bearer Tokenとして送信する構成にしました。
- ログイン状態に応じてヘッダー表示や利用可能な機能を切り替える部分も調整しました。

### API取得データと画面表示の整合
- 商品一覧・商品詳細・いいね数・コメントなど、複数のAPIレスポンスを画面上で正しく表示する部分に苦労しました。
- Laravel側のレスポンス形式を確認しながら、React側の型定義と表示処理を調整しました。

### いいね状態の即時反映
- いいね登録・解除後に画面全体を再読み込みせず、いいね数と状態をその場で反映させる処理を実装しました。
- API通信後にStateを更新することで、SPAとして操作感を損なわないようにしました。

### 非同期検索と画面遷移
- 検索キーワードをAPIへ渡して結果を取得し、ページを再読み込みせずに一覧へ反映する処理を実装しました。
- React Routerを利用して、商品一覧から商品詳細へスムーズに遷移できる構成にしました。

### 本番環境でのAPI接続
- ローカル環境とVercel公開環境でAPI接続先が異なるため、環境変数を利用して接続先を切り替える構成に整理しました。
- Laravel側をRailway、React側をVercelへ分離して公開し、CORS・認証・画像URLなどを確認しながら調整しました。
