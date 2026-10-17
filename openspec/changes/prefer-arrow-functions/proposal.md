# Proposal

## Why

[Запрос #49](https://github.com/antonsmolko/gost-spec/issues/49): предпочитать const-bound arrow functions ради единообразия и читаемости. По уточнению владельца это рекомендация, обычные функции не запрещены.

## What Changes

- Добавить proposed TS-FUNCTIONS-001 уровня recommended с двумя допустимыми вариантами объявления.
- Индексировать документ в README/inventory, добавить pending content decision, обновить handoff и empty changeset.

## Capabilities

### New Capabilities

Новых механизмов продукта нет; это Markdown-содержание, skip_specs: true.

### Modified Capabilities

Упаковка, подключение и принятие содержания не меняются.

## Impact

Самостоятельная #49 и PR, отдельно от #47/PR #48 (type aliases). Уточнение владельца заменяет обязательность и exception policy внутри того же результата; критерии #49 согласуются с рекомендацией. #20/#26, runtime, зависимости, lint tooling, версии и потребители не меняются. Статус proposed до отдельного принятия точного текста.
