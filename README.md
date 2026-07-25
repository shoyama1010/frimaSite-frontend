# coachtechフリマアプリ　（React + TypeScript + Vite）

## アプリ概要（画面構成）
Laravel API と React(TypeScript) を用いたフリマアプリです。

## アプリケーションURL

http://localhost:5173

## 作成した目的

- laravelで動いてたフリマアプリを、SPA化して、画面構成的にどのようになるかを理解を深めました。
- バックエンド側のリポジトリは⇒です。https://github.com/shoyama1010/tech-furima
- 将来的に、Verselで公開することを目的としてます。

## 技術構成

### フロントエンド
- React 
- TypeScript
- Node.js
- Vite
- React Router
- Tailwind css 

### API連携
- Laravel API（Sanctum認証）

## 機能一覧

-（仮）ログイン＆ログアウト 機能（会員登録は開発中）
- 商品一覧表示
- 検索機能
- 商品詳細表示（下記のいいね機能以外は、開発中）
- いいね機能

## 使用技術

### フロントエンド
- React
- TypeScript
- React Router
- Tailwind CSS
- Vite

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
- ログイン成功時にLaravel APIから返却されたアクセストークンを `localStorage` に保存し、認証が必要なAPI通信時に ` 
- Authorization: Bearer Token` として送信しています。
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



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
