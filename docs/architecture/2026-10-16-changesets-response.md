# Changesets для пяти пакетов — #34

Носитель — [#34](https://github.com/antonsmolko/engineering-standards/issues/34), prefix engineering-standards-34. База b205da3 после merge [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37); #33 закрыта. Текущий снимок — реализация утверждённого independent-package-versioning в PR #38: Changesets 3.0.3, минимальная конфигурация, руководство и две TS integration-проверки. Выполнены все шесть задач, runtime/документальные проверки и независимое review; результат передаётся на review/явное одобрение merge. Ниже сохранена история planning review, её статусы не описывают текущую реализацию.

## Источники и scope

Прочитаны #34 и все его comments (пусто), общий roadmap #1, зависимости #18/#35 и отдельные content/release gates #20/#26, активные design/roadmap/check/tests. Закрытые findings PR #37 сохраняются: в #34 они не переоткрываются. Baseline — [Changesets getting started](https://changesets.dev/guide/getting-started), [config](https://changesets.dev/guide/config), [CLI](https://changesets.dev/guide/cli) и [maintained upstream configuration](https://github.com/changesets/changesets/blob/main/.changeset/config.json). npm metadata на дату planning: CLI 3.0.3, Node ^22.11 || ^24 || >=26, npm >=10.9.0; наша Node-политика остаётся ^26.0.0. Старые GitHub docs Changesets помечены outdated и не используются вместо текущей документации сайта.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C1: независимые версии/changelog без собственного engine | proposal/design/spec/tasks | Реализовано | CLI/config и прямой npm script, реальные version/status commands на fixture. Пять пакетов/private root/exports сохранены. |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | C2: политика bump и npm metadata проверяются на fixtures | design/spec/tasks | Реализовано | Один fixture: patch/minor/major, migration summary, две неизменные package trees, private root; read-only status и штатное npm lockfile обновление. Семантику оценивает reviewer. |
| [#1](https://github.com/antonsmolko/engineering-standards/issues/1), [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37) | C3: roadmap ещё показывал #32/#33 незавершёнными | #1, handoff | Исправлено | Статусы свёрены с closed issues и merged PRs; на planning-этапе #34 был обозначен как ещё не реализованный, теперь handoff отражает реализацию/review PR #38. |

## GitHub issue edits

В #1 отмечены только уже закрытые #32 и #33. Критерии/зависимости #34/#18/#35/#20/#26 не менялись; #34 остаётся открытой. #9 не переоткрывается. Будущие задачи не получают новых механизмов из этого плана.

## Проверки планирования b349a58

Strict `openspec validate independent-package-versioning --strict` проходит; все четыре artifacts готовы, шесть implementation tasks не выполнены. Проверены восемь локальных links/anchors в planning/context документах; whitespace check проходит. Product code, package metadata/lockfile и публикуемые материалы не менялись. Runtime suite не запускался в planning-only change: результаты PR #37 не выдаются за свежие проверки реализации #34.

## Первоначальное независимое review плана 50db66b

Отдельный агент получил артефакты/требования без авторской рабочей переписки; проверил полный planning result, активные неизменённые документы, публичные #34/#1/#18/#35/#20/#26 и текущие upstream v3 docs/status/config/parser. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичные actionable основания — #34 и официальные источники выше. Отдельно подтверждены статусы #32/#33 и planning-only #34. Уточнение task 1.3 явно напоминает включить новые TS integration tests в существующий tsconfig; scope/контракт не расширяется. Runtime evidence на этой стадии отсутствует и не заявляется.

## Review плана PR #38

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

## Реализация после утверждения плана

Явное подтверждение владельца на применение получено в рабочем диалоге: private input, not a public basis. Публичный actionable контракт — [#34](https://github.com/antonsmolko/engineering-standards/issues/34) и [review PR #38](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162). Ни один ранее закрытый finding не переоткрывается; сокращённый scope сохранён.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | I1: готовый CLI вместо собственного versioning engine | root package/lock, .changeset | Реализовано | Exact CLI 3.0.3, конфигурация только baseBranch main/commit false, npm script changeset. Дополнительных runtime scripts/APIs нет. |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34), [review](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224004162) | I2: проверяемый независимый bump без upstream validation suite | tests/integration/changesets.test.ts, tsconfig.tests.json | Реализовано | RED: оба теста падают на отсутствующей root Changesets command до подключения CLI/config. GREEN: фактический npm script создаёт entries штатным add, status даёт три ожидаемых версии, один version дополняет копии реальных changelog; npm offline согласует lockfile и существующий checkWorkspaces проходит. Два пакета/root/прежние changelog entries сохранены, version не создаёт commits/tags. Второй тест проверяет read-only status snapshot. |
| [#34](https://github.com/antonsmolko/engineering-standards/issues/34) | I3: команды/границы и версии без реального выпуска | .changeset/README.md, README, handoff/tooling/general design и roadmap | Реализовано | Руководство create/status/version/npm lockfile, bump выбирает человек; сохранены отдельные approvals. git diff origin/main -- packages пуст: все пять реальных 0.1.0, тексты/IDs/draft labels/exports/changelog побайтно сохранены. |

Свежий npm run check: Node 26.11.1 и 26.0.0, 33/33 tests, typecheck и workspace checks проходят. Два новых TS tests включены в typecheck; все прежние 31 tests сохранены. Реальные tarballs устанавливаются внешним consumer как все пять пакетов и subset; npm pack --workspaces --dry-run --json inventory просмотрен отдельно: прежние документы/metadata, без maintainer Changesets/test files. npm install --ignore-scripts добавил только CLI dev dependency и lockfile-зависимости; опубликованных материалов не менял. Test logs RED/GREEN проверены локально; публичные воспроизводимые основания — committed tests и команды этого ledger.

GitHub issue edits реализации: нет; #34/#1 остаются открыты до merge, критерии/dependencies #18/#35/#20/#26 не менялись. Теги/публикация/архивирование OpenSpec не выполнялись.

Reviewer в [повторной проверке b349a58](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224113392) подтвердил закрытие R1–R6 и готовность плана. Этот summary также прочитан; подтверждённые closures сохранены при реализации. Новых inline threads/summary reviews/issues comments нет; повторный ответ сообщает evidence применения без новых dispositions.

При проверке неизменённых документов найдены и заменены устаревшие actual-state фразы о неготовом Changesets в общем design и roadmap. Остальные gates/requirements остались прежними. Свежий root `npm run changeset -- status` выходит 0 с пустым планом; собственных pending release changesets в рабочем репозитории нет.

## Независимое review реализации

Отдельный агент проверил полный b205da3..8860cb5 и итоговые corrections общего design/roadmap, handoff, ledger и удаление unused import. Critical/Important/Minor findings отсутствуют; task 3.2 завершена. Отчёт — private input, not a public basis; публичные actionable основания — #34, утверждённые artifacts PR #38 и [подтверждение closures](https://github.com/antonsmolko/engineering-standards/pull/38#issuecomment-6224113392). Личное owner approval из рабочего диалога не выдаётся за публичное evidence.

Runtime evidence отдельно: независимый свежий npm run check на Node 26.11.1/npm 11.20.0 — 33/33, typecheck и workspace check. Нижняя граница 26.0.0 проверена автором (33/33); reviewer прочитал этот вывод и RED, не заявляя повторного независимого запуска 26.0.0. Реальные artifact/consumer tests и inventory просмотрены, все пять package trees неизменны; 40 новых lock entries dev-only, прежние зависимости не изменены.

Документальное evidence отдельно: полный final diff, активные неизменённые документы и публичные #1/#34/#18/#35/#20/#26 согласованы; strict OpenSpec/whitespace проходят, 27 local links/anchors независимо разрешены. R1–R6 остаются закрыты. Publication readiness, принятие содержания, scope rights и CI base/history не оценивались как выполненные: это отдельные #20/#26/#35/#18; их gates сохранены. После review изменены только запись evidence и checkbox 3.2. Полнота OpenSpec — 6/6; archive/merge/publish не выполняются.
