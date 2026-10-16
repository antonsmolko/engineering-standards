# Changesets для пяти пакетов — #34

Носитель — [#34](https://github.com/antonsmolko/engineering-standards/issues/34), prefix engineering-standards-34. База b205da3 после merge [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37); #33 закрыта. Этот снимок содержит только OpenSpec planning artifacts independent-package-versioning и актуализацию handoff. Runtime ещё не реализован; все шесть implementation tasks открыты после сокращения плана по review PR #38.

## Источники и scope

Прочитаны #34 и все его comments (пусто), общий roadmap #1, зависимости #18/#35 и отдельные content/release gates #20/#26, активные design/roadmap/check/tests. Закрытые findings PR #37 сохраняются: в #34 они не переоткрываются. Baseline — [Changesets getting started](https://changesets.dev/guide/getting-started), [config](https://changesets.dev/guide/config), [CLI](https://changesets.dev/guide/cli) и [maintained upstream configuration](https://github.com/changesets/changesets/blob/main/.changeset/config.json). npm metadata на дату planning: CLI 3.0.3, Node ^22.11 || ^24 || >=26, npm >=10.9.0; наша Node-политика остаётся ^26.0.0. Старые GitHub docs Changesets помечены outdated и не используются вместо текущей документации сайта.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C1: независимые версии/changelog без собственного engine | proposal/design/spec/tasks | Запланировано | Стандартный CLI/config, прямой npm script; пять пакетов, private root, exports без изменений. Implementation 0/6. |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C2: политика bump и npm metadata проверяются на fixtures | design/spec/tasks | Запланировано | Patch, breaking 0.x minor, >=1 major, migration summary, совмещённый fixture, read-only status и штатное npm lockfile обновление. Семантику оценивает reviewer; автоматический parser не добавляется. |
| [#1](https://github.com/antonsmolko/engineering-standards/issues/1), [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37) | C3: roadmap ещё показывал #32/#33 незавершёнными | #1, handoff | Исправлено | Статусы свёрены с closed issues и merged PRs; текущий этап #34 обозначен как planning, не реализация. |

## GitHub issue edits

В #1 отмечены только уже закрытые #32 и #33. Критерии/зависимости #34/#18/#35/#20/#26 не менялись; #34 остаётся открытой. #9 не переоткрывается. Будущие задачи не получают новых механизмов из этого плана.

## Проверки

Strict `openspec validate independent-package-versioning --strict` проходит; все четыре artifacts готовы, шесть implementation tasks не выполнены. Проверены восемь локальных links/anchors в planning/context документах; whitespace check проходит. Product code, package metadata/lockfile и публикуемые материалы не менялись. Runtime suite не запускался в planning-only change: результаты PR #37 не выдаются за свежие проверки реализации #34.

## Первоначальное независимое review плана 50db66b

Отдельный агент получил артефакты/требования без авторской рабочей переписки; проверил полный planning result, активные неизменённые документы, публичные #34/#1/#18/#35/#20/#26 и текущие upstream v3 docs/status/config/parser. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичные actionable основания — #34 и официальные источники выше. Отдельно подтверждены статусы #32/#33 и planning-only #34. Уточнение task 1.3 явно напоминает включить новые TS integration tests в существующий tsconfig; scope/контракт не расширяется. Runtime evidence на этой стадии отсутствует и не заявляется.

## Review PR #38

Публичный источник — [review 50db66b](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162). Прочитаны все страницы inline comments, summary reviews, PR comments и comments #34, а также GraphQL reviewThreads: один review в PR comment, inline threads/reviews и issue comments отсутствуют. Подтверждения reviewer о верной политике bump, необходимости npm lockfile step, read-only status и сохранённых release/content gates не переоткрываются. Новое evidence reviewer показало избыточный объём планируемых upstream-тестов; этот scope уточнён ниже, а не скрыт за первоначальным clean review.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Review, Important 1](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R1: upstream diagnostics/output tests и Git base/history выходят за #34 | design/spec/tasks, proposal/ledger/PR summary | Исправлено | Удалены clean/invalid input scenarios, missing/malformed/unknown-package/output-boundary tests и требования к missing ref. Оставлен read-only status на валидном плане и штатная диагностика без расширения контракта. #18 сохраняет собственный base/history критерий. |
| [Review, Minor 2](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R2: access относится к publish | design | Исправлено | Поле access удалено из предлагаемой config; существующий publishConfig не меняется, решения о выпуске остаются #35/#26. |
| [Review, Minor 3](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R3: лишние явные defaults v3 | design/tasks | Исправлено | Только baseBranch main и commit false. Независимость/private root/default changelog обеспечиваются documented defaults, подтверждаются тестом интеграции. |
| [Review, Minor 4](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R4: cache preparation не нужна fixture без внешних dependencies | design/tasks | Исправлено | Fixture root без внешних dependencies, lockfile обновляется штатным npm offline; cache helper не планируется. Установка devDependencies рабочего root — отдельная обычная подготовка. |
| [Review, Minor 5](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R5: проверять настоящий формат changelog | design/spec/tasks | Исправлено | Fixture копирует реальные CHANGELOG.md с unreleased heading; проверяется добавление entries с сохранением прежнего содержания. Нормативные документы не копируются/не меняются для bump tests. |
| [Review, Что вырезать](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | R6: объединить bump/version/lockfile проверки | proposal/design/spec/tasks | Исправлено | Две integration-проверки: один version+lockfile и read-only status. Один вид fixture: core patch 0.1.1, TypeScript minor 0.2.0, Svelte major 2.0.0 из fixture-only 1.2.3; два пакета/private root сохранены. Новых upstream validation тестов нет. План сокращён с девяти до шести задач. |

### GitHub issue edits текущего review

Нет: критерии/зависимости #34/#18/#35/#20/#26 согласованы с сокращением; #1 сохраняет завершённые #32/#33. Handoff по-прежнему сообщает planning-only #34, published docs/стандарты не затронуты. Предыдущая запись об изменении checkboxes #1 сохраняется отдельно выше.

### Проверки и независимое review текущего результата

Проверен полный итоговый diff относительно b205da3, включая handoff и все planning artifacts. Для изменённых требований сверены неизменённые активные design/roadmap/README/content gates и публичные #1/#34/#18/#35/#20/#26: конфликтов нет. Strict OpenSpec validation и whitespace проходят; восемь локальных links/anchors в шести документах разрешаются. Реализация — 0/6, runtime suite в этом planning-only раунде не запускался, package trees/metadata/lockfile не менялись.

Отдельный агент без авторской рабочей переписки независимо проверил полный результат, R1–R6, связанные неизменённые документы и задачи: actionable findings отсутствуют. Отчёт — private input, not a public basis; публичное основание изменений — review PR #38 выше и #34, а defaults/команды подтверждены официальными config/CLI docs. Предыдущие reviewer-confirmed closures сохранены; незакрытых findings текущего review нет. После этого review добавляется только эта запись evidence; реализация по-прежнему ожидает утверждения/apply.
