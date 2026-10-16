# Передача контекста разработки engineering-standards

Обновлено при реализации #34 после merge [PR #37](https://github.com/antonsmolko/engineering-standards/pull/37), база b205da3. При возобновлении сверить снимок с GitHub и текущей веткой.

## Откуда продолжать

Актуальное решение — [#30](https://github.com/antonsmolko/engineering-standards/issues/30) и [simplify-project-scope](../../openspec/changes/simplify-project-scope/proposal.md). Читать [design](../../openspec/changes/simplify-project-scope/design.md), обе specs и [tasks](../../openspec/changes/simplify-project-scope/tasks.md), затем [общий дизайн](../superpowers/specs/2026-10-11-engineering-standards-design.md) и [roadmap](../superpowers/plans/2026-10-11-engineering-standards-independent-packages.md).

## Продукт

Пять independently versioned npm-пакетов документов: core/frontend/TypeScript/Svelte/Svelte SPA. Применение пакетов целиком, совместимость текстом README, ручные ссылки в AGENTS.md потребителя. CLI/config, resolver, manifests/schema и генерация не нужны для начального продукта. Планы на русском; публичные документы и диагностика на английском. Двуязычность — возможное дальнейшее развитие.

## Текущее состояние

- PR #29 добавил typed check; #9 закрыта, невыполненная часть Changesets теперь отслеживается #34.
- PR #31 и #30 завершили только согласование плана.
- #33 завершена PR #37: репозиторий переведён на пять документальных workspaces; каталоги/схемы/loader и tooling-заглушки удалены; README индексируют документы, statuses/levels перенесены в их заголовки без принятия содержания.
- Есть реальные tarball и offline-consumer tests; install-offline.ts используется только тестами.
- Версии всех пяти пакетов — 0.1.0. Девять требований proposed, ноль accepted; публикации нет.
- #34 подключает Changesets 3.0.3: штатные команды, независимые версии/changelog и две TS integration-проверки на временных fixtures. [Руководство](../../.changeset/README.md). CI и процесс публикации не реализованы. Зелёные тесты/merge плана не принимают стандарты и не разрешают публикацию.

## Ближайшие действия

#32/PR #36 завершили согласование документов и задач. #33/PR #37 завершили переход (OpenSpec tasks 2–4). Текущий этап — реализация/review #34 [independent-package-versioning](../../openspec/changes/independent-package-versioning/proposal.md) в PR #38; после merge далее #18 и #35 подготовки публикации на synthetic данных. После технической готовности — #20 (core/TypeScript/Svelte SPA acceptance), затем отдельно одобренная реальная публикация #26. В #34 входит только versioning; CI и публикация остаются отдельными этапами.

#10–#16/#23 deferred; #17/#19 заменены проверками #18 и подготовкой #35 / выпуском #26; #21/#22 объединены в #20; #24/#25 backlog, не блокеры релиза; #28 выполнена PR #27. Старые issue comments/review ledgers сохраняются как история; новые критерии имеют приоритет, не объявляя прежнюю runtime-работу выполненной.

## Принятие и выпуск

Принятие содержания и сохранение чернового статуса — по [content approval](content-approval.md) и [inventory](requirements-inventory.md). Gates первого выпуска и проверка реальных артефактов закреплены в [#26](https://github.com/antonsmolko/engineering-standards/issues/26); infrastructure/fixture success их не заменяет.

## Проверки и рабочий процесс

Только Node ^26.0.0. Проверяются нижняя граница 26.0.0 и закреплённая .node-version 26.11.1. Старые Node не поддерживаются. npm ci --ignore-scripts подготавливает зависимости/cache; npm run check проверяет типы, текущую согласованность и весь suite, включая настоящие packed artifacts/external consumers. Пустой offline cache даёт guidance. Исторические результаты нельзя выдавать за свежие.

Изменения в issue-scoped ветках от main, commits [engineering-standards-<issue>]: <English description>. Читать AGENTS.md, при behavior changes запускать RED до реализации, после — GREEN/full suite. Перед завершением независимо проверять полный результат и согласованность документов/задач отдельно от runtime-тестов. Без merge/publish, tags или credentials/protection без явного разрешения. Потребитель и staff-ветка asc-admin не меняются.

## История

[Прежний handoff](https://github.com/antonsmolko/engineering-standards/blob/d483438/docs/architecture/2026-10-11-session-handoff.md) — исторический снимок CLI-плана. Review ledgers PR #3/#27/#29 остаются на месте, reviewer-confirmed closures не переоткрываются. Их старые runtime API не являются текущими требованиями. Приватный docs-review не публикуется и не является публичной основой; основание нового scope — #30/PR #31.
