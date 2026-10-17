# Tasks

Носитель #35, ветка feature/engineering-standards-35-publication-preparation от 495b1a1. Один результат — проверенная инструкция ручного выпуска. Применение этого плана требует отдельного утверждения. Runtime/credentials/settings/publication не меняются при планировании.

## 1. Инструкция и согласованность

- [ ] 1.1 Написать docs/publication.md по design: upstream version/plan/pack/from-pack-dir, pinned CLI, clean revision/registry/пять имён, consumer/header checks, owner applicability/decisions, аудит, exact approval/hashes, package tags/registry installs и partial-failure stop/recovery. Проверить каждый command на temporary fixture там, где возможен безопасный dry-run; реальный publish/tag оставить явно за #26, не исполнять.
- [ ] 1.2 Добавить ссылки из README/CONTRIBUTING/.changeset/README.md; в versioning guide описать version-preparation PR после consumption и committed empty changeset для CI. Обновить docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md и handoff. Сверить все stop points и зависимости с #20/#26/content-approval, local links/anchors; published package files не менять.

## 2. Проверка процедуры на synthetic данных

- [ ] 2.1 Добавить один TS integration test по upstream pack fixture: temporary synthetic workspaces, native v1 plan, Changesets pack, actual tarball metadata/состав/hashes, external installOffline/checkDocuments/checkAcceptedHeaders (accepted positive и proposed not-ready), npm publish dry-run с изолированным config/cache/закрытым registry и ignore-scripts. Проверить no tags/no real repo changes. Тестировать полученные артефакты, не текст runbook и не upstream JSON validation; runtime/helper не расширять. Если необходим runtime change, сначала воспроизвести RED и отдельно сверить scope, затем GREEN/full suite.
- [ ] 2.2 Выполнить и записать ручную test-only репетицию по той же инструкции: поочерёдно missing acceptance/applicability, missing per-artifact audit, missing/mismatched approval, changed artifact после approval → STOP до publish/tag; полный synthetic набор → только dry-run. Отдельно пройти simulated partial-failure/unknown registry state и записать остановку/сохранение evidence/условия разрешённого remaining subset. Зафиксировать исполнителя, fixture/revision/hashes, фактические observations и команды; не подменять проверку утверждением по булевым flags и не выдавать simulation за actual publish/recovery.

## 3. Полная проверка результата

- [ ] 3.1 Полный npm run check на Node 26.0.0/26.11.1 и actual GitHub matrix jobs; сохранить tarball/external-consumer/dry-run evidence отдельно от ручных observations. Проверить неизменность реальных packages/версий 0.1.0/IDs/drafts/changelog/owner decisions/lockfile и absence registry writes/настоящих tags/credentials/settings changes.
- [ ] 3.2 Независимое review полного final diff/design/spec/tasks, требований #35/#20/#26, прежних confirmed closures и unchanged docs/issues; проверить public evidence, ссылки/anchors и complete runbook. Записать dispositions/issue edits в canonical ledger, исправить findings, проверить strict OpenSpec/whitespace и передать PR на явное merge approval; merge/publish не выполнять.

## Workflow follow-up

- После завершения/merge #35 перейти к содержательному #20; реальный выпуск/registry verification/permissions выполняются только в #26 с отдельным owner approval.
- Archive завершённых OpenSpec changes, repository settings и возможная будущая автоматизация требуют отдельных согласованных действий.
