# Пересмотр очереди — #45

Основание — [#45](https://github.com/antonsmolko/gost-spec/issues/45), явный запрос владельца пересмотреть и закрыть неактуальные задачи; новая работа в gost-spec следует из конкретной проблемы. Пакеты, версии, статусы proposed и release gates не меняются.

Прочитаны bodies всех 13 исходных открытых задач, comments #1/#20/#24/#25/#26, актуальные design/plan/handoff/content-approval/inventory и предыдущее решение [#30 / PR #31](https://github.com/antonsmolko/gost-spec/pull/31). Старые comments/ledgers — история; подтверждённые dispositions сохраняются, отмена задач не означает устранения прежних runtime findings реализацией.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#45](https://github.com/antonsmolko/gost-spec/issues/45), [scope PR #31](https://github.com/antonsmolko/gost-spec/pull/31) | R1: неактивные CLI/config задачи выглядят очередью реализации | #10–#16/#23, roadmap/handoff | Закрытие not planned | Реализация этих механизмов не входит в текущий продукт; история/критерии остаются доступными. |
| [#45](https://github.com/antonsmolko/gost-spec/issues/45) | R2: общие темы без текущего результата занимают очередь | #24/#25, inventory/design/plan | Закрытие not planned | Будущие темы остаются в inventory, конкретные задачи создаются по use case. |
| [#45](https://github.com/antonsmolko/gost-spec/issues/45), [#26](https://github.com/antonsmolko/gost-spec/issues/26) | R3: #20 требует массового ревью, хотя принят постепенный подход | #20/#1, design/plan/handoff | Уточнён scope | Checklist, decision rows/revisions, acceptance commits, stable IDs, повторная оценка и реальный accepted минимум трёх областей сохранены. |

## GitHub issue edits

- #10–#16/#23/#24/#25: закрытие с reason not planned и пояснением по #45 в body (Current disposition); заголовки Current disposition обновлены, исторические критерии и comments сохранены.
- #20: результат ограничен первым принятым минимумом через задачи по конкретным проблемам; критерии решений/проверок сохраняются, историческая addition #42 описана как завершённая без закрытия #20.
- #1: актуальная очередь/счётчик drafts и завершённая база согласованы с merge #41/#44; umbrella остаётся открытой до content #20 и отдельно одобренного выпуска #26.
- #26: body/criteria/dependencies не меняются. #45 закроется только merge текущего документационного PR.

## Проверка

На исходной ревизии a22c63b полный diff четырёх документов проверен отдельно от runtime checks; локальные ссылки/anchors разрешаются (19). GitHub API подтвердил closed/not_planned для всех десяти задач и открытые #1/#20/#26/#45; body #26 побайтово совпадает с исходным. Конфликтов с content-approval, inventory и сохранёнными release gates не найдено.

`npm run check`: 48/48 на Node 26.11.1 и 26.0.0; `git diff --check` без ошибок. Runtime, публикация, версии и content acceptance не менялись.

Независимый агент проверил полный diff, исходные задачи и подготовленные bodies #1/#20: замечаний нет. Это private input, not a public basis; публичные основания решений — #45 и сохранённые критерии #26.

## Ответ на ревью PR #46

Прочитаны все страницы PR comments, summary reviews и inline threads: один [summary comment](https://github.com/antonsmolko/gost-spec/pull/46#issuecomment-6237148789), reviews/inline threads отсутствуют. Reviewer подтвердил прежние R1–R3 и отсутствие блокеров; эти решения не переоткрываются. Исторический приватный review от 2026-10-12 не является новым основанием, его подтверждённые dispositions сохранены.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Minor 1](https://github.com/antonsmolko/gost-spec/pull/46#issuecomment-6237148789) | <a id="r4"></a>R4: неясно, где пояснены закрытия | Этот ledger, GitHub issue edits | Исправлено | Указан body (Current disposition); комментарии при закрытии не заявляются. |
| [Minor 2](https://github.com/antonsmolko/gost-spec/pull/46#issuecomment-6237148789) | <a id="r5"></a>R5: повтор про #24/#25 | Общий design | Исправлено | Удалено первое упоминание; оставлено одно в абзаце о постепенном наполнении. |
| [Minor 3](https://github.com/antonsmolko/gost-spec/pull/46#issuecomment-6237148789) | <a id="r6"></a>R6: устаревшее «#24 backlog сохраняется» | Presenter design | Исправлено | Исторический контекст PR #41 отделён от текущего закрытия #24 по #45; дана ссылка на темы в inventory. |
| [Что вырезать](https://github.com/antonsmolko/gost-spec/pull/46#issuecomment-6237148789) | <a id="r7"></a>R7: handoff повторяет roadmap | Handoff | Исправлено | Длинный перечень заменён одной строкой со ссылкой на раздел roadmap; причины и история сохранены там. |

GitHub bodies/states/criteria в этом раунде не редактируются. Изменены только формулировки, удалены повторы и добавлены ссылки; контракты/requirements/gates сохранены. По исключению AGENTS.md §6 повторное независимое review для wording/link-only правок не требуется; независимое review исходного результата и подтверждение reviewer остаются действительными.

Проверка раунда: `npm run check` — 48/48 на Node 26.11.1 (реальные packed artifacts/external consumers включены). Отдельно проверены весь PR diff пяти документов, 22 локальные ссылки/anchors, отсутствие противоречий в inventory/content-approval и live #20/#26; `git diff --check` чист. Исторические ledgers описывают прежние состояния; новые обязательства или GitHub edits не добавлены.
