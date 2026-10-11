# Engineering Standards Independent Packages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать публичный монорепозиторий с восемью независимо версионируемыми пакетами, проверяемыми профилями, конфигурациями и безопасным генератором инструкций.

**Architecture:** Корни пакетов вложены по области применения, но каждый имеет собственную версию и публичные exports. Пять пакетов спецификаций содержат Markdown и манифесты; ESLint, Prettier и CLI — отдельные пакеты. CLI проверяет явно установленный набор, собирает профиль чистыми функциями и обновляет только собственные неизменённые файлы.

**Tech Stack:** JavaScript ESM с JSDoc, npm workspaces, node:test, JSON Schema, semver, ESLint flat config, Prettier; TypeScript и Svelte 5 в fixtures. Локальная исходная среда — Node.js 24.14.0, npm 11.9.0; поддерживаемые диапазоны инструментов фиксируются только после проверки совместимости.

**Spec:** [Согласованная спецификация](../specs/2026-10-11-engineering-standards-design.md).

## Global Constraints

- Репозиторий `antonsmolko/engineering-standards` публичный; собственные материалы MIT. Не включать приватные данные ASC, секреты и сторонние материалы без прав распространения.
- Корень приватный, без общей release-версии. Каждый пакет имеет свои package.json, CHANGELOG.md и semver; первая серия — `0.1.0` каждого пакета.
- Восемь пакетов под scope `@antonsmolko`: `standards-core`, `standards-frontend`, `standards-typescript`, `standards-svelte`, `standards-svelte-spa`, `eslint-config`, `prettier-config`, `standards-cli`.
- Общая архитектура — core; frontend-архитектура — frontend; конкретные FSD-соглашения — Svelte SPA. `docs/architecture` описывает сам репозиторий стандартов.
- Будущие backend/Go/Vue и модули не создаются как пустые пакеты. Механизм модулей проверяется fixtures, не несогласованными настоящими спецификациями.
- Спецификации не зависят от CLI/линтеров; CLI не устанавливает все профили транзитивно. Нет postinstall, сетевых обновлений или требований применять конкретный агент/Superpowers.
- Требования имеют стабильные ID, `required|recommended`, `proposed|accepted|deprecated`. Только принятые применимые требования активны; proposed не включаются в обязательные проверки.
- Потребители фиксируют точные package versions и lockfile; requires между пакетами задаёт semver ranges. Не выбирать новые версии автоматически.
- Не читать/писать за пределами реального корня; не стирать пользовательские файлы. `check` и dry-run не изменяют проект.
- Breaking change после 1.0 повышает major, в 0.x — minor с миграцией; editorial — patch. Теги раздельные: `standards-svelte@0.1.0`.
- npm-публикация конкретной release-группы требует отдельного одобрения и авторизации; подключение asc-admin — отдельный PR после релиза.

## Review Focus

1. Несовместимые package versions или несколько версий профиля: отказ, а не неявный выбор — Task 3.
2. Symlink и обход корня через документ/entrypoint/managed manifest: не читать и не писать наружу — Tasks 2, 5.
3. Ручная правка и сбой между writes: не потерять исходные файлы и не сообщить ложный успех — Task 5.
4. Потребитель без workspace links и без исходного checkout: все exports и bin работают из tarballs — Tasks 4, 6.
5. Независимый релиз с неопубликованной зависимостью: проверять группу и неизменность несвязанных пакетов — Task 6.

## Размещение и границы этапа

Все следующие пути — внутри нового репозитория, не asc-admin. Использовать отдельный checkout `/Users/anthony/Dev/asc/engineering-standards`, не затирая существующий каталог и не меняя текущую staff-ветку. Перед созданием проверить `gh api user`, точный repository name и npm-имена. E404 не доказывает право публикации в scope; сетевой отказ не считать отсутствием имени. Конфликт имени согласовать, не переименовывать автоматически.

