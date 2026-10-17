# Manual publication preparation — #35

Носитель — [#35](https://github.com/antonsmolko/engineering-standards/issues/35), prefix engineering-standards-35. База 495b1a1 после merge [PR #39](https://github.com/antonsmolko/engineering-standards/pull/39); #18 закрыта. Change [manual-publication-preparation](../../openspec/changes/manual-publication-preparation/proposal.md) содержит только planning artifacts; все шесть implementation tasks открыты.

## Прочитанные источники и прежние closures

Прочитаны #35 body/comments (comments отсутствуют), #26/#20 criteria/dependencies, #1 roadmap, актуальные handoff/design/tooling/content-approval, Changesets guide, установленный CLI и текущие tests/workflow. Публичное [review #39](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6225246610) подтвердило #18 и R1–R7; minor R8/R9 исправлены до merge, R10 informational не требовало изменения настроек. Подтверждённые closures сохраняются, старые release-engine механизмы не возвращаются.

Owner выбрал ручной выпуск по инструкции в рабочем диалоге 2026-10-17 — private input, not a public basis для findings; публичное основание — criteria #35/#26. Поэтому manual stop/rehearsal observations и automated artifact tests в плане различаются. CLI/CI не объявляются enforcement человеческих решений; новые approval flags/schema/API не вводятся.

Baseline: [Changesets CLI](https://changesets.dev/guide/cli), maintained [publish example](https://github.com/changesets/changesets/blob/main/.github/workflows/publish.yml), [pack tests](https://github.com/changesets/changesets/blob/main/packages/cli/src/commands/pack/__tests__/index.test.ts), [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish/). В установленном CLI 3.0.3 прочитаны pack/publish-plan/publish/getPublishPlan: native pack записывает tarball integrity; publish from-pack-dir сам её не сверяет. Design требует ручного hash comparison, а не приписывает upstream отсутствующую проверку.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#35 upstream criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C1: поддерживаемый процесс без собственного release engine | proposal/design/spec/tasks | Запланировано | Штатные version/publish-plan/pack/from-pack-dir из одного закреплённого CLI; нет нового workflow/approval API/каталога. |
| [#35 synthetic denial criterion](https://github.com/antonsmolko/engineering-standards/issues/35), [#26 gates](https://github.com/antonsmolko/engineering-standards/issues/26) | C2: отсутствие содержания/аудита/конкретного approval останавливает выпуск | design/spec/tasks | Запланировано как ручная проверка | Оператор выполняет test-only negative/positive walkthrough, фиксирует STOP до publish/tag, missing source и changed artifact. Автоматические tests отдельно проверяют реальные tarballs/headers/dry-run. Synthetic records не заменяют owner decisions; обход прямым npm доступом не объявляется технически запрещённым. |
| [#35 no-release criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C3: никаких настоящих registry writes/tags/bumps | design/spec/tasks | Запланировано | Synthetic temporary workspaces/native plan, isolated config/cache/closed registry для dry-run, реальные publish/version/tag commands в #35 не вызываются; packages 0.1.0/drafts/owner decisions сохраняются. |
| [#35 evidence criterion](https://github.com/antonsmolko/engineering-standards/issues/35), [#26](https://github.com/antonsmolko/engineering-standards/issues/26) | C4: npm rights, partial failure и exact registry installs | design/spec/tasks | Запланировано | Runbook сохраняет provenance/hashes/approval/audits/logs и per-package/tag state; E404 не доказывает scope rights, unknown result → STOP. Recovery simulation помечена; actual registry installs/failure/retry остаются #26. |
| [#35 verification criterion](https://github.com/antonsmolko/engineering-standards/issues/35) | C5: обе Node и независимое review | tasks | Запланировано | Полный check/matrix и final independent review обязательны в реализации; текущий PR только план, 0/6. |

## GitHub issue edits

В #1 отмечена выполненная #18 после проверки merged #39/closed #18. Criteria/dependencies #35/#20/#26 не менялись, все три задачи открыты; #35 не закрывается planning PR. Контакты, credentials/protection/settings и real release approval не менялись.

## Upstream research, отдельно от реализации

Во временном disposable synthetic workspace проверен установленный CLI 3.0.3: native v1 fixture plan → changeset pack → настоящий tarball и enriched native plan с integrity; npm publish tarball --dry-run --ignore-scripts с изолированным config/cache и registry 127.0.0.1:9 с fetch-retries=0/fetch-timeout=1000 дал exit 0. Первоначальный dry-run истёк по timeout из-за metadata retries; установленный npm publish source показал чтение registry versions даже в dry-run. После ограничения retries/timeouts baseline повторно проверен. Exit 0 dry-run не доказывает availability/rights (это явно остаётся #26). Fixture использует synthetic package name и не использует credentials, real changeset publish, git tag/changeset version или рабочие пакеты. Это проверка исполнимости baseline, не выполненные tests/ручные проверки #35 и не разрешение реального выпуска. Temporary fixture удалён.

## Проверка полного планирования

Независимый агент без авторской рабочей переписки проверил полный staged diff, proposal/design/spec/tasks, актуальные #35/#20/#26/#1, relevant unchanged docs, установленный CLI и official baselines. Actionable findings отсутствуют. Confirmed closures и критерии/зависимости сохранены; manual gates/artifact binding/partial failure и границы synthetic/actual evidence согласованы. Отчёт — private input, not a public basis; публичные actionable основания — criteria #35/#26 и upstream links выше.

Документальные проверки отдельно: strict OpenSpec validation и whitespace проходят, 17 local links/anchors в шести документах разрешаются; полный final diff просмотрен, конфликты с неизменёнными документами/issue bodies не найдены. После независимого review добавлена только эта запись evidence. Пакеты/версии/документы/owner decisions/lockfile/scripts/tests/workflow не менялись. Runtime suite и Actions completion #35 не заявляются: выполнено 0/6 implementation tasks. Upstream smoke research описано отдельно и не заменяет будущие automatic/manual rehearsals. План готов к утверждению; apply/merge/publish не выполнялись.
