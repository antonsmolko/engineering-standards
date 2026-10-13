# Issue #9 workspace checks: review response

Current scope: check-only first PR #9, per [owner decision](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816). TypeScript migration corrects the implementation of that same outcome. Changesets remains the second PR; #9 closure and merge/publication approval remain separate.

Current sources read: all four inline threads and the complete [summary review](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499602258), PR comments, all pages of #1/#9 comments including accepted scope decisions, current issue bodies, complete final diff and linked design/plan/handoff. Inline thread/comment pagination has no further pages. The earlier private requirements review file belongs to merged PR #27; its reviewer-confirmed closures remain historical and are not reopened. It is **private input, not a public basis**; current actionable sources are the public review and owner decisions.

Owner's direct TS request and independent-agent review are **private input, not a public basis**, paired with public issue #9/check requirements and the public review below. The TypeScript change is an implementation correction within the existing check outcome, not a new API/product or carrier scope addition.

## Historical preparation findings

P1–P3 below record the original planning round. Their fixes at the original revision remain historical; post-check consumer/metadata scope is superseded by the explicit owner decision, not silently reopened.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Issue #9](https://github.com/antonsmolko/engineering-standards/issues/9) | P1: external consumer must verify post-check artifacts | Plan, pack scripts, consumer tests | Fixed | pack:check sequences check before pack; installs all eight new tarballs offline and verifies installed exports/catalogs. Existing full-suite consumer coverage remains. |
| [AGENTS.md rule 4](https://github.com/antonsmolko/engineering-standards/blob/main/AGENTS.md) | P2: invalid metadata and success behavior undefined | Plan, check script/tests | Fixed | Required JSON failures, name/version drift, invalid ranges and incompatible local ranges diagnose nonzero without writes. Matching eight lock entries and absent tooling manifests pass. |
| [AGENTS.md task scope](https://github.com/antonsmolko/engineering-standards/blob/main/AGENTS.md) | P3: maintained upstream example missing | Plan baseline | Fixed | Inspected npm/cli smoke-test scripts and real pack JSON smoke test; npm owns sequencing/pack/install and node:test is retained. |

## Current review findings

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Inline](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255402823), [owner scope](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816) | <a id="r1"></a>R1: duplicate positive packing stage | package.json, pack scripts/tests | Fixed | Removed pack:check and new pack tests/scripts; check executes the existing full suite once. |
| [Inline](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255402828) | <a id="r2"></a>R2: new CLI-dependent consumer duplicates existing coverage | verify-consumer, catalog-artifacts test | Fixed | Removed verifier; restored catalog-artifacts.test.js exactly to main, retaining existing catalog/tarball coverage. |
| [Inline](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255402832) | <a id="r3"></a>R3: npm files allowlist reimplemented | pack-check | Fixed | Removed wrapper entirely. Future inventory uses supported npm behavior in #18. |
| [Inline](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255402835) | <a id="r4"></a>R4: production wrapper imports test helper | pack-check, install-offline.ts | Fixed | Wrapper removed; only tests use install-offline.ts, so moving the helper would add no value. |
| [Summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499602258), [owner scope](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816) | <a id="r5"></a>R5: duplicate metadata/path/range guards | check-workspaces.ts, tests, design | Fixed | Script retains direct lock version comparisons and local semver.satisfies. Existing suite owns schema/identity validation; I/O failures only receive contextual diagnostics. |
| [Summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499602258) | <a id="r6"></a>R6: RED/GREEN order not visible as separate commits | Test evidence | No change needed | Reviewer explicitly says there is no AGENTS.md violation; recorded prior RED remains valid. TS entry behavior tests also ran RED before implementation, then GREEN. |
| [Summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499602258) | <a id="r7"></a>R7: prefer one upstream workspace pack call | Removed wrapper, #18 | Fixed by scope removal | No new pack call remains in PR #29; owner assigns supported dry-run inventory to #18. |
| [Accepted decision](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6139713098), [#9](https://github.com/antonsmolko/engineering-standards/issues/9#issuecomment-6139713816) | <a id="r8"></a>R8: superseded first-release roadmap/criteria | #9, current tooling design/plan, general design/plan, handoff | Applied to #9; full historical cleanup explicitly separate | Owner accepted the new scope. #9 and its active design/plan replace old criteria; general docs label superseded sections. Owner explicitly requests full roadmap/task cleanup as a separate docs-PR under #1; this is its agreed reason/follow-up, not unfinished runtime work in PR #29. |
| [Issue #9](https://github.com/antonsmolko/engineering-standards/issues/9), direct owner TS request (private input, not a public basis) | <a id="r9"></a>R9: root script should be TypeScript and typechecked | check-workspaces.ts, tsc, package/lock metadata | Fixed | Typed entry runs directly on Node 26; scripts/**/*.ts included in tsc, exact @types/semver supplies upstream types. No new runtime dependency or published package changes. |

## Follow-up review of 9225bae

Read the complete [follow-up summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499887530), all pages of PR reviews/comments and #1/#9 comments, the current issue #9 criteria, linked design/plan/handoff and the earlier private review file. No new inline findings were added. The reviewer confirms R1–R5/R9 and the agreed scope; those closures remain closed.

| Source | Finding | Affected files/issues | Disposition | Evidence |
| --- | --- | --- | --- | --- |
| [Follow-up summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499887530) | <a id="r10"></a>R10: Changesets decisions and deferred Lerna/Nx lack an explicit pointer after the design rewrite | Tooling design, general plan Task 10 | Fixed | Design explicitly assigns Changesets decisions to the separately agreed second-PR plan and retains the general plan's Lerna/Nx deferral. No new release mechanism or criteria added. |
| [Follow-up summary](https://github.com/antonsmolko/engineering-standards/pull/29#pullrequestreview-5499887530) | <a id="r11"></a>R11: statement waiving repeat approval relies on private input | Tooling design introduction | Fixed | Replaced it with a neutral statement that plan agreement and merge/publication gates remain separate; the first-plan pointer now describes the typed check. Approval requirements are unchanged. |

This round changes wording only. AGENTS.md review rule 6 permits skipping another independent review for wording corrections; the prior independent implementation review remains applicable. No runtime changes or new behavior tests are required.

Fresh verification for this round: Node 26.11.1 npm run check passed typecheck, workspace consistency and all 95 tests. Separately inspected the complete main-to-feature diff, checked all 24 local file links, R10/R11 anchors and wording against the general plan, handoff and current #9 body; git diff --check is clean. No issue criteria, approval gates or runtime files changed. R10/R11 are closed; the previously accepted follow-up roadmap work remains separate.

## GitHub issue edits

- #9 body replaced with the explicitly approved new scope, check/standard Changesets criteria, typed check implementation, retained carrier history, Refs/closure and separate roadmap follow-up. Old pack:check/version:prepare criteria are superseded by the public owner decision.
- No mass task closures/labels or full #1 roadmap rewrite in this PR; owner explicitly assigns those to the separate docs-PR.

## Verification

Previous 109-test check/pack results apply only to revision 8b12ba6 and are historical.
Current targeted GREEN: 25 workspace tests and typecheck passed. Node 26.0.0 and 26.11.1 npm run check: typecheck, consistency check and all 95 tests passed, including the unchanged original packed-artifact/offline-consumer tests. Independent review of the complete 54e29b4..057888f diff found no actionable findings; the reviewer independently reran Node 26.11.1 npm run check (95 tests) and verified the original artifact test is byte-identical to main.

Documentation verification is separate from runtime tests: 24 local links/anchors resolve, the entire final diff and relevant unchanged docs/issues were checked for conflicts against the owner-approved scope. Historical roadmap sections are explicitly superseded pending the owner-assigned separate #1 docs-PR. All nine current review dispositions are closed or assigned to that explicitly agreed follow-up.


## Published responses

All four inline threads have linked dispositions and are resolved: [R1 reply](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255549553), [R2 reply](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255549813), [R3 reply](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255550090), [R4 reply](https://github.com/antonsmolko/engineering-standards/pull/29#discussion_r4255550396). The [summary reply](https://github.com/antonsmolko/engineering-standards/pull/29#issuecomment-6139971749) links R1–R9. PR title/description now describe only typed workspace check. No open findings remain in this review round; full historical roadmap cleanup is the explicitly owner-assigned separate #1 outcome.
