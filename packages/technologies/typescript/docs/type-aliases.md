# Use type aliases for authored types

ID: TS-TYPES-002.

Status: proposed (draft; not approved). Level: required.

## Requirement

New or modified named type declarations in authored TypeScript code MUST use
`type` rather than `interface`, including declarations of object shapes.

An `interface` declaration MAY be used when an integration requires declaration
merging, including module or global augmentation. This includes public
interfaces designed for consumers to augment; preserve those interfaces under
this exception. Document the merging requirement in a nearby comment. Ordinary
object composition is not a reason for this exception.

## Rationale

One default declaration form keeps code and reviews consistent. Type aliases
describe object shapes, unions and other named types without changing syntax
between those cases. The TypeScript Handbook leaves the choice largely to
preference and offers an interface-first heuristic; this project chooses aliases
for consistency. This is not a claim that interfaces are unsafe or that aliases
always compile faster. Interfaces remain necessary for integrations that depend
on declaration merging.

Unlike interface extension, an intersection can combine conflicting property
types into `never` without reporting an error at the composition itself. That
trade-off requires attention to overlapping properties when composing aliases.

## Applicability

Authored TypeScript code, including tests and authored declaration files.
Generated and third-party code are outside this rule; using a dependency's
interface types does not require rewriting their declarations.

This rule does not require explicit annotations for every value, replacing
type inference, or rewriting untouched declarations as part of unrelated work.

## Examples

Use an alias for an ordinary object shape:

```ts
type User = {
  id: string;
  name: string;
};

type UserState =
  | { status: 'idle' }
  | { status: 'ready'; user: User };
```

An integration extending the browser's existing `Window` declaration is an
exception:

```ts
export {};

declare global {
  // Interface merging extends the existing Window declaration.
  interface Window {
    buildVersion?: string;
  }
}
```

This declaration describes a property; it does not create that property at
runtime. The same exception applies when a library requires module augmentation.

## Verification

Review new or modified type declarations in authored code. An ordinary named
declaration must use `type`; each `interface` must have a concrete
declaration-merging requirement explained nearby. If that requirement is
unclear, request clarification before accepting the exception.

Run the project's type check to verify declarations and augmentations remain
valid. Type checking alone does not enforce this convention. No particular
linter or automatic enforcement is required.

## References

- [TypeScript: type aliases and interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
  describes their differences; this standard selects a project convention.
- [TypeScript: declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
  explains interface merging and module/global augmentation.
- [TypeScript: interface extension vs. intersection](https://www.typescriptlang.org/docs/handbook/2/objects.html#interface-extension-vs-intersection)
  explains the different handling of conflicting properties.
