# Ответ на ревью требований задач от 2026-10-12

Основание: локальный `docs-review/2026-10-12-issues-requirements-review.md`
и комментарии к [общей задаче #1](https://github.com/antonsmolko/engineering-standards/issues/1)
и issues #9–#26. Проверено относительно main `05daff7` после PR #7.
Исходный файл ревью сохраняется без изменений; этот документ фиксирует ответы.

Замечания о пропущенных критериях подтверждены дизайном и планом.
Правки требований не означают выполнение runtime задач, принятие содержания,
утверждение tooling design или разрешение выпуска.

| Задачи | Решение |
| --- | --- |
| #1, #9 | Явно указан порядок: owner approval исправленного tooling design → отдельный plan → approval плана и execution mode → runtime. Добавлены документация, полные Changesets settings, read-only version:check, остановка до упаковки и границы artifacts. |
| #10–#12 | Уточнены pure resolver/discovery boundary, explicit module dependencies, PACKAGE_VERSION, case policy/FS probe, unknown managed targets и разные source/generator versions. |
| #13 | Добавлены entrypoint links, MANAGED_DRIFT по версиям, read-only snapshots, tarball installer test, noninteractive setup и diagnostics.md. Выбран предложенный минимальный способ разбиения: четыре последовательных PR по одной задаче, закрытие только после полного Task 7. |
| #14–#16 | Зафиксированы неизменность actual versions/statuses, tooling-only правила до owner acceptance, whitespace/artifact checks, запрет undeclared Selection fields и отсутствие source autofix/tool execution в check. |
| #17–#19 | Повторно используются локальные проверки #9; уточнены full-name tags, CI base ref/history, typecheck gate, artifact allowlists и исключение private/test packages. #19 переименована как подготовка с gate одобрения. |
| #20–#22 | Добавлены checklist content-approval.md, decision link/revision, отдельный acceptance commit, повторная оценка изменений и inventory reconciliation. CORE-ARCH-001 остаётся кандидатом; оба TypeScript ID рассматриваются отдельно; SPA verification остаётся manual до checker. |
| #23 | Добавлены locked fixture/paths, MANAGED_CONFLICT/PACKAGE_MISSING, resolution без checkout и пересмотр lint-rule mapping после owner acceptance. |
| #24, #25 | Сохранены существующие seeds FRONTEND-ARCH-001/SVELTE-STATE-001. Для forms/store требуется отдельный дизайн применимости; review/acceptance фиксируются по content-approval.md. |
| #26 | Убраны необоснованные блокеры #24/#25: обязательны #19 и #23. Добавлены ручной аудит tarballs, проверка npm scope/name authorization и повторная оценка изменённого содержания. |

Во всех открытых задачах добавлены файлы и команды/ожидаемые результаты
проверок. Для tooling #9 точные новые пути и targeted RED команды определяются
отдельным утверждённым планом. Content-задачи проверяют actual catalogs;
искусственные failing tests человеческой прозы не требуются.
В #1 добавлены выполненная #8, сопоставление Task ↔ issue и follow-up
branch protection после зелёного verify и отдельного approval.
Закрытая #8 не изменяется: проверка обеих версий Node зафиксирована в PR #7.

Сквозные расхождения документов исправлены: Task 6 использует synthetic
accepted IDs; Tasks 3.4/3.5 следуют после 8.2; commit prefix относится к
конкретной issue; handoff указывает актуальную базу main и roadmap.
Поведение init для invalid JSON обозначено открытым контрактом, без
самовольного принятия предложенного exit status. Его согласование и точная
политика discovery/specifiers остаются обязательной первой частью #13.

Уточнение к рекомендации #15: обязательной перепривязки всех lint rules к
нормативным ID нет. После принятия текстов требуется пересмотр mapping;
обоснованные tooling-only правила допустимы и дальше. Proposed ID может
быть информационной ссылкой, но не основанием обязательной нормы.
