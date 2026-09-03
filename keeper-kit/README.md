# お手持ちキーパー・パッケージ（keeper-kit）

手持ちのLLM（ChatGPT／Claude／ローカル）と、エモクロアのルールブックと、
このパッケージがあればTRPGが回せる。ための一式。

## 中身

- `keeper_prompt_template.md`：AIへの最初の指示（雛形）。使うシナリオに合わせて［ ］内を埋める。
- `state_template.md`：確定状態の雛形。毎手番AIが更新する。
- `pc_template.md`：共鳴者シートの雛形。
- `eval_sheet.md`：テスト記録用紙。
- `scenarios/`：対応シナリオ。各1ディレクトリ（`scenario.md`＋`ho.md`＋`keeper_notes.md`）。
- `howto_gui.md`：ブラウザのチャットで回す手順。
- `howto_agent.md`：Claude Code／Codex等で回す手順。

## 対応シナリオ

- `scenarios/yuudachi/`「夕立のあと」（テスト用新作・1〜2人・60〜90分）
- 旧作「声は壁を透して」一式は `trpg-keeper/` と `docs/emoklore_*` に残置（v0サンプル）。

## 使い方（5分で開始）

1. `keeper_prompt_template.md` の［シナリオ名］［HO］［怪異の感情］を埋める（対応シナリオなら `keeper_notes.md` に転記文あり）。
2. AIにプロンプト→シナリオ本文→HOの順で貼る（詳しくは `howto_gui.md`）。
3. PLは名前と職業を告げる。以降は発言するだけ。
