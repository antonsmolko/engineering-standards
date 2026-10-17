# Manual publication preparation — #35

Носитель — [#35](https://github.com/antonsmolko/engineering-standards/issues/35), prefix engineering-standards-35. База 495b1a1 после merge [PR #39](https://github.com/antonsmolko/engineering-standards/pull/39); #18 закрыта. Change [manual-publication-preparation](../../openspec/changes/manual-publication-preparation/proposal.md) утверждён владельцем 2026-10-17; инструкция и TS test реализованы в PR #40. Выполнено 6/6 tasks, local/actual CI — 48/48 на обеих Node; независимое final review завершено, PR ожидает явного merge approval.

## Прочитанные источники и прежние closures

Прочитаны #35 body/comments (comments отсутствуют), #26/#20 criteria/dependencies, #1 roadmap, актуальные handoff/design/tooling/content-approval, Changesets guide, установленный CLI и текущие tests/workflow. Публичное [review #39](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6225246610) подтвердило #18 и R1–R7; minor R8/R9 исправлены до merge, R10 informational не требовало изменения настроек. Подтверждённые closures сохраняются, старые release-engine механизмы не возвращаются.

Публичное основание ручного выпуска — [решение владельца в #1](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6133308941) (ручной changeset publish по явному одобрению) и критерий #26 «конкретный процесс выбирается в #35». Выбор в рабочем диалоге 2026-10-17 — дополнительный private input, not a public basis для findings; актуальные criteria #35/#26 имеют приоритет над остальными историческими механизмами комментария #1. Поэтому manual stop/rehearsal observations и automated artifact tests в плане различаются. CLI/CI не объявляются enforcement человеческих решений; новые approval flags/schema/API не вводятся.

Baseline: [Changesets CLI](https://changesets.dev/guide/cli), maintained [publish example](https://github.com/changesets/changesets/blob/main/.github/workflows/publish.yml), [pack tests](https://github.com/changesets/changesets/blob/main/packages/cli/src/commands/pack/__tests__/index.test.ts), [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish/). В установленном CLI 3.0.3 прочитаны pack/publish-plan/publish/getPublishPlan: native pack записывает tarball integrity; publish from-pack-dir сам её не сверяет. Design требует ручного hash comparison, а не приписывает upstream отсутствующую проверку.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#35 upstream criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C1: поддерживаемый процесс без собственного release engine | proposal/design/spec/tasks | Реализовано; evidence ниже | Штатные publish-plan/pack/from-pack-dir из одного закреплённого CLI; нет нового workflow/approval API/каталога. |
| [#35 synthetic denial criterion](https://github.com/antonsmolko/engineering-standards/issues/35), [#26 gates](https://github.com/antonsmolko/engineering-standards/issues/26) | C2: отсутствие содержания/аудита/конкретного approval останавливает выпуск | design/spec/tasks | Выполнено как ручная проверка | Оператор выполняет test-only negative/positive walkthrough, фиксирует STOP до publish/tag, missing source и changed artifact. Автоматические tests отдельно проверяют реальные tarballs/integrity/consumer и один вызов headers helper. Synthetic records не заменяют owner decisions; обход прямым npm доступом не объявляется технически запрещённым. |
| [#35 no-release criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C3: никаких настоящих registry writes/tags/bumps | design/spec/tasks | Реализовано; evidence ниже | Synthetic fixture по пяти реальным workspaces/config и native plan, команды publish/version/tag в #35 не вызываются; packages 0.1.0/drafts/owner decisions сохраняются. |
| [#35 evidence criterion](https://github.com/antonsmolko/engineering-standards/issues/35), [#26](https://github.com/antonsmolko/engineering-standards/issues/26) | C4: npm rights, partial failure и exact registry installs | design/spec/tasks | Реализовано; evidence ниже | Runbook сохраняет provenance/hashes/approval/audits/logs и per-package/tag state; E404 не доказывает scope rights, unknown result → STOP. Диагностика описана в runbook: STOP → logs/exit → registry SHA-512 comparison → повтор того же каталога или новое approval; simulation удалена, actual registry installs/failure/retry остаются #26. |
| [#35 verification criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C5: обе Node и независимое review | tasks | Реализовано; evidence ниже | Полный local check 48/48 на обеих Node и actual matrix подтверждены ниже; independent final review/итоговый task status фиксируются отдельно. |

## GitHub issue edits первоначального планирования

В #1 отмечена выполненная #18 после проверки merged #39/closed #18. Criteria/dependencies #35/#20/#26 не менялись, все три задачи открыты; на стадии планирования PR #40 не закрывал #35; реализация передаёт closure на merge. Контакты, credentials/protection/settings и real release approval не менялись.

Исторические upstream research и первоначальная проверка планирования сохранены в [749be57](https://github.com/antonsmolko/engineering-standards/blob/749be57/docs/architecture/2026-10-17-publication-preparation-response.md); это не текущие требования или evidence реализации.

## Review PR #40 — сокращение плана

Прочитаны все страницы PR comments (один [summary 749be57](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905)), inline comments/reviews и GraphQL threads (пусты, hasNextPage false). Повторно прочитаны #35 body/comments (пусты), #20/#26 criteria/dependencies и публичное owner decision #1. Reviewer подтвердил CLI commands, experimental plan, отсутствие native integrity enforcement и границы #20/#26. Эти подтверждения и прежние closures #39 сохраняются. Новое evidence выявило излишний dry-run/simulation/retry протокол первоначального плана: они заменены ниже, первоначальное independent review не используется для объявления их корректными.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Review, Important 1](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R1: npm publish dry-run проверяет upstream и усложняет fixture | design/tasks, ledger/PR | Исправлено в плане | Оставлена цепочка native plan → pack → integrity → installOffline → checkDocuments. Dry-run/config/cache/закрытый registry/retries/timeouts удалены из активного плана; историческое исследование помечено отдельно, не является требованием. |
| [Review, Important 2](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R2: synthetic positive path не должен подменять publish другой командой | design/spec/tasks | Исправлено в плане | Положительный результат — «все stop points пройдены, publish не вызывался». Negative ручные stop points сохранены. |
| [Review, Important 3](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R3: simulated partial failure не требуется #35 | design/tasks, ledger | Исправлено в плане | Simulation удалена. По C4 #35 остаётся инструкция диагностики фактического сбоя #26; её наличие проверяется документально, actual recovery не заявляется. |
| [Review, Important 4](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R4: remaining-subset/replan протокол дублирует upstream retry | design/spec/tasks | Исправлено в плане | STOP → сохранить logs/exit и package/tag state → npm view exact dist.integrity → тот же publish --from-pack-dir с тем же одобренным каталогом либо новое approval. Проверено по installed publish.mjs: already-published пропускается, successful tags создаются до общей ошибки. Неоднозначность registry/tag state или integrity mismatch остаётся STOP, без собственного retry engine. |
| [Review, Minor 5](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R5: approval digest должен сопоставляться с registry | design/spec/tasks | Исправлено в плане | SHA-512 SRI связывает audited tarball, approval, pre-publish и registry dist.integrity. Native pack SHA-256 отдельно сверяется с bytes; его формат не изменяется. |
| [Review, Minor 6](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R6: лишние version-preparation/empty changeset инструкции | design/spec/tasks | Исправлено в плане | Удалён новый процесс version-preparation/add --empty; существующий versioning guide остаётся без изменения, первый выпуск не требует bump ради процедуры. |
| [Review, Minor 7](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R7: повторные header negatives и no-tags assertion | design/tasks | Исправлено в плане | Fixture по пяти реальным workspaces/config, один вызов checkAcceptedHeaders как связки. Existing accepted-headers.test.ts сохраняет все negatives; assertion команды tag, которая не вызывается, удалён. |
| [Review, Minor 8](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R8: несогласованные dry-run обещания | proposal/design/spec/tasks, PR | Исправлено в плане | Активные artifacts согласованы на упаковке/integrity/consumer и ручных stop points, без безопасного dry-run как результата. |
| [Review, Minor 9](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R9: scenario завершения реального #26 не относится к #35 | spec | Исправлено в плане | Scenario удалён; требование теперь относится к содержанию инструкции (перечень evidence/registry installs для #26), не к выполнению публикации в #35. |
| [Review, Minor 10](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231018905) | R10: есть публичное основание ручного выпуска | design/ledger, PR | Исправлено | Добавлена owner comment #1#6133308941 и актуальный #26; private диалог не является единственным основанием. |

### GitHub issue edits этого раунда

Нет. #35/#20/#26 criteria/dependencies не менялись; #1 completion checkbox #18, выставленный после merge #39, сохранён. Handoff остаётся корректным: planning-only, ручные stop points, 0/6 tasks. Описание PR переводится на русский согласно предпочтению владельца; consumer documentation/diagnostics остаются английскими.

### Независимая проверка пересмотренного результата

Отдельный агент без авторской рабочей переписки проверил полный PR diff с правками к 749be57, все artifacts/ledger/handoff, актуальные issue bodies/comments #35/#20/#26, summary #40, public owner decision и relevant unchanged docs. Подтвердил все R1–R10, native CLI поведение и сохранение content/audit/exact-approval/registry gates. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичное основание исправлений — review #40 выше и criteria #35/#26. Прежние closures PR #39 сохранены, новых открытых findings нет.

## Реализация утверждённого плана

Владелец утвердил план в рабочем диалоге 2026-10-17 (private input, not a public basis для findings); публичное основание реализации — #35 и согласованные artifacts выше. Прочитан [повторный review a813d1a](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231077591): все R1–R10 reviewer-confirmed closed, новых замечаний нет. Closures сохраняются. Scope не расширен, GitHub issue edits реализации отсутствуют.

Fixture требует package-lock.json для распознавания npm workspace; он создаётся штатным offline npm install --package-lock-only, как в существующем changesets.test.ts.

### Автоматическая проверка

Новый TS test: реальные пять workspace metadata/config, synthetic документы с существующими версиями 0.1.0 и публичной MIT LICENSE → native fixture plan → Changesets pack → native SHA-256 = actual bytes → SHA-512 diagnostics → actual offline installed consumer metadata/documents/links → один accepted-header helper call. Workspace links отсутствуют, реальные package files/config/lockfile сохранены. Первый baseline на Node 26.11.1 — 47/47. Результаты полного suite/actual CI приведены ниже отдельно от ручных observations. Runtime/helper/workflow/package files не менялись; новые TS files проверяются существующим typecheck.

### Ручная synthetic репетиция

Исполнитель: Codex как оператор test-only процедуры, 2026-10-17. Synthetic owner/auditor labels в материалах не являются реальными owner decisions, audit или permission to publish. Запущена ephemeral копия integration fixture с сохранением temporary artifacts для осмотра; committed test всегда удаляет fixture. Затем буквально выполнены безопасные команды digest, offline install и Node consumer-check из docs/publication.md; каждая дала exit 0. Existing AGENTS.md с примером из docs/usage.md, ESLint и Prettier files были созданы перед установкой и сохранились byte-for-byte; ссылки core/TypeScript README разрешились и прочитаны. Все пять tarball inventories и synthetic standard headers/публичная LICENSE осмотрены.

Историческая репетиция реализации 7b13f23. Fixture Git revision: `82870cd6b446805a62dd001ec5442c40b9e07b92`; source base: `a813d1ad4a262cb4a89462ecf251e66fe62ffe04` плюс текущая реализация. SHA-256 проверенных файлов: test `3122448a6a9be7878cec071ec2642f167c032473a21a0ec6a52416458221e5ef`, runbook `69c34c70f6eb3e8dd4243f5b0e2092b75a45d18361a4bf06decb828c797c85b8`. Native pack plan и exact synthetic tarballs связаны SHA-512 в synthetic audit/approval; ни один реальный registry не запрашивался.

| Synthetic package/version | SHA-512 одобренных test-only bytes |
| --- | --- |
| @antonsmolko/standards-core@0.1.0 | `sha512-4PL0tO26Zg1CBx13L6rS0PL6+NF2UHHfqPpeGT5bshAsWgdx6fbKFRH7vYAuvPdQRr2VVmnzTQNzBrJ2oCi2jg==` |
| @antonsmolko/standards-frontend@0.1.0 | `sha512-CW8U6MLDCuyi1v+5/Nc1M/BNosH/ulPnjhTOf3ddvkNg27IuC+KNeFBCKI+LAXTZzN2ARN2uBpobSCFbQ5R46w==` |
| @antonsmolko/standards-typescript@0.1.0 | `sha512-WBl6cJ5EC0VrRcbHqqhZFL1lVHGgZhheWjVWNDNmqId+xfhrtRRcmSI73OQJCdUCYhELqnZYkBn3VveX1TEbnA==` |
| @antonsmolko/standards-svelte@0.1.0 | `sha512-94f+w1k0D+SaRXS3Czu2NuWeqdt3/kUof4Ke+z80X/0ppmp6dNEUM/kgpGKetiF36yH7tBANQnbbTl1zXe6PJA==` |
| @antonsmolko/standards-svelte-spa@0.1.0 | `sha512-gGEexiKr4Nn14dpg9HhDlXiR8UQ0sxu1t4ZsCf3qtD+NuNCMwKMm3UQZgWhPvGC+QiCPD/G4XneBRjOa9jP/7w==` |

Материалы — реальные temporary Markdown content.md/audit.md/approval.md с явной пометкой SYNTHETIC TEST ONLY, fixture revision и per-package digests; не boolean flags и не новый runtime формат. Читались непосредственно файлы/headers/bytes; решения ниже — ручные observations оператора, не автоматически выданные разрешения.

| Случай | Наблюдаемый источник | Ручной результат |
| --- | --- | --- |
| Missing accepted content | Отдельный native pack с core `Status: proposed. Level: required.` вместо accepted; заголовок прочитан прямо из tarball | STOP до publish: нет accepted core requirement; прежняя synthetic content запись не переносится на новый текст |
| Missing owner decision | В case missing-owner-decision файл content.md отсутствует | STOP: нет источника принятия |
| Missing applicability | Content records для SYNTHETIC-1…5 содержат «applicability not reviewed» | STOP: применимость owner не подтверждена |
| Missing per-artifact audit | В case missing-one-audit отсутствует строка standards-svelte, остальные четыре присутствуют | STOP: аудит одного артефакта отсутствует |
| Missing approval | В case missing-approval файл approval.md отсутствует | STOP: отдельного разрешения нет |
| Mismatched approval | В case mismatched-approval revision approval = 40 нулей, content/audit указывают fixture revision выше | STOP: revision не совпадает |
| Artifact changed after approval | В case changed-artifact копия core tarball дополнена test-only bytes, native/approved digests остались исходными | STOP: current SHA-512 отличается от одобренного |
| Complete synthetic set | Все пять inspected artifacts, matching fixture revision/plan/digests и synthetic content/applicability/audits/approval доступны | Все stop points пройдены, publish не вызывался |

Changed core SHA-512: approved `sha512-4PL0tO26Zg1CBx13L6rS0PL6+NF2UHHfqPpeGT5bshAsWgdx6fbKFRH7vYAuvPdQRr2VVmnzTQNzBrJ2oCi2jg==`, actual `sha512-Qhdf9YRtzygW/VZ//0cogXFU50pqp7D56S/DlVFu+ei8qxPW7GkQDJgK08J9aXUneHyPr2XTQpbwdjurLqEzww==`. Изменён только temporary duplicate; исходный approved каталог сохранён.

Реальные publish/tag/npm-auth/settings/credential команды не выполнялись. Partial failure/retry не симулировались: для #26 написан runbook STOP → logs/exit/package/tag state → registry integrity → same approved directory retry либо новое approval. Future npm identity/rights, native real publish-plan query, publish, tags и exact registry installs здесь не выдаются за выполненные проверки.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#35 implementation criteria](https://github.com/antonsmolko/engineering-standards/issues/35); independent review — private input, not a public basis | I1: current-state wording ещё называло PR только планом/подготовку будущей | proposal, ledger C1–C5/issue-edits, README, общий design, PR description | Исправлено | Current snapshot заменён на реализацию инструкции/fixture; исторические planning/review sections явно сохранены как история. Real publication/content approvals и #26 не объявлены выполненными. |


### Итоговая проверка #35

После minor corrections: npm run check — 48/48 на Node 26.0.0 и 26.11.1; команда записи revision и возврат в release_repo_dir выполнены, сохранённый SHA совпал с HEAD. Полный итоговый PR diff и unchanged docs/актуальные criteria #35/#20/#26 сверены: конфликтов нет. Документальные проверки приведены ниже отдельно.

[Actual GitHub run 7b13f23](https://github.com/antonsmolko/engineering-standards/actions/runs/39013364136):
[Node 26.0.0](https://github.com/antonsmolko/engineering-standards/actions/runs/39013364136/job/117340351927) и
[Node 26.11.1](https://github.com/antonsmolko/engineering-standards/actions/runs/39013364136/job/117340351836) — success.
Прочитаны реальные logs: новый native-pack/consumer test прошёл, по 48 tests / 48 pass / 0 fail,
root checks/inventory пяти реальных пакетов/PR Changesets status успешны. В logs сохранены
SHA-512 synthetic tarballs; это отдельные артефакты конкретного run, не real release approval.

Независимый агент без авторской переписки проверил полный PR diff от 495b1a1, approved artifacts,
новые runbook/test, реальные temporary rehearsal records/bytes/commands, relevant unchanged docs,
live #35/#20/#26 и все PR comments/reviews/threads. Critical/Important findings нет;
единственный Minor I1 (устаревший current-state текст) исправлен с evidence в строке выше.
Самостоятельный check reviewer на Node 26.11.1 — 48/48; оба local logs и actual jobs проверены.
Отчёт — private input, not a public basis; публичное основание — #35/#26 и approved PR #40 artifacts.
R1–R10 подтверждённо закрыты публичным повторным review и сохраняются, открытых/deferred findings нет.
После этого review изменены только wording текущего статуса и verification/task evidence;
дополнительное independent review таких wording-only исправлений по AGENTS.md не требуется.

Документальная проверка отдельно: полный final PR diff просмотрен, изменённые контракты и
источники решений сверены с unchanged documents/issue criteria/dependencies; 50 local links/anchors
в 12 документах разрешаются, strict OpenSpec/whitespace проходят. GitHub issue edits реализации:
нет. Реальные packages/версии/IDs/drafts/owner decisions/lockfile/helpers/workflow не менялись.
Новый executable файл — один TS integration test; публичная инструкция/diagnostics на английском,
описание PR и maintainer planning/ledger на русском.

Выполнено 6/6 OpenSpec tasks. #35 подтверждает подготовку процесса, не принимает содержание #20
и не выполняет real release #26. Merge/publication/tags/credential/settings changes не выполнялись.

## Review реализации 36ef9be — minor corrections

Прочитаны все страницы [summary review](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) и остальных PR comments; inline comments, reviews и GraphQL threads пусты (hasNextPage false). Reviewer подтвердил выполнение #35 и closures R1–R10; они сохранены. Изменения уточняют существующую инструкцию и сокращают текст; контракты/критерии/dependencies не меняются, GitHub issue edits отсутствуют. Повторное независимое review для этих правок не требуется по AGENTS.md и публичному вердикту reviewer.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Review, Minor 1](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R11: unused variables и revision не сохраняется | docs/publication.md | Исправлено | Revision записывается в evidence/revision; release_repo_dir используется перед consumer checks. |
| [Review, Minor 2](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R12: registry отсутствует в native plan | docs/publication.md | Исправлено | План проверяется на tag latest; registry — отдельно по step 1. |
| [Review, Minor 3](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R13: неявное локальное создание тегов | docs/publication.md | Исправлено | Явно указаны annotated local tags и отсутствие автоматического push. |
| [Review, Minor 4](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R14: лишний save-exact для file tarballs | docs/publication.md | Исправлено | Флаг удалён из локальной установки; exact registry versions в step 6 сохранены. |
| [Review, Minor 5](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R15: неверный номер/согласование PR | ledger | Исправлено | «на стадии планирования PR #40 не закрывал #35». |
| [Review, Что вырезать](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R16: исторические детали, повторные проверки и рабочий журнал | ledger | Сокращено | История заменена immutable ссылкой; дубли проверок удалены, fixture setup сведён к одному предложению. Dispositions, closures и ручные observations сохранены. |
| [Review, optional cleanup](https://github.com/antonsmolko/engineering-standards/pull/40#issuecomment-6231244984) | R17: повтор version из spread | tests/integration/publication-artifacts.test.ts | Исправлено | Лишнее присваивание удалено; значение по-прежнему берётся из source. |