После одобрения плана создать репозиторий, перенести spec/plan в baseline документации, завести issue первой версии. Работать в feature-ветке с номером этого issue; коммиты `[engineering-standards-N]: ...`. Новый репозиторий без dev использует main как базу PR. При необходимости изолировать работу через native worktree для нового репозитория либо git fallback. Не создавать worktree asc-admin для другой кодовой базы. Перед публичным push провести аудит содержания.

| Корень пакета                         | npm-имя после `@antonsmolko/` |
| ------------------------------------- | ----------------------------- |
| `packages/core`                       | `standards-core`              |
| `packages/domains/frontend`           | `standards-frontend`          |
| `packages/technologies/typescript`    | `standards-typescript`        |
| `packages/technologies/svelte`        | `standards-svelte`            |
| `packages/stacks/frontend/svelte-spa` | `standards-svelte-spa`        |
| `packages/tooling/eslint-config`      | `eslint-config`               |
| `packages/tooling/prettier-config`    | `prettier-config`             |
| `packages/tooling/standards-cli`      | `standards-cli`               |

## Контракты

- Manifest каждого пакета спецификаций: `{ schemaVersion: 1, package: { name, version }, requires: [{ name, range }], requirements, profiles, modules, implementations }`.
- Requirement: `{ id, title, level, status, document, verification, requires, refines, replaces, conflicts }`. `verification`: `automatic|manual|combined`; Markdown содержит нормативный текст, обоснование, применимость и способ проверки. Deprecated содержит условия перехода и замену.
- Profile: `{ id, kind, requires, requirements }`; kind: `core|domain|technology|stack`. Profile requires содержит ID профилей; package requires содержит имена и ranges.
- Module: `{ id, requirements, document }`; implementation: `{ id, module, requiresProfiles, requiresModules, requirements, document }`.
- Project selection `engineering-standards.json`: `{ schemaVersion: 1, packages: [{ name, version }], profiles, modules, exceptions, entrypoints }`. Module selection: `{ id, implementation }`; exception: `{ requirement, reason, decision }`.
- Managed manifest `.engineering-standards/managed.json`: `{ schemaVersion: 1, generatorVersion, packages: [{ name, version }], profiles, selectionHash, files: [{ path, sha256 }] }`.
- `Resolved`: `{ packages, profiles, modules, requirements, exceptions }`, с детерминированным порядком и только активными accepted requirements. Исключённые требования обозначаются как исключения, а не обязательные правила.
- `Report`: `{ ok, diagnostics, changes, exceptions }`; diagnostics содержит безопасные code/message без содержимого файлов. Чистые функции возвращают данные; invalid input вызывает диагностическую ошибку. CLI возвращает exit 0/1.

### Task 1: Восемь независимых workspaces

**Files:** Root `package.json`, `.gitignore`, `README.md`, `AGENTS.md`, `LICENSE`; для каждого корня из таблицы — `package.json`, `README.md`, `CHANGELOG.md`, `LICENSE`; `tests/integration/layout.test.js`.

**Interfaces:** Root workspaces явно перечисляет восемь путей из таблицы. Specification exports: `./manifest.json`; core также `./schemas/manifest.json`, `./schemas/project.json`. Config exports и bin оформляются Tasks 4/5 до упаковки. Промежуточные пакеты не публикуются.

- [ ] Написать `private root and independent package identities`: `assert.equal(root.private, true)`, `assert.equal(root.version, undefined)`, `assert.equal(new Set(names).size, 8)`, `assert.equal(pkg.version, '0.1.0')`. Проверить own changelog/LICENSE, allowlist files, отсутствие lifecycle scripts и tooling dependencies у спецификаций.
- [ ] Запустить `node --test tests/integration/layout.test.js`; Expected: FAIL отсутствующих package-манифестов.
- [ ] Создать вложенные npm workspaces и документацию границ. README описывает независимые версии и будущие модули; AGENTS — процесс этого репозитория без копирования требований ASC.
- [ ] Повторить layout test; Expected: PASS. Создать lockfile `npm install --package-lock-only --ignore-scripts`; Expected: exit 0, приватный root не является release-артефактом.
- [ ] Закоммитить только файлы задачи с issue-префиксом.

