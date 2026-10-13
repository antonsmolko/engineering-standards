# Передача контекста разработки Engist

Дата: 2026-10-11. Это снимок состояния для продолжения работы в отдельной
сессии engineering-standards, не нормативное требование для потребителей.
После возобновления сверить GitHub и рабочее дерево: дальнейшие PR могут
изменить описанное здесь состояние.

Актуальное решение владельца от 2026-10-13: [первый релиз](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6139713098)
идёт по #9 → #18 → #20 → #26; пять specification packages. CLI/config products
отложены. Accepted ID по одному из core, TypeScript и Svelte SPA и явное одобрение
выпуска заменяют прежний CLI vertical-slice gate. Остальной исторический снимок
очищается отдельным docs-PR #1, как указано в решении владельца.

Node 26 only: engines ^26.0.0; .node-version 26.11.1.

В ревью PR #7 закреплены проверки нижней границы 26.0.0 и версии разработки
26.11.1, typecheck в будущем check/CI и Task 11.1 — подготовка процесса
публикации с отдельным gate на реальный выпуск. Эти пункты описаны в плане;
Первый PR #9 реализует check; CI/publication workflow остаются будущими задачами.

## Откуда продолжать

Репозиторий: [antonsmolko/engineering-standards](https://github.com/antonsmolko/engineering-standards).
Актуальная база — main после merge
[PR #27](https://github.com/antonsmolko/engineering-standards/pull/27),
commit `54e29b447e3f06b2d8eab0407bdd1b8857a619b3`.
Снимок ниже дополнен 2026-10-13: владелец согласовал tooling design и
[план первого implementation PR #9](../superpowers/plans/2026-10-13-workspace-checks.md)
для check, выполнение в текущей сессии с независимым итоговым review.
Штатный Changesets status/version остаётся вторым PR #9; issue не закрывается первым этапом.
Основная задача: [issue #1](https://github.com/antonsmolko/engineering-standards/issues/1).
В ней находится roadmap Tasks 3–11.1: issues #9–#26 с критериями и зависимостями.
[Issue #28](https://github.com/antonsmolko/engineering-standards/issues/28)
фиксирует политику review по запросу владельца в том же подготовительном PR #27;
ветка и префикс задачи-носителя #9 сохраняются, runtime #9 этим не завершается.
Текущий этап — первый implementation PR #9 (check); #8 (Node 26 и TypeScript helpers) закрыта после PR #7.
Frontend/Svelte расширение #24/#25 следует после реального среза #23,
но не является обязательным блокером первого выпуска #26.

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
устаревший baseline 55 обновлён до 70. Первый implementation PR #9 добавляет read-only check и negative lockfile fixtures;
version:prepare отменён; штатный Changesets остаётся вторым PR.

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

Lerna, Nx и Changesets не установлены. Первый PR #29 реализует check;
самописные pack/release scripts удалены по решению владельца #9.
Существующий catalog loader и тесты сохраняются без новой реализации CLI.

## Ближайшие действия

1. Завершить review PR #29: typed workspace check и полный suite на Node 26.0.0/26.11.1.
   Merge требует явного разрешения. Первый PR не закрывает #9.
2. Второй PR #9: штатный Changesets, отдельный согласованный план.
3. Общий docs-PR по #1: очистить старый roadmap ниже/в design и плане согласно
   принятому решению. Затем #18, #20, #26; не начинать deferred CLI/config задачи.

## Открытые контракты CLI из ревью PR #3

Это предложения, не молча принятые runtime-правки:

- Exact semver — рекомендуемый init способ установки, но сравнение любого
  dependency specifier строкой с installed.version ошибочно для file/tarball.
  Перед discovery согласовать supported specifiers, consumer/workspace root
  и проверку lockfile; не обещать все alias/overrides/catalog комбинации.
- Существующий валидный engist.json: no overwrite/no wizard, exit 0.
  Предложенное уточнение для invalid/unreadable/unsafe файла: отказ без записи,
  prompts или сети. Workflow и design описывают invalid JSON как открытый
  контракт; перед Task 7 согласовать exit status и синхронизировать документы.
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
С 2026-10-12 поддерживается только Node ^26.0.0; проверяются нижняя граница
26.0.0 и версия разработки 26.11.1.
Повторить проверки в новой сессии, не выдавать исторический результат за свежий.
npm ci --ignore-scripts подготавливает зависимости/cache; npm test — полный
node:test suite со встроенной поддержкой TypeScript test helpers в Node 26.
npm run typecheck проверяет tests/helpers/**/*.ts без генерации JS.
Воспроизводимого repository-local форматтера пока нет;
внешний Prettier предыдущих проверок не является установленным tooling проекта.

Работать от main в issue-scoped feature branch, коммиты
`[engineering-standards-<issue>]: <English description>` по номеру конкретной
задачи (например, `[engineering-standards-9]` для tooling). Ответы на inline review
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
