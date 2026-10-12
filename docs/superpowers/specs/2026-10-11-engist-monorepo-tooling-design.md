# Engist: npm workspaces, Changesets и корневые scripts

Статус: область работ согласована в чате; письменный дизайн ожидает ревью
владельца. После ревью PR #4 владелец согласовал отложить Lerna/Nx и уточнить
lockfile, совместимость и формат тегов. База — merge PR #4 (`125de92`).
Два уточнения повторного ревью PR #4 внесены ниже; утверждение исправленного
письменного дизайна владельцем ещё не зафиксировано. Реализация инструментов
ещё не начата.

## Цель и границы

Настроить управление восемью независимыми пакетами: установку зависимостей
через npm workspaces, последовательность проверок и упаковки через корневые
npm scripts и подготовку независимых версий/changelog через Changesets.
Существующая структура пакетов и их публичные имена сохраняются.

Это отдельный инфраструктурный PR по issue #1. Он выделяет начальную настройку
инструментов из Task 10 [общего плана](../plans/2026-10-11-engineering-standards-independent-packages.md),
но не завершает Task 10 и не отменяет условия
[основной спецификации](2026-10-11-engineering-standards-design.md).
Принятие нормативных текстов, вертикальный срез и разрешение публикации остаются
отдельными этапами. Девять требований остаются proposed, accepted — ноль.

## Разделение ответственности

| Инструмент | Ответственность | Что не делает |
| --- | --- | --- |
| npm workspaces | Установка, lockfile, локальные ссылки между пакетами | Не задаёт семантическую совместимость стандартов |
| Корневые npm scripts | Последовательность проверок и подготовка артефактов | Не образуют второй versioning engine |
| Changesets | Независимые версии и changelog выбранных пакетов | Не читает semantic requires из manifest.json |

Workspaces уже настроены: восемь корней явно перечислены в package.json.
Не заменять их glob `packages/*`: пакеты вложены по доменам и технологиям.
Корневой пакет остаётся private, без собственной release-версии.

Зависимости разработки закрепляются точными версиями и lockfile после проверки
совместимости с Node 26 (точный baseline — 26.11.1). По решению владельца
2026-10-12 прежняя поддержка Node 22/24 снята. Несовместимую с этой границей версию
инструмента не внедрять: выбрать совместимую или отдельно согласовать смену
engines. Lerna/Nx в этом этапе не устанавливаются.

## Граф задач

Есть три разных графа: npm dependencies, семантические связи каталогов
manifest.requires и зависимости задач. Их нельзя считать одним графом.
Текущая проверка canonical schemas core и bundled snapshots CLI читает два
JSON и сравнивает их напрямую в tests/integration/schemas.test.js. Проверки
не производят входные данные друг для друга: это связь данных, а не зависимость
выполнения задач. Parity test сохраняется без искусственного core → CLI pipeline
и без runtime dependency CLI на core. Автоматический schema sync не нужен для
этого этапа; check не переписывает snapshots.

Все восемь пакетов пока без собственных scripts. Пять specification-пакетов
проверяются существующими layout/schema/catalog-artifact tests; CLI дополнительно
имеет catalog tests. ESLint/Prettier пока являются skeleton-пакетами: проверяются
layout и артефакты, не несуществующие config exports. Эти проверки остаются
корневыми. Не создавать восемь одинаковых пакетных check targets, фиктивную
компиляцию или менять package.json публикуемых пакетов ради оркестратора.

Публичные корневые команды для этого этапа:

- `npm test`: существующий полный набор node:test, без сокращения покрытия.
- `npm run check`: полный npm test и новые read-only metadata/lockfile/локальные
  semantic compatibility проверки; без повторного запуска одного suite.
- `npm run pack:check`: сначала check, затем упаковка всех восьми пакетов
  и проверка allowlist/metadata/exports в изолированных временных consumers.
- `npm run changeset`: создание описания изменения средствами Changesets.
- `npm run version:check`: read-only проверка release plan, metadata/lockfile
  и локальной совместимости текущих и projected workspace versions без bump.
