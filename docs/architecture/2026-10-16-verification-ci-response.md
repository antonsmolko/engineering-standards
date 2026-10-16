# Verification CI — #18

Носитель — [#18](https://github.com/antonsmolko/engineering-standards/issues/18), prefix engineering-standards-18. База 3372e96 после merge [PR #38](https://github.com/antonsmolko/engineering-standards/pull/38); #33/#34 завершены. Текущий change documentation-verification-ci содержит только planning artifacts; шесть implementation tasks открыты после review PR #39, CI ещё не реализован.

## Источники и статус прежних замечаний

Прочитаны body и все шесть comments #18, актуальные roadmap/tooling design/handoff, content-approval/inventory, scripts/tests и #1/#35/#20/#26. Исторические [base/history findings](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131102884) исправлены в требованиях; [повторное review](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131370870) подтвердило закрытие. Замечание о якобы отсутствовавшей ссылке было [отозвано reviewer](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131555963) и не переоткрывается. Старые candidate/CLI/config механизмы не возвращаются: актуальные границы определены #30/PR #31, #32/PR #36 и нынешними criteria #18.

Baseline — [GitHub Node.js starter](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml), [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use), [Changesets CLI](https://changesets.dev/guide/cli). Releases/tag commits для checkout v7.0.1 и setup-node v7.1.0 проверены через upstream GitHub API; полные SHA записаны в design. Первоначальный обязательный actionlint исключён по review PR #39; штатная workflow validation выполняется GitHub. Собственный workflow runner/release engine/каталог не планируются.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18), [PR #38](https://github.com/antonsmolko/engineering-standards/pull/38) | C1: существующие проверки должны работать в CI | proposal/design/spec/tasks | Запланировано | Один read-only workflow на двух Node, npm ci/check/pack, прежние real consumer tests; actual GitHub jobs обязательны для завершения реализации. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18) | C2: Changesets нужны base/history и понятный отказ | design/spec/tasks | Запланировано | Full checkout, PR base SHA через env, штатные event if и CLI status без preflight/parser; upstream отказ подтверждён на temporary npm/Git project. Push main читает pending changesets. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18), [content decisions](https://github.com/antonsmolko/engineering-standards/blob/3372e96/docs/architecture/content-approval.md) | C3: artifact prerequisite не принимает реальные документы | design/spec/tasks | Запланировано | Helper читает ID/Status установленных пакетов, positive/negative synthetic headers и not-ready реальных tarballs. Применимость/подтверждение решений остаются owner gates #20/#35/#26; новый record format не вводится. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18) | C4: минимальные права, guidance и manual material audit | design/spec/tasks | Запланировано | Нет publish/tag/секретов/write permissions; contributor/security/ownership docs, существующие artifact checks и отдельный ручной аудит #26. |

## GitHub issue edits

В #1 отмечена завершённая #34 после проверки merged PR #38/closed issue. Criteria/dependencies #18/#35/#20/#26 не менялись; #18 открыта, закрытая #9 не переоткрывается. Планы будущих этапов остаются требованиями, их механизмы не выбираются в #18.

## Первоначальные проверки планирования 35ca524

Strict OpenSpec validation и whitespace проходят. Runtime suite/Actions jobs не запускались в planning-only изменении; прежние 33/33 из PR #38 не выдаются за evidence CI #18. Пакеты, metadata/lockfile, owner decisions и черновые статусы не менялись. Независимое review полного планирования завершено до передачи draft PR; actionable findings отсутствуют.

## Первоначальное независимое review плана 35ca524

Отдельный агент без авторской рабочей переписки прочитал все четыре artifacts, обновлённый handoff/ledger, текущий check/test код, все шесть comments #18 и критерии #1/#35/#20/#26. Подтвердил базу/merge PR #38/closed #33/#34, upstream Action SHAs и release actionlint. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичные actionable основания — #18 и официальные источники выше. Уточнение выбора PR/push режима по event type сохраняет уже заявленный отказ при missing PR base.

Документальное evidence отдельно: 11 links/anchors в шести документах разрешаются; очередность зависимостей, прежние reviewer-confirmed closures, content/release gates и issue criteria сохранены. Проверок runtime или реальных jobs на planning этапе нет; обязательность RED/GREEN/full suite/actionlint/actual jobs остаётся в tasks. Реализация 0/7. После review обновлена только эта запись evidence.

## Review PR #39 — пересмотр плана

Прочитаны все страницы inline comments/reviews/PR comments, все шесть issue #18 comments и GraphQL reviewThreads: один новый [review 35ca524](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695), inline threads/summary reviews отсутствуют. Подтверждённые корректные Action SHA/permissions/scope и прежние closures #18 сохраняются. Новое публичное evidence выявило слабость synthetic-only predicate и избыточный Git/YAML механизм первоначального плана; эти части заменены, прежнее независимое review не используется для их повторного объявления корректными.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Review, Important 1](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695) | R1: synthetic record helper не связан с артефактами | proposal/design/spec/tasks, ledger/PR | Исправлено в плане | Корни установленных пакетов → реальные ID/Status headers. Synthetic fixture files дают positive/negative; тот же helper на настоящих tarballs в document-artifacts.test.js даёт ожидаемый not-ready. Applicability field удалено: применимость/owner decision подтверждает владелец в #26. Нет нового каталога или формата решений. |
| [Review, Important 2](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695) | R2: не назван новый contributor contract | design/spec/tasks | Исправлено в плане | Добавлен scenario package edit without changeset → nonzero и add --empty для no-release change; обновление .changeset/README.md явно входит в task 2.2. Local fixture с package-lock подтвердил статусы 1 без changeset и 0 после committed empty changeset. |
| [Review, Important 3](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695) | R3: собственный preflight/YAML runner дублирует CLI | design/spec/tasks, ledger/PR | Исправлено в плане | Удалены git cat-file/merge-base preflight, direct yaml dependency и run-step parser/test. Event step if выбирает прямой npm Changesets status; missing-ref fixture дал штатный exit 1 с divergence diagnostic. Предварительный отказ «до status» больше не обещается. |
| [Review, Minor 4](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695) | R4: actionlint не обязателен и способ запуска не определён | design/tasks, ledger/PR | Исправлено в плане | Обязательный actionlint исключён, ни binary installer, ни дополнительный CI action не добавляются; фактические GitHub jobs/validation и review остаются обязательны. |
| [Review, Minor 5](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224723695) | R5: расплывчатые documentation targets и смысл dry-run inventory | design/spec/tasks | Исправлено в плане | Указаны docs/superpowers/specs/2026-10-11-engist-monorepo-tooling-design.md, content-approval.md и .changeset/README.md. Inventory только выводится в log; содержимое проверяют существующие installed-artifact tests. |

### GitHub issue edits этого раунда

Нет. Критерии #18 и зависимости #35/#20/#26 сохраняются; scope — technical verification/accepted-header prerequisite и отдельное ручное подтверждение применимости/owner decisions перед выпуском. Handoff по-прежнему указывает planning-only #18. Публичные package files, версии, draft labels, decision table и working dependency lockfile не менялись.

### Проверка upstream evidence

Прочитан фактически установленный Changesets 3.0.3 status/getDivergedCommit и официальная CLI documentation. Во временном npm workspace с lockfile и Git base проверены: missing SHA → exit 1 с divergence diagnostic; committed package README edit без changeset → exit 1 с no-changesets diagnostic; committed add --empty → exit 0. Fixtures удалены; команды не писали в registry и не меняли рабочий checkout. Это проверка обоснования плана, не реализация/CI evidence #18. Полный runtime suite и Actions jobs в этом planning-only раунде не запускались.

### Независимое review пересмотренного результата

Отдельный агент без авторской рабочей переписки проверил полный итоговый PR diff, R1–R5, связанные неизменённые документы и публичные #18/#35/#20/#26, все comments/reviews PR и шесть comments #18. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичное основание правок — review PR #39 и criteria #18 выше. Прежние подтверждённые closures сохраняются, новых незакрытых findings нет.

Документальное evidence отдельно: strict OpenSpec/whitespace проходят; 11 links/anchors в шести документах разрешаются, зависимости и approvals согласованы. GitHub issue edits этого раунда отсутствуют. Runtime/Actions не запускались: 0/6 implementation tasks, пакеты/скрипты/тесты/зависимости рабочего repo не менялись. Временное upstream исследование описано отдельно выше и не выдаётся за готовый CI. После независимого review изменена только эта запись evidence; draft ожидает утверждения плана/apply.

## Повторное review d0a3031

Прочитаны все страницы PR comments, inline comments/reviews/GraphQL threads и шесть comments #18. Новый [summary d0a3031](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224882236) подтвердил закрытие R1–R5 и отсутствие блокеров; подтверждённые closures сохраняются. Два необязательных предложения приняты ниже.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Repeat review, push-main](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224882236) | R6: роль push-main status не названа точно | design/spec/tasks, PR | Исправлено в плане | Явно указано: чтение config и сборка pending-плана. На main HEAD=baseBranch; контроль package edits без changeset выполняется PR-шагом. Проверено по установленному Changesets versionablePackages/status: ref по умолчанию config.baseBranch. |
| [Repeat review, optional I/O scenario](https://github.com/antonsmolko/engineering-standards/pull/39#issuecomment-6224882236) | R7: избыточный контракт недоступных данных | design/spec/tasks | Исправлено в плане | Удалены отдельный scenario «Недоступные данные», обещание custom not-ready I/O diagnostics и обязательный negative-кейс task 1.1. Проверки missing package/ID/status и реальные not-ready черновики сохранены; новый I/O wrapper не планируется. |

GitHub issue edits этого раунда: нет. Критерии/зависимости #18/#35/#20/#26, handoff и отдельные content/applicability/release approvals сохраняются. Реализация 0/6; пакеты/версии/документы/owner decisions и runtime не менялись.

Независимый агент без авторской рабочей переписки проверил полный PR diff с R6/R7, публичные reviews/comments, связанные неизменённые документы и criteria/dependencies #18/#35/#20/#26. Actionable findings отсутствуют; R1–R5 остаются закрытыми. Отчёт — private input, not a public basis; публичное основание — repeat review выше и criteria #18.

Документальная проверка отдельно: strict OpenSpec и whitespace проходят, 11 local links/anchors в шести документах разрешаются; полный итоговый diff и неизменённые документы/issues не выявили конфликтов контрактов или зависимостей. Runtime suite/Actions не запускались в этом planning-only раунде; все шесть implementation tasks остаются открытыми. После независимого review добавлено только это evidence.
