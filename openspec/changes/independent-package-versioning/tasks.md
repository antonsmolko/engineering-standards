# Tasks

Носитель #34, ветка feature/engineering-standards-34-changesets от b205da3. Реализация начинается после утверждения proposal/design/specs/этого плана. Один PR даёт независимое versioning пяти пакетов, без CI или выпуска. Все новые tests/helpers — TypeScript.

## 1. Штатный Changesets и две integration-проверки

- [x] 1.1 Добавить две TS integration-проверки по design: version + lockfile и read-only status на валидном плане; включить их в tsconfig.tests.json. Один вид temporary fixture: пять существующих package names/paths, копии реальных CHANGELOG.md, private root без внешних dependencies и собственный lockfile. Core patch, TypeScript minor, Svelte 1.2.3 major; два пакета не выбраны. Запустить RED до runtime изменений и сохранить evidence отсутствия штатной команды/конфигурации, а не ошибки fixture.
- [x] 1.2 Установить exact @changesets/cli@3.0.3, добавить configuration только с baseBranch main/commit false и прямой root script. GREEN/typecheck: штатный non-interactive add, plan, один version дают ожидаемые три версии/changelog с summary/миграциями, сохраняют прежние changelog entries, два незатронутых пакета/private root и не создают commits/tags. Lockfile обновляется npm --package-lock-only --ignore-scripts --offline без подготовки cache и проходит существующий workspace check; status без output file не меняет снимок исходников/lockfile. Реальные версии/changelog сохраняются.
- [x] 1.3 Добавить maintainer guide с English примерами create/status/version и npm lockfile step, границами записи и остановкой после ошибки. Сверить команды на fixture; выбор bump человеком (редактура patch, breaking 0.x minor, >=1 major с миграцией) отделён от его применения CLI. Root CLI требует установки devDependencies; fixture без внешних dependencies не требует cache. Невалидный ввод — диагностика upstream; её тесты и Git base/history не добавляются. Нет publish/tag/автоматического принятия содержания.

## 2. Согласованность документации

- [x] 2.1 Обновить README, handoff и общий tooling design по реально выполненным шагам. Сверить #34/#1 и неизменённые #18/#35/#20/#26, публичные exports и отсутствие настоящего bump/content approval; записать scope/evidence и GitHub issue edits (если потребовались) в committed ledger. Base/history остаются #18, публикация — #35/#26.

## 3. Полный результат

- [x] 3.1 Запустить npm run check на Node 26.0.0 и 26.11.1, включая прежние реальные packed artifacts/external consumers. Проверить diff пяти package trees: версии 0.1.0, ID/тексты/статусы/exports/changelog сохранены; теги/публикация отсутствуют, root private без версии.
- [x] 3.2 Независимо проверить полный final diff, контракты, связанные неизменённые docs/issue bodies, ссылки и зависимости отдельно от runtime suite. Записать dispositions/evidence и закрыть findings до отправки PR на одобрение; merge не выполнять.

## Workflow follow-up

- После review/merge #34 отдельно планировать verification CI #18, затем подготовку публикации #35; не включать их механизмы в текущую реализацию.
- Принятие содержания #20 и конкретный выпуск #26 требуют собственных approvals. Ни завершение Changesets, ни fixture GREEN их не заменяют.
- Архивировать этот change и simplify-project-scope только отдельным согласованным действием; сохранённый completed change не препятствует планированию #34.
