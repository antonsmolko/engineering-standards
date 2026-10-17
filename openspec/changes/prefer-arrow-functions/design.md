# Design

## Scope

[Запрос #49](https://github.com/antonsmolko/gost-spec/issues/49), уточнённый владельцем: рекомендовать const-bound arrow functions для единообразия именованных самостоятельных функций. Обычные function declarations/expressions допустимы без специального обоснования; это не запрет синтаксиса.

## Decisions

- TS-FUNCTIONS-001, proposed/recommended: предпочитать const name = (...) => ... для новых/изменяемых именованных самостоятельных функций, включая async. Цель — согласованное визуальное оформление и читаемость рядом с другими const bindings.
- Не требовать крайней необходимости, перечня исключений или комментария для обычной функции. Overloads, assertion functions, generators, caller-provided this и другие корректные объявления остаются допустимыми. Не принуждать к as/any ради синтаксиса.
- Методы объектов/классов, constructors и accessors не переводятся в arrow-поля ради рекомендации. При изменении синтаксиса сохраняются binding, initialization order, типизация и наблюдаемое поведение.
- Manual review получает новые/изменённые именованные самостоятельные функции; предлагает const-arrow там, где это сохраняет понятность и поведение. Само использование function не является нарушением или причиной отклонения. Generated/third-party и нетронутый код не мигрируют; callbacks не получают отдельного запрета.
- README/inventory/content-approval/handoff отражают proposed TS-FUNCTIONS-001 поверх merged #47/PR #48 (TS-TYPES-002), база 956c74b. Здесь 12 proposed/0 accepted, версии 0.1.0; принятия точного текста и разрешения выпуска нет.
- Синхронизировать критерии #49 с уточнением владельца, сохранив самостоятельный scope #49; #20/#26 не менять. Канонический ledger — PR description, прежняя обязательность явно superseded.
- Baseline: [TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html), [ECMAScript arrow functions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-arrow-function-definitions). Выбор стиля не является гарантией производительности.

## Verification

Оба иллюстративных варианта компилируются отдельно и возвращают одинаковый результат. Временными compiler fixtures проверить утверждения review о TS2322/TS2775 и корректные типизированные варианты без assertions/any; это evidence ревью, не новые постоянные тесты текста. Выполнить полный check на обеих Node с реальными tarballs/external consumers; отдельно ссылки/OpenSpec/final diff и поиск superseded обязательных формулировок. Независимое review полного результата по AGENTS.md §6; runtime не меняется.
