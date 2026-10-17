# npm workspaces и инструменты пакетов документов

Текущие границы — [#30 / PR #31](https://github.com/antonsmolko/gost-spec/pull/31) и [OpenSpec design](../../../openspec/changes/simplify-project-scope/design.md). Согласование дизайна, реализация, merge и публикация — отдельные действия.

## Базовые инструменты

[npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/) управляет установкой и lockfile; [npm scripts](https://docs.npmjs.com/cli/v11/commands/npm-run/) задают последовательность проверок. Maintained upstream baseline — [npm/cli smoke-tests](https://github.com/npm/cli/blob/latest/smoke-tests/package.json). У Markdown/JSON-документов нет необходимой компиляции или межпакетной генерации. Не создаём декоративных build targets или собственного versioning engine.

## Что работает сейчас

В #33 npm run check = typecheck → scripts/check-workspaces.ts → npm test. Read-only скрипт сверяет версии пяти workspace-записей lockfile; missing/stale entries и I/O ошибки дают English diagnostics/nonzero, следующие этапы не выполняются. Полный suite проверяет документальные артефакты и ручное подключение во внешнем потребителе. Семантическая manifest.requires проверка и catalog/schema tests удалены вместе с их контрактом; совместимость описывается в README.

Проверки Markdown используют штатный lexer [marked](https://marked.js.org/using_pro#walk-tokens), закреплённый dev-only. Конкретный пробел npm — наличие и доступность целей документальных ссылок. Test-only helper проверяет установленные файлы и локальные Markdown links, включая reference links/images, и не создаёт продуктовый каталог. Внешние ссылки не запрашиваются; проверяется существование локального файла внутри canonical package root, а не якорь заголовка. Ошибка называет пакет и путь.

#34 добавляет штатный Changesets CLI 3.0.3, прямой npm script и конфигурацию с baseBranch main/commit false; independent/private-package/changelog поведение использует defaults v3. [План и контракт](../../../openspec/changes/independent-package-versioning/design.md), [команды](../../../.changeset/README.md). Две TS integration-проверки проверяют объединённый version+lockfile и read-only status; bump только на temporary fixtures с копиями настоящих changelog. После version lockfile обновляется штатным npm и проверяется существующим checkWorkspaces; своего release engine нет.

## Verification CI (#18)

[Workflow](../../../.github/workflows/verify.yml) переиспользует официальный
[Node.js starter](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml):
pull_request в main и push main, ubuntu-24.04, Node 26.0.0/26.11.1, read-only
contents, закреплённые SHA checkout/setup-node, без persisted credentials и cache.
Шаги: npm ci --ignore-scripts → npm run check → npm packed inventory в log.
Файлы реальных tarballs проверяет existing external-consumer suite, а не inventory parser.
PR Changesets status использует base SHA события и полную Git history. Push-main
status проверяет config/pending-план; package edits без changeset проверяет PR-шаг.
Ошибки Git-контекста обрабатывает upstream CLI; собственного preflight/YAML runner нет.
[Contributor guide](../../../CONTRIBUTING.md) и [.changeset guide](../../../.changeset/README.md)
требуют normal changeset для release change либо committed add --empty для package edit без выпуска.

Read-only TS test helper читает существующие ID/Status headers Markdown из
установленных пакетов (имена из package.json), исключает README/code examples и
требует непустой accepted ID каждого core/TypeScript/Svelte SPA. Synthetic fixture
пакеты проверяют positive/negative поведение; тот же helper проверяет настоящие
установленные tarballs и ожидает not-ready нынешних proposed документов. Это
проверка artifact-header prerequisite, без нового каталога или формата решений.
Применимость ID, подлинность owner decision, reviewed revision, повторная оценка
изменённого содержания и разрешение выпуска подтверждаются отдельно по
[content approval](../../architecture/content-approval.md). Автоматические проверки
состава/ссылок не заменяют ручной аудит секретов/продуктовых материалов/прав
каждого реального release tarball. [Security reporting](../../../SECURITY.md) указывает
владельца и приватный способ сообщения без публикации чувствительных данных.

## Подготовка ручной публикации (#35)

[Инструкция](../../publication.md) использует штатные publish-plan/pack/from-pack-dir
Changesets 3.0.3 и отдельный pack directory. Native plan experimental; CLI закреплён
lockfile. Один TS integration test копирует metadata пяти workspaces/config в temporary
synthetic fixture, проверяет реальные tarballs/native SHA-256/SHA-512, offline consumer,
documents/links и один вызов existing accepted-header helper. Нового approval API,
release engine, registry isolation или дублирования header negatives нет.

Оператор отдельно проверяет content/applicability decisions, аудит каждого tarball,
точное owner approval имён/версий/revision/артефактов и SHA-512 перед publish. Manual
synthetic stop-point observations записываются отдельно от tests и не принимают
реальные документы. Полный synthetic результат заканчивается до publish. Инструкция
описывает actual #26 registry rights, tags, integrity/exact installs и partial failure:
STOP → logs/exit → npm view exact integrity → повтор того же одобренного каталога либо
новое approval. Эти реальные side effects в #35 не выполняются/не симулируются;
автоматического enforcement человеческих решений CLI/CI не обещают.

## Переход и следующие этапы

- [#33](https://github.com/antonsmolko/gost-spec/issues/33): пять workspaces документов, README-указатели и реальный внешний consumer. Catalog-зависимые проверки заменяются проверками сохранённого документационного контракта. Семантическая совместимость становится текстом README. Подробности реализации выбираются в этом PR.
- [#34](https://github.com/antonsmolko/gost-spec/issues/34): штатный [Changesets](https://changesets.dev/guide/getting-started), независимые версии/changelog и private root вне версионирования. Это оставшаяся часть закрытой #9, не реализованная merge PR #29; завершена PR #38 по отдельному утверждённому OpenSpec design. Рабочие версии до отдельно одобренного выпуска остаются 0.1.0.
- [#18](https://github.com/antonsmolko/gost-spec/issues/18): verification CI, состав артефактов и content gate на fixtures; без публикации и CLI/config prerequisites.
- [#35](https://github.com/antonsmolko/gost-spec/issues/35): подготовка процесса публикации на synthetic данных без выпуска. Затем #20 принимает содержание и [#26](https://github.com/antonsmolko/gost-spec/issues/26) выполняет отдельно одобренную публикацию реальных пакетов.

Changesets настроен по плану #34; verification CI реализуется по утверждённому плану #18, подготовка ручного выпуска реализуется по утверждённому плану #35; старый version:prepare и projected-release engine не возвращаются.

Node-политика — [handoff](../../architecture/2026-10-11-session-handoff.md#проверки-и-рабочий-процесс). Content approval, ручной аудит и explicit publication approval независимы от настройки инструментов. [Прежний tooling design](https://github.com/antonsmolko/gost-spec/blob/d483438/docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md) сохраняется в истории, не как новый implementation plan.
