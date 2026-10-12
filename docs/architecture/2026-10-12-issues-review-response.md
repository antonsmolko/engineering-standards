# Ответ на ревью требований задач от 2026-10-12

Публичное основание: [исходное ревью и сквозные замечания в #1](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6131096320)
и комментарии к issues #9–#26. Локальный файл
`docs-review/2026-10-12-issues-requirements-review.md` также прочитан;
он не входит в репозиторий и не является публичным источником этого ответа.
Проверено относительно main `05daff7` после PR #7.

Замечания о пропущенных критериях подтверждены дизайном и планом.
Правки требований не означают выполнение runtime задач, принятие содержания,
утверждение tooling design или разрешение выпуска. Таблица ниже описывает
правки тел issues на GitHub; эти изменения не входят в diff документационного PR.

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
Review Focus общего плана теперь явно перечисляет Tasks 8.1, 8.2, 9, 10.
Поведение init для invalid JSON обозначено открытым контрактом, без
самовольного принятия предложенного exit status. Его согласование и точная
политика discovery/specifiers остаются обязательной первой частью #13.

Уточнение к рекомендации #15: обязательной перепривязки всех lint rules к
нормативным ID нет. После принятия текстов требуется пересмотр mapping;
обоснованные tooling-only правила допустимы и дальше. Proposed ID может
быть информационной ссылкой, но не основанием обязательной нормы.

## Повторное ревью

В [повторной проверке #1](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6131367541)
подтверждено закрытие исходных замечаний. Новые уточнения внесены в задачи:
пересмотр lint mapping выполняется в #23 после #20–#22; Files #23 включает
README/mapping ESLint-пакета; content decisions получают строку на каждый
reviewed ID. В #20 объединены повторяющиеся criteria.

Gate пустого accepted-набора в #17 проверяет выбранный реальный профиль
в release group, а не каждый dependency package. Минимум первого среза
остаётся по одному accepted ID из core, TypeScript и Svelte SPA; proposed
frontend/Svelte seeds не становятся обязательными и не блокируют выпуск
сами по себе. Compatibility/registry/artifact gates сохраняются.

Discovery-контракт фиксируется до runtime #10 как общий decision record
в design/workflow; документальный первый PR #13 может предшествовать #10.
Зависимости runtime не меняются: завершения всего #13 для старта resolver
не требуется. Если контракт влияет на resolveSelection, сначала согласуется
изменение интерфейса.

Ссылки на tooling design в #17/#18 уже присутствовали в разделе общих условий;
замечание об их отсутствии не подтвердилось. Для удобства ссылки перенесены
в раздел источников в начале задач. Остальные косметические уточнения приняты.

В PR #27 удалены внутренние Task/review/owner references из публикуемого
CLI workflow; неопределённый exit status invalid JSON обозначен без внутреннего
roadmap. Источник ревью заменён публичным комментарием, а история handoff
согласована с базой PR #7.

В следующей проверке исправлено оставшееся историческое утверждение handoff
о successful no-op для invalid JSON. Таблица принятия переименована в
Content decisions; первые три строки остаются кандидатами для
первого среза, последующие reviewed IDs добавляются независимо от его даты.

Для release group без проверенного реального профиля уточнён отказ:
specification packages должны иметь хотя бы одно accepted требование в manifest,
иначе выпуск блокируется. CLI/config-only группа проверяет свои runtime/config
контракты без искусственных нормативных IDs. Actual Task 8.2 и отдельное
approval первого выпуска остаются обязательными. Предложенное общее
«либо отдельное решение владельца» не добавлено как release waiver: изменение
content gates требует отдельного пересмотра design/plan, а не обычного
одобрения release group.

## Статус оставшихся замечаний сводного review

Подтверждённые закрытые пункты из [проверки ecc3f14](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495417764)
сохраняются закрытыми. Оставшиеся Minor исправлены: заголовок tooling design
стал «Вне этого этапа»; избыточная оговорка Task 8.1 удалена; Task 8.2 содержит
пересмотр lint mapping и ESLint README в Files. Task 9 прямо описывает
tooling-only правила до принятия actual содержания. Повтор определения
content gate в Content decisions заменён ссылкой на Recording acceptance.
Формулировки «нормативных условий» и «кандидатами обязательного среза» уточнены.

Issue #9 используется как конкретная задача-носитель подготовительного
review требований перед tooling; общий roadmap остаётся в #1. Префикс
`[engineering-standards-9]` сохраняется, PR использует Refs #9 и не закрывает
реализацию tooling. Это решение также явно указано в описании PR.
Рекомендация исключить локальный docs-review из Git не применяется:
это пользовательский материал, он не включён в коммиты и остаётся видимым.

Новые уточнения #17 применяют criterion к каждому выпускаемому specification
package: либо exact name/version входит в dependency closure проверенного
профиля, либо валидированный manifest выпускаемой версии содержит accepted ID.
Вне Selection «active» не используется. Proposed/deprecated не засчитываются;
наличие другого непустого профиля в группе не освобождает посторонние пакеты.
Соответствующие RED fixtures включены в будущий Task 10, без заявления,
что release validator уже реализован.

В следующем review пояснение задачи-носителя добавлено в тело #9; #23 явно
зависит от #15 для пересмотра ESLint README. Expected Task 10 больше не
использует «active» вне Selection; общий дизайн ссылается на package gate
этого этапа.

Источник checkedProfiles уточнён: release validator самостоятельно загружает
и валидирует catalogs из настоящих tarballs в изолированном consumer,
проверяет закреплённый Selection Task 8.2 и запускает resolver Task 4.
Closure/accepted-набор пересчитываются для каждой release revision; готовые
или исторические evidence от вызывающего кода не заменяют проверку.
Files и публичный вход validateRelease отражают artifacts/selectionPaths,
checkedProfiles остаётся внутренним результатом. RED-сценарии на stale/forged
evidence включены в будущий план реализации, без заявления о готовом runtime.
