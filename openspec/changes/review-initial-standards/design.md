# Design

## Context

Основание — [proposal](proposal.md) и [#20](https://github.com/antonsmolko/engineering-standards/issues/20). База 1e2f251 после merge #40. В выбранных пакетах семь proposed документов; frontend/Svelte seeds дают ещё два, вне этого ревью. Публикации и принятых требований нет. Это ограниченная редакторская работа по существующей [процедуре](../../../docs/architecture/content-approval.md), не новый subsystem.

## Goals / Non-Goals

**Goals:** получить применимые тексты и решения по каждому рассмотренному ID, затем согласовать видимые статусы с решениями. Условия завершения определены #20.

**Non-Goals:** новые стандарты/модули, правила конкретного продукта, конфиги, CLI, автоматизация принятия, публикация и изменение версий. Не переносить требования AGENTS.md этого репозитория в универсальные стандарты без содержательного основания.

## Decisions

### Один обзор существующего набора

Рассмотреть весь текущий набор, без отдельных задач/PR на каждый документ:

| ID | Документ | Основной вопрос ревью |
| --- | --- | --- |
| CORE-ARCH-001 | [Public contracts](../../../packages/core/architecture/public-contract.md) | Публичная граница без лишних обёрток и обязательной схемы слоёв |
| CORE-WORKFLOW-001 | [Acceptance evidence](../../../packages/core/workflow/acceptance-evidence.md) | Соразмерные проверки, отдельно от автоматизации проверки человеческого текста |
| CORE-WORKFLOW-002 | [Review decisions](../../../packages/core/workflow/review-decisions.md) | Понятные review/solo условия без обязательного инструмента |
| CORE-SECURITY-001 | [Published materials](../../../packages/core/security/published-materials.md) | Действительные артефакты, права распространения и исключение публичных не-секретов |
| TS-TYPES-001 | [Runtime boundaries](../../../packages/technologies/typescript/docs/runtime-boundaries.md) | Граница доверия, нужные ограничения и обработанный отказ без повторного парсинга везде |
| TS-CONFIG-001 | [Strict checking](../../../packages/technologies/typescript/docs/strict-checking.md) | Эффективная конфигурация и соразмерность проверки без лишней инфраструктуры |
| SVELTE-SPA-ARCH-001 | [Module boundaries](../../../packages/stacks/frontend/svelte-spa/docs/module-boundaries.md) | Явный выбор FSD, исключения и актуальное описание ручной проверки без удалённого Engist |

Checklist content-approval применяется к каждому ID: смысл, область, применимость/исключения, rationale/level, проверяемость, зависимости, публичные источники/лицензии. Править только выявленные проблемы. Минимальные кандидаты — CORE-ARCH-001, TS-TYPES-001, SVELTE-SPA-ARCH-001; остальные можно принять, доработать или отложить. Новая система/формат review не нужны: краткий committed обзор с источниками и dispositions служит canonical ledger.

### Текст сначала, acceptance отдельно

Входы — тексты конкретного commit SHA, checklist и публичные решения владельца по ID. Авторский обзор, independent review, одобрение плана и общий запрос продолжить не являются content acceptance. До решения все статусы proposed. Перед передачей владельцу независимо проверить полный результат и записать рекомендации по каждому ID, применимость и ограничения.

Успех acceptance — явное решение владельца со ссылкой и SHA именно рассмотренного текста, записанное в content-approval.md для каждого reviewed ID, включая deferred/rejected. При решении в рабочем диалоге ответить в PR с точными ID/SHA и ссылаться на эту запись, явно обозначив источник; не выдавать авторскую запись за независимое решение. Неясное/недоступное решение или изменённый после review текст сохраняет proposed до уточнения/повторного review. Для deferred/rejected сохранить ID и непринятый draft без назначения неподдерживаемого статуса.

Отдельный acceptance commit меняет только подтверждённые статусы и соответствующие decision records/README/inventory. README перечисляет принятые и оставшиеся drafts без blanket approval; applicability и совместимость сохраняются. В #20 для завершения нужен accepted применимый ID из каждого из трёх пакетов. Если владелец их не принимает, записать исход и оставить #20 незавершённой: новый ID не придумывается ради gate.

### Существующие проверки

При package edits добавить штатный Changesets record по [.changeset guide](../../../.changeset/README.md): для этого первого unreleased content review использовать empty changeset, сохраняя версии 0.1.0; это запись no-release, не публикация. Версионная подготовка требует отдельного разрешения. Проверки на обеих Node — existing npm run check и CI, реальные packed inventories и external consumers. Дополнительно запустить существующий checkAcceptedHeaders на установленных реальных tarballs: до acceptance ожидается not-ready; после подтверждённых трёх областей — ready. Он подтверждает заголовки, а не смысл, применимость или owner decision. Новых runtime tests/helper/CI gates не добавлять; содержание проверять вручную, ссылки и зависимости — отдельно.

## Risks / Trade-offs

- Слишком широкое правило → сузить применимость/исключения или рекомендовать deferred; не добавлять tooling.
- Потеря решения при правках → связывать ID с проверенной ревизией, изменённый текст переоценивать.
- Green checks воспринимаются как принятие → отдельные owner decisions/acceptance commit; content gate не заменяет audit и approval выпуска #26.

## Migration Plan

В одном PR #20: review/редактура proposed → explicit owner decisions → отдельный acceptance commit → окончательная проверка и handoff. Rollback — отмена соответствующего документального commit и согласование records, без registry effects. Независимые версии, пути и ID сохраняются; потребители не меняются.
