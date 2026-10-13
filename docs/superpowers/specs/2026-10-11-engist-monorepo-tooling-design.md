# Engist: npm workspaces, Changesets и корневой check

Статус: scope #9 сокращён [решением владельца](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816).
Это заменяет прежние требования pack:check/version:prepare и собственному release tooling.
[Первый план](../plans/2026-10-13-workspace-checks.md) описывает check на TypeScript.
Согласование плана и gates merge/публикации остаются отдельными.

## Область работ

Первый PR #29 даёт одну локальную команду `npm run check`:
`npm run typecheck` → `node scripts/check-workspaces.ts` → `npm test`.
Ошибка любого этапа останавливает последующие. Полный существующий suite,
включая tarball/consumer/catalog tests, сохраняется; второй упаковочный этап не добавляется.
Node ^26.0.0; проверяются 26.0.0 и 26.11.1. Root private, все восемь workspace versions — 0.1.0.

Базовые инструменты: [npm scripts](https://docs.npmjs.com/cli/v11/commands/npm-run/),
[workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/), node:test.
Поддерживаемый upstream пример: [npm/cli smoke-test scripts](https://github.com/npm/cli/blob/latest/smoke-tests/package.json).
Проектный пробел: npm ci не обнаруживает version-only drift workspace lock entries;
семантический manifest.requires не является npm dependency. Только эти проверки
добавляет scripts/check-workspaces.ts. Никаких Lerna/Nx и package-level check targets.

## Контракт workspace check

Вход — maintainer-controlled root package.json.workspaces, package-lock.json,
workspace package.json и manifest.json у пакетов с существующим manifest export.
Tooling-пакетам с зарезервированным files[] manifest не требуется.

Для каждого workspace lock.packages[workspacePath] должен существовать, а version
точно совпадать с workspace package.json. Для каждого local manifest.requires
semver.satisfies проверяет установленную workspace version. Внешние requires
не обращаются к сети и не считаются проверенными для публикации.

Успех: пустые diagnostics и exit 0. Missing/stale lock entry, incompatible local range
или невозможность прочитать/разобрать входные данные: English diagnostics, exit 1,
без записи. JSON schema, package/manifest identity, валидность versions/ranges и
корректность layout проверяются существующим полным suite; их проверки не дублируются
в новом скрипте. Типы скрипта проверяются штатным tsc, включая @types/semver.

## Второй PR и границы

Второй PR #9 настраивает штатный Changesets с fixed: [], linked: [], access: public,
baseBranch: main; private root не версионируется. Status/version выполняются штатными
командами, без собственного version:prepare. Решения по Changesets уточняются
в отдельно согласуемом плане второго PR. Lerna/Nx отложены до реальных
prerequisites и измеримой потребности, как зафиксировано в общем плане.
Рабочие версии до публикации остаются 0.1.0; публикация требует явного разрешения.

Проверка состава пакетов штатным npm pack --workspaces --dry-run --json принадлежит #18.
CLI/config products отложены до первого выпуска согласно [решению #1](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6139713098).
Общий roadmap/design обновляется отдельным docs-PR по #1; этот PR не реализует его.
Принятие содержания, запрет приватных материалов, merge и публикация остаются отдельными gates.
