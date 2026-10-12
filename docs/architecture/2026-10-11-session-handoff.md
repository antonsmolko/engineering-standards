# Передача контекста разработки Engist

Дата: 2026-10-11. Это снимок состояния для продолжения работы в отдельной
сессии engineering-standards, не нормативное требование для потребителей.
После возобновления сверить GitHub и рабочее дерево: дальнейшие PR могут
изменить описанное здесь состояние.

Уточнение владельца от 2026-10-12: сначала завершить техническую платформу
на synthetic fixtures, затем наполнять и принимать стандарты. Technical
vertical slice выполняется до содержательного ревью; реальный accepted-срез
и условия нормативного релиза сохраняются. См. уточнённый порядок работы
в общем дизайне и Tasks 8.1/8.2 общего плана. Не блокировать реализацию
инфраструктуры ожиданием accepted текстов и не считать fixtures их принятием.
Также владелец выбрал только Node 26: engines — ^26.0.0,
версия разработки закреплена в .node-version (26.11.1).

## Откуда продолжать

Репозиторий: [antonsmolko/engineering-standards](https://github.com/antonsmolko/engineering-standards).
База этой передачи — main после merge
[PR #6](https://github.com/antonsmolko/engineering-standards/pull/6),
commit `fa46ee698099e5714d6a94339fe4c5f41da75629`.
Первоначальный снимок был сделан после PR #4; этот handoff актуализирован
после PR #6 и подтягивания main в ветку PR #5.
Основная задача: [issue #1](https://github.com/antonsmolko/engineering-standards/issues/1).

Прочитать по порядку:

1. [AGENTS.md](../../AGENTS.md) — обязательные правила репозитория.
2. [Общий дизайн](../superpowers/specs/2026-10-11-engineering-standards-design.md).
3. [Общий план](../superpowers/plans/2026-10-11-engineering-standards-independent-packages.md).
4. [Дизайн monorepo tooling](../superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md).
5. [Руководство будущего CLI](../../packages/tooling/standards-cli/docs/workflow.md).
6. [Inventory требований](requirements-inventory.md) и
   [решение о принятии содержания](content-approval.md).

Название продукта/будущей команды — **Engist**, файл настройки — `engist.json`.
Репозиторий и npm-пакеты не переименованы; доступность нового npm-имени не
проверена и не считается подтверждённой.

## Назначение и принятые решения

Публичный набор переиспользуемых инженерных стандартов, конфигураций и
спецификаций сложных модулей. Это не продуктовая спецификация первого
потребителя и не готовая runtime-библиотека приложения.

- Независимые версии восьми пакетов, не один агрегированный пакет.
- Структура сохраняет независимые оси: core, domains, technologies, stacks.
  Архитектура frontend принадлежит frontend; общие принципы — core.
- Будущие modules/authentication, api-client, frontend-state, authorization
  проектируются отдельно, не создаются сейчас как пустые пакеты.
- npm workspaces управляют установкой и lockfile; Changesets будет отвечать
  за независимые версии/changelog; корневые scripts — за последовательность.
- Lerna/Nx **отложены** после ревью PR #4. Сравнение canonical/bundled схем
  является связью данных, не зависимостью выполнения. Вернуться к runner при
  настоящих prerequisites и измеримой потребности в scoped runs/кэше.
- Не вводить декоративные build/check targets для Markdown/JSON-пакетов.
- npm dependency graph, manifest.requires и task graph — разные графы.
  Changesets не вычисляет семантическую совместимость manifest.requires.
- Будущие теги: `@antonsmolko/standards-svelte@0.1.0`, полное npm-имя.
- Публичные нормативные тексты/README/диагностика — English; рабочие
  дизайн, планы и этот handoff могут быть русскими.

## Что уже сделано

[PR #2](https://github.com/antonsmolko/engineering-standards/pull/2),
[PR #3](https://github.com/antonsmolko/engineering-standards/pull/3), PR #4 и PR #6
вмержены. Tasks 1–2: workspaces, metadata exports, JSON schemas, namespaces,
canonical profile IDs и безопасная загрузка каталогов реализованы.

В PR #6 исправлены два оставшихся уточнения повторного ревью PR #4:
дизайн явно требует сравнения version всех восьми workspace-записей
package-lock.json с package.json до/после version:prepare и negative fixture
с устаревшей lockfile-записью при согласованных package.json/manifest.
Успех npm ci не заменяет это сравнение. Цель описывает корневые scripts,
ссылки на Lerna удалены из текущих источников. Общий план синхронизирован,
устаревший baseline 55 обновлён до 70. Это правки документации; сами проверки
check/version:check/version:prepare и negative fixture ещё не реализованы.

Пять specification-пакетов содержат manifests и Markdown. CLI содержит
catalog loader/validator и bundled schema snapshots с parity tests; он не
зависит от core в runtime. Package-root symlink допустим, внутренний документ
не может выходить за canonical package root. Неизвестный schemaVersion
отклоняется отдельной диагностикой. Lifecycle-install mutations отсутствуют.

Есть real npm pack/isolated consumer tests с offline install после подготовки
cache. Это не только workspace imports. Пустой cache даёт ENOTCACHED guidance.
Все восемь package versions — 0.1.0; публикации ещё не было.

Core/TypeScript/Svelte SPA тексты подготовлены, но всего **девять proposed,
ноль accepted**. Merge архитектуры или зелёные тесты не принимают содержание.
Первый релиз требует содержательного решения владельца и реального accepted
vertical slice, а не accepted-only fixtures.

## Чего ещё нет

Lerna, Nx и Changesets не установлены. Новые check/pack/version scripts только
описаны. PR #4 и PR #6 описывают дизайн, а не выполненную настройку инструментов.

Не реализованы resolver, managed IO/renderer, discovery, команды init/sync/check,
bin Engist, installer/setup, config exports ESLint/Prettier, вертикальный срез,
полный release preflight, CI/release automation и подключение потребителя.
Tooling config-пакеты пока skeletons. Не объявлять Tasks 4–11 завершёнными.

## Ближайшие действия

1. Согласовать с владельцем исправленный письменный дизайн monorepo tooling.
   Merge PR #4/#6 не трактовать как разрешение выполнять ещё не написанный
   implementation plan. Повторно исправлять закрытые в PR #6 уточнения не нужно.
2. После утверждения дизайна составить отдельный implementation plan monorepo
   tooling и согласовать его и способ выполнения. Не реализовывать
   инструментальную часть по одному
   общему Task 10: новый этап выделен раньше него и не заменяет release gates.
3. Выполнить согласованный план с RED → GREEN behavior tests и проверками
   настоящих Changesets во временных workspaces; рабочие версии не повышать.

В дизайне version:prepare: clean worktree → projected compatibility preflight
→ Changesets version → manifest sync → offline lockfile update → post-check.
Изменения range явные; слепого расширения нет. Нужна проверка core 0.1 → 0.2
при зависимом ^0.1.0 (отказ до записи) и явной range миграции (успех).
Для branch-relative status нужны base ref и история до merge base; depth 1
недостаточен. Полный registry/accepted release preflight остаётся Task 10.

## Открытые контракты CLI из ревью PR #3

Это предложения, не молча принятые runtime-правки:

- Exact semver — рекомендуемый init способ установки, но сравнение любого
  dependency specifier строкой с installed.version ошибочно для file/tarball.
  Перед discovery согласовать supported specifiers, consumer/workspace root
  и проверку lockfile; не обещать все alias/overrides/catalog комбинации.
- Существующий валидный engist.json: no overwrite/no wizard, exit 0.
  Предложенное уточнение для invalid/unreadable/unsafe файла: отказ без записи,
  prompts или сети. Сейчас workflow всё ещё описывает successful no-op для
  invalid JSON; перед Task 7 согласовать изменение и синхронизировать документы.
- Будущее workflow-руководство попадает в files allowlist CLI; перед публикацией
  решить, оставлять ли честно маркированную документацию ещё отсутствующих команд.

Init — выбор настроек и отдельно подтверждённая установка; sync — первая
генерация и обновление. Sync/check offline, не меняют dependency files.
Selection содержит package names без версий; provenance — точные source версии.
Dry-run --diff выводит patch в терминал, не создаёт изменения в панели Git IDE.
Project-owned ESLint/Prettier imports не являются managed output и не
переписываются sync; existing configs/scripts сохраняются.

## Проверки и рабочий процесс

Исторические прогоны baseline: 70/70 на Node 24.14.0 и 22.13.0.
С 2026-10-12 поддерживается только Node ^26.0.0; baseline новых проверок — 26.11.1.
Повторить проверки в новой сессии, не выдавать исторический результат за свежий.
npm ci --ignore-scripts подготавливает зависимости/cache; npm test — полный
node:test suite со встроенной поддержкой TypeScript test helpers в Node 26.
npm run typecheck проверяет tests/helpers/**/*.ts без генерации JS.
Воспроизводимого repository-local форматтера пока нет;
внешний Prettier предыдущих проверок не является установленным tooling проекта.

Работать от main в issue-scoped feature branch, коммиты
`[engineering-standards-1]: <English description>`. Ответы на inline review
оставлять в соответствующих тредах. Без force push, merge, npm publish, тегов,
настройки credentials/protection или смены нормативных статусов без согласования.

Предпочтение владельца для этой работы: использовать Superpowers, явно
предупреждать, если skills недоступны. Architectural path: письменный дизайн
→ его review → письменный план и execution choice → реализация. При ревью
проверять аргументы, при runtime изменениях TDD, перед утверждением результата
свежие проверки. Это рабочая настройка владельца, не требование публичных
стандартов ко всем агентам/потребителям. Наличие subagents не предполагать.

## Что перенесено из исходного проекта

Канонические spec/plan уже в этом репозитории; старые локальные файлы исходного
проекта — указатели, а не альтернативные нормативные копии. Оригинал
[ревью плана](../superpowers/plans/2026-10-11-engineering-standards-independent-packages-review.md)
уже совпадает с исходником дословно; дополнительно сохраняются
[ответы на него](../superpowers/plans/2026-10-11-engineering-standards-independent-packages-review-response.md)
и [ответы по PR #3](pr-3-review-response.md). Новых копий тех же текстов не нужно.

Не переносить продуктовые материалы, приватные настройки IDE, окружение,
секреты или агентские персональные конфиги. Работа первого потребителя со staff
отложена; его feature-ветка и локальные материалы должны оставаться нетронутыми.
В эту сессию не возвращаться к staff без отдельного запроса.
