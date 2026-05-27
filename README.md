# coachtechフリマアプリ　（React + TypeScript + Vite）

## アプリ概要（画面構成）
Laravel API と React(TypeScript) を用いたフリマアプリです。

## アプリケーションURL

http://localhost:5173

## 作成した目的

laravelで動いてたフリマアプリを、SPA化して、画面構成的にどのようになるかを理解を深めました。

## 技術構成

### フロントエンド
- React 
- TypeScript  
- Vite
- React Router
- Tailwind css 

### API連携
- Laravel API（Sanctum認証）

## 機能一覧

-（仮）ログイン / ログアウト（会員登録は開発中）
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
- cd drugstock-frontend

## 2.　パッケージをインストール

　npm install

## 3. 開発サーバー起動

　npm run dev


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
