# Tasks

Носитель #35, ветка feature/engineering-standards-35-publication-preparation от 495b1a1. Один результат — проверенная инструкция ручного выпуска. Применение этого плана требует отдельного утверждения. Runtime/credentials/settings/publication не меняются при планировании.

## 1. Инструкция и согласованность

- [ ] 1.1 Написать docs/publication.md по design: upstream plan/pack/from-pack-dir, pinned CLI, clean revision/registry/пять имён, consumer/header checks, owner applicability/decisions, аудит, exact approval/SHA-512 и native SHA-256, package tags/registry installs и partial-failure STOP → logs/exit → npm view integrity → повтор того же каталога или новое approval. Проверить команды подготовки на temporary fixture; реальный publish/tag оставить явно за #26, не исполнять.
- [ ] 1.2 Добавить ссылки из README/CONTRIBUTING/.changeset/README.md. Обновить docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md и handoff. Сверить все stop points и зависимости с #20/#26/content-approval, local links/anchors; published package files не менять.

## 2. Проверка процедуры на synthetic данных

- [ ] 2.1 Добавить один TS integration test: synthetic fixture по реальным пяти workspaces и .changeset/config.json, native v1 plan → Changesets pack → native SHA-256 integrity совпадает с tarball → SHA-512 evidence → metadata/состав → external installOffline/checkDocuments и один вызов checkAcceptedHeaders. Проверить неизменность рабочего repo; без повторных negative-кейсов headers, npm publish dry-run, registry isolation, assertion «no tags» и upstream validation tests. Runtime/helper не расширять; если runtime change необходим, сначала RED и сверка scope, затем GREEN/full suite.
- [ ] 2.2 Выполнить и записать ручную test-only проверку stop points: поочерёдно missing acceptance/applicability, missing per-artifact audit, missing/mismatched approval, changed artifact после approval → STOP до publish; полный synthetic набор → «все stop points пройдены, publish не вызывался». Зафиксировать исполнителя, fixture/revision/integrity, фактические observations и команды отдельно от automated tests. Partial-failure требования только описать в runbook для #26, без simulation/real publish/recovery.

## 3. Полная проверка результата

- [ ] 3.1 Полный npm run check на Node 26.0.0/26.11.1 и actual GitHub matrix jobs; сохранить tarball/integrity/external-consumer evidence отдельно от ручных observations. Проверить неизменность реальных packages/версий 0.1.0/IDs/drafts/changelog/owner decisions/lockfile и absence registry writes/настоящих tags/credentials/settings changes.
- [ ] 3.2 Независимое review полного final diff/design/spec/tasks, требований #35/#20/#26, прежних confirmed closures и unchanged docs/issues; проверить public evidence, ссылки/anchors и complete runbook. Записать dispositions/issue edits в canonical ledger, исправить findings, проверить strict OpenSpec/whitespace и передать PR на явное merge approval; merge/publish не выполнять.

## Workflow follow-up

- После завершения/merge #35 перейти к содержательному #20; реальный выпуск/registry verification/permissions выполняются только в #26 с отдельным owner approval.
- Archive завершённых OpenSpec changes, repository settings и возможная будущая автоматизация требуют отдельных согласованных действий.
