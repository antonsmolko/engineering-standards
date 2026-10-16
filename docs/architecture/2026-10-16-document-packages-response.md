# Переход к пяти пакетам документов — #33

Носитель: [#33](https://github.com/antonsmolko/engineering-standards/issues/33), prefix engineering-standards-33. Основание — [PR #31](https://github.com/antonsmolko/engineering-standards/pull/31), [PR #36](https://github.com/antonsmolko/engineering-standards/pull/36) и OpenSpec simplify-project-scope tasks 2–4. База — main 2a1d12b после merge PR #36. Исторические review ledgers не изменяются; их закрытые findings не переоткрываются.

## Реализованный контракт

Пять существующих имён/путей и версий 0.1.0 сохранены. Потребитель устанавливает выбранный набор, читает README и документы, вручную добавляет ссылки в AGENTS.md. Catalog/schema/CLI/config интерфейсы удалены согласно принятому scope. Private root и установка без lifecycle mutations сохранены. Никакого bump, тега, merge или публикации; Changesets/CI/publication preparation остаются #34/#18/#35.

Обычную упаковку/установку выполняет npm. Baseline: [files metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#files), [npm/cli smoke-tests](https://github.com/npm/cli/blob/latest/smoke-tests/package.json). Конкретный пробел — доступность документальных ссылок/index внутри установленного пакета. Для него используется поддерживаемый [marked lexer/walkTokens](https://marked.js.org/using_pro#walk-tokens), dev-only 18.1.1 (upstream engines >=20, проверено на обеих Node 26). Собственного Markdown parser, каталога или нового product API нет. Удалены неиспользуемые ajv/semver/@types/semver и три tooling workspace entries.

Workspace check получает maintainer-controlled root/workspace package.json и lockfile: пять прямых version comparisons, contextual English diagnostics/nonzero на missing/stale/I/O/JSON ошибке, без записи и с остановкой следующих этапов. Документальные проверки выполняются полным suite на реальных установленных tarballs. Test-only helper использует реальные canonical paths; локальные Markdown links/reference links/images должны вести к существующему файлу внутри пакета, каждый Markdown-документ кроме changelog индексируется README. Внешние URL не запрашиваются; heading anchors не проверяются. Missing required file, broken/outside local target и forbidden maintainer file дают пакет/путь в diagnostics. Это проверка текущих документов репозитория, не обработчик произвольных недоверенных сайтов.

## Содержание и артефакты

Исходные [manifests на базе](https://github.com/antonsmolko/engineering-standards/tree/2a1d12b/packages) содержали девять proposed/required требований. Все ID и нормативные тела сохранены; добавлены только явные Status: proposed (draft; not approved) и Level: required. Полное сравнение с git base после удаления добавленной строки подтвердило побайтное равенство всех девяти нормативных тел. В README каждый документ указан ссылкой; templates сохранены и перечислены отдельно. Requirement template больше не требует manifest.json. Решения в content-approval остаются Pending; ни один документ не принят.

Реальные npm tarballs проверены для всех пяти пакетов и subset core/TypeScript: отсутствие workspace symlinks и лишних транзитивных пакетов, metadata, документы, README index/local links, сохранность AGENTS/ESLint/Prettier файлов. Скопированный из docs/usage.md Markdown-пример содержит реальные доступные пути обоих установленных пакетов. Synthetic fixture проверяет reference links, внешний URL без fetch, code example, missing local target и forbidden review file. Полный inventory вручную просмотрен: только package.json, README/LICENSE/CHANGELOG, девять стандартов и три core Markdown templates. Проверка приватности/содержания перед настоящей публикацией остаётся отдельным gate #26; эти тесты его не заменяют.

## Evidence

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#33](https://github.com/antonsmolko/engineering-standards/issues/33), [merged plan](https://github.com/antonsmolko/engineering-standards/blob/2a1d12b/openspec/changes/simplify-project-scope/tasks.md) | P1: пакет не должен требовать каталог/CLI | Workspaces, package exports, check, tests | Реализовано | До runtime изменений layout/manifestless tests дали RED на восьми workspaces, JSON exports и ENOENT manifest.json; после удаления каталогов GREEN. |
| [Package spec](https://github.com/antonsmolko/engineering-standards/blob/2a1d12b/openspec/changes/simplify-project-scope/specs/standards-packages/spec.md) | P2: установленная документация должна быть полной и доступной | README, files, artifact tests | Реализовано | Artifact RED обнаружил manifest/schema files и неиндексированные документы; GREEN на реальных tarballs, missing-link/forbidden-file diagnostics. |
| [Adoption spec](https://github.com/antonsmolko/engineering-standards/blob/2a1d12b/openspec/changes/simplify-project-scope/specs/manual-consumer-adoption/spec.md) | P3: проверяемый пример ручного подключения | docs/usage.md, external consumer | Реализовано | Отдельный RED потребовал отсутствовавший AGENTS пример. GREEN проверяет его реальные installed paths, subset и сохранность пользовательских инструкций/конфигов. |
| [#33](https://github.com/antonsmolko/engineering-standards/issues/33) | P4: не потерять содержание и draft status | Девять документов, README, content-approval | Сохранено | Нормативные тела/ID побайтно совпадают с базой; все девять proposed и required, ноль accepted. Versions 0.1.0; acceptance records Pending. |

## Проверки

Исходный suite: 95 tests; новый suite: 31 tests. Удалены только проверки отменённых catalog/schema/CLI контрактов и tooling fixtures; сохраняемые version/I/O/stage-stop/offline-cache/artifact/consumer контракты проверяются актуальным suite. Свежий npm run check на Node 26.11.1 и 26.0.0: typecheck, workspace check и все 31 tests проходят. Node 26.0.0 запускался через npm-distributed Node с PATH для всех child processes. Real artifact inventory проверен отдельно от unit/workspace imports.

Отдельно: strict OpenSpec и whitespace checks проходят; локальные source links/anchors разрешаются, installed adoption paths проверены consumer-тестами. Active docs/handoff/tooling/content-approval приведены к пяти workspaces; historical ledgers и контекст прежних планов сохраняют историю, не задавая отменённый runtime. GitHub issue criteria/dependencies не менялись.

## Независимое review

Отдельный агент независимо проверил полный результат 2a1d12b..5c87c38 без авторской рабочей переписки: actionable findings отсутствуют, task 4.2 завершена. Вход/отчёт агента — private input, not a public basis; публичные основания — #33 и merged OpenSpec выше. Независимые runtime evidence: свежий npm run check на Node 26.11.1, 31/31 tests; inventories всех пяти пакетов 0.1.0 содержат только ожидаемые документы и metadata.

Отдельная документальная проверка: девять нормативных тел побайтно совпадают с базой после удаления добавленной строки статуса/уровня; 37 source-local links/anchors проходят. Проверены полный diff, merged planning artifacts, связанные неизменённые active docs и публичные #1/#18/#20/#26/#32/#33/#34/#35: scope, зависимости и независимые content/release gates согласованы. Удалённые тесты относятся к отменённым catalog/schema/CLI контрактам; замечаний к сохранённым проверкам нет. Итоговые изменения после review ограничены этой записью evidence и отметкой task 4.2.

## Review PR #37 — 2026-10-16

Прочитаны все страницы inline comments, reviews, PR comments и comments #33, а также GraphQL reviewThreads: один summary, inline threads/reviews и issue comments отсутствуют. Публичный источник — [review 6783dc7](https://github.com/antonsmolko/engineering-standards/pull/37#issuecomment-6223565847). Reviewer подтвердил выполнение #33/обеих specs, 31/31, packed inventories, сохранность нормативных тел и закрытие блокирующих вопросов; эти подтверждения сохраняются.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Review, Minor 1](https://github.com/antonsmolko/engineering-standards/pull/37#issuecomment-6223565847) | R1: отсутствие engist.json не проверяет действующий код | tests/integration/document-artifacts.test.js | Исправлено | Удалён один assertion; выбранный набор пакетов и сохранность существующих consumer instructions/configs продолжают проверяться. |
| [Review, Minor 2](https://github.com/antonsmolko/engineering-standards/pull/37#issuecomment-6223565847) | R2: длинная строка README | README.md | Исправлено | Абзац перенесён по строкам без изменения текста. |
| [Review, optional symlink simplification](https://github.com/antonsmolko/engineering-standards/pull/37#issuecomment-6223565847) | R3: можно убрать canonical path/symlink checks | tests/helpers/check-documents.ts | Предложение отклонено | npm не упаковывает symlinks, но helper проверяет реальные filesystem targets и пригоден для workspace/installed документов. Resolve проверяет лексический путь, realpath — фактический. Сохраняется уже описанная проверка inside-package; нового поведения/зависимостей нет. |
| [Review, optional forbidden paths simplification](https://github.com/antonsmolko/engineering-standards/pull/37#issuecomment-6223565847) | R4: можно сократить список служебных путей | tests/helpers/check-documents.ts | Предложение отклонено | files задаёт состав npm-пакета, а независимая проверка фактического состава обнаруживает случайное расширение allowlist. Несколько дополнительных имён поддерживают общий запрет служебных/приватных материалов из #33; новый механизм не требуется. |

Контракты, design/plan, issue criteria/dependencies, handoff и публичное содержание пакетов не меняются; GitHub issue edits отсутствуют. Дополнительное независимое contract review не требуется: изменены удаление избыточного assertion, перенос строки и запись dispositions; предыдущее полное независимое review сохраняет силу.

Evidence текущего раунда: свежий `npm run check` на Node 26.11.1 и 26.0.0 — typecheck/workspace check и 31/31 tests, включая реальную упаковку/установку всех пяти пакетов и subset. `git diff --check` и strict OpenSpec validation проходят. Отдельно сверены итоговый состав diff и изменения после 6783dc7, согласованность с неизменёнными design/specs и #33; локальные ссылки README не изменились, новые ledger links ведут к прочитанному публичному summary. Runtime/helper и зависимости не изменены; незакрытых findings этого review нет.
