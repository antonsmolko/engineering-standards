# Verification CI — #18

Носитель — [#18](https://github.com/antonsmolko/engineering-standards/issues/18), prefix engineering-standards-18. База 3372e96 после merge [PR #38](https://github.com/antonsmolko/engineering-standards/pull/38); #33/#34 завершены. Текущий change documentation-verification-ci содержит только planning artifacts; семь implementation tasks открыты, CI ещё не реализован.

## Источники и статус прежних замечаний

Прочитаны body и все шесть comments #18, актуальные roadmap/tooling design/handoff, content-approval/inventory, scripts/tests и #1/#35/#20/#26. Исторические [base/history findings](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131102884) исправлены в требованиях; [повторное review](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131370870) подтвердило закрытие. Замечание о якобы отсутствовавшей ссылке было [отозвано reviewer](https://github.com/antonsmolko/engineering-standards/issues/18#issuecomment-6131555963) и не переоткрывается. Старые candidate/CLI/config механизмы не возвращаются: актуальные границы определены #30/PR #31, #32/PR #36 и нынешними criteria #18.

Baseline — [GitHub Node.js starter](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml), [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [GitHub secure use](https://docs.github.com/en/actions/reference/security/secure-use), [Changesets CLI](https://changesets.dev/guide/cli). Releases/tag commits для checkout v7.0.1 и setup-node v7.1.0 проверены через upstream GitHub API; полные SHA записаны в design. Выбран actionlint v1.7.12 для проверки workflow при реализации. Собственный workflow runner/release engine/каталог не планируются.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18), [PR #38](https://github.com/antonsmolko/engineering-standards/pull/38) | C1: существующие проверки должны работать в CI | proposal/design/spec/tasks | Запланировано | Один read-only workflow на двух Node, npm ci/check/pack, прежние real consumer tests; actual GitHub jobs обязательны для завершения реализации. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18) | C2: Changesets нужны base/history и понятный отказ | design/spec/tasks | Запланировано | Full checkout, PR base SHA через env, commit/merge-base preflight; реальные run-step commands проверяются в temporary Git project. Push main читает pending changesets. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18), [content decisions](https://github.com/antonsmolko/engineering-standards/blob/3372e96/docs/architecture/content-approval.md) | C3: synthetic content prerequisite не принимает реальные документы | design/spec/tasks | Запланировано | Test-only read-only helper на synthetic accepted/applicable IDs трёх пакетов, positive/negative cases; production approval parsing/publish enforcement остаются #35/#20/#26. Technical verify не требует accepted нынешних черновиков. |
| [#18](https://github.com/antonsmolko/engineering-standards/issues/18) | C4: минимальные права, guidance и manual material audit | design/spec/tasks | Запланировано | Нет publish/tag/секретов/write permissions; contributor/security/ownership docs, существующие artifact checks и отдельный ручной аудит #26. |

## GitHub issue edits

В #1 отмечена завершённая #34 после проверки merged PR #38/closed issue. Criteria/dependencies #18/#35/#20/#26 не менялись; #18 открыта, закрытая #9 не переоткрывается. Планы будущих этапов остаются требованиями, их механизмы не выбираются в #18.

## Проверки планирования

Strict OpenSpec validation и whitespace проходят. Runtime suite/Actions jobs не запускались в planning-only изменении; прежние 33/33 из PR #38 не выдаются за evidence CI #18. Пакеты, metadata/lockfile, owner decisions и черновые статусы не менялись. Независимое review полного планирования завершено до передачи draft PR; actionable findings отсутствуют.

## Независимое review плана

Отдельный агент без авторской рабочей переписки прочитал все четыре artifacts, обновлённый handoff/ledger, текущий check/test код, все шесть comments #18 и критерии #1/#35/#20/#26. Подтвердил базу/merge PR #38/closed #33/#34, upstream Action SHAs и release actionlint. Actionable findings отсутствуют. Отчёт — private input, not a public basis; публичные actionable основания — #18 и официальные источники выше. Уточнение выбора PR/push режима по event type сохраняет уже заявленный отказ при missing PR base.

Документальное evidence отдельно: 11 links/anchors в шести документах разрешаются; очередность зависимостей, прежние reviewer-confirmed closures, content/release gates и issue criteria сохранены. Проверок runtime или реальных jobs на planning этапе нет; обязательность RED/GREEN/full suite/actionlint/actual jobs остаётся в tasks. Реализация 0/7. После review обновлена только эта запись evidence.
