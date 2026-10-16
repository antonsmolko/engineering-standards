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

[Штатный status](https://changesets.dev/guide/cli) на PR сравнивает с base commit из GitHub pull_request.base.sha. Checkout fetch-depth 0 обеспечивает base/history. Шаг выбирается штатным `if: github.event_name == 'pull_request'`, base SHA передаётся через env; команда — `npm run changeset -- status --since "$BASE_SHA"`. Отдельный push-main шаг с event if выполняет обычный status по всем pending changesets. Shell-ветвление, preflight и fallback не нужны.

Changesets 3.0.3 уже даёт nonzero/понятную диагностику на missing ref, shallow/orphan history и пустой --since; этот отказ не заменяется нашей обработкой. Evidence поведения фиксируется в ledger при реализации, без нового тестового runner/YAML parser или собственного Git helper. Локальный metadata check не требует remote refs.

Это новый contributor contract: изменение любого файла пакета, включая Markdown, без changeset даёт nonzero branch-relative status. Автор добавляет обычный changeset для выпуска; если выпуск не нужен — `npm run changeset -- add --empty`, файл коммитится с правкой. Пустой changeset фиксирует явное решение без bump и не принимает содержание. Эта обязанность и две команды добавляются в `.changeset/README.md` и CONTRIBUTING.md. Правки вне пакетов не требуют фиктивного changeset. Upstream validation не переписывается и не оборачивается. Режим будущего version-preparation PR определяется в #35 с учётом CI, без always-success здесь.

### Accepted-content prerequisite из установленных документов

Конкретный пробел npm/Changesets — проверка присутствия accepted ID в core, TypeScript и Svelte SPA. Небольшой read-only TS test helper получает корни установленных пакетов, определяет пакет по его package.json и читает существующие metadata строки `ID:` и `Status:` в начале Markdown стандартов. Baseline инспекции — tests/helpers/check-documents.ts, Markdown lexer marked уже установлен. Новый каталог, synthetic record format или поле applicability не вводятся.

Непустой ID и точный status accepted квалифицируют документ; proposed/неизвестный/отсутствующий status и пустой ID не квалифицируют. Упоминания metadata в README или code examples не становятся стандартом. Суффикс draft/level существующей строки не принимает документ автоматически. Helper возвращает результат наличия accepted IDs всех трёх пакетов и diagnostics для отсутствующих пакетов/accepted ID; missing/unreadable input даёт not ready с пакетом/путём, без изменения файлов.

Входы — фактически установленные package roots из внешнего consumer, name/version которых уже проверяет artifact test; это проверяемые данные, а не owner approval. Positive synthetic fixture-пакеты содержат заголовки с accepted ID всех трёх пакетов. Negative fixtures содержат missing package, proposed/неизвестный/отсутствующий status или empty ID; дубликаты одного пакета не заменяют другой. В tests/integration/document-artifacts.test.js тот же helper вызывается на реальных установленных tarballs: нынешние proposed документы дают not ready, и assertion этого отказа делает technical CI зелёным.

Результат — необходимая проверка заголовков release artifact, которую можно выполнять и на реальных данных, а не признак разрешённой публикации. Применимость принятого ID подтверждает владелец в #26; она не выводится из Markdown автоматически. Подлинность решения, reviewed revision, переоценка изменённого содержания, аудит и отдельное разрешение выпуска сохраняются по content-approval.md/#20/#35/#26. Зелёный infrastructure suite и synthetic accepted headers не меняют реальные owner decisions или draft labels. Полный процесс публикации в #18 не реализуется.

### Contribution, security и ownership

Добавить короткие CONTRIBUTING.md и SECURITY.md, ссылки из README. Contribution: Node/check, changesets, публичность материалов, review/отдельные merge/content/release decisions, владелец репозитория @antonsmolko как контакт. Security: не отправлять секреты в публичные issues; private reporting при доступности, иначе запросить приватный канал у владельца без чувствительных деталей. Не настраиваем reporting/credentials/protection и не добавляем автоматические review requests.

Существующие проверки состава находят служебные/review файлы и broken links; автоматизация не доказывает отсутствие всех секретов/продуктовых сведений или права распространения. Ручной аудит каждого реального release tarball сохраняется #26. Guide содержит только актуальные команды/правила; внутреннее устройство тестов и roadmap остаются в architecture/OpenSpec.

## Risks / Trade-offs

- Actions runner требует сеть/доступность Node/npm; install failure блокирует job с upstream diagnostic, offline consumer tests не обещают полностью offline CI.
- Full fetch проще ограниченного fetch и не вводит собственного управления глубиной; стоимость приемлема для небольшого repo.
- PR code исполняется без publish secrets/write token. Не используем pull_request_target/workflow_run или self-hosted runner. Проверки не препятствуют обходу через изменение workflow без будущей branch protection: настройка защиты остаётся отдельным разрешённым follow-up.
- Проверки accepted headers не являются доказательством реального owner acceptance/применимости/публикационной готовности; reviewer и #35/#26 сохраняют эту границу.

## Migration Plan

После утверждения: RED для artifact header helper, реализация helper/workflow, GREEN/full check на обеих Node и реальные два GitHub jobs на PR. Workflow проверяется штатной валидацией GitHub и независимым review; actionlint не является обязательным инструментом/шагом. Новые tests/helpers — TS. Обновить handoff/tooling docs по фактическому результату, независимо проверить полный diff/docs/issues/links. Нет реального bump/content acceptance. Откат до merge — убрать workflow/helper/docs этим PR; после merge — revert. Завершение #18 открывает #35, но не закрывает #20/#26. Архивирование завершённых OpenSpec changes — отдельное действие.
