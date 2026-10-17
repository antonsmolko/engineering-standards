# Prefer const-bound arrow functions

ID: TS-FUNCTIONS-001.

Status: proposed (draft; not approved). Level: recommended.

## Recommendation

For consistency, prefer declaring named standalone functions as
`const name = (...) => ...` rather than `function name(...)`.
This applies to asynchronous functions as well.

Function declarations and expressions remain valid choices. Their use alone
is not a violation and does not require an exception comment or special
justification. Choose the form that keeps the code clear and preserves its
behavior and typing.

## Rationale

A consistent declaration style makes related functions easier to scan and
aligns them visually with other `const` bindings. The aim is readability and
consistency; this is a style preference, not a performance guarantee.

## Applicability

Named standalone functions in authored TypeScript code, including tests.
Generated and third-party code and untouched code in unrelated changes do not
require migration.

Ordinary functions remain appropriate for APIs such as overloads or assertion
functions, and for behavior such as generators or caller-provided `this`.
Keep their syntax when it expresses the code more clearly; do not introduce
type assertions or `any` merely to use an arrow.

This recommendation does not require converting class/object methods,
constructors, getters or setters to arrow-valued fields. When changing a
function's syntax, preserve receiver binding, initialization order and its
observable contract.

## Examples

Preferred declaration style for an ordinary named helper:

```ts
const double = (value: number): number => value * 2;
```

The following alternative is also valid, shown separately:

```ts
function double(value: number): number {
  return value * 2;
}
```

## Verification

During review, suggest const-bound arrows for named standalone functions where
they keep the code clear and preserve behavior. Do not reject code solely
because it uses `function`, or require a comment justifying that syntax.

Run the project's type check and applicable behavior tests when changing
existing functions. Type checking verifies correctness, not this style
preference; no particular linter is required.

## References

- [TypeScript: more on functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
  covers function types, overloads and callback `this` parameters.
- [ECMAScript: arrow function definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-arrow-function-definitions)
  defines arrow syntax and lexical bindings.
