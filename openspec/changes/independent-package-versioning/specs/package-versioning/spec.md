# Package versioning

## Purpose

Позволить maintainer планировать независимые версии и changelog пяти пакетов документов поддерживаемым инструментом, сохраняя отдельные решения о содержании и публикации.

## ADDED Requirements

### Requirement: Независимые изменения пакетов

Maintainer SHALL создавать changeset с выбранными пакетами, bump types и English summary и просматривать release plan штатными командами Changesets. Применение SHALL менять версии/changelog выбранных пакетов; незатронутые пакеты и private root MUST сохраняться. Публичные exports MUST NOT меняться ради versioning tooling.

#### Scenario: Выбранные пакеты меняются независимо
- **WHEN** temporary project содержит core/TypeScript 0.1.0 и Svelte 1.2.3, а changesets выбирают core patch, TypeScript minor и Svelte major
- **THEN** план и один запуск version дают 0.1.1, 0.2.0 и 2.0.0, дополняют копии настоящих changelog English summaries и потребляют changesets
- **AND** frontend/Svelte SPA package.json и changelog, а также private root не меняются

### Requirement: Политика breaking изменений

Авторы/reviewers MUST выбирать minor для breaking в 0.x и major после 1.0, с English описанием миграции. CLI SHALL применять выбранный bump и сохранять summary в changelog. Автоматическое определение изменения смысла и полноты миграции не требуется.

#### Scenario: Breaking до 1.0
- **WHEN** temporary package 0.1.0 получает minor changeset с migration summary
- **THEN** version выдаёт 0.2.0 и сохраняет migration summary в changelog

#### Scenario: Breaking после 1.0
- **WHEN** temporary package 1.2.3 получает major changeset с migration summary
- **THEN** version выдаёт 2.0.0 и сохраняет migration summary в changelog

### Requirement: Просмотр плана

Status без output file SHALL быть read-only. Невалидный вход — штатная диагностика CLI, контракт её не расширяет.

#### Scenario: План не изменяет исходники
- **WHEN** status читает валидные changesets с тремя выбранными пакетами
- **THEN** показывает план, но не меняет версии/changelog/changesets/lockfile

### Requirement: Согласованность npm метаданных

После применения версий maintainer SHALL обновлять lockfile штатным npm и запускать существующие проверки. Временные fixtures MUST доказывать соответствие workspace package versions и lockfile без второго versioning engine.

#### Scenario: Lockfile после изменения версии
- **WHEN** version изменил temporary package, затем штатный npm обновил lockfile
- **THEN** workspace version check проходит, затронутые записи согласованы, неизменённые версии сохраняются

### Requirement: Проверка без реального выпуска

Изменение #34 MUST сохранять реальные версии пяти пакетов 0.1.0, тексты/статусы стандартов и их changelog. Bump tests SHALL выполняться только на synthetic temporary projects. Версионирование MUST NOT означать принятие содержания, разрешение merge/публикации или выполнение CI/publication задач.

#### Scenario: Итог инфраструктурной задачи
- **WHEN** реализация #34 и все проверки завершены
- **THEN** реальные пакеты остаются 0.1.0 с прежними документами, exports и changelog, private root не получает версию
- **AND** fixtures не создают commits/tags при versioning, публикация не выполняется и реальные artifacts/external consumer проверки проходят
