# Tasks

Носитель [#20](https://github.com/antonsmolko/engineering-standards/issues/20), база 1e2f251, ветка feature/engineering-standards-20-content-review. Один результат — рассмотренный набор реальных стандартов с решениями владельца. Сейчас подготовлен только план: 0/4. [Design](design.md) использует существующую content-approval процедуру; спецификации механизма не меняются.

## 1. Рассмотрение текста

- [ ] 1.1 Пройти checklist по семи ID из design, проверить публичные источники и licensing, исправить только выявленные проблемы, сохранив ID/proposed. Подготовить краткий committed обзор по каждому ID: применимость, исключения, rationale/level, проверка, зависимости, рекомендуемое решение и SHA; findings записать в canonical ledger с источниками/dispositions. Согласовать inventory/README при редактуре, добавить empty changeset для unreleased package edits. Проверить ссылки, реальный pack/consumer и full check на обеих Node без тестов точной формулировки.
- [ ] 1.2 Получить независимое review полного diff, семи текстов, обзора, unchanged docs и актуальных #20/#26; ответить на все findings и исправить подтверждённые. Передать владельцу конкретный commit SHA с рекомендациями по всем ID; проверка завершена, когда dispositions закрыты и доступен полный текст для решения.

## 2. Решения и завершение

- [ ] 2.1 Получить явные owner decisions по каждому reviewed ID и exact SHA; записать публичные ссылки/источник в content-approval.md, включая deferred/rejected. Отдельным acceptance commit применить только подтверждённые статусы и согласовать decision records/README/inventory; до этого proposed сохраняется. При изменении рассмотренного текста запросить повторную оценку. Проверить соответствие ID/решений/revision и минимум одного применимого accepted ID из core/TypeScript/Svelte SPA; при недостигнутом минимуме #20 не завершать.
- [ ] 2.2 Проверить весь результат: npm run check на Node 26.0.0/26.11.1 и actual CI, состав пяти реальных tarballs и external consumer; existing accepted-header helper на установленных реальных документах ready после подтверждённого минимума. Отдельно проверить полный diff, ссылки, согласованность всех draft/accepted утверждений в current docs, решений и зависимостей #20/#26; обновить handoff/обзор evidence и независимо проверить полный итоговый результат. Версии/lockfile/runtime/credentials/settings и потребителей сохранить, publish/tag не выполнять; передать PR на явное merge approval только при закрытых findings.

## Workflow follow-up

- После merge #20 возможен только отдельно одобренный выпуск #26 по существующему runbook; принятие содержания не является release approval.
