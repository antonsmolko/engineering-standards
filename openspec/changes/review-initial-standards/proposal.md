# Proposal

## Why

Техническая платформа завершена merge [PR #40](https://github.com/antonsmolko/engineering-standards/pull/40), [#35](https://github.com/antonsmolko/engineering-standards/issues/35) закрыта. Следующий результат [#20](https://github.com/antonsmolko/engineering-standards/issues/20) — понятные и применимые реальные стандарты core, TypeScript и Svelte SPA с явными решениями владельца.

## What Changes

- Рассмотреть семь существующих требований по [content approval](../../../docs/architecture/content-approval.md), при необходимости исправить текст, сохраняя ID и proposed до решения владельца.
- Предоставить владельцу краткие рекомендации по каждому ID с применимостью, исключениями и проверенной ревизией; независимо проверить полный результат.
- После явных решений отдельным acceptance commit согласовать статусы, README, inventory и таблицу решений. Для завершения #20 нужен минимум один применимый accepted ID в каждом из трёх пакетов; кандидаты не предрешают решения.

## Capabilities

### New Capabilities

Нет. Документальный этап использует существующую процедуру принятия; новые механизмы и спецификации продукта не вводятся (`skip_specs: true`).

### Modified Capabilities

Нет. Контракты упаковки, ручного подключения и выпуска сохраняются. Проверяются и редактируются сами тексты стандартов, а не механизм их распространения.

## Impact

Носитель #20; ветка feature/engineering-standards-20-content-review от 1e2f251. Семь Markdown-стандартов, их три README, maintainer inventory/content decisions/handoff и штатный changeset при изменении packages. Frontend/Svelte seeds остаются drafts; #24/#25 — backlog. Runtime, зависимости, CI, реальные версии 0.1.0, потребители и выпуск #26 не входят в работу. Этот PR сначала содержит только план, 0/4 implementation tasks; утверждение плана не принимает тексты.
