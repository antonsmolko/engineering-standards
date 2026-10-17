# Proposal

## Why

После merge [PR #39](https://github.com/antonsmolko/engineering-standards/pull/39) verification CI работает, но инструкция выпуска и подготовка её артефактов ещё не проверены. [#35](https://github.com/antonsmolko/engineering-standards/issues/35) готовит этот процесс на synthetic данных до принятия содержания #20 и отдельно разрешённого выпуска #26.

## What Changes

- Короткая инструкция ручного выпуска штатным Changesets 3.0.3: подготовка и проверка tarballs, owner approval точных пакетов/версий/ревизии/артефактов, публикация этих tarballs, отдельные package tags и registry consumer verification.
- TS integration-проверка upstream packing на временных synthetic workspaces, с установкой полученных tarballs во внешний consumer и проверкой native integrity и однократным вызовом существующей проверки accepted headers.
- Ручная negative/positive репетиция контрольных точек содержания, аудита и разрешения; явное разделение этих проверок и автоматических tests. Нет утверждения, что CLI сам проверяет человеческие решения.
- Документирование npm permissions, release evidence и остановки/восстановления при частичном сбое.

## Capabilities

### New Capabilities

- `manual-package-publication`: подготовка, ручные контрольные точки и проверяемая репетиция выпуска пакетов документов.

### Modified Capabilities

Нет. Existing versioning/verification и содержание пакетов сохраняются.

## Impact

Реализация: `docs/publication.md`, `.changeset/README.md`, CONTRIBUTING/README и maintainer docs; TS test-only fixture в существующем suite. Зависимости, реальные версии 0.1.0, документы/owner decisions и verification workflow не меняются. Нет release workflow, custom release engine/approval API, registry writes, настоящих tags или credential/settings changes. План утверждён; реализация инструкции и synthetic проверки входит в этот PR.
