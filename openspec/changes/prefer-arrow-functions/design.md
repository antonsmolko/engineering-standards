# Design

## Scope

[Запрос #49](https://github.com/antonsmolko/gost-spec/issues/49): новые/изменяемые самостоятельные функции и callbacks в авторском TypeScript по умолчанию arrow. Generated/third-party и нетронутый код не мигрируют.

## Decisions

- TS-FUNCTIONS-001, proposed/required: обычная function syntax только при конкретной необходимости поведения или declaration contract; рядом поясняется причина. Привычка или предпочтение именованного declaration не являются основанием.
- Сохранить требуемые dynamic this/собственный arguments, генераторы, constructible contracts и требуемые function declarations для overload/ambient API. Не утверждать, что стрелки вообще не могут иметь перегруженный callable type.
- Методы объектов/классов, constructors и accessors вне требования менять синтаксис. Не заменять prototype methods arrow-полями ради соответствия. При замене standalone функций сохранять binding и initialization order.
- Manual review получает изменённые объявления и обоснования: обычная функция без конкретной причины — нарушение; неизвестная причина требует пояснения. Typecheck проверяет корректность, не соблюдение соглашения; новый lint не нужен.
- README/inventory/content-approval/handoff отражают proposed TS-FUNCTIONS-001 поверх merged #47/PR #48 (TS-TYPES-002), база 956c74b. Здесь 12 proposed/0 accepted, версии 0.1.0. Выпуск и принятие других стандартов не разрешены.
- Baseline: [TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html), [ECMAScript arrow functions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-arrow-function-definitions). Это выбор проекта, не универсальное обещание преимуществ производительности.

## Verification

Скомпилировать примеры, проверить dynamic this и generator на результатах. Выполнить полный существующий check на обеих Node, inspect TypeScript tarball и offline consumer, отдельно ссылки/OpenSpec/diff/совместимость с неизменёнными стандартами и #20/#26. Независимое review по AGENTS.md §6. Runtime не меняется, RED и новые тесты текста не нужны.
