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
#1, #9–#26, #28 и локальный review file; его путь выше обозначает private input,
not a public basis. Публичное основание исходных замечаний — комментарии #1.
Источники предыдущего раунда: [release review](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495553414)
и [policy review](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265);
[повторная проверка #17](https://github.com/antonsmolko/engineering-standards/issues/17#issuecomment-6131902274)
повторяет R1–R3 и получает ответ с теми же записями.
Текущий раунд: [review 5496221947](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947); предыдущий раунд — review 5496017480.
Статусы прежних замечаний сверены с ledger: reviewer-confirmed closures
сохраняются, включая Expected Task 10, носитель #9, зависимость #23 от #15
и design anchor, подтверждённые release review. R1–R8 и R10–R18 сохраняются закрытыми. R9 переоткрыт новым замечанием
об отсутствии carrier policy в AGENTS.md; уточнение и повторное закрытие — R24.
Новые аспекты R19/R24 не считаются автоматически закрытыми старым review:
test seam и release modes разобраны в R26/R27, carrier definition — R30.
Новые контрпримеры к R26/R27/R29 разобраны в R34–R36: противоречивая механика
удалена, условия выпуска сохранены. [Решение владельца](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132792189)
согласует перенос механизмов N1–N3 в publication design #19;
[follow-up](https://github.com/antonsmolko/engineering-standards/issues/19#issuecomment-6132792894)
фиксирует их до runtime. Инварианты исправлены сейчас, механизмы — agreed deferred.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [R1](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972202) <a name="r1"></a> | Task 10 depended on later actual fixtures | plan Tasks 10/11.1; #17/#19/#26 | fixed | Synthetic releases fixtures in #17; actual Selection supplied only after #23 in #26; dependencies unchanged. |
| [R2](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972206) <a name="r2"></a> | Offline install, cache and baseline lock were undefined | plan Tasks 10/11.1; #17/#19/#26 | fixed | Explicit preparation; offline/ignore-scripts lock creation and ci; cache miss fails; immutable baseline, new temporary exact-artifact lock, error cleanup; RED scenarios planned. |
| [R3](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251972209) <a name="r3"></a> | Caller could forge availableVersions | plan Task 10; #17/#19/#26 | fixed | Production-bound registry adapter verifies exact metadata/integrity; availableVersions internal; test adapters never authorize actual preflight; errors fail closed. |
| [R4](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495553414) <a name="r4"></a> | Read-only did not define temporary writes | plan Task 11.1; #19/#26 | fixed | Read-only working tree/source locks/registry; temporary consumer allowed with cleanup, explicit registry reads/cache preparation; publisher writes separately approved. |
| [R5](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996251) <a name="r5"></a> | Three possible authoritative ledgers | AGENTS rule 2; this document; PR body | fixed | Committed response takes precedence, otherwise PR description, otherwise pre-PR issue; replies point here and add no unrecorded dispositions. |
| [R6](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996260) <a name="r6"></a> | Local source contradicted public-source requirement | AGENTS rule 2; this document | fixed | Private input labelled and paired with public actionable source; policy owner decision recorded in #28. |
| [R7](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996265) <a name="r7"></a> | Open disposition allowed premature completion | AGENTS rule 5; replies | fixed | Completion forbids open entries; fixed/declined/agreed deferred only; every thread and summary receives entry links. Replies verified after push. |
| [R8](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4251996273) <a name="r8"></a> | Independent review and small changes ambiguous | AGENTS rule 6; verification record | fixed | Different person or separate agent without author conversation; any contract/gate/cross-document requirements require it; only wording/typo/link-only may skip; owner determines unavailability; decision/limitation recorded in Evidence and, when a PR exists, its description (R21/R32). |
| [R9](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r9"></a> | Repository policy had no issue or recorded scope decision | AGENTS; #28; PR body | fixed | Owner-requested policy added to #9 review carrier in this PR; carrier rule now explicit in AGENTS (R24); #28 records decision and criteria, Refs #28 added; #9 runtime remains unfinished. |
| [R10](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r10"></a> | PR did not follow its own ledger policy | this document; PR body; all replies | fixed | One five-column ledger, individual review links, documentation evidence separate from tests, independent review required; duplicate PR ledger removed. |
| [R11](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r11"></a> | Boundary checks were optional and release-specific | AGENTS rule 4; plan Task 10 | fixed | Boundary checks relevant to the current task's contract preserve content/compatibility gates independently of approval. The final scope review replaces the exhaustive generic checklist (R46); design/plan owns contracts. |
| [R12](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r12"></a> | Whole diff before every push was unbounded | AGENTS rule 5; verification record | fixed | Whole PR once per round plus searches of unchanged representations for every changed contract; affected scope recorded here. |
| [R13](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r13"></a> | Source collection/status reconciliation had no record location | AGENTS rule 1; source inventory above | fixed | All review sources/pages recorded here and previous statuses reconciled against this ledger. |
| [R14](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r14"></a> | Confirmed closure had no confirming actor | AGENTS rule 1; previous status above | fixed | Reviewer-confirmed closures preserved; reopen only with recorded new evidence. |
| [R15](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r15"></a> | Issue edits had no dedicated record location | AGENTS rule 3; GitHub issue edits below | fixed | Dedicated section distinguishes remote issue-body changes from repository edits. |
| [R16](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495581265) <a name="r16"></a> | Policy paragraphs were unnecessarily long | AGENTS review rules | fixed | Six numbered rules, two sentences each; concrete boundaries replace vague qualifiers. |
| [R17](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132144759) <a name="r17"></a> | Optional absence confused with missing supplied Selection | plan Task 10; #17; boundary ledger | fixed | Omitted/empty paths yield empty closure; missing/unreadable/invalid supplied file rejects; actual #26 independently requires reviewed Task 8.2 Selection. Independent reviewer confirmed closure. |
| [R18](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132144759) <a name="r18"></a> | Selection validation assigned to catalog loader | plan Task 10 | fixed | Task 2 validates catalogs/metadata; validateSelection Task 4 validates Selection, then resolver computes closure. Independent reviewer confirmed closure. |
| [R19](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252138296) <a name="r19"></a> | Actual rejection had no implementing component | plan Tasks 10/11.1; #17/#19/#26 | fixed | Publication enforcement belongs to the separately approved #19 design; CLI/env cannot bypass gates. First normative publication must publish the reviewed profile (R34); isolated tests cannot authorize production (R35). No publisher API is selected here. |
| [R20](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252138304) <a name="r20"></a> | Registry scope and lock provenance unspecified | plan Task 10; #17/#26 | fixed | All direct/transitive external dependencies including third-party packages; dependency lock resolved/integrity/name/version compared with checked inventory before ci, root against temporary manifest; optional/platform handling in R31, extra/unverified entries reject. |
| [R21](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252138311) <a name="r21"></a> | Unavailable reviewer decision/pre-PR report location unclear | AGENTS rule 6; #28 | fixed | Owner determines unavailability; decision and solo-review limitation in ledger and PR description when one exists. Independent review is available and required here. |
| [R22](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495739407) <a name="r22"></a> | Policy #28 missing from roadmap and carrier issue | handoff; #1/#9/#28 | fixed | #1 tracks #28 as documentation policy alongside PR27; handoff and #9 link it, preserving runtime order/dependencies. |
| [R23](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495739407) <a name="r23"></a> | Synthetic Selection described as reviewed actual input | plan Task 10; #17 | fixed | Interface explicitly distinguishes pinned synthetic fixtures and reviewed actual Selection Task8.2. |
| [R24](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495739407) <a name="r24"></a> | Carrier prefix rule absent; R9 closure challenged | AGENTS branch rule; #9/#28; PR body; R9 | fixed | Owner requested policy fixes in this PR; carrier tracking is now defined precisely by R30 (branch issue, linked addition, request/prefix records, unchanged carrier closure). No merge/release approval inferred. |
| [R25](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495739407) <a name="r25"></a> | Independent-review report lacked reviewed revision | verification evidence; public review report; PR body | fixed | Report records reviewed Git SHA and actual checks, with separate clean-context agent provenance; GitHub shared account is not presented as a different human reviewer. |
| [R26](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252251639) <a name="r26"></a> | Test requirements contradicted public injection ban | plan Task 11.1; #19 | fixed | Contradictory factory/test seam removed; isolated test publisher cannot authorize production. Requirements and negative/positive scenarios retained; concrete isolation belongs to the approved #19 design. New counterexample addressed in R35. |
| [R27](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252251651) <a name="r27"></a> | First-release profile gate applied to every actual release | plan Tasks 10/11.1; #17/#19/#26 | fixed | First normative gate remains until publication of the checked real spec profile, regardless of preceding CLI/config releases (R34). Later independent specification releases retain package gates; CLI/config adds no artificial normative IDs. No caller-controlled mode or validation-only acceptance mechanism selected. |
| [R28](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252251663) <a name="r28"></a> | Minimum accepted count ambiguous | plan Task 10; #17 | fixed | One applicable accepted ID from each of core, TypeScript and Svelte SPA; no single shared ID interpretation. |
| [R29](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252251663) <a name="r29"></a> | Real profile and production adapter trust unspecified | plan Task 10; #17/#19/#26 | fixed | Reviewed Task8.2 profile and registry provenance cannot be established by caller flags. Opaque handles/private registries removed as premature design; production/test separation and evidence trust must be designed and approved in #19 (R35/R36). |
| [R30](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252251673) <a name="r30"></a> | Carrier definition/addition tracking and line wrapping incomplete | AGENTS; #28 | fixed | Carrier is branch issue; each related owner-requested addition needs its own issue and record in carrier/added issue/PR; original criteria/closure unaffected; line wrapping corrected. |
| [R31](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495866790) <a name="r31"></a> | Optional/platform lock entries could trigger false rejection | plan Task 10; #17 | fixed | All lock metadata checked; root checked against generated manifest; platform-incompatible optional branch needs no tarball/cache, required paths never skip, installable cache miss fails; RED cases planned. |
| [R32](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495866790) <a name="r32"></a> | R8 evidence retained outdated unavailable-review rule | this ledger R8 | fixed | R8 now states owner decision, Evidence and PR description only when a PR exists, matching R21. |
| [R33](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5495866790) <a name="r33"></a> | Local-link verification count missing | verification evidence | fixed | 20 local paths/anchors verified explicitly; no runtime validation claim for future contracts. |
| [R34](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252388504) <a name="r34"></a> | N1: how workflow detects first normative publication; CLI/config bypass invariant | design; plan Tasks 10/11.1; #19/#26 | agreed deferred | Contradictory transition/validation-only acceptance removed. First publication of any specification packages requires publication of the checked profile with one applicable accepted ID per required component. Detection mechanism deferred by [owner decision](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132792189) to [follow-up #19](https://github.com/antonsmolko/engineering-standards/issues/19#issuecomment-6132792894) because it belongs to the separately approved publication design, not requirements review. |
| [R35](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252388511) <a name="r35"></a> | N2: test seam and production adapter/profile provenance mechanism | plan Task 11.1; #19 | agreed deferred | Contradictory factory/fake-transport seam removed; test data cannot authorize production and caller flags cannot prove provenance. Concrete production/test isolation deferred by [owner decision](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132792189) to [follow-up #19](https://github.com/antonsmolko/engineering-standards/issues/19#issuecomment-6132792894) for the separately approved publication design before runtime. |
| [R36](https://github.com/antonsmolko/engineering-standards/pull/27#discussion_r4252388516) <a name="r36"></a> | N3: release evidence trust model | plan Task 11.1; #19/#26 | agreed deferred | Registry presence/manual publication/caller file alone cannot discharge first normative gate. Creator/storage/workflow-run/approval/provenance trust model remains undefined until publication design approval; deferred by [owner decision](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132792189) to [follow-up #19](https://github.com/antonsmolko/engineering-standards/issues/19#issuecomment-6132792894) to avoid selecting mechanisms in this requirements PR. |
| [R37](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496017480) <a name="r37"></a> | Verification linked an older independent report | verification evidence | fixed | Historical verification now points to exact-SHA report 6132654794. Current round is reported separately; ledger table rendering is continuous; runtime tests do not prove future publisher behavior. |
| [R38](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496017480) <a name="r38"></a> | Three accepted IDs did not require one per component everywhere | design; plan Task 8.2 | fixed | Design first normative release and Task8.2 consumer assertion now require at least one applicable accepted ID from each of core, TypeScript and Svelte SPA (minimum three). |
| [R39](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496017480) <a name="r39"></a> | R24 evidence described superseded carrier wording | ledger R24 | fixed | R24 now references current carrier definition in R30. |
| [R40](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496017480) <a name="r40"></a> | Generic validator issue duplicated publication policy | issue #17; ownership table | fixed | Removed detailed modes, acceptance artifact roles and factories from #17; publication enforcement/trust is delegated to #19/#26 while generic gates remain. |
| [R41](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496017480) <a name="r41"></a> | Thread reply addressed R29 without its anchor | thread 4252251663 | fixed | Follow-up reply links both R28 and R29, including the corrected current provenance requirement. |
| [R42](https://github.com/antonsmolko/engineering-standards/issues/28) <a name="r42"></a> | Owner requested upstream reuse and smaller task scope after repeated reviews | AGENTS Task scope; #28 | fixed | Recorded owner request in #28. Require upstream baseline/concrete gap, one independently verifiable implementation outcome per PR and no speculative future APIs in review fixes. Existing agreed gates and carrier scope retained. |
| [R43](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r43"></a> | Publication mechanisms were still retold instead of linked | plan Task11.1; issue #19 | fixed | Replaced the mechanism paragraph with the #19 scope link, replaced two test checkboxes with one approved-design/test-data invariant and consolidated three #19 mechanism bullets into one invariant/link. N1-N3 remain agreed deferred. |
| [R44](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r44"></a> | Future #17 npm/lock algorithms over-specified | plan Task10; issue #17 | fixed | Removed prescribed npm commands and step sequence; retained exact-artifact/offline/no-lifecycle/no-fallback, verified lock inventory, optional/required-path distinctions, immutable baseline and cleanup requirements. Implementation is chosen in #17; R2/R20/R31 guarantees retained. |
| [R45](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r45"></a> | Boundary table duplicated ledger entries | ledger verification section | fixed | Replaced duplicate table with one canonical-ledger link and relevant entry references. No requirement disposition changed. |
| [R46](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r46"></a> | Exhaustive boundary checklist conflicted with current-task scope | AGENTS rule4; #28 | fixed | Boundary checks now apply to the current task contract; content/compatibility gates remain independent of approval. |
| [R47](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r47"></a> | First-spec publication condition repeated | design first-release paragraph | fixed | One condition covers first publication of any specification packages regardless of preceding CLI/config publication, retaining the real three-component accepted profile gate. |
| [R48](https://github.com/antonsmolko/engineering-standards/pull/27#pullrequestreview-5496221947) <a name="r48"></a> | Carrier additions not counted as outcomes or recorded in #9 | AGENTS Task scope; #9/#28 | fixed | Carrier additions explicitly count as separate outcomes for implementation PRs; #9 and #28 record the owner-requested upstream-first/small-PR addition. Carrier runtime criteria/closure unchanged. |

### GitHub issue edits

These are remote body changes, separate from the repository diff:

- [#1](https://github.com/antonsmolko/engineering-standards/issues/1) and [#9](https://github.com/antonsmolko/engineering-standards/issues/9): #28 roadmap and owner-requested scope/carrier-prefix record; #9 also records the upstream-first/small-PR addition.
- [#17](https://github.com/antonsmolko/engineering-standards/issues/17): synthetic ownership, registry scope/trust, optional/platform lock provenance, publication-boundary link to #19/#26, offline/cache and fresh-lock contract, RED cases; dependencies remain #16/#9.
- [#19](https://github.com/antonsmolko/engineering-standards/issues/19): synthetic preparation versus actual invocation, first normative gate, production/test isolation and evidence-trust design requirements/RED cases and read-only/temporary-write boundary; dependencies remain #18/#17.
- [#26](https://github.com/antonsmolko/engineering-standards/issues/26): actual Selection after #23, exact-artifact recomputation and first normative publication gate; dependencies remain #19/#23.
- [#28](https://github.com/antonsmolko/engineering-standards/issues/28): owner-requested policy, upstream-first/small-PR task approach, carrier-outcome/current-task boundary clarification and explicit same-PR scope decision. It does not close #9 implementation or approve merge/release.

### Scope boundary for this PR

| Existing task | Contract owned |
| --- | --- |
| #17 | Generic release preflight, artifact/registry/lock checks and package-level content gates. |
| #19 | Publication enforcement, provenance, production/test isolation and evidence trust; mechanisms are linked to the separately approved design scope. |
| #26 | Separately approved first publication and reviewed actual Task8.2 acceptance evidence. |
| #28 | Repository task/review policy and issue-carrier tracking. |

This PR corrects those requirements; detailed publication design/plan still
belongs to #19 before runtime implementation. No additional runtime design,
new tooling task or publication implementation is included here.

### Contract boundary verification

Boundary requirements and outcomes are recorded in the [canonical ledger](#canonical-review-ledger),
especially R2/R17/R20/R27/R31 and R34-R36; there is no second copy here.
Publication mechanisms N1-N3 remain owner-agreed deferred to #19 before runtime.

### Verification evidence

Requirements verification covers the complete PR diff against origin/main,
unchanged design/tooling/handoff/consumer passages containing the changed terms,
current issue bodies/dependency order, local paths/anchors and the boundary
requirements referenced above. Release/runtime RED cases above are future acceptance requirements,
not assertions that the validator or publisher is implemented.

Documentation checks: `git diff --check` PASS; 21 local paths/anchors resolve;
issue dependency graph has no cycle and #17/#19/#26 retain their intended order.
All eight versions remain 0.1.0; actual catalogs remain nine proposed, zero accepted.
Node 26.11.1: `npm run typecheck` and `npm test` PASS, 70/70 tests, including
real packed-artifact and offline external-consumer integration. Runtime unchanged;
these tests do not establish the proposed release validator's future behavior.
Historical [independent review of a5277cd](https://github.com/antonsmolko/engineering-standards/pull/27#issuecomment-6132654794)
was performed by a separate agent without the author's working conversation.
Current-round checks and exact-SHA independent review are recorded in the closing
PR report and linked from the PR description. Thread/summary reply presence is
checked on GitHub after push before claiming review completion.

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

Current-round review evidence is recorded against the committed requirements SHA
in the closing PR report, with the separate agent's context and command results;
ledger-only evidence recording does not change the reviewed contracts.
