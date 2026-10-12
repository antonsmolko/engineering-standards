# Ответ на ревью требований задач от 2026-10-12

Публичное основание: [исходное ревью и сквозные замечания в #1](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6131096320)
и комментарии к issues #9–#26. Локальный файл
`docs-review/2026-10-12-issues-requirements-review.md` также прочитан;
он не входит в репозиторий и не является публичным источником этого ответа.
Проверено относительно main `05daff7` после PR #7.

## Canonical review ledger

Этот документ — единственный ledger текущего раунда PR #27. Ответы в threads,
issues и PR ссылаются на его записи, отдельные диспозиции там не ведутся.

Прочитаны все страницы inline/review bodies PR #27, bodies/comments задач
#1, #9–#26 и локальный review file; его путь выше обозначает private input,
not a public basis. Публичное основание исходных замечаний — комментарии #1.
Текущий раунд: [release review](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495553414)
и [policy review](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265);
[повторная проверка #17](https://github.com/antonsmolko/engineering-standards/issues/17#issuecomment-6131902274)
повторяет R1–R3 и получает ответ с теми же записями.
Статусы прежних замечаний сверены с ledger: reviewer-confirmed closures
сохраняются, включая Expected Task 10, носитель #9, зависимость #23 от #15
и design anchor, подтверждённые release review. Они не переоткрывались.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [R1](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972202) <a name="r1"></a> | Task 10 depended on later actual fixtures | plan Tasks 10/11.1; #17/#19/#26 | fixed | Synthetic releases fixtures in #17; actual Selection supplied only after #23 in #26; dependencies unchanged. |
| [R2](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972206) <a name="r2"></a> | Offline install, cache and baseline lock were undefined | plan Tasks 10/11.1; #17/#19/#26 | fixed | Explicit preparation; offline/ignore-scripts lock creation and ci; cache miss fails; immutable baseline, new temporary exact-artifact lock, error cleanup; RED scenarios planned. |
| [R3](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972209) <a name="r3"></a> | Caller could forge availableVersions | plan Task 10; #17/#19/#26 | fixed | Production-bound registry adapter verifies exact metadata/integrity; availableVersions internal; test adapters never authorize actual preflight; errors fail closed. |
| [R4](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495553414) <a name="r4"></a> | Read-only did not define temporary writes | plan Task 11.1; #19/#26 | fixed | Read-only working tree/source locks/registry; temporary consumer allowed with cleanup, explicit registry reads/cache preparation; publisher writes separately approved. |
| [R5](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996251) <a name="r5"></a> | Three possible authoritative ledgers | AGENTS rule 2; this document; PR body | fixed | Committed response takes precedence, otherwise PR description, otherwise pre-PR issue; replies point here and add no unrecorded dispositions. |
| [R6](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996260) <a name="r6"></a> | Local source contradicted public-source requirement | AGENTS rule 2; this document | fixed | Private input labelled and paired with public actionable source; policy owner decision recorded in #28. |
| [R7](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996265) <a name="r7"></a> | Open disposition allowed premature completion | AGENTS rule 5; replies | fixed | Completion forbids open entries; fixed/declined/agreed deferred only; every thread and summary receives entry links. Replies verified after push. |
| [R8](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996273) <a name="r8"></a> | Independent review and small changes ambiguous | AGENTS rule 6; verification record | fixed | Different person or separate agent without author conversation; any contract/gate/cross-document requirements require it; only wording/typo/link-only may skip; unavailable limitation recorded in Evidence and PR. |
| [R9](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r9"></a> | Repository policy had no issue or recorded scope decision | AGENTS; #28; PR body | fixed | Owner-requested policy added to #9 review carrier in this PR; #28 records decision and criteria, Refs #28 added; #9 runtime remains unfinished. |
| [R10](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r10"></a> | PR did not follow its own ledger policy | this document; PR body; all replies | fixed | One five-column ledger, individual review links, documentation evidence separate from tests, independent review required; duplicate PR ledger removed. |
| [R11](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r11"></a> | Boundary checks were optional and release-specific | AGENTS rule 4; plan Task 10 | fixed | Generic empty/extra/stale/forged/version cases, N/A requires reasons; design/plan owns contract. Release boundary matrix below retains gates. |
| [R12](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r12"></a> | Whole diff before every push was unbounded | AGENTS rule 5; verification record | fixed | Whole PR once per round plus searches of unchanged representations for every changed contract; affected scope recorded here. |
| [R13](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r13"></a> | Source collection/status reconciliation had no record location | AGENTS rule 1; source inventory above | fixed | All review sources/pages recorded here and previous statuses reconciled against this ledger. |
| [R14](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r14"></a> | Confirmed closure had no confirming actor | AGENTS rule 1; previous status above | fixed | Reviewer-confirmed closures preserved; reopen only with recorded new evidence. |
| [R15](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r15"></a> | Issue edits had no dedicated record location | AGENTS rule 3; GitHub issue edits below | fixed | Dedicated section distinguishes remote issue-body changes from repository edits. |
| [R16](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r16"></a> | Policy paragraphs were unnecessarily long | AGENTS review rules | fixed | Six numbered rules, two sentences each; concrete boundaries replace vague qualifiers. |
| [R17](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132144759) <a name="r17"></a> | Optional absence confused with missing supplied Selection | plan Task 10; #17; boundary matrix | fixed | Omitted/empty paths yield empty closure; missing/unreadable/invalid supplied file rejects; actual #26 independently requires reviewed Task 8.2 Selection. Independent reviewer confirmed closure. |
| [R18](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132144759) <a name="r18"></a> | Selection validation assigned to catalog loader | plan Task 10 | fixed | Task 2 validates catalogs/metadata; validateSelection Task 4 validates Selection, then resolver computes closure. Independent reviewer confirmed closure. |

### GitHub issue edits

These are remote body changes, separate from the repository diff:

- [#17](https://github.com/antonsmolko/engineering-standards/issues/17): synthetic ownership, registry adapter trust, offline/cache and fresh-lock contract, RED cases; dependencies remain #16/#9.
- [#19](https://github.com/antonsmolko/engineering-standards/issues/19): synthetic preparation versus actual invocation and read-only/temporary-write boundary; dependencies remain #18/#17.
- [#26](https://github.com/antonsmolko/engineering-standards/issues/26): actual Selection after #23, exact-artifact recomputation and offline temporary lock; dependencies remain #19/#23.
- [#28](https://github.com/antonsmolko/engineering-standards/issues/28): owner-requested policy and explicit same-PR scope decision. It does not close #9 implementation or approve merge/release.

### Contract boundary verification

| Case | Required outcome |
| --- | --- |
| Omitted/empty selectionPaths or no selected profile | Empty closure; each specification package must have accepted content in its validated release-version manifest. |
| Extra unrelated proposed/deprecated-only package | Reject even beside a valid nonempty profile. |
| Proposed-only dependency inside checked closure | Allowed, retaining compatibility/registry/artifact gates. |
| CLI/config-only group | No invented normative IDs; actual first-release #26 gates still apply. |
| Supplied Selection path missing/unreadable/invalid, invalid metadata or exact-version mismatch | Reject; no fabricated checkedProfiles or silent baseline rewrite. |
| Stale/forged evidence or registry list | Recompute from tarballs/resolver; verified production registry adapter, no caller JSON shortcut. |
| Offline cache miss, network/auth/metadata/integrity failure | Reject; explicit preparation and no hidden offline fallback. |
| New tarball revision versus old baseline lock | New temporary exact-artifact lock; source baseline unchanged; cleanup on success/error. |
| Actual first release without reviewed Task 8.2 Selection | Reject independently of the optional input for generic technical validation. |
| Synthetic fixtures/adapter | Test algorithms only; never actual content/publication evidence. |
| Review completion | No open ledger findings; all thread/summary replies link to entries. |
| Independent review | Required here because contracts and cross-document requirements changed. |

### Verification evidence

Requirements verification covers the complete PR diff against origin/main,
unchanged design/tooling/handoff/consumer passages containing the changed terms,
current issue bodies/dependency order, local paths/anchors and this boundary
matrix. Release/runtime RED cases above are future acceptance requirements,
not assertions that the validator or publisher is implemented.

Documentation checks: `git diff --check` PASS; 20 local paths/anchors resolve;
issue dependency graph has no cycle and #17/#19/#26 retain their intended order.
All eight versions remain 0.1.0; actual catalogs remain nine proposed, zero accepted.
Node 26.11.1: `npm run typecheck` and `npm test` PASS, 70/70 tests, including
real packed-artifact and offline external-consumer integration. Runtime unchanged;
these tests do not establish the proposed release validator's future behavior.
[Independent review of the complete result](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132144759)
was performed by a separate agent without the author's working conversation.
It found two Minor items (R17/R18); both were corrected and rechecked, with no
remaining findings. Thread/summary replies link to these ledger entries; their
presence is checked on GitHub after push before claiming review completion.

## Earlier review corrections

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

## История подтверждённых исправлений

Исторические записи ниже сохраняют контекст прежних раундов; актуальные
диспозиции текущего раунда находятся только в ledger выше.

### Повторное ревью

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

### Статус оставшихся замечаний сводного review

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

Источник checkedProfiles уточнён в актуальном Task 10: validator сам валидирует
catalogs из tarballs и запускает resolver по переданным Selection. Техническая
подготовка использует synthetic fixtures, actual Selection Task 8.2 применяется
только в Task 11.1 после #23. Offline/cache, temporary lock и registry trust
определены в ledger текущего раунда; старые результаты не заменяют пересчёт.
