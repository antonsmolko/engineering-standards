# Compose pure presentation calculations

ID: FRONTEND-ARCH-002.

Status: proposed (draft; not approved). Level: required.

## Requirement

When presentation calculations need testing separately from a component, extract
them into pure functions with explicit inputs. These functions MUST NOT mutate
their inputs, access application stores through hidden dependencies or perform
effects. Pass any context that influences the result, such as locale, explicitly.
The same inputs MUST produce the same result.

Group related calculations when they share meaningful intermediate work or form
a cohesive result. Independent calculations may remain separate functions,
each receiving only the data it needs. A presenter may combine both forms.
A shared component or screen alone is not a reason to group calculations.

A combining presenter calls the smaller functions; those functions MUST NOT
depend on the combining presenter or the component. Keep reactive bindings and
effect execution in the component or an adapter. A presenter MUST NOT become a
second owner of application state.

## Rationale

Pure calculations can be tested with ordinary input/output assertions without
mounting a UI. Grouping shared work avoids duplication; separate calculations
make independent dependencies visible. Composition allows both without imposing
one large function or one function per displayed field.

## Applicability

Frontend presentation calculations whose branches, transformations or reuse
benefit from separate tests. Simple expressions may stay in a component;
a presenter is not mandatory for every component. DOM access, event wiring and
local interaction state can remain in the UI.

Inputs follow an explicit application contract. Validation of untrusted data
and domain decisions retain their own boundaries; this rule does not move them
into presentation code.

No UI framework, factory, object layout, function name or file suffix is
required. A collection of independent functions and a single function returning
a related view model are both valid.

## Example

These TypeScript functions illustrate the grouping; name formatting is an
example policy, not a universal naming rule.

```ts
type Name = { firstName: string; lastName: string };
type Status = "idle" | "loading";

export const presentIdentity = ({ firstName, lastName }: Name) => {
  const parts = [firstName.trim(), lastName.trim()].filter(Boolean);
  return {
    fullName: parts.join(" "),
    initials: parts.map((part) => Array.from(part)[0]).join(""),
  };
};

export const isLoading = ({ status }: { status: Status }) => status === "loading";
```

`fullName` and `initials` share normalized name parts. `isLoading` uses only the
status. A component can bind these calculations independently to its reactive
data. When a single view model is useful, compose the same functions:

```ts
export const presentUserCard = ({ firstName, lastName, status }: Name & { status: Status }) => ({
  ...presentIdentity({ firstName, lastName }),
  isLoading: isLoading({ status }),
});
```

The combined form computes the complete result when called. Use independent
bindings when unrelated calculations should update separately. Neither form
requires a stateful presenter instance.

## Verification

Review each calculation's inputs, output and dependencies. Test related outputs
together and independent calculations separately, including relevant boundary
cases. For a combining presenter, check that its composed result is correct.
Check that inputs remain unchanged and effects are absent.

Verify the UI binding separately: relevant input changes update the displayed
result. Pure-function tests do not establish reactive integration. The document
provides no automatic source-code checker.

## References

[Presentation Model](https://martinfowler.com/eaaDev/PresentationModel.html)
describes separating presentation behavior from UI controls. Pure functions
and the grouping guidance above are this standard's proposed policy.
