# estion.

## はじめに
「estion.」は、エントリーシート（ES）の管理を効率化するためのWebアプリケーションです。<br>
就職活動で複数の企業に応募する際の **応募企業とエントリーシートの管理** をサポートし、効率的な就職活動を実現します。

[**アプリはこちら**](https://estion.jp/)
&nbsp;

## 規約・フォーマット (Code Style & Lint)

コードの品質を保つため、コミット前に以下のコマンドを実行してフォーマットと静的解析を行ってください。

**PHP (Laravel Pint)**

```bash
./vendor/bin/sail pint
```
**JavaScript / React (ESLint & Prettier)**

ESLintによる静的解析と自動修正とPrettierによるコード整形
```bash
npm run lint:fix
```
```bash
npm run format
```