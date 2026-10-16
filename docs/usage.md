# Using the standards packages

Choose whole packages for the domains and technologies used by your project.
Start at each installed package's README and read its linked standards. The
packages contain documents, not executable integrations or lint configurations.

No package has been published yet. All current standards are proposed drafts;
installation and successful tests do not approve them. The registry commands
below are for use after an explicitly approved release. Until then, repository
checks install local tarballs into isolated test projects.

## Install selected packages

After release, install your chosen packages as development dependencies:

```bash
npm install --save-dev --save-exact @antonsmolko/standards-core@0.1.0 @antonsmolko/standards-typescript@0.1.0
```

Replace 0.1.0 with the approved published versions you intend to use. Commit
package.json and package-lock.json. On another machine, run npm ci before
following paths under node_modules; a fresh checkout does not contain those files.
No package automatically installs the other standards packages. Select frontend,
Svelte or Svelte SPA explicitly when their applicability matches your project.

## Add instructions manually

Merge the following example into your existing AGENTS.md:

```markdown
Read these installed package READMEs and follow their links to all standards:
- [Core standards](node_modules/@antonsmolko/standards-core/README.md)
- [TypeScript standards](node_modules/@antonsmolko/standards-typescript/README.md)

Apply the applicable approved standards of each selected package as a whole.
Proposed drafts are not approved requirements. If a referenced file is missing,
install the project's dependencies before using those standards.
```

Add a README reference for every other package you choose. Keep your existing
project instructions and precedence rules. The example assumes npm's normal
node_modules layout and a consumer-root AGENTS.md. Other tools or layouts need
appropriate paths. Any AI tool with file-reading access can use the documents;
a link alone does not guarantee that it loads their content automatically.

Installation and updates do not generate instructions or rewrite AGENTS.md,
other AI configuration, ESLint or Prettier files. npm manages the dependency and
lock files; you own all instruction changes. People use the same READMEs without
needing an AI tool.

## Review updates

Read the package CHANGELOG and README compatibility guidance before updating.
Update the chosen package versions through npm and commit the resulting lockfile.
Versions are independent. Known combinations are described in each README;
compatibility is reviewed manually, without a semantic resolver or CLI sync.
