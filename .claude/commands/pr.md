プルリクエストの作成

## ブランチ作成（mainブランチにいる場合）

現在 `main` ブランチにいる場合は、作業用ブランチを作成してからコミット・PRを行うこと。
ブランチ名は以下の形式で作成すること：

```
{type}/{JIRA-KEY}-{kebab-case-description}
```

- `{type}`: 変更種別（`feat` / `fix` / `refactor` / `chore` など）
- `{JIRA-KEY}`: JiraのタスクキーをAskUserQuestionツールで必ずユーザーに確認すること（例: `KAN-7`）
- `{kebab-case-description}`: 変更内容を表す短い英語の説明（ケバブケース）

例: `feat/KAN-7-industry-modal`, `fix/KAN-12-login-error`

ユーザーへの確認方法：AskUserQuestionツールを使い「JiraのタスクキーはなんですかText入力で答えてください」と聞くこと。

---

現在のブランチの変更内容（`git log` や `git diff`）を確認し、適切なPull RequestのタイトルとDescription（説明文）を自動生成してください。
その後、GitHub CLI (`gh pr create`) を使用して実際にPRを作成してください。

Descriptionには以下の内容を含めてください：
- **概要**: 変更の目的を簡潔に
- **変更内容**: 具体的な変更点を箇条書きで
- **影響範囲**: レビュワーに確認してほしいポイントや懸念点

## ラベルの自動付与

`git log` のコミットメッセージや `git diff` の変更内容を分析し、以下のルールに従って適切なラベルを自動で選択すること。

| ラベル | 適用条件 |
|---|---|
| `feat` | コミットに `feat:` が含まれる、または新しい機能・画面が追加されている |
| `fix` | コミットに `fix:` が含まれる、またはバグ修正・不具合対応の変更である |
| `perf` | コミットに `perf:` が含まれる、またはパフォーマンス改善の変更である |
| `refactor` | コミットに `refactor:` が含まれる、またはリファクタリングの変更である |
| `ci` | コミットに `ci:` が含まれる、または `.github/` 配下のファイルが変更されている |
| `docs` | コミットに `docs:` が含まれる、または `README` / `.md` / `.claude/` 配下のファイルが変更されている |
| `chore` | コミットに `chore:` が含まれる、またはどのラベルにも当てはまらない場合 |

複数の種類の変更が混在する場合は、複数ラベルを付与すること。
選択したラベルを `gh pr create --label "label1" --label "label2"` の形式で付与すること。

## PR作成後の処理

`gh pr create` が成功したら、`git checkout main` を実行してmainブランチに戻ること。
