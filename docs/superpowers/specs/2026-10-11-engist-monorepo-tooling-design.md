# npm workspaces и инструменты пакетов документов

Текущие границы — [#30 / PR #31](https://github.com/antonsmolko/engineering-standards/pull/31) и [OpenSpec design](../../../openspec/changes/simplify-project-scope/design.md). Согласование дизайна, реализация, merge и публикация — отдельные действия.

## Базовые инструменты

[npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/) управляет установкой и lockfile; [npm scripts](https://docs.npmjs.com/cli/v11/commands/npm-run/) задают последовательность проверок. Maintained upstream baseline — [npm/cli smoke-tests](https://github.com/npm/cli/blob/latest/smoke-tests/package.json). У Markdown/JSON-документов нет необходимой компиляции или межпакетной генерации. Не создаём декоративных build targets или собственного versioning engine.

## Что работает сейчас

После PR #29 npm run check = typecheck → scripts/check-workspaces.ts → npm test. Он read-only: сверяет восемь workspace lock versions и local manifest.requires; English diagnostics/nonzero при ошибке, дальнейшие этапы не выполняются. Схемы/identity и реальные tarball/consumer проверки находятся в полном suite. Внешняя semantic совместимость не проверяется через registry. Этот текущий контракт пока не изменён.

## Переход и следующие этапы

- [#33](https://github.com/antonsmolko/engineering-standards/issues/33): пять workspaces документов, README-указатели и реальный внешний consumer. Catalog-зависимые проверки заменяются проверками сохранённого документационного контракта. Семантическая совместимость становится текстом README. Подробности реализации выбираются в этом PR.
- [#34](https://github.com/antonsmolko/engineering-standards/issues/34): штатный [Changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md), независимые версии/changelog и private root вне версионирования. Это оставшаяся часть закрытой #9, не реализованная merge PR #29. Рабочие версии до отдельно одобренного выпуска остаются 0.1.0.
- [#18](https://github.com/antonsmolko/engineering-standards/issues/18): verification CI, состав артефактов и content gate на fixtures; без публикации и CLI/config prerequisites.
- [#35](https://github.com/antonsmolko/engineering-standards/issues/35): подготовка процесса публикации на synthetic данных без выпуска. Затем #20 принимает содержание и [#26](https://github.com/antonsmolko/engineering-standards/issues/26) выполняет отдельно одобренную публикацию реальных пакетов.

Механизмы инструментов, CI и подготовки выпуска выбираются в собственных планах #34/#18/#35; старый version:prepare и projected-release engine не возвращаются.

Node-политика — [handoff](../../architecture/2026-10-11-session-handoff.md#проверки-и-рабочий-процесс). Content approval, ручной аудит и explicit publication approval независимы от настройки инструментов. [Прежний tooling design](https://github.com/antonsmolko/engineering-standards/blob/d483438/docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md) сохраняется в истории, не как новый implementation plan.
