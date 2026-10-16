# Package versioning

## Purpose

Позволить maintainer планировать независимые версии и changelog пяти пакетов документов поддерживаемым инструментом, сохраняя отдельные решения о содержании и публикации.

## ADDED Requirements

### Requirement: Независимые изменения пакетов

Maintainer SHALL создавать changeset с выбранными пакетами, bump types и English summary и просматривать release plan штатными командами Changesets. Применение SHALL менять версии/changelog выбранных пакетов; незатронутые пакеты и private root MUST сохраняться. Публичные exports MUST NOT меняться ради versioning tooling.

#### Scenario: Редактура одного пакета
- **WHEN** во временном проекте из пяти пакетов 0.1.0 changeset выбирает только core с patch и запускаются status и version
- **THEN** план содержит только core 0.1.1, version записывает его changelog с summary и потребляет changeset
- **AND** остальные четыре package.json/changelog и private root не меняются

#### Scenario: Один changeset выбирает несколько пакетов
- **WHEN** synthetic changeset выбирает core patch и TypeScript minor
- **THEN** их версии меняются независимо до 0.1.1 и 0.2.0, оба changelog содержат summary, остальные три пакета не меняются

### Requirement: Политика breaking изменений

Авторы/reviewers MUST выбирать minor для breaking в 0.x и major после 1.0, с English описанием миграции. CLI SHALL применять выбранный bump и сохранять summary в changelog. Автоматическое определение изменения смысла и полноты миграции не требуется.

#### Scenario: Breaking до 1.0
- **WHEN** temporary package 0.1.0 получает minor changeset с migration summary
- **THEN** version выдаёт 0.2.0 и сохраняет migration summary в changelog

#### Scenario: Breaking после 1.0
- **WHEN** temporary package 1.2.3 получает major changeset с migration summary
- **THEN** version выдаёт 2.0.0 и сохраняет migration summary в changelog

### Requirement: Просмотр и диагностика

Status без output file SHALL быть read-only. Невалидные config/changeset или неизвестное имя пакета MUST давать штатную ошибку CLI; собственное исправление данных и транзакционный rollback не требуются. Руководство MUST отличать отсутствие релизных изменений от некорректных входов и отсутствующей Git base ref.

#### Scenario: Чистый проект без changesets
- **WHEN** status выполняется в чистом временном Git-проекте с корректной конфигурацией и base main без changesets
- **THEN** нет релизных изменений и исходники/lockfile не меняются

#### Scenario: План не изменяет исходники
- **WHEN** status читает валидный synthetic changeset
- **THEN** показывает план, но не меняет версии/changelog/changeset/lockfile

#### Scenario: Некорректный вход
- **WHEN** корректный temporary Git-project по отдельности получает malformed config, malformed changeset или changeset с неизвестным package name
- **THEN** CLI завершается nonzero с диагностикой причины, не выдавая ошибку missing Git ref вместо проверки входа

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