### Task 2: Манифесты и безопасная загрузка нормативных документов

**Files:** `packages/core/schemas/{manifest,project}.schema.json`, `packages/core/templates/{requirement,module,adr}.md`; `manifest.json` и нормативные Markdown в пяти пакетах спецификаций; `packages/tooling/standards-cli/lib/catalog/{validate,load}.js`, `packages/tooling/standards-cli/tests/catalog.test.js`.

**Interfaces:** `validateManifest(value) -> Manifest`; `loadCatalog(packageRoot) -> Promise<{ manifest, documents: Map<string, string> }>`; metadata name/version совпадает с package.json. Schema project соответствует контракту выше. Нормативные тексты размещаются по разделам дерева spec, не в repository docs/architecture.

- [ ] Добавить тесты валидного manifest, duplicate ID, invalid status, metadata version mismatch, отсутствующего документа/обоснования, ссылки `../outside.md` и документа-symlink наружу. Для marker внешнего файла: `assert.ok(!error.message.includes(marker))`.
- [ ] Запустить `node --test packages/tooling/standards-cli/tests/catalog.test.js`; Expected: FAIL отсутствующей реализации.
- [ ] Реализовать Schema-валидацию и realpath boundary check. Добавить компактные тексты общих/frontend/TS/Svelte/stack требований со стабильными ID; новые нормативные тексты остаются proposed до содержательного ревью. Accepted fixtures не подменяют их согласование. Шаблоны задают текст, rationale, applicability, verification; module template — состояния, отказы, acceptance.
- [ ] Повторить catalog и layout tests; Expected: PASS. Проверить Schema и template exports в core allowlist.
- [ ] Закоммитить только файлы задачи.

### Task 3: Совместимость и композиция профилей/модулей

**Files:** `packages/tooling/standards-cli/lib/selection/{validate,resolve}.js`, `packages/tooling/standards-cli/tests/selection.test.js`, `tests/fixtures/catalog/`.

**Interfaces:** Consumes catalogs Task 2. `validateSelection(value) -> Selection`; `resolveSelection(catalogs, selection) -> Resolved`. Требует exact selected versions, удовлетворения package requires ranges и явного наличия необходимых пакетов. Profile traversal собирает declared зависимости; module dependencies обязаны быть выбраны явно.

- [ ] Написать `composes svelte-spa deterministically`: `assert.deepEqual(result.profiles, ['core', 'frontend', 'svelte', 'svelte-spa', 'typescript'])`; перестановка catalogs сохраняет результат, требования не дублируются. Отказы: несовместимый range, missing package, duplicate profile/version, цикл, unknown ID, конфликт и exception без reason/decision. Fixture выбранного модуля включает только совместимый вариант; `assert.ok(!ids.includes('fixture-unselected'))`, `assert.ok(!ids.includes('fixture-proposed'))`.
- [ ] Запустить `node --test packages/tooling/standards-cli/tests/selection.test.js`; Expected: FAIL отсутствующего resolver.
- [ ] Реализовать semver-проверку пакетов, глобальную уникальность ID, детерминированный обход зависимостей и explicit exceptions. Формальные связи проверяются автоматически; противоречия в прозе — ревью. Deprecated/proposed не становятся активными обязательными правилами.
- [ ] Повторить selection/catalog tests; Expected: PASS всех сценариев, корректное исключение присутствует в result.exceptions.
- [ ] Закоммитить только файлы задачи.

### Task 4: Импортируемые конфигурации отдельными пакетами

**Files:** `packages/tooling/eslint-config/{javascript,typescript,svelte-spa}.js`, `packages/tooling/prettier-config/{index,svelte}.js`, package.json обоих пакетов; `tests/integration/configs.test.js`, `tests/fixtures/{typescript,svelte-spa}/`.

**Interfaces:** ESLint exports `./javascript`, `./typescript`, `./svelte-spa`: factories `createConfig({ files, ignores } = {}) -> FlatConfig[]`. Prettier exports основной объект и `./svelte` с объявленным совместимым plugin. Нет ASC alias/guard/business-model assumptions. Конфигурации документируют проверяемые rule IDs и нормативные IDs; proposed правила не включаются как обязательные.

