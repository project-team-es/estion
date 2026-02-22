# Project: estion.
Laravel + React (Inertia.js) による就活生向けエントリーシート管理アプリ。

## Architecture & Context
- **Inertia.js**: 独立したAPI層を持たず、LaravelのControllerから直接Reactコンポーネントへデータを渡す構成。
- **Key Integrations**: 
  - 認証: Google OAuth (Laravel Socialite)
  - 外部連携: Google Calendar API (期限同期), Google Gemini API (模擬面接)
  - PDF出力: mPDF

## Commands
Claude Codeがスクリプトやテストを実行する際は以下を使用すること。
- **Backend (Docker)**: 必ず `./vendor/bin/sail` 経由で実行すること (例: `./vendor/bin/sail artisan migrate`, `./vendor/bin/sail artisan test`)
- **ログ確認**: `./vendor/bin/sail logs -f`
- **Frontend**: `npm run dev` (Vite), `npm run build`
- **Code Style/Lint**: 
  - PHP: `./vendor/bin/sail pint`
  - JS/JSX: `npm run lint:fix`, `npm run format`

## Custom Rules
- **PR作成**: 「PRを作って」と指示された場合は、`git diff` で差分を確認し、概要・変更点・影響範囲を含むDescriptionを生成した上で `gh pr create` を実行すること。