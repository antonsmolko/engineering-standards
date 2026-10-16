# Design

## Context

Носитель — [#34](https://github.com/antonsmolko/engineering-standards/issues/34). База b205da3 после merge PR #37: пять npm workspaces по 0.1.0, private root без версии, собственных release scripts нет. Check сверяет workspace lock entries, тесты устанавливают реальные tarballs. Межпакетных npm dependencies нет: сочетания описаны README. Задача реализует оставшуюся часть закрытой #9; #18/#35/#20/#26 остаются отдельными.

## Goals / Non-Goals

Один результат: поддерживаемый цикл changeset → план → независимые версии/changelog, доказанный на synthetic fixtures. Не создаём release engine, JSON projection, custom parser, migration validator или publish automation. В этом change реальные версии/changelog стандартов не изменяются, содержание не принимается; CI, теги и публикация исключены.

## Decisions

### Штатный инструмент и минимальная настройка

Используем точный dev dependency `@changesets/cli@3.0.3`, актуальный npm stable на 2026-10-16. [Официальный getting started](https://changesets.dev/guide/getting-started) подтверждает npm >=10.9.0 и Node >=26 в поддерживаемом диапазоне; репозиторий по-прежнему поддерживает только Node ^26.0.0. Maintained upstream baseline — [конфигурация самого Changesets](https://github.com/changesets/changesets/blob/main/.changeset/config.json). Берём обычную структуру `.changeset`, не GitHub changelog adapter и не experimental options upstream-монорепозитория: для локального versioning они не нужны.

[Конфигурация v3](https://changesets.dev/guide/config): default changelog, `commit: false`, пустые fixed/linked/ignore, `baseBranch: main`, `access: public`, privatePackages version/tag false. Явные поля независимости/private root делают намерение обозримым; остальные настройки — defaults. Публичность уже указана в publishConfig пакетов и не разрешает запуск publish. Новый root script только `changeset: changeset`; aliases/wrappers версии не нужны. Не меняем exports, files или зависимости публикуемых пакетов.

Альтернатива общей/связанной версии противоречит пяти независимым пакетам. Собственная обёртка version:prepare и второй расчёт плана дублировали бы CLI без текущего use case.

### Команды, данные и границы записи

Входы: проверяемые в Git package.json workspaces, `.changeset/config.json` и авторские changeset Markdown/YAML с именами пакетов, bump и English summary. Это maintainer-controlled данные, не загружаемые инструкции из внешнего registry. CLI разбирает и валидирует их; наше приложение не переопределяет его правила.

- `npm run changeset` создаёт changeset интерактивно. Для изменения, не требующего выпуска пакета (например, root tooling), changeset не обязателен. Synthetic changesets остаются только в fixtures.
- `npm run changeset -- status` показывает release plan; `--output <temporary-file>` сохраняет JSON для тестовой проверки. Без output команда не изменяет исходники. Для сравнения с main нужна существующая актуальная Git ref; CI fetch policy принадлежит #18.
- `npm run changeset -- version` применяет changesets, обновляет затронутые версии/changelog и удаляет обработанные entries. Команда изменяет файлы: в #34 выполняется только внутри временных fixtures. При последующей реальной подготовке версии нужен отдельный разрешённый выпускной шаг; это не content approval и не разрешение публикации.
- После version выполняется штатный `npm install --package-lock-only --ignore-scripts` (в fixtures offline после подготовки cache), затем текущий workspace check. Changesets не считаем менеджером npm lockfile. При ошибке не запускать следующие шаги и не коммитить частичный результат; восстановить fixture или вручную исправить причину и перепроверить diff.

Успех доказывается CLI exit 0, ожидаемым планом, версиями/changelog и согласованным lockfile. Missing/malformed config/changeset и неизвестное имя пакета не исправляются нашими средствами: штатная CLI diagnostic/nonzero, без обещания транзакционного rollback upstream. На чистом fixture без changesets нет релизного изменения; изменённые пакеты без changeset могут давать status nonzero по правилам CLI. Отдельная проверка missing/invalid changeset не должна подменяться assertion на ошибку Git ref.

### Версионная политика без собственного анализатора

Автор и reviewer выбирают bump по смыслу, CLI применяет выбранный semver. Редактура без смены смысла — patch (fixture 0.1.0 → 0.1.1). Breaking до 1.0 — minor (0.1.0 → 0.2.0) с миграцией в English summary; после 1.0 — major (1.2.3 → 2.0.0) с миграцией. CLI не определяет breaking по Markdown и не доказывает достаточность миграции. Проверяется применение выбранных типов и сохранение migration summary, semantic correctness проверяет человек. Незатронутые пакеты/их changelog и private root сохраняются; независимость не означает запрет разных пакетов в одном changeset.

### Проверки и документация

Новые integration tests/helper пишутся на TS, без переписывания остальных существующих JS-тестов. Через реальный локально установленный CLI и изолированный temporary Git/npm project: пять package names/paths, synthetic changelogs, копия реальной конфигурации, свой lockfile и base main. Без вызовов registry publish/tag и сетевых запросов во время fixture versioning.

RED до подключения CLI/config; затем GREEN на patch одного пакета, breaking 0.x, breaking >=1, mixed changeset для двух пакетов, empty и invalid input. Assertions проверяют фактические plan/metadata/changelog, неизменность остальных четырёх/трёх пакетов и private root, согласованность lockfile. Read-only status проверяется снимком файлов до/после; version не создаёт commits/tags. Существующие packed-artifact/consumer checks продолжают проверять реальный продукт.

Maintainer guide описывает команды и границы (English examples); handoff/общий tooling design/README обновляются по фактической реализации. Публикуемые README стандартов не засоряются внутренним release roadmap. Полный suite на Node 26.0.0 и 26.11.1; отдельное независимое review всего diff, docs и issue dependencies до передачи PR.

## Risks / Trade-offs

Changesets приносит dev dependencies; выбираем готовый CLI вместо нового движка и фиксируем lockfile. Node/npm compatibility и поведение проверяются на обеих поддерживаемых Node. Default changelog может ссылаться на commit hashes из fixture Git — это ожидаемый upstream output, не необходимость GitHub API/token. Никаких гарантий semantic/content approval из зелёного versioning test.

## Migration Plan

После утверждения этого плана: RED → подключение CLI/config → fixture GREEN → руководство/полные проверки/независимое review в одном PR #34. Все пять рабочих версий остаются 0.1.0. До выпуска rollback — revert изменений tooling. Завершение #34 разрешает планировать #18, но не закрывает дальнейшие stages. Архивирование завершённого simplify-project-scope — отдельное действие, не часть #34.
