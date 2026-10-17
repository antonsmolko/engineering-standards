# Manual package publication

This is the maintainer runbook for an explicitly approved release. Preparation
can be rehearsed with synthetic packages; rehearsal does not accept standards or
authorize publication. A successful check cannot enforce human decisions.

Use the lockfile's Changesets 3.0.3 throughout. Its publish-plan format is
experimental. Recheck this procedure before upgrading the CLI. Baselines:
[Changesets CLI](https://changesets.dev/guide/cli),
[upstream packing example](https://github.com/changesets/changesets/blob/main/packages/cli/src/commands/pack/__tests__/index.test.ts)
and [npm publication](https://docs.npmjs.com/cli/v11/commands/npm-publish/).

## 1. Select the revision and check npm access

Use a clean checkout of the exact intended revision. Review `git status --short`
and `git rev-parse HEAD`; stop on unexpected changes. Package versions must be
chosen by the owner, not changed to make this runbook run. The first release can
use the existing versions. Follow the [versioning guide](../.changeset/README.md)
for separately approved version changes.

Run the complete check on Node 26.0.0 and 26.11.1 and inspect successful CI for
this revision:

```sh
npm ci --ignore-scripts
npm run check
```

Keep release evidence outside the checkout. In the same shell:

```sh
release_repo_dir=$(pwd -P)
release_registry=https://registry.npmjs.org/
release_evidence_dir=$(mktemp -d "${TMPDIR:-/tmp}/standards-release-evidence.XXXXXX")
release_evidence_dir=$(cd "$release_evidence_dir" && pwd -P)
git rev-parse HEAD > "$release_evidence_dir/revision"
release_pack_dir="$release_evidence_dir/packed"
release_consumer_dir="$release_evidence_dir/consumer"
```

Before a real release, inspect both the default registry and the scoped registry
configuration, and check the authenticated npm identity for the intended registry:

```sh
npm config get registry
npm config get @antonsmolko:registry
npm whoami --registry "$release_registry"
```

Record evidence of permission to publish **each** expected name in the scope:

| Package | Intended version | npm permission evidence |
| --- | --- | --- |
| @antonsmolko/standards-core | owner-selected exact version | owner/collaborator permission |
| @antonsmolko/standards-frontend | owner-selected exact version | owner/collaborator permission |
| @antonsmolko/standards-typescript | owner-selected exact version | owner/collaborator permission |
| @antonsmolko/standards-svelte | owner-selected exact version | owner/collaborator permission |
| @antonsmolko/standards-svelte-spa | owner-selected exact version | owner/collaborator permission |

Verify scope ownership or package write access in the authenticated npm account
settings; existing-package permissions alone do not establish rights to a new
name. An E404 is not proof of scope rights. Authentication, network or ambiguous
availability errors mean **STOP**, not “name available”. The owner handles
credentials/2FA separately. Never put tokens, OTPs or sensitive npm config in
release evidence. Do not change credentials or repository settings as rehearsal.

## 2. Plan and pack

For a real release only, query the intended registry for the native plan, then
pack without lifecycle scripts:

```sh
npm_config_registry="$release_registry" npm_config_ignore_scripts=true npm run changeset -- publish-plan --output "$release_evidence_dir/publish-plan.json"
npm_config_ignore_scripts=true npm run changeset -- pack --from-publish-plan "$release_evidence_dir/publish-plan.json" --out-dir "$release_pack_dir"
```

Inspect the raw and enriched `publish-plan.json`, each tarball's `package.json`
and inventory (`tar -tzf <absolute-tarball-path>`). Require exactly the five names
above at the intended versions, public access and tag `latest` in the plan;
check the registry as described in step 1.
Require tarball paths inside this pack directory. Private root, extra entries,
unexpected tag-only entries, mismatched metadata or another registry mean
**STOP**. A native plan is data, not approval. Do not edit it or add `--tag` to
`publish --from-pack-dir`; that combination is unsupported.

For synthetic rehearsal, use a clearly labelled native v1 fixture plan as in
[the integration test](../tests/integration/publication-artifacts.test.ts).
Do not query real npm names or run publication commands. This fixture plan does
not prove availability or permissions.

Record the plan and tarball digests using standard Node crypto. This command
prints SHA-256 (for comparison with native pack integrity) and npm-style SHA-512
(for approval and registry comparison):

```sh
node --input-type=module -e 'import {readFileSync} from "node:fs"; import {createHash} from "node:crypto"; for (const file of process.argv.slice(1)) { const bytes=readFileSync(file); console.log(file, ...["sha256","sha512"].map(a=>a+"-"+createHash(a).update(bytes).digest("base64"))); }' "$release_pack_dir/publish-plan.json" "$release_pack_dir"/packages/*.tgz > "$release_evidence_dir/integrity.txt"
```

Compare each tarball's SHA-256 with its native plan entry. Keep the plan digest
and each tarball's SHA-512 with its name/version/revision. The publisher does not
verify these digests for you. Preserve this exact pack directory and evidence.

## 3. Check the actual tarballs

Install those tarballs into a new external consumer:

```sh
mkdir "$release_consumer_dir"
printf '%s\n' '{"private":true}' > "$release_consumer_dir/package.json"
npm install --prefix "$release_consumer_dir" --offline --ignore-scripts --no-audit --no-fund "$release_pack_dir"/packages/*.tgz
```

From the repository root, use the existing development checks on the installed
files, not workspace imports. Set the consumer path for this invocation:

```sh
cd "$release_repo_dir"
RELEASE_CONSUMER_DIR="$release_consumer_dir" node --input-type=module <<'NODE'
import assert from "node:assert/strict";
import {readFile, realpath} from "node:fs/promises";
import {join} from "node:path";
import {checkDocuments} from "./tests/helpers/check-documents.ts";
import {checkAcceptedHeaders} from "./tests/helpers/check-accepted-headers.ts";
const root=process.env.RELEASE_CONSUMER_DIR;
const {workspaces}=JSON.parse(await readFile("package.json","utf8"));
const roots=[];
for (const workspace of workspaces) {
  const expected=JSON.parse(await readFile(join(workspace,"package.json"),"utf8"));
  const installed=join(root,"node_modules",expected.name);
  assert.equal(await realpath(installed),installed);
  const metadata=JSON.parse(await readFile(join(installed,"package.json"),"utf8"));
  assert.equal(metadata.name,expected.name);
  assert.equal(metadata.version,expected.version);
  assert.deepEqual(await checkDocuments(installed,expected.name),[]);
  roots.push(installed);
}
const prerequisite=await checkAcceptedHeaders(roots);
assert.equal(prerequisite.ready,true,prerequisite.diagnostics.join("\n"));
NODE
```

Also read each installed README and linked documents. Check applicability and
compatibility, and follow the [manual adoption example](usage.md#add-instructions-manually)
in this isolated consumer. Confirm references resolve without workspace links;
consumer-owned instructions/configuration must remain intact. A missing accepted
ID in core, TypeScript or Svelte SPA means **STOP** for real publication. Current
proposed documents deliberately fail this prerequisite.

## 4. Obtain content, audit and release decisions

Apply [content approval](architecture/content-approval.md) to the actual installed
content: verify owner decisions and reviewed revisions, and at least one accepted,
applicable ID from each of core, TypeScript and Svelte SPA. Header checks alone do
not prove applicability, authorship of decisions or acceptance of changed text.

Manually audit **every tarball** for secrets, private/product-specific materials,
licenses and redistribution rights. Record the reviewer, artifact SHA-512,
findings and disposition. Automated path/link checks do not replace this audit.

Save the revision, exact five names/versions, registry/dist-tag, native plan and
its digest, tarballs/SHA-512, CI/check/consumer results, content decisions and
per-artifact audits. Obtain a separate explicit owner decision approving this
exact release set and artifacts; keep its public decision link with the evidence.
Verify the decision author, scope and revision. Missing, inaccessible, ambiguous,
stale or mismatched decisions/audits mean **STOP**. Recompute digests and compare
the current revision/plan/files with the approved values immediately before
publication. Any change requires renewed affected checks, audit and approval.

For synthetic rehearsal, label all decisions and audits **synthetic, test only**.
Remove acceptance/applicability, an artifact audit or exact approval in turn;
also change an artifact after synthetic approval. Record the missing source and
**STOP before publish**. With a complete synthetic set, record:
**“All stop points passed; publish was not called.”** Stop here during rehearsal.

## 5. Publish only an explicitly approved real release

This step belongs to the separately approved real release. Do not execute it in
synthetic tests or rehearsal. Use the same checkout, revision, registry and
unchanged approved pack directory:

```sh
npm_config_registry="$release_registry" npm_config_ignore_scripts=true npm run changeset -- publish --from-pack-dir "$release_pack_dir"
```

Capture stdout/stderr and the actual exit code, including failures; do not hide
an error with a successful pipeline command. Keep logs without credentials/OTP.
Changesets creates annotated package tags locally; it does not push them.
Publication is not transactional: tags for successful packages may exist even
when the overall command fails. Inspect every expected fully qualified tag,
its target revision and the remote state. For example:

```sh
git rev-list -n 1 'refs/tags/@antonsmolko/standards-core@0.1.0'
git ls-remote --tags origin 'refs/tags/@antonsmolko/standards-core@0.1.0' 'refs/tags/@antonsmolko/standards-core@0.1.0^{}'
```

Use the approved name/version for each of the five packages. Push only reviewed
approved refs after checking their target, for example
`git push origin refs/tags/@antonsmolko/standards-core@0.1.0`; never push all tags.

## 6. Check registry results and handle partial failure

**STOP on any failure.** Save logs/exit code and observed state for each approved
package/version/tag. For each exact version, read the registry integrity:

```sh
npm view @antonsmolko/standards-core@0.1.0 dist.integrity --registry "$release_registry"
```

Repeat with every approved name/version, comparing published SHA-512 to the
approved tarball. Check tag targets as well. An unexpected/missing tag for an
already published package, integrity mismatch or unclear network/auth response
requires investigation and owner direction. Never infer success from a timeout.
Never replace an already published version with different bytes.

When registry/tag state is understood, the catalog is unchanged and the existing
owner approval permits the retry, repeat the **same** `publish --from-pack-dir`
command with the **same approved directory**. Changesets skips already-published
versions; it does not verify their approved integrity or repair missing tags for
you. Otherwise obtain new approval. Do not edit the plan, rebuild packages or
invent a separate subset/retry engine. Recheck every package/tag afterward.
Partial-failure handling is documented here; it is not simulated in rehearsal.

Finally, install all five **exact published versions** from the intended registry
in a fresh external consumer (not local tarballs or workspace links), and repeat
step 3's metadata/document/adoption checks. Keep the registry integrity, installs,
logs, tag targets and decision links in release evidence. A package or consumer
failure means the release remains incomplete. Preserve the evidence and approved
artifacts in owner-controlled storage; preparation/rehearsal never closes the
real release task.
