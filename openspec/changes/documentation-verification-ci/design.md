# Design

## Context

База 3372e96 после merge PR #38: пять пакетов 0.1.0, Changesets 3.0.3 и 33 локальных tests; workflow ещё нет. [#18](https://github.com/antonsmolko/engineering-standards/issues/18) зависит от завершённых #33/#34. Content decisions в docs/architecture/content-approval.md остаются Pending. Мотивация — [proposal](proposal.md).

## Goals / Non-Goals

Один результат — verification CI пяти документальных пакетов. Переиспользуем npm check/pack и Changesets CLI. Проверка synthetic content-правила входит в #18, применение реальных решений и разрешение выпуска — #20/#35/#26. Реальные версии, тексты и owner decisions сохраняются. Release engine, каталог принятия, собственная YAML/Markdown-схема, registry writes, теги, secrets и branch protection не добавляются.

## Decisions

### Обычный GitHub Actions workflow

Baseline — [GitHub Node.js starter](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml), [setup-node](https://github.com/actions/setup-node), [checkout](https://github.com/actions/checkout) и [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use). Берём структуру install/check matrix, заменяем старые версии из starter нашей Node-политикой и не добавляем build для Markdown.

Один `.github/workflows/verify.yml`: pull_request в main и push main, ubuntu-24.04, matrix 26.0.0/26.11.1, contents read, timeout, fail-fast false. Actions закрепляются полными upstream commit SHA с комментарием версии: checkout v7.0.1 = 3d3c42e5aac5ba805825da76410c181273ba90b1; setup-node v7.1.0 = 949feb2413d6458794dcd2491c4babbbce0c15c1 (проверены через GitHub release/tag API 2026-10-16). Во время реализации SHA сверяются повторно с теми же releases.

Checkout fetch-depth 0 и persist-credentials false. Setup-node выбирает matrix Node, package-manager-cache false; cache/upload actions не нужны. Затем npm ci --ignore-scripts, npm run check, npm pack --workspaces --dry-run --json --ignore-scripts и Changesets status. Сетевой доступ нужен для официальных Actions/Node/npm install; existing consumer tests используют подготовленный install cache и offline fixtures. Ошибка любого шага блокирует job. Dry-run inventory выводится в log; состав/документы/локальные ссылки реально проверяются прежними installed-artifact tests, отдельного pack parser нет.

### Changesets и Git-контекст

[Штатный status](https://changesets.dev/guide/cli) на PR сравнивает с base commit из GitHub `pull_request.base.sha`. Значение и тип GitHub event передаются через env, не вставляются в shell-текст. Режим выбирается по event type; пустой base на PR — ошибка контекста, а не переключение на push mode. Preflight в workflow проверяет git cat-file commit и наличие merge-base с HEAD; ошибка даёт English diagnostic/nonzero до status. Затем npm run changeset -- status --since "$BASE_SHA". Full checkout обеспечивает историю; preflight делает отказ понятным при отсутствующем контексте. Без fetch/CLI fallback и без ложного success.

Для push main выполняется обычный status по всем pending changesets: comparison PR base к этому событию не применяется. Metadata check не требует remote refs. Отсутствие изменений пакетов не требует фиктивного changeset; остальные результаты/ошибки определяет CLI. Политика будущего version-preparation PR выбирается в #35 с учётом этого CI, а не обходится здесь через always-success.

Новая TS integration-проверка читает реальный workflow поддерживаемым YAML parser (direct exact dev dependency yaml 2.9.1, уже присутствует транзитивно в lockfile от Changesets), извлекает run-шаг Changesets и выполняет его в temporary Git/npm fixture с локальным CLI. Два сценария: доступный base/merge-base даёт success, отсутствующий base или несвязанная история дают diagnostic/nonzero. Это проверка нашего подключения Git-контекста, не повторение upstream validation suite. YAML syntax/context проверяются [upstream actionlint v1.7.12](https://github.com/rhysd/actionlint/tree/v1.7.12) и настоящими GitHub jobs; permissions/triggers/pins проходят review, без substring tests текста YAML.

### Synthetic accepted-content rule

Конкретный пробел npm/Changesets — они не знают правило проекта «accepted applicable ID в core, TypeScript и Svelte SPA». Небольшой TS test helper проверяет только это условие на maintainer-controlled synthetic decision records: пакет, непустой ID, accepted status, applicability. Вход создаётся тестом, не принимается из PR/CLI/registry как разрешение выпуска. Имена/сигнатура helper не становятся публичным product API или форматом реальных acceptance records.

Positive fixture содержит qualifying ID каждого из трёх пакетов. Negative fixtures пропускают пакет, оставляют proposed или помечают ID неприменимым; такие записи не квалифицируются. Дубликаты одного пакета не заменяют другой. Пустой список даёт false. CI проверяет правильность этих результатов assertions, а не требует accepted от нынешних девяти черновиков. Test helper read-only, не меняет документы/таблицу решений, не выполняет owner verification и не разрешает публикацию.

Это проверка release prerequisite на synthetic данных. Реальные записи решений остаются Markdown из content-approval.md; их извлечение/подтверждение и применение к реальному release artifact выбираются в #35/#26, с approvals #20. Здесь не вводим parser, approval flag, candidate JSON или второй источник реальных accepted IDs. Технический verify остаётся зелёным при Pending; реальный нормативный выпуск по существующему процессу остаётся запрещён до выполнения content gate и отдельного разрешения.

### Contribution, security и ownership

Добавить короткие CONTRIBUTING.md и SECURITY.md, ссылки из README. Contribution: Node/check, changesets, публичность материалов, review/отдельные merge/content/release decisions, владелец репозитория @antonsmolko как контакт. Security: не отправлять секреты в публичные issues; private reporting при доступности, иначе запросить приватный канал у владельца без чувствительных деталей. Не настраиваем reporting/credentials/protection и не добавляем автоматические review requests.

Существующие проверки состава находят служебные/review файлы и broken links; автоматизация не доказывает отсутствие всех секретов/продуктовых сведений или права распространения. Ручной аудит каждого реального release tarball сохраняется #26. Guide содержит только актуальные команды/правила; внутреннее устройство тестов и roadmap остаются в architecture/OpenSpec.

## Risks / Trade-offs

- Actions runner требует сеть/доступность Node/npm; install failure блокирует job с upstream diagnostic, offline consumer tests не обещают полностью offline CI.
- Full fetch проще ограниченного fetch и не вводит собственного управления глубиной; стоимость приемлема для небольшого repo.
- PR code исполняется без publish secrets/write token. Не используем pull_request_target/workflow_run или self-hosted runner. Проверки не препятствуют обходу через изменение workflow без будущей branch protection: настройка защиты остаётся отдельным разрешённым follow-up.
- Synthetic content tests не являются доказательством реального принятия/публикационной готовности; reviewer и #35/#26 сохраняют эту границу.

## Migration Plan

После утверждения: RED для content-helper/Git-context подключения, реализация helper/workflow, GREEN/full check на обеих Node, actionlint и реальные два GitHub jobs на PR. Новые tests/helpers — TS. Обновить handoff/tooling docs по фактическому результату, независимо проверить полный diff/docs/issues/links. Нет реального bump/content acceptance. Откат до merge — убрать workflow/helper/docs этим PR; после merge — revert. Завершение #18 открывает #35, но не закрывает #20/#26. Архивирование завершённых OpenSpec changes — отдельное действие.