- [ ] Добавить fixtures: valid TS/Svelte проходят; negative examples отклоняются с ожидаемым ruleId, не parse/install error. `assert.equal(validMessages.length, 0)`; `assert.ok(invalidMessages.some((item) => { return item.ruleId === 'no-undef'; }))` для JS fixture. Prettier повторно форматирует без изменения и сохраняет явно заданный inline-пробел. Импортировать публичные exports из установленных tarballs вне workspaces.
- [ ] Запустить `node --test tests/integration/configs.test.js`; Expected: FAIL отсутствующих exports.
- [ ] Проверить официальную документацию совместимости, закрепить проверенные peer ranges и fixture lockfile; добавить небольшой набор correctness checks и форматирование. Не переносить весь ASC ESLint и prefer-guard. Проверки инструментов допускаются отдельно от proposed нормативных требований, но нельзя объявлять их утверждённым стандартом без ревью.
- [ ] Повторить configs tests; Expected: PASS valid и подтверждённый ожидаемый отказ negative. Проверить pack обоих config-пакетов без private fixtures.
- [ ] Закоммитить только файлы задачи.

### Task 5: Генератор инструкций и безопасные CLI команды

**Files:** `packages/tooling/standards-cli/lib/documents/render.js`, `lib/files/{safe-path,managed}.js`, `lib/commands/{init,sync,check}.js`, `bin/engineering-standards.js`, `tests/{render,managed,cli}.test.js` внутри CLI; package.json CLI; `tests/fixtures/consumer/`.

**Interfaces:** `renderInstructions(resolved, documents, generatorVersion) -> string`; `initProject(root, selection, { dryRun }) -> Promise<Report>`; `syncProject(root, { dryRun }) -> Promise<Report>`; `checkProject(root) -> Promise<Report>`. Bin `engineering-standards <init|sync|check> [--dry-run]`, root cwd. Init читает заранее созданный selection; при отсутствии показывает пример и не пишет. Пакеты резолвятся из установленного набора потребителя, не из dependencies CLI.

- [ ] Написать тесты init/document/manifest, повторного init без overwrite, dry-run, идемпотентного sync и read-only check: `assert.deepEqual(afterCheckFiles, beforeCheckFiles)`. Проверить точные версии всех пакетов отдельно от generatorVersion; изменение selection требует sync. Manual edit, malformed manifest, unowned target, `..`, symlink docs/entrypoint, отсутствующая ссылка агента и fault injection между writes не теряют исходные файлы. `assert.equal(await readFile(target, 'utf8'), original)` после отказа. AGENTS/CLAUDE не переписываются; tracked документ читается после удаления node_modules fixture.
- [ ] Запустить `node --test packages/tooling/standards-cli/tests/render.test.js packages/tooling/standards-cli/tests/managed.test.js packages/tooling/standards-cli/tests/cli.test.js`; Expected: FAIL отсутствующей реализации.
- [ ] Реализовать renderer с нормативным текстом/ID/provenance, безопасный preflight всех путей, hash checks, exclusive init и staged sync с rollback. При невозможности восстановления сообщить затронутые пути без ложного успеха. Генерировать `docs/engineering-standards.md` и managed manifest; manual entrypoint links проверять, не вставлять автоматически. Не делать сетевых запросов.
- [ ] Повторить CLI/catalog/selection suite; Expected: PASS. Проверить реальные exit 0 для согласованного check и 1 для drift; dry-run не пишет, diagnostics не содержат marker секрета.
- [ ] Закоммитить только файлы задачи.

### Task 6: Независимые версии и полные package artifacts

**Files:** `scripts/releases/{plan,validate}.js`, `tests/integration/{releases,artifacts}.test.js`, `docs/architecture/releases.md`; migrations в соответствующих пакетах по необходимости.