- `npm run version:prepare`: локальное применение Changesets version и
  синхронизация manifest.package.version и lockfile, без publish/tag/push.

Корневая оболочка последовательно соединяет этапы и останавливается при ошибке;
независимые тесты выполняются средствами node:test. Вызовы scripts не должны
создавать рекурсию: check не вызывает pack:check, который зависит от check.
Упаковка начинается только после успешных предварительных проверок.
Существующие тесты, самостоятельно создающие tarballs, сохраняются.

### Почему Lerna/Nx отложены

Сегодня нет сборок или генерации, результаты которых нужны другим пакетным
задачам. Дополнительный task runner не даёт необходимого порядка, а его
конфигурация, транзитивные зависимости и платформенные установки требуют
обслуживания. Workspaces отвечают за зависимости, node:test — за параллелизм
тестов, корневые scripts — за короткую последовательность этапов.

Вернуться к Lerna/Nx отдельным изменением, когда появятся настоящие prerequisites
и измеримая потребность в scoped runs, кэше или более сложном параллелизме.
Само число пакетов или условные два ребра не служат критерием внедрения.
При таком внедрении проверить Linux/macOS install с --ignore-scripts, platform
optionalDependencies, поддерживаемые Node, daemon/cloud/telemetry настройки,
ignored служебные каталоги и полноту inputs/outputs. Сейчас нет nx.json,
lerna.json, remote cache, Nx Cloud или affected-only CI.

## Независимые версии

Changesets настраивается с `fixed: []`, `linked: []`, `access: public`,
`baseBranch: main`; приватные пакеты не версионируются и не тегируются.
Public access описывает будущие артефакты, а не разрешает публикацию сейчас.
Changesets — единственный механизм изменения версий/changelog.
Не создавать параллельный самописный versioning engine. Будущие теги используют
полное npm-имя: `@antonsmolko/standards-svelte@0.1.0`. Создание тегов сейчас
не выполняется; имя tag-команды проверяется у выбранной версии Changesets.

Для breaking изменений 0.x автор выбирает minor changeset с описанием миграции;
после 1.0 — major. Редакционные изменения без смены смысла — patch.
Изменение одного пакета не поднимает версии несвязанных пакетов.

У спецификаций package.json и manifest.package.version должны совпадать.
version:check обнаруживает metadata/lockfile drift. Последовательность
version:prepare:

1. Проверить чистоту worktree, metadata/lockfile и release plan до записи.
   Для каждого из восьми корней, перечисленных в root package.json.workspaces,
   запись package-lock.json.packages[workspacePath] должна существовать, а её
   version должна точно совпадать с package.json этого workspace. Это проверка
   самой workspace-записи, не link-записи node_modules; отсутствие записи или
   несовпадение версии дают отказ до записи. То же равенство проверяется
   read-only командами check/version:check и повторно после version:prepare.
   Для каждого manifest.requires на пакет внутри workspace проверить диапазон
   относительно projected версии после release plan. Это отдельный preflight,
   не слепой вызов check текущего набора: явно обновлённый range может уже
   требовать планируемую версию. Такой переход допустим только при совместимом
   полном projected наборе; проверка текущего состояния сообщает его drift.
2. Выполнить Changesets version и детерминированно обновить версии известных
   specification manifests из package.json.
3. Обновить workspace metadata lockfile через
   `npm install --package-lock-only --ignore-scripts --offline --no-audit --no-fund`.
4. Повторно проверить metadata, lockfile и локальные semantic ranges.

Offline cache подготавливается заранее; cache miss даёт отказ без сетевого
fallback. Версия-only drift не объявляется гарантированным падением npm ci:
согласованность проверяется прямым сравнением всех workspace versions.
Тест npm ci на временной копии дополнительно проверяет установку, но не заменяет
это сравнение.
Диапазоны manifest.requires не переписываются из npm dependencies и не меняются
автоматически: корректировку совместимости автор оформляет явным изменением.
Подготовка версии меняет локальные tracked файлы и требует чистого worktree;
при сбое возвращает nonzero и перечисляет завершённые шаги без слепого rollback.

