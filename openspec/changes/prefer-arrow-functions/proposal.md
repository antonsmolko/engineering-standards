# Proposal

## Why

[Запрос #49](https://github.com/antonsmolko/gost-spec/issues/49): предпочитать arrow functions, оставляя обычные функции только при конкретной необходимости. Это соглашение TypeScript-пакета для единообразия кода.

## What Changes

- Добавить proposed TS-FUNCTIONS-001 с примерами, проверкой и семантическими исключениями.
- Индексировать документ в README/inventory, добавить pending content decision, обновить handoff и empty changeset.

## Capabilities

### New Capabilities

Новых механизмов продукта нет; это Markdown-содержание, skip_specs: true.

### Modified Capabilities

Упаковка, подключение и принятие содержания не меняются.

## Impact

Самостоятельная #49 и PR, отдельно от #47/PR #48 (type aliases); критерии #47/#20/#26 сохраняются. Runtime, зависимости, lint tooling, версии и потребители не меняются. Статус proposed до отдельного принятия точного текста.
