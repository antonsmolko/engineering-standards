# Согласование scope: задачи 1.1 и 1.2

Носитель — [#32](https://github.com/antonsmolko/engineering-standards/issues/32), prefix engineering-standards-32. Этот PR выполняет только документальное согласование groups 1; runtime groups 2–4 принадлежат #33. Ветка от main после merged [PR #31](https://github.com/antonsmolko/engineering-standards/pull/31), база d483438.

## Источники и статус предыдущих решений

Публичная основа — [#30](https://github.com/antonsmolko/engineering-standards/issues/30), merged PR #31, [решение владельца о roadmap](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6139713098) и [решение #9](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816). Прочитаны OpenSpec proposal/design/specs/tasks, активные документы и issue bodies; Локальный snapshot до правок — **private input, not a public basis**; он использовался для сравнения. Публичные основания — ссылки на решения выше и история правок соответствующих GitHub issues. Статус #9 CLOSED/COMPLETED проверен непосредственно.

Исторические [PR #27 ledger](2026-10-12-issues-review-response.md), [PR #29 ledger](2026-10-13-workspace-checks-review-response.md) и review/response документы остаются неизменными. Reviewer-confirmed closures не переоткрываются. Новое публичное решение меняет именно scope: собственные catalog/profile/release-engine механизмы и CLI/config больше не являются текущими требованиями. Требования качества содержания, сохранения IDs/drafts, независимых версий, artifact/consumer проверок, приватности/лицензий и явных approvals сохраняются. Частные обсуждения и independent-agent input — **private input, not a public basis**; они не заменяют публичную основу выше. Локальный docs-review не включён в Git и не изменён.

## Решения и доказательства

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [PR #31](https://github.com/antonsmolko/engineering-standards/pull/31), [#32](https://github.com/antonsmolko/engineering-standards/issues/32) | R1: активные design/plan/handoff/README описывали прежний CLI/catalog продукт | General design/plan, tooling design, handoff, root README | Исправлено | Активные документы описывают пять пакетов/README/manual adoption. Старые подробные документы доступны через immutable d483438 links; reviews сохранены. Runtime явно обозначен transitional: ещё восемь workspaces/catalogs. |
| [PR #31 review](https://github.com/antonsmolko/engineering-standards/pull/31#pullrequestreview-5509374356) | R2: закрытая #9 не завершила Changesets | #34, #1, handoff/tooling/plan | Исправлено | Новый #34 несёт незавершённый criterion; #9 не переоткрывается и Changesets не объявлен выполненным. План старого check помечен историческим. |
| [Owner roadmap decision](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6139713098) | R3: задачи прежних механизмов оставались активными/blockers | #10–#17/#19/#21–#25/#28, #1 | Применено | Deferred/backlog и объединённые задачи имеют явный текущий disposition; старые bodies сохраняются под Historical criteria (inactive), комментарии остаются. #28 закрывается как выполненная policy; остальные closures — not planned/объединение, не runtime completion. |
| [#30](https://github.com/antonsmolko/engineering-standards/issues/30), [accepted proposal](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6133308941) | R4: CI/content/release критерии зависели от resolver/CLI/config и собственного release engine | #18/#20/#26, content-approval, inventory | Исправлено | Сохранены actual content gate, проверенные версии/artifacts, ручной аудит/права, revision reassessment и registry consumer. Runtime APIs удалены из активных критериев; механизмы будущих задач выбираются в их PR. |
| [#30](https://github.com/antonsmolko/engineering-standards/issues/30), [PR #31 plan](https://github.com/antonsmolko/engineering-standards/blob/d483438/openspec/changes/simplify-project-scope/tasks.md) | R5: подготовка процесса до принятия содержания и actual release требуют раздельных зависимостей | #35/#20/#26, roadmap | Разделено без расширения scope | #35 — подготовительный результат для #26, перенесённый из #19; synthetic checks без publication/content acceptance. Граф #33 → #34 → #18 → #35 → #20 → #26 не цикличен. Ранее согласованные gates сохранены. |

## GitHub issue edits

- Созданы #32 (carrier docs), #33 (runtime transition), #34 (Changesets follow-up закрытой #9), #35 (publication preparation, подзадача #26). Это отдельные плановые результаты, не additions к carrier #32.
- #1 body/title: новый roadmap; #9 check выполнен, Changesets остаётся в #34. #32/#33/#34/#18/#35/#20/#26 отмечены незавершёнными; прежние completed база/policy/planning сохранены.
- #18: зависит от #33/#34, verification/artifact/content-gate fixtures, минимум permissions/no publication. Actual accepted gate блокирует release, а не технический verify. Branch protection всё ещё отдельное approval после зелёного CI.
- #20 body/title: объединены core/TypeScript/Svelte SPA, зависит от технической готовности включая #35; checklist, owner links/revisions, отдельные acceptance commits, inventory и reassessment сохранены.
- #26: зависит от #33/#34/#18/#35/#20; именно пять пакетов, actual accepted IDs, ручной аудит всех tarballs, scope rights, concrete approval, release evidence/partial failure и exact registry consumer. CLI/config/profile APIs и N1/N2/N3 механизмы отменены scope; content/approval gates не отменены.
- #10/#11/#12/#13/#14/#15/#16/#23: deferred; #24/#25: backlog, не release blockers. Labels созданы по явному решению владельца.
- #17/#19: закрыты not planned как заменённые #18/#35/#26; #21/#22: not planned как объединённые #20; #28: completed (policy в PR #27). Существующая #9 и #30 не редактируются/переоткрываются.
- Issue comments и прежние ledgers не удаляются. Runtime criteria не считаются выполненными только по этим body/state edits.

## Проверка результата

Issue states/labels/dependencies проверены после правок. Независимый reviewer без рабочей истории автора прочитал полный diff, этот ledger, OpenSpec, текущие issue bodies и все 103 исторических comments: actionable findings нет. Проверены reviewer-confirmed closures, сохранение старых тел inactive issues, reason not_planned для #17/#19/#21/#22 и completed для #28. Граф #33 → #34 → #18 → #35 → #20 → #26 ацикличен. Independent-agent input — private input, not a public basis; публичные основания — #30/PR #31/#32.

Отдельно от runtime: OpenSpec strict validation и full-diff whitespace check проходят; 35 локальных ссылок/якорей и immutable Git history links разрешаются. Полный diff не содержит изменений package/runtime/version/consumer; новые сценарии не имитируются тестами текста. Свежий авторский npm run check на Node 26.11.1: typecheck, workspace check и 95/95 тестов проходят; reviewer runtime suite не повторял. Tasks 1.1/1.2 завершены, OpenSpec progress 2/10; остальные восемь задач pending. Merge этого этапа ещё требует явного разрешения.


## Ревью PR #36

Прочитан полный [summary review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744), все PR/#32 comments/reviews и inline threads: inline отсутствуют, дополнительной пагинации нет. Reviewer подтвердил критерии #32, states/labels/dependencies и независимость gates; R1–R5 остаются закрытыми. Ниже записаны новые замечания и предложенные сокращения; реализация OpenSpec tasks 2–4 не начинается.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r6"></a>R6: AGENTS описывает Engist и текущие config/CLI packages | AGENTS.md | Исправлено | Resume указание относится к engineering-standards, независимость пяти specification packages явная; будущий tooling требует собственного scope. Approval/review правила не меняются. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r7"></a>R7: historical issue links ведут на изменяемый main | #10–#17/#19/#21–#25/#28 | Исправлено | Только ссылки Historical criteria (inactive) закреплены на d483438; историческое содержание и dispositions сохранены. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r8"></a>R8: Changesets ошибочно описан как установленный | General design | Исправлено | Написано «будут версионироваться», добавлена ссылка #34 и явное отсутствие Changesets сейчас. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r9"></a>R9: README contracts ведёт на proposal | README, general design | Исправлено | Обе ссылки ведут непосредственно на package/adoption specs; обзорный design также ссылается на реальные сценарии. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r10"></a>R10: локальный snapshot не маркирован приватным | Ledger sources | Исправлено | Snapshot обозначен private input, not a public basis; основания — публичные решения/issues и их история правок. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r11"></a>R11: перечисление неблокируемых задач пропускает #35 | Deferred/backlog issue headers | Исправлено | Обобщено до «Не блокирует roadmap #1», состояния/labels не изменены. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r12"></a>R12: title #18 обещает release-candidate artifacts | Issue #18 title | Исправлено | Заголовок Add verification CI for documentation packages согласован с критериями без собственного candidate engine. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r13"></a>R13: обзорный design дублирует release критерии | General design, #26 | Сокращено | Оставлены gates и ссылка #26; scope rights, actual registry consumer и tags остаются в #26, не удалены из требований. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r14"></a>R14: version policy дублируется в обзоре | General design, #34 | Перенесено | Ссылка на #34; прежняя политика breaking 0.x minor / post1.0 major / editorial patch сохранена в его критериях, без новой реализации. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r15"></a>R15: tooling повторяет base/history детали | Tooling design, #18 | Сокращено | Обзор ссылается на планы #34/#18/#35. Необходимый upstream context и отказ при его отсутствии остаются в #18. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r16"></a>R16: handoff повторяет first-release gates | Handoff, content-approval/#26 | Сокращено | Ссылки на процедуру принятия и #26; условия не отменены. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r17"></a>R17: повтор task/runtime состояния в ledger | Ledger verification | Исправлено | Удалён повтор в конце предыдущего verification paragraph; evidence исходного этапа сохранено. |
| [PR review](https://github.com/antonsmolko/engineering-standards/pull/36#pullrequestreview-5509738744) | <a id="r18"></a>R18: избыточная фраза исторического check plan | Workspace-checks plan | Сокращено | Оставлен historical banner и ссылка на #34; старый план не объявлен действующим. |

### Issue edits этого review round

Тела #10/#11/#12/#13/#14/#15/#16/#17/#19/#21/#22/#23/#24/#25/#28: закреплены historical blob links на d483438. Headers deferred/backlog обобщены до roadmap #1. #18 изменён только title; #34 получил прежнюю политику версий из обзорного design. Остальные active criteria, states, labels и dependencies не меняются. Новые issues/механизмы не создавались.

### Проверка этого review round

Независимое review полного итогового diff, русских артефактов, relevant unchanged documents и актуальных issue criteria — без actionable findings. Reviewer подтвердил fixes R6–R18, сохранность content/artifact/audit/approval gates, states/labels/dependencies и прежних closures. Agent input — private input, not a public basis; публичная основа — summary review PR #36 и #32.

Отдельно от runtime: strict OpenSpec и full-diff whitespace checks проходят, все 38 текущих локальных Markdown links/anchors разрешаются; три distinct historical Git targets существуют на d483438. Проверены закреплённые ссылки в 15 historical issue sections. Свежий авторский npm run check на Node 26.11.1 — typecheck, workspace consistency и 95/95; reviewer runtime suite не повторял. Runtime/package/version diff пуст. R6–R18 закрыты; канонический ledger — этот файл. Ответ на summary публикуется со ссылками на individual entries; inline threads нет.