Локальная проверка использует semver.satisfies без сети. Например, core 0.2.0
несовместим с TypeScript requires ^0.1.0: version:check и предварительная
проверка version:prepare отказывают до записи без явного изменения range.
Неизвестный workspace-пакету внешний requires не считается подтверждённым:
его опубликованность/совместимость проверяет полный release preflight Task 10.
Accepted-content gates тоже остаются там. version:check не разрешает выпуск.

Branch-relative Changesets status запускается с явным --since ref. Для него
нужны доступный base ref и история до merge base: CI fetch-depth 1 недостаточен.
Полная история либо явный fetch нужного ref с достаточной глубиной обязательны.
Точный режим status закрепляется тестами выбранной версии; локальный metadata
check не должен случайно требовать remote ref. Status выполняется до version,
а после version используются metadata/lockfile/range checks, не проверка наличия
уже потреблённых changesets.

В рабочей ветке все восемь package versions остаются 0.1.0. Реальный bump
проверяется только на временных fixtures. Для инфраструктурного PR без изменения
публичного поведения пакетов не требуется искусственный package changeset.

## Проверки и приёмка

1. Полный существующий набор тестов проходит на точном Node 26.11.1;
   новый check не исключает интеграционные проверки.
2. Корневая orchestration останавливается при ошибке check до упаковки;
   проверяются exit code и отсутствие последующих побочных действий, не Nx.
3. Реальный Changesets version во временном workspace проверяет patch одного
   пакета, minor breaking 0.x и major после 1.0; несвязанные версии неизменны.
4. Подготовка версии синхронизирует manifest metadata
   и lockfile. До и после version:prepare для всех восьми workspace-записей
   package-lock.json явно проверяется равенство version с соответствующим
   package.json; отсутствующая запись тоже даёт отказ. Negative fixture содержит
   устаревшую version только в workspace-записи lockfile; package.json и manifest
   остаются согласованными, чтобы metadata drift не маскировал ошибку lockfile:
   check/version:check и preflight version:prepare отказывают без изменения
   файлов, даже если npm ci проходит. Проверка охватывает specification,
   configuration и CLI workspaces, а не только manifests. Metadata sync
   идемпотентен; npm ci на временной копии дополнительно принимает подготовленный
   lockfile.
   Fixture core 0.1 → 0.2 при зависимом ^0.1.0 отказывает до записи; fixture с
   явной корректировкой range проходит. Проверяются cache miss и отсутствующий
   base ref при branch-relative status с понятной диагностикой.
5. pack:check проверяет артефакты всех восьми пакетов; существующие public exports
   импортируются вне workspaces. Отсутствующие config exports и bin не выдаются
   за реализованные. Private root и tests/fixtures не попадают в артефакты.
6. Consumer install использует offline/ignore-scripts после явной подготовки
   npm cache. Пустой cache даёт диагностику, а не скрытый сетевой fallback.
7. Документация объясняет команды, границы трёх графов и процедуру добавления
   changeset; общий план фиксирует инфраструктурный этап без ложного Task 10 done.

Проверки выполнения и versioning получают RED → GREEN tests до runtime правок.
Рабочие каталог, package versions и lockfile не используются как fixture для
изменения версий. Все временные артефакты имеют изолированные пути и cleanup.

## Вне этого PR

Нет npm publish, release workflow, Git-тегов, merge, настройки credentials или
branch protection. Нет реализации init/sync/check Engist, новых ESLint/Prettier
exports, переименования npm-пакетов и подключения asc-admin.
Открытые уточнения discovery и повторного init из ревью PR #3 сохраняются
до отдельного согласования перед реализацией Tasks 4/7.
После согласования этого письменного дизайна составляется отдельный план;
установка Changesets и реализация начинаются после его согласования.

## Официальные источники

- [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)
- [Changesets configuration](https://changesets.dev/guide/config)
- [Changesets CLI](https://changesets.dev/guide/cli)
- [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)
