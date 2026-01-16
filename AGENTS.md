# Repository Guidelines

## プロジェクト構成とモジュール配置
- `app/`: アプリのソース。主な入口は `app/root.tsx`、`app/routes.ts`、および `app/routes/` 配下の各ルート。
- `app/app.css`: 基本スタイル。Tailwind を利用したユーティリティファースト構成。
- `public/`: そのまま配信される静的アセット。
- `react-router.config.ts` / `vite.config.ts` / `tsconfig.json`: ビルド・ツール設定。
- `npm run build` 後に `build/` に成果物（server/client）が生成される。

## ビルド・テスト・開発コマンド
- `npm run dev`: HMR 付きの開発サーバー起動（既定 `http://localhost:5173`）。
- `npm run build`: 本番ビルドを `build/` に出力。
- `npm run start`: `build/server/index.js` を使って本番サーバー起動。
- `npm run typecheck`: React Router の型生成と `tsc` を実行。

## コーディングスタイルと命名規則
- 言語は TypeScript（ESM）。ルート単位で小さく整理する。
- インデントは JSON が 2 スペース、TS/TSX はプロジェクトの既存スタイルに合わせる。
- ルートは `app/routes/` 配下に配置（例: `app/routes/_index.tsx`）。
- コンポーネントや loader/action は説明的な名前にする（例: `UsersList`, `loader`）。

## テスト方針
- 現状、テストフレームワークは未導入。
- 追加する場合は `app/routes/foo.test.tsx` のように同居させるか、`tests/` を作成し、`package.json` に実行コマンドを記載する。

## コミット / PR ガイドライン
- コミットは短く要点を示す形式（例: `config: set ssr to false`）。
- PR には変更概要、理由、UI 変更時のスクリーンショットを含める。
- 関連 Issue があればリンクする。

## セキュリティ / 設定の注意
- 秘密情報はコミットしない。環境依存の設定はリポジトリ外に置く。
- ビルドやサーバー設定を変えた場合は `README.md` を更新する。
