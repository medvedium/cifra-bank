---
name: git-pr-prep
description: >-
  Prepares a git shipping plan for cifra-bank.ru: branch name, file list,
  commit message, PR title and body. Use when the user asks to commit, push,
  open a PR, or «подготовь план деплоя / коммита / PR» — before running git
  write commands unless they explicitly asked to execute.
---

# Git / PR prep (cifra-bank.ru)

## When this skill applies

User wants to ship work but first needs a **plan** (or an executed commit/PR). Default: **propose the plan, do not commit/push** until they say «коммить», «пуш», «создай PR».

## Workflow

1. Inspect (read-only): `git status`, `git diff` / `git diff --stat`, `git log -8 --oneline`, current branch vs `main`.
2. **Split unrelated changes** into separate branches/PRs (Hero ≠ Footer spacing ≠ Cursor skills, unless user wants one dump).
3. Output a fixed template (Russian is fine for messages — match recent `git log` style).
4. Only after explicit approval: create branch if needed, `git add` listed files only, commit via HEREDOC, push, `gh pr create`.

## Output template (always)

```markdown
### Ветка
`type/short-kebab-name`

### Файлы в коммит
- path/one
- path/two

### Не включать
- path/unrelated (почему)

### Сообщение коммита
```
Краткий заголовок в стиле репо.

Опционально 1–2 предложения «зачем».
```

### PR
- **Title:** …
- **Body:**
```markdown
## Summary
- …

## Test plan
- [ ] …
```
```

## Naming

| type | when |
|------|------|
| `feature/` | new user-facing behavior |
| `fix/` | bugfix |
| `chore/` | tooling, deps, agent docs, non-product |
| `refactor/` | no behavior change |

Keep branch names short; reuse existing branch if already on a matching one.

## Commit message style (this repo)

- Russian, imperative / descriptive first line (see `git log`: «Добавлен…», «Hero: …», «Поиск: …»).
- One logical change per commit; optional second short paragraph for why.
- No force push to `main`; no commit of secrets (`.env`, keys).

## PR body

- Summary: 1–3 bullets of **why / user impact**.
- Test plan: checklist the reviewer can click through.
- Note WIP / deferred items explicitly.

## Agent docs (`.cursor/`)

- Prefer a separate `chore/…` PR for rules/skills unless the user asks to bundle with the feature.
- Update `AGENTS.md` skills list when adding a project skill.
