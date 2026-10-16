# Changesets для пяти пакетов — #34

Носитель — [#34](https://github.com/antonsmolko/engineering-standards/issues/34), prefix engineering-standards-34. База b205da3 после merge [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37); #33 закрыта. Этот снимок содержит только OpenSpec planning artifacts independent-package-versioning и актуализацию handoff. Runtime ещё не реализован; все девять implementation tasks открыты.

## Источники и scope

Прочитаны #34 и все его comments (пусто), общий roadmap #1, зависимости #18/#35 и отдельные content/release gates #20/#26, активные design/roadmap/check/tests. Закрытые findings PR #37 сохраняются: в #34 они не переоткрываются. Baseline — [Changesets getting started](https://changesets.dev/guide/getting-started), [config](https://changesets.dev/guide/config), [CLI](https://changesets.dev/guide/cli) и [maintained upstream configuration](https://github.com/changesets/changesets/blob/main/.changeset/config.json). npm metadata на дату planning: CLI 3.0.3, Node ^22.11 || ^24 || >=26, npm >=10.9.0; наша Node-политика остаётся ^26.0.0. Старые GitHub docs Changesets помечены outdated и не используются вместо текущей документации сайта.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C1: независимые версии/changelog без собственного engine | proposal/design/spec/tasks | Запланировано | Стандартный CLI/config, прямой npm script; пять пакетов, private root, exports без изменений. Implementation 0/9. |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C2: политика bump и npm metadata проверяются на fixtures | design/spec/tasks | Запланировано | Patch, breaking 0.x minor, >=1 major, migration summary, mixed changeset, read-only/invalid input и штатное npm lockfile обновление. Семантику оценивает reviewer; автоматический parser не добавляется. |
| [#1](https://github.com/antonsmolko/engineering-standards/issues/1), [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37) | C3: roadmap ещё показывал #32/#33 незавершёнными | #1, handoff | Исправлено | Статусы свёрены с closed issues и merged PRs; текущий этап #34 обозначен как planning, не реализация. |

## GitHub issue edits

В #1 отмечены только уже закрытые #32 и #33. Критерии/зависимости #34/#18/#35/#20/#26 не менялись; #34 остаётся открытой. #9 не переоткрывается. Будущие задачи не получают новых механизмов из этого плана.

## Проверки

Strict `openspec validate independent-package-versioning --strict` проходит; все четыре artifacts готовы, девять implementation tasks не выполнены. Проверены восемь локальных links/anchors в planning/context документах; whitespace check проходит. Product code, package metadata/lockfile и публикуемые материалы не менялись. Runtime suite не запускался в planning-only change: результаты PR #37 не выдаются за свежие проверки реализации #34.

## Независимое review плана

Отдельный агент получил артефакты/требования без авторской рабочей переписки; проверил полный planning result, активные неизменённые документы, публичные #34/#1/#18/#35/#20/#26 и текущие upstream v3 docs/status/config/parser. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичные actionable основания — #34 и официальные источники выше. Отдельно подтверждены статусы #32/#33 и planning-only #34. Уточнение task 1.3 явно напоминает включить новые TS integration tests в существующий tsconfig; scope/контракт не расширяется. Runtime evidence на этой стадии отсутствует и не заявляется.
