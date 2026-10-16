# Proposal

## Why

После merge [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37) пять пакетов документов устанавливаются и проверяются, но независимые версии/changelog ещё не обслуживаются инструментом. [#34](https://github.com/antonsmolko/engineering-standards/issues/34) закрывает оставшийся критерий #9 штатным Changesets, сохраняя отдельные approvals содержания и выпуска.

## What Changes

- Подключить поддерживаемый Changesets CLI и его обычную конфигурацию для пяти независимых пакетов; private root не версионируется.
- Документировать создание changeset, read-only просмотр плана и применение версий штатными командами, включая отдельное обновление npm lockfile.
- Зафиксировать выбор bump: редактура — patch; breaking в 0.x — minor с миграцией, после 1.0 — major с миграцией. Смысл изменения оценивает автор/reviewer, а не новый parser.
- Проверить версии/changelog/lockfile только на временных synthetic fixtures, затем существующие реальные артефакты/consumer.
- Рабочие версии остаются 0.1.0. CI, публикация, теги и принятие стандартов не входят в результат.

## Capabilities

### New Capabilities

- `package-versioning`: независимое планирование и применение версий/changelog обычными командами Changesets для пакетов документов.

### Modified Capabilities

Нет. Контракты пакетов и ручного подключения из simplify-project-scope сохраняются; этот завершённый change не архивируется в #34.

## Impact

Root devDependencies/package-lock, `.changeset`, один прямой npm script для CLI, TS integration tests, maintainer guidance и handoff. Публичные exports/документы стандартов не меняются. Отдельный результат #34; далее #18, #35, #20 и явно одобренный выпуск #26.
