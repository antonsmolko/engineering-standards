# Proposal

## Why

После merge [PR #38](https://github.com/antonsmolko/engineering-standards/pull/38) пакеты и Changesets проверяются локально, но PR ещё не имеет verification CI. [#18](https://github.com/antonsmolko/engineering-standards/issues/18) переносит существующие проверки в GitHub Actions и проверяет правило accepted-content на synthetic данных до подготовки публикации.

## What Changes

- Один verification workflow для PR в main и push main: Node 26.0.0/26.11.1, clean npm install, root check, npm packed inventory и штатный Changesets status с доступной base/history.
- Synthetic positive/negative проверки правила: минимум один accepted applicable ID из core, TypeScript и Svelte SPA. Нынешние proposed документы не делают technical CI красным и не считаются готовыми к нормативному выпуску.
- Короткие contributor/security/ownership инструкции; автоматическая проверка состава пакетов дополняет ручной аудит материалов.
- Только read permissions, без publish credentials, tags, registry writes или branch protection changes.

## Capabilities

### New Capabilities

- `repository-verification`: повторяемые проверки PR/main для пяти пакетов документов с ограниченными разрешениями и проверкой content-gate поведения на fixtures.

### Modified Capabilities

Нет. Контракты пакетов/manual adoption и Changesets сохраняются. Предыдущие завершённые changes не архивируются в #18.

## Impact

`.github/workflows`, TS integration tests/test helper для проверки content-правила, contributor/security guidance и активные maintainer docs. Существующий npm run check и artifact/consumer suite переиспользуются. Пакеты/версии 0.1.0/черновики не меняются. Подготовка реального выпуска принадлежит #35, принятие содержания #20, отдельно разрешённый выпуск #26.
