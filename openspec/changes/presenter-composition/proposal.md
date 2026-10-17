# Proposal

## Why

Владелец принёс примеры вычислений в Svelte-компонентах и поручил оформить согласованный подход в стандартах: [#42](https://github.com/antonsmolko/engineering-standards/issues/42). Текущий PR #41 заменяет неутверждённый план массового ревью одной конкретной документальной правкой.

## What Changes

- Добавить proposed FRONTEND-ARCH-002: чистые функции, связанные группы, независимые вычисления и их композиция; простым компонентам presenter не обязателен.
- Индексировать документ, обновить inventory/передачу контекста и удалить пять временных примеров владельца.

## Capabilities

### New Capabilities

Нет новых механизмов продукта. Это содержание Markdown-пакета; `skip_specs: true`.

### Modified Capabilities

Нет изменений упаковки/подключения/принятия. Существующий контракт документов сохраняется.

## Impact

Носитель #20, owner-requested addition #42, ветка/prefix engineering-standards-20 сохранены. Критерии и closure #20 не меняются. Только frontend-документ, README, maintainer inventory/handoff, empty changeset и удаление временных файлов; версии/runtime/зависимости/публикация сохраняются. Старый planning-only change review-initial-standards удаляется из PR как отозванный, не как выполненный. Точная английская формулировка остаётся proposed до отдельного content decision.
