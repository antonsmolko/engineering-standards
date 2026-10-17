# Proposal

## Why

[Запрос #47](https://github.com/antonsmolko/gost-spec/issues/47): единообразно объявлять типы через type, сохранив interface там, где интеграции требуется declaration merging. Это согласованная конвенция проекта, а не универсальное ограничение TypeScript.

## What Changes

- Добавить proposed TS-TYPES-002 с примерами, областью действия и узким исключением.
- Обновить TypeScript README, inventory, content-approval и handoff; записать empty changeset для unreleased draft.

## Capabilities

### New Capabilities

Новых механизмов продукта нет: изменяется содержание документационного пакета, skip_specs: true.

### Modified Capabilities

Упаковка, применение пакетов и принятие содержания не меняются.

## Impact

Один результат — proposed стандарт TypeScript. Runtime, lint tooling, зависимости, версии, потребители и gost-kit не меняются. Задача самостоятельная; #20 и #26 не закрываются. Принятие точного текста требует отдельного owner decision.
