# Tasks

Носитель #34, ветка feature/engineering-standards-34-changesets от b205da3. Реализация начинается после утверждения proposal/design/specs/этого плана. Один PR даёт независимое versioning пяти пакетов, без CI или выпуска. Все новые tests/helpers — TypeScript.

## 1. Штатный Changesets и независимость

- [ ] 1.1 Добавить TS integration fixture и запустить RED до runtime изменений: штатная команда недоступна/конфигурация отсутствует. Сохранить доказательство ожидаемой причины падения; synthetic fixture использует пять существующих package names/paths, private root, Git base main и собственный npm lockfile.
- [ ] 1.2 Установить exact @changesets/cli@3.0.3, добавить минимальную .changeset configuration по design и прямой root script. GREEN должен показать создание changeset штатным CLI, plan и применение patch одного пакета, неизменность остальных четырёх package.json/changelog/private root и отсутствие новых commits/tags после version. Реальные версии/changelog сохраняются.
- [ ] 1.3 Добавить проверки read-only status на чистом fixture без changesets и на валидном плане; missing/malformed config, malformed changeset и неизвестное имя должны давать штатный nonzero/diagnostic, а не ошибку неподготовленной Git ref. Проверить snapshot исходников, границы output file и включение новых integration TS tests в tsconfig.tests.json с успешным typecheck (нынешний include охватывает только helpers/scripts).
- [ ] 1.4 Добавить maintainer guide с English примерами create/status/version, границами записи и ошибок. Сверить команды с реальным fixture, указать подготовку зависимостей/cache, Git main ref и отсутствие publish/tag/автоматического принятия содержания.

## 2. Версионная политика и npm lockfile

- [ ] 2.1 На temporary fixtures проверить patch 0.1.0→0.1.1, breaking minor 0.1.0→0.2.0 и major 1.2.3→2.0.0 с English migration summary, а также mixed core patch/TypeScript minor: фактический plan/версии/changelog, сохранение незатронутых пакетов и private root. Руководство отличает выбор bump человеком от его применения CLI и не обещает semantic validator.
- [ ] 2.2 После fixture version обновить lockfile штатным npm --package-lock-only --ignore-scripts offline и проверить его существующим workspace check. Документировать этот шаг и остановку после ошибки; согласованность не обеспечивается новым versioning engine.
- [ ] 2.3 Обновить README, handoff и общий tooling design по реально выполненным шагам. Сверить #34/#1 и неизменённые #18/#35/#20/#26, публичные exports и отсутствие настоящего bump/content approval; записать scope/evidence и GitHub issue edits (если они потребовались) в committed ledger.

## 3. Полный результат

- [ ] 3.1 Запустить npm run check на Node 26.0.0 и 26.11.1, включая прежние реальные packed artifacts/external consumers. Проверить diff пяти package trees: версии 0.1.0, ID/тексты/статусы/exports/changelog сохранены; теги/публикация отсутствуют, root private без версии.
- [ ] 3.2 Независимо проверить полный final diff, контракты, связанные неизменённые docs/issue bodies, ссылки и зависимости отдельно от runtime suite. Записать dispositions/evidence и закрыть findings до отправки PR на одобрение; merge не выполнять.

## Workflow follow-up

- После review/merge #34 отдельно планировать verification CI #18, затем подготовку публикации #35; не включать их механизмы в текущую реализацию.
- Принятие содержания #20 и конкретный выпуск #26 требуют собственных approvals. Ни завершение Changesets, ни fixture GREEN их не заменяют.
- Архивировать этот change и simplify-project-scope только отдельным согласованным действием; сохранённый completed change не препятствует планированию #34.
