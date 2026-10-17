# Design

## Scope

Реализовать согласованный в чате запрос [#47](https://github.com/antonsmolko/gost-spec/issues/47). Документ принадлежит TypeScript, применяется к авторским объявлениям, включая тесты и authored declaration files; сторонние и сгенерированные файлы исключены.

## Decisions

- TS-TYPES-002: новые/изменяемые авторские именованные типы объявляются через type, даже для объектов. Не требовать аннотаций каждого значения и переписывания нетронутого кода.
- Interface допустим только для требуемого declaration merging, например module/global augmentation. Причина исключения должна быть указана рядом; использование типа сторонней библиотеки не требует его переписывания. Обычная композиция объектов сама по себе не является исключением.
- Это правило единообразия, не обещание улучшения runtime, производительности компилятора или безопасности типов. Baseline — [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) и [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
- Вход manual review — новые/изменённые авторские объявления и обоснования исключений. Соответствие: type либо interface с необходимым merging. Нарушение: обычный interface без этого основания. При неясном основании запросить пояснение до принятия; typecheck не проверяет эту конвенцию. Автоматический lint не добавляется.
- Статус proposed, уровень required после принятия. Новый ID не заменяет TS-TYPES-001/TS-CONFIG-001; content decisions и release gates сохраняются. Никаких приватных источников.
- README, inventory, pending row content-approval и handoff индексируют один новый текст. В #1 убрать хрупкий точный счётчик, сохранив proposed/accepted 0; критерии #20/#26 не редактировать. Версии 0.1.0 сохраняются, empty changeset соответствует политике первого unreleased набора.

## Verification

Manual review полного английского текста и границ исключения; компиляция корректных примеров штатным TypeScript. Полный npm check на обеих Node с реальными tarballs/external consumers; отдельно осмотреть установленный TypeScript README/документ, ссылки, весь diff и неизменённые content/release документы. Независимое review по AGENTS.md §6. Runtime не меняется — новые behavior tests/RED не требуются.
