プルリクエストの作成
現在のブランチの変更内容（`git log` や `git diff`）を確認し、適切なPull RequestのタイトルとDescription（説明文）を自動生成してください。
その後、GitHub CLI (`gh pr create`) を使用して実際にPRを作成してください。

Descriptionには以下の内容を含めてください：
- **概要**: 変更の目的を簡潔に
- **変更内容**: 具体的な変更点を箇条書きで
- **影響範囲**: レビュワーに確認してほしいポイントや懸念点

## ラベル選択

`gh pr create` を実行する前に、`AskUserQuestion` ツールを使って以下の選択肢からラベルを選んでもらうこと（複数選択可）。

| ラベル | 説明 |
|---|---|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `perf` | パフォーマンス改善 |
| `refactor` | リファクタリング |
| `ci` | CI/CD設定 |
| `docs` | ドキュメント |
| `chore` | その他の雑務 |

選択されたラベルを `gh pr create --label "label1" --label "label2"` の形式で付与すること。
