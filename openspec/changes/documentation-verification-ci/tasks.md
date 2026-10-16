# Tasks

Носитель #18, ветка feature/engineering-standards-18-verification-ci от 3372e96. План требует утверждения до apply. Один результат — verification CI; release preparation/content acceptance/publish остаются #35/#20/#26. Новые tests/helpers — TS.

## 1. Content prerequisite на тестовых данных

- [ ] 1.1 Написать и запустить RED до helper: positive accepted/applicable core+TypeScript+Svelte SPA; negative missing package, proposed/non-applicable/empty ID, дубликаты вместо другого пакета и пустой набор. Падение должно показывать отсутствие project content-rule implementation, а не ошибку импорта/fixture.
- [ ] 1.2 Добавить минимальный read-only TS test helper по design и получить GREEN/typecheck. Входы только synthetic records тестов; реальная таблица решений/документы и версии не меняются. Не добавлять публичный API, формат реальных acceptance данных или parser. Обновить maintainer architecture note о разделении synthetic verify и реальных release gates, сверить с content-approval.md.

## 2. Workflow и Git-контекст

- [ ] 2.1 Добавить TS integration test фактического Changesets run-step из workflow (поддерживаемый YAML parser, direct exact yaml 2.9.1); RED до изменения подключения Git-контекста. Temporary Git/npm fixture проверяет успешный PR base/merge-base и понятный отказ на missing base/несвязанной истории. Проверка не подменяется substring assertions YAML или upstream invalid-input tests.
- [ ] 2.2 Реализовать один verify.yml по design с проверенными SHA checkout/setup-node, read permissions, Node matrix, full history/no persisted credentials, npm ci/check/pack inventory и Changesets PR/push режимами. Получить GREEN/typecheck и upstream actionlint v1.7.12; вручную проверить triggers/permissions/pins, отсутствие publish/tag/secrets, сетевую install/offline-consumer границу и сохранение чужих файлов.
- [ ] 2.3 Добавить CONTRIBUTING.md/SECURITY.md и ownership contact, ссылки из README; документировать точные проверяемые команды, RED/GREEN contribution flow, материал-аудит/отдельные approvals, не перенося внутреннюю структуру тестов в guide. Обновить handoff/tooling design по фактической реализации; проверить ссылки и согласованность с #18/#35/#20/#26.

## 3. Полный результат и CI evidence

- [ ] 3.1 Запустить полный npm run check на 26.0.0/26.11.1, сохранить реальные packed inventories/external-consumer results, убедиться в неизменности packages/версий/IDs/drafts/changelog/owner decisions. Запушить реализацию в текущий PR; получить оба успешных GitHub matrix jobs и записать run links/log evidence отдельно от локальных результатов. Если реальные jobs недоступны, не заявлять CI готовым.
- [ ] 3.2 Независимо проверить полный final diff, контракты, прежние closures #18, неизменённые документы/issue criteria/dependencies, ссылки/anchors и разрешения. Зафиксировать dispositions и GitHub issue edits в canonical ledger; закрыть findings и передать PR на явное merge approval. Проверить strict OpenSpec и whitespace; merge/publish/protection не выполнять.

## Workflow follow-up

- После review/merge #18 отдельно планировать #35 подготовки публикации; реальное содержание принимается #20, конкретный выпуск выполняется #26 по отдельному разрешению.
- Branch protection — самостоятельное согласованное действие после зелёного CI, сейчас repository settings не менять.
- Завершённые OpenSpec changes архивировать отдельным согласованным действием.