**Interfaces:** `planRelease({ previous, current, changes }) -> { releases }`, changes: `{ package, kind: 'editorial'|'breaking' }`; `validateRelease({ releases, manifests, availableVersions }) -> diagnostics`. previous/current содержат package metadata; availableVersions — явно полученный набор опубликованных версий для проверки, не install/latest. Релиз должен иметь manifest version/changelog/tag согласованными.

- [ ] Добавить тест независимого bump: `assert.equal(next['standards-svelte'], '0.1.1')` для editorial, `assert.equal(next['eslint-config'], previous['eslint-config'])`. Breaking `0.1.0 -> 0.2.0`, `1.2.3 -> 2.0.0`. Dependent с подходящим range не выпускается; изменение range требует явного dependent change. Reject dependency unavailable outside release group, duplicate release и missing changelog. Упаковать все восемь пакетов: exports/bin/docs/LICENSE доступны, tests/fixtures/.env отсутствуют; consumer работает без checkout/workspace links.
- [ ] Запустить `node --test tests/integration/releases.test.js tests/integration/artifacts.test.js`; Expected: FAIL отсутствующей release-валидации или package contract.
- [ ] Реализовать независимый release plan, проверку графа и allowlists; tag каждого пакета отдельно. Описать точную установку набора, requires ranges, исключения, инструкции агента и миграции; будущие auth/API/state пакеты — только roadmap. Registry metadata preflight может читать сеть, CLI потребителя — нет.
- [ ] Повторить releases/artifacts tests и `npm test`; Expected: PASS, несвязанные версии не изменены. Проверить README-пример на tarball consumer с lockfile.
- [ ] Закоммитить только файлы задачи.

### Task 7: CI и передача первого release candidate

**Files:** `.github/workflows/{ci,release-candidate}.yml`, `scripts/{check-documents,check-public-content}.js`, `tests/integration/public-content.test.js`, root scripts, `docs/architecture/release-checklist.md`.

**Interfaces:** Scripts `test`, `lint`, `format:check`, `check:docs`, `check:public`, `pack:check`. Release candidate workflow проверяет конкретную группу и сохраняет отдельные tarballs, но не делает npm publish.

- [ ] Добавить tests отсутствующей локальной ссылки, duplicate ID и маркера private key в синтетическом fixture: `assert.equal(report.ok, false)`. Проверить отсутствие publish команды в candidate workflow и allowlist публикации каждого пакета.
- [ ] Запустить `node --test tests/integration/public-content.test.js`; Expected: FAIL отсутствующих проверок.
- [ ] Реализовать document/public-content checks и CI: npm ci, tests, lint, formatting, docs и tarball fixtures. Закрепить Actions по проверенным SHA на этапе настройки. Вручную проверить материалы/лицензии; автоматический scanner не доказывает отсутствие всех секретов.
- [ ] Запустить `npm ci`, `npm test`, `npm run lint`, `npm run format:check`, `npm run check:docs`, `npm run check:public`, `npm run pack:check`; Expected: exit 0 каждого шага. Перед PR провести whole-branch review по spec/plan; проверить CI PR. Содержательное ревью новых требований, npm authorization и одобрение release group — явные незавершённые условия публикации.
- [ ] Закоммитить задачу и передать feature PR на ревью; не merge, не publish и не менять consumer asc-admin в этом PR.

## Самопроверка и дальнейшие этапы

Классификация и границы — Tasks 1/2; совместимость/модули — Task 3; конфигурации — Task 4; безопасные инструкции — Task 5; package artifacts/независимость релизов — Task 6; CI/лицензии/публичность — Task 7. Review Focus имеет тесты в указанных задачах. Контракты Selection/Resolved/Report и manifest versions едины для producer/consumer задач. Реальные auth/API/state/authorization спецификации, авторизованная публикация и asc-admin integration остаются отдельными этапами; они не считаются выполненными этим PR.

Рекомендуемый метод — inline (`executing-plans`) с итоговым независимым ревью: resolver и CLI последовательно зависят от формата каталогов. Альтернатива — subagent-driven с отдельным implementer/reviewer на каждую задачу. Реализация начинается после просмотра этого плана и выбора метода выполнения.
