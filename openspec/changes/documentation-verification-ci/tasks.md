# Tasks

Носитель #18, ветка feature/engineering-standards-18-verification-ci от 3372e96. План требует утверждения до apply. Один результат — verification CI; release preparation/content acceptance/publish остаются #35/#20/#26. Новые tests/helpers — TS.

## 1. Accepted headers из установленных артефактов

- [ ] 1.1 Написать и запустить RED до helper на установленных synthetic fixture-пакетах: accepted ID каждого core/TypeScript/Svelte SPA; negative missing package/ID/status, empty ID, proposed/unknown status и дубликаты пакета, недоступные данные. Падение показывает отсутствие проверки содержимого артефактов, а не ошибку импорта/fixture. Metadata из code examples/README не квалифицируется.
- [ ] 1.2 Добавить минимальный read-only TS helper по существующим ID/Status заголовкам и получить GREEN/typecheck; тот же helper вызвать в tests/integration/document-artifacts.test.js на настоящих установленных tarballs с ожидаемым not-ready черновиков. Не добавлять каталог/поле applicability/новый формат решений. Обновить docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md: artifact header prerequisite и независимые owner applicability/content/release gates из docs/architecture/content-approval.md; проверить неизменность реальных документов/решений/версий.

## 2. Штатный workflow

- [ ] 2.1 Реализовать один verify.yml по design: проверенные SHA checkout/setup-node, read permissions, Node matrix, full history/no persisted credentials, npm ci/check и npm pack inventory log. Changesets PR/push шаги выбираются step-level if; PR использует status --since с BASE_SHA из env, push — обычный status. Проверить штатный отказ upstream на missing Git ref и отказ package-change-without-changeset/разрешение empty changeset в temporary проекте и записать evidence; не добавлять preflight/YAML dependency/run-step parser или тестовый runner. Workflow syntax/permissions/triggers/pins проверяются GitHub и независимым review; actionlint не обязателен.
- [ ] 2.2 Добавить CONTRIBUTING.md/SECURITY.md и ownership contact, ссылки из README; обновить .changeset/README.md правилом PR package change → changeset, no-release change → npm run changeset -- add --empty. Проверить документированные команды на temporary проекте, сохранение bump/content approvals и разделение audit/автоматических checks. Обновить handoff и docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md по фактическому состоянию; сверить ссылки/контракты с #18/#35/#20/#26.

## 3. Полный результат и CI evidence

- [ ] 3.1 Запустить полный npm run check на 26.0.0/26.11.1, сохранить реальные packed inventories/external-consumer results, включая ожидаемый not-ready настоящих черновых артефактов. Убедиться в неизменности packages/версий/IDs/drafts/changelog/owner decisions. Запушить реализацию в текущий PR; получить оба успешных GitHub matrix jobs и записать run links/log evidence отдельно от локальных результатов. Если реальные jobs недоступны, не заявлять CI готовым.
- [ ] 3.2 Независимо проверить полный final diff, контракты, прежние closures #18, неизменённые документы/issue criteria/dependencies, ссылки/anchors и разрешения. Зафиксировать dispositions и GitHub issue edits в canonical ledger; закрыть findings и передать PR на явное merge approval. Проверить strict OpenSpec и whitespace; merge/publish/protection не выполнять.

## Workflow follow-up

- После review/merge #18 отдельно планировать #35 подготовки публикации; реальное содержание/применимость принимаются владельцем, конкретный выпуск выполняется #26 по отдельному разрешению.
- Branch protection — самостоятельное согласованное действие после зелёного CI, сейчас repository settings не менять.
- Завершённые OpenSpec changes архивировать отдельным согласованным действием.
