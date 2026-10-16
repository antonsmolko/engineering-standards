# npm workspaces и инструменты пакетов документов

Текущие границы — [#30 / PR #31](https://github.com/antonsmolko/engineering-standards/pull/31) и [OpenSpec design](../../../openspec/changes/simplify-project-scope/design.md). Согласование дизайна, реализация, merge и публикация — отдельные действия.

## Базовые инструменты

[npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/) управляет установкой и lockfile; [npm scripts](https://docs.npmjs.com/cli/v11/commands/npm-run/) задают последовательность проверок. Maintained upstream baseline — [npm/cli smoke-tests](https://github.com/npm/cli/blob/latest/smoke-tests/package.json). У Markdown/JSON-документов нет необходимой компиляции или межпакетной генерации. Не создаём декоративных build targets или собственного versioning engine.

## Что работает сейчас

В #33 npm run check = typecheck → scripts/check-workspaces.ts → npm test. Read-only скрипт сверяет версии пяти workspace-записей lockfile; missing/stale entries и I/O ошибки дают English diagnostics/nonzero, следующие этапы не выполняются. Полный suite проверяет документальные артефакты и ручное подключение во внешнем потребителе. Семантическая manifest.requires проверка и catalog/schema tests удалены вместе с их контрактом; совместимость описывается в README.

Проверки Markdown используют штатный lexer [marked](https://marked.js.org/using_pro#walk-tokens), закреплённый dev-only. Конкретный пробел npm — наличие и доступность целей документальных ссылок. Test-only helper проверяет установленные файлы и локальные Markdown links, включая reference links/images, и не создаёт продуктовый каталог. Внешние ссылки не запрашиваются; проверяется существование локального файла внутри canonical package root, а не якорь заголовка. Ошибка называет пакет и путь.

#34 добавляет штатный Changesets CLI 3.0.3, прямой npm script и конфигурацию с baseBranch main/commit false; independent/private-package/changelog поведение использует defaults v3. [План и контракт](../../../openspec/changes/independent-package-versioning/design.md), [команды](../../../.changeset/README.md). Две TS integration-проверки проверяют объединённый version+lockfile и read-only status; bump только на temporary fixtures с копиями настоящих changelog. После version lockfile обновляется штатным npm и проверяется существующим checkWorkspaces; своего release engine нет.

## Переход и следующие этапы

- [#33](https://github.com/antonsmolko/engineering-standards/issues/33): пять workspaces документов, README-указатели и реальный внешний consumer. Catalog-зависимые проверки заменяются проверками сохранённого документационного контракта. Семантическая совместимость становится текстом README. Подробности реализации выбираются в этом PR.
- [#34](https://github.com/antonsmolko/engineering-standards/issues/34): штатный [Changesets](https://changesets.dev/guide/getting-started), независимые версии/changelog и private root вне версионирования. Это оставшаяся часть закрытой #9, не реализованная merge PR #29; реализуется в PR #38 по отдельному утверждённому OpenSpec design. Рабочие версии до отдельно одобренного выпуска остаются 0.1.0.
- [#18](https://github.com/antonsmolko/engineering-standards/issues/18): verification CI, состав артефактов и content gate на fixtures; без публикации и CLI/config prerequisites.
- [#35](https://github.com/antonsmolko/engineering-standards/issues/35): подготовка процесса публикации на synthetic данных без выпуска. Затем #20 принимает содержание и [#26](https://github.com/antonsmolko/engineering-standards/issues/26) выполняет отдельно одобренную публикацию реальных пакетов.

Changesets настроен по плану #34; механизмы CI и подготовки выпуска выбираются в собственных планах #18/#35; старый version:prepare и projected-release engine не возвращаются.

Node-политика — [handoff](../../architecture/2026-10-11-session-handoff.md#проверки-и-рабочий-процесс). Content approval, ручной аудит и explicit publication approval независимы от настройки инструментов. [Прежний tooling design](https://github.com/antonsmolko/engineering-standards/blob/d483438/docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md) сохраняется в истории, не как новый implementation plan.
