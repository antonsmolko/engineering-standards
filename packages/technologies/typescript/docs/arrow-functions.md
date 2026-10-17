# Prefer arrow functions

ID: TS-FUNCTIONS-001.

Status: proposed (draft; not approved). Level: required.

## Requirement

New or modified standalone functions and callbacks in authored TypeScript code
MUST use arrow functions by default, including asynchronous functions.

Use an ordinary function declaration or expression only when a concrete
behavioral requirement or declaration contract requires it. Explain the reason
in a nearby comment. Habit or a preference for declaration syntax is not a
sufficient reason.

## Rationale

A consistent default reduces stylistic decisions. Arrow functions capture the
surrounding `this`; ordinary functions can provide a receiver determined by
their caller. Those forms are not interchangeable in every integration.
This is a project convention, not a performance guarantee.

## Applicability and exceptions

This rule covers authored TypeScript implementations, including tests.
Generated and third-party code, and untouched code in unrelated changes,
do not require migration.

Keep ordinary function syntax when required for:

- A callback contract that needs dynamic `this` or the function's own
  `arguments` object.
- A generator or an existing contract that requires a constructible function.
- Required function declarations, such as ambient API declarations or overload
  declarations retained for an integration's API.

Overloads are not categorically incompatible with arrows: a callable type can
have multiple signatures. An overload exception must identify why function
declarations are needed for that contract.

Class and object method syntax, constructors, getters and setters are outside
this syntax preference. Do not convert prototype methods to arrow-valued
instance fields merely to follow it. When changing a standalone function,
preserve binding, its observable contract and initialization order; do not
perform a mechanical replacement that changes behavior.

This rule does not prescribe concise versus block bodies, an asynchronous
error-handling policy, a framework, or a new lint configuration.

## Examples

Use arrows for ordinary helpers and callbacks:

```ts
const double = (value: number): number => value * 2;
const doubled = [1, 2, 3].map((value) => double(value));
```

Keep an ordinary function when the caller supplies its receiver:

```ts
// The caller supplies this via call; an arrow would capture lexical this.
function readLabel(this: { label: string }): string {
  return this.label;
}

const label = readLabel.call({ label: 'Ready' });
```

Generators also require their own syntax:

```ts
// A generator yields values lazily; arrow syntax cannot express it.
function* countUpTo(limit: number): Generator<number, void, unknown> {
  for (let value = 0; value < limit; value += 1) {
    yield value;
  }
}
```

## Verification

Review changed standalone functions and callbacks. Arrows satisfy the default;
ordinary functions need a concrete semantic or declaration requirement explained
nearby. Request clarification if that requirement is unclear. Check that any
conversion preserves receiver behavior and initialization order.

Run the project's type check and applicable behavior tests. Type checking alone
does not enforce this convention; no particular linter is required.

## References

- [TypeScript: more on functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
  covers overloads, construct signatures and callback `this` parameters.
- [ECMAScript: arrow function definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-arrow-function-definitions)
  defines arrow syntax and lexical bindings.
