# Engineering Standards Independent Packages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** PR #2 с исправленным планом вмержен; владелец явно возобновил работу. Доработки Tasks 1–2 выполнены; proposed содержание Tasks 3.1–3.3 подготовлено отдельными коммитами. Принятие конкретных нормативных формулировок остаётся отдельным gate владельца; согласование плана не меняет их статус автоматически.

**Goal:** Создать публичный монорепозиторий с восемью независимо версионируемыми пакетами, проверяемыми профилями, конфигурациями и безопасным генератором инструкций.

**Architecture:** Корни пакетов вложены по области применения, но каждый имеет собственную версию и публичные exports. Пять пакетов спецификаций содержат Markdown и манифесты; ESLint, Prettier и CLI — отдельные пакеты. CLI проверяет явно установленный набор, собирает профиль чистыми функциями и обновляет только собственные неизменённые файлы.

**Engist amendment:** Имя продукта/команды — Engist, конфигурация — engist.json.
Init становится мастером выбора и начальной настройки, sync — первой генерацией
и обновлением. Этот PR меняет дизайн/план, не реализует команды, не переименовывает
репозиторий/npm-пакеты и не утверждает доступность имени. Tooling setup после
Task 9 выделен в Task 9.1, чтобы Task 7 не зависел от ещё отсутствующих configs.

**Tech Stack:** JavaScript ESM с JSDoc, TypeScript test helpers, npm workspaces,
node:test, JSON Schema, semver, ESLint flat config, Prettier; TypeScript и
Svelte 5 в fixtures. Node.js 26.11.1 закреплён в .node-version;
поддерживаемые диапазоны инструментов фиксируются после проверки совместимости.

**Spec:** [Согласованная спецификация](../specs/2026-10-11-engineering-standards-design.md).

## Global Constraints

- Репозиторий `antonsmolko/engineering-standards` публичный; собственные материалы MIT. Не включать приватные данные ASC, секреты и сторонние материалы без прав распространения.
- Корень приватный, без общей release-версии. Каждый пакет имеет свои package.json, CHANGELOG.md и semver; первая серия — `0.1.0` каждого пакета.
- Восемь пакетов под scope `@antonsmolko`: `standards-core`, `standards-frontend`, `standards-typescript`, `standards-svelte`, `standards-svelte-spa`, `eslint-config`, `prettier-config`, `standards-cli`.
- Общая архитектура — core; frontend-архитектура — frontend; конкретные FSD-соглашения — Svelte SPA. `docs/architecture` описывает сам репозиторий стандартов.
- Будущие backend/Go/Vue и модули не создаются как пустые пакеты. Механизм модулей проверяется fixtures, не несогласованными настоящими спецификациями.
- Спецификации не зависят от CLI/линтеров; CLI не устанавливает все профили транзитивно. Нет postinstall или требований применять конкретный агент/Superpowers. Sync/check offline и без установки; только init может явно разрешённо установить подтверждённый набор через выбранный поддерживаемый пакетный менеджер. Установка и её dependency-file changes требуют отдельного согласия.
- Требования имеют стабильные ID, `required|recommended`, `proposed|accepted|deprecated`. Только принятые применимые требования активны; proposed не включаются в обязательные проверки. Релиз 0.1.0 с пустым активным набором запрещён: принятие содержания владельцем — отдельный gate.
- Потребители фиксируют точные package versions и lockfile; requires между пакетами задаёт semver ranges. Sync/check не выбирают новые версии; init разрешает metadata до writes и показывает конкретные совместимые версии для подтверждения без молчаливых upgrades.
- Не читать/писать за пределами реального корня; не стирать пользовательские файлы. `check` и dry-run не изменяют проект.
- Breaking change после 1.0 повышает major, в 0.x — minor с миграцией; editorial — patch. Теги раздельные, по полному npm-имени: `@antonsmolko/standards-svelte@0.1.0` (Changesets).
- npm-публикация конкретной release-группы требует отдельного одобрения и авторизации; подключение asc-admin — отдельный PR после релиза.

## Review Focus

1. Несовместимые package versions или несколько версий профиля: отказ, а не неявный выбор — Task 4.
2. Symlink и обход корня через документ/entrypoint/managed manifest: не читать и не писать наружу — Tasks 2, 5, 7.
3. Ручная правка и сбой между writes: не потерять исходные файлы и не сообщить ложный успех — Task 5.
4. Потребитель без workspace links и без исходного checkout: все exports и bin работают из tarballs — Tasks 8, 9, 10.
5. Независимый релиз с неопубликованной зависимостью: проверять группу и неизменность несвязанных пакетов — Task 10.

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

После review PR #3: local validator проверяет canonical profile syntax/kind,
profile requirements из собственного catalog и отсутствие self-links в четырёх
requirement relations (MANIFEST_REFERENCE). Cross-package existence/cycles остаются
Task 4, не заявляются реализованными. Требование может не входить ни в один профиль:
это допустимый неактивный catalog entry для будущего выбора/модуля, не active rule.
Lifecycle status/level хранятся только в manifest, document headers содержат ID.
SVELTE-SPA-ARCH-001 пока verification manual; combined требует реального checker.

- Manifest спецификаций: schemaVersion 1, package { name, version, namespace }, requires [{ name, range }], requirements, profiles, modules, implementations. namespace задаёт префикс требований пакета; среди selected catalogs один namespace принадлежит одному npm-имени, это проверяет resolver. Только manifest является источником profile compatibility; peerDependencies для профилей не создаются. Tooling peers описывают версии ESLint/TypeScript/Svelte/Prettier, это другой контракт.
- Requirement: { id, title, level, status, document, verification, requires, refines, replaces, conflicts }. Формат ID — `<NAMESPACE>-<CATEGORY>-<NNN>`; pattern — `^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-[A-Z0-9]+-[0-9]{3}$`. CATEGORY — ровно один непустой ASCII-токен без дефиса, NNN — ровно три цифры; namespace может содержать дефисные токены. Разбор справа: последний токен — номер, предпоследний — категория, все предыдущие вместе — полный namespace. Ownership проверяется точным равенством разобранного namespace и package.namespace, не startsWith и не longest-prefix среди selected catalogs. Поэтому `SVELTE-SPA-ARCH-001` имеет namespace `SVELTE-SPA`, category `ARCH`, number `001` и никогда не принадлежит `SVELTE`. Набор выбранных пакетов не меняет результат разбора. Namespace принадлежит одному npm-имени: CORE, FRONTEND, TS, SVELTE, SVELTE-SPA. Отдельные модули регистрируют собственный namespace. Существующие ID не переименовываются; удалённые ID не переиспользуются.
- Profile: { id, kind, requires, requirements }. Канонические ID: core, domains/frontend, technologies/typescript, technologies/svelte, stacks/frontend/svelte-spa. Сокращённые старые ID в пока неопубликованном каталоге заменить, не создавать неявных aliases. Все каталоги проверяются на уникальность ID и namespace ownership.
- Module: { id, requirements, document }; implementation: { id, module, requiresProfiles, requiresModules, requirements, document }. ID будущих модулей namespaced как modules/authentication; модульные требования не смешиваются с общими архитектурными правилами области.
- Selection engist.json: { schemaVersion: 1, packages: string[], profiles, modules, exceptions, entrypoints }. packages — уникальные npm-имена спецификаций, без ручного дублирования версий; tooling dependencies не specification catalogs. Для опубликованных стандартов точные версии прямых dependencies/devDependencies задаёт package.json потребителя; lockfile фиксирует пакетный менеджер. module selection { id, implementation }. Entrypoints — массив относительных POSIX-путей строками, например AGENTS.md и CLAUDE.md, без абсолютных путей, '..' и дубликатов/регистровых aliases. Setup plan хранит tooling choices отдельно, без undeclared fields текущей Schema.
- Exception: { requirement, reason, decision }; reason содержит непробельный текст, decision — HTTPS URL либо существующий относительный Markdown-путь внутри проекта, не произвольный ID. Ссылки в Markdown не разыменовываются по сети CLI.
- Resolved: { packages: [{ name, version }], profiles, modules, requirements, exceptions }. Здесь версии — фактический результат discovery/валидации metadata, не поле ручного Selection. Каждый profile/module/requirement имеет source: { package, version }; package — точное npm-имя. Ссылки обходятся по canonical ID, одинаковый профиль с двумя source versions отклоняется. Deprecated/proposed не активны.
- Managed manifest: schemaVersion 1, generatorVersion, packages [{ name, version }], profiles, selectionHash, files [{ path, sha256 }]. selectionHash — SHA-256 канонического Selection JSON: рекурсивно сортировать object keys, set-like arrays строк по значению и объектов по ID/path, без whitespace; дубликаты сначала отклоняются. Версии в Selection отсутствуют: check дополнительно сравнивает точные Resolved packages и generatorVersion с реестром, а не полагается только на selectionHash. Документы генерируются UTF-8/LF; hash содержимого нормализует CRLF/CR в LF, остальные символы/пробелы сохраняет. Check не переписывает CRLF-файлы.
- Report: { ok, diagnostics, changes, exceptions }; diagnostics [{ code, message }]. Версионируемый каталог кодов — packages/tooling/standards-cli/docs/diagnostics.md. Минимум: UNSUPPORTED_SCHEMA, MANIFEST_SCHEMA, MANIFEST_VERSION, DUPLICATE_ID, REQUIREMENT_NAMESPACE, PACKAGE_METADATA, PACKAGE_MISSING, PACKAGE_VERSION, PROFILE_MISSING, DEPENDENCY_CYCLE, REQUIREMENT_CONFLICT, INVALID_EXCEPTION, UNSAFE_PATH, CASE_COLLISION, DOCUMENT_READ, DOCUMENT_STRUCTURE, MANAGED_CONFLICT, MANAGED_DRIFT, WRITE_FAILED. Не выводить сырые parse/fs errors и содержимое входных файлов.
- Node discovery: createRequire(resolve(root, 'package.json')).resolve('<pkg>/manifest.json') и resolve('<pkg>/package.json'); safe npm-name validation перед составлением specifier, затем realpath обоих и совпадение физического package root. Выбранные пакеты должны быть явно объявлены прямыми dependencies/devDependencies потребителя, не найдены только транзитивно. Их installed metadata и manifest версии сверяются друг с другом и с точной объявленной версией; несовпадение даёт PACKAGE_VERSION, отсутствие выбранной прямой зависимости — PACKAGE_MISSING. Все spec packages экспортируют оба subpaths. Нет fallback на зависимости CLI или ближайшую другую версию. Discovery/sync/check не устанавливают зависимости и не переписывают package.json/lockfile; init installer — отдельная граница. Symlink-backed fixtures сохраняют exact declaration; tarball fixtures готовятся пакетным менеджером отдельно от CLI.
- Package roots, обнаруженные Node, могут быть symlinks наружу в npm workspaces/pnpm; canonical root становится границей read-only загрузки. Внутренние document/metadata paths не выходят за него. Цели записи и entrypoints потребителя имеют отдельную строгую политику: symlinks по пути запрещены.
- Ajv 8 валидирует schemaVersion 1. Проверять schemaVersion до Ajv, неизвестная версия даёт UNSUPPORTED_SCHEMA. CLI публикует встроенный проверенный snapshot схем core: build/check сравнивает его с каноном, lifecycle-install scripts нет; runtime dependency CLI на profile core убрать при доработке Task 2. Схемы CLI не меняются от случайной версии установленного профиля.
- Публичные нормативные тексты, README, диагностика и инструкции — English. Рабочие дизайн/план/ревью допустимы по-русски; нормативные переводы пока не поддерживаются. Это явное решение текущей редакции для просмотра владельцем.
- Runtime support: только Node ^26.0.0 по решению владельца 2026-10-12;
  проверяются нижняя граница 26.0.0 и версия разработки 26.11.1.
  Ранние major-версии Node не поддерживаются;
  TypeScript 5 обязателен в fixtures.

### Task 1: Восемь независимых workspaces

**Files:** Root `package.json`, `.gitignore`, `README.md`, `AGENTS.md`, `LICENSE`; для каждого корня из таблицы — `package.json`, `README.md`, `CHANGELOG.md`, `LICENSE`; `tests/integration/layout.test.js`.

**Interfaces:** Root workspaces явно перечисляет восемь путей из таблицы. Specification exports: `./manifest.json`, `./package.json`; core также `./schemas/manifest.json`, `./schemas/project.json`. Bin оформляется Task 7, config exports — Task 9, tooling connection — Task 9.1. Промежуточные пакеты не публикуются.

- [x] Написать `private root and independent package identities`: `assert.equal(root.private, true)`, `assert.equal(root.version, undefined)`, `assert.equal(new Set(names).size, 8)`, `assert.equal(pkg.version, '0.1.0')`. Проверить own changelog/LICENSE, allowlist files, отсутствие lifecycle scripts и tooling dependencies у спецификаций.
- [x] Запустить `node --test tests/integration/layout.test.js`; Expected: FAIL отсутствующих package-манифестов.
- [x] Создать вложенные npm workspaces и документацию границ. README описывает независимые версии и будущие модули; AGENTS — процесс этого репозитория без копирования требований ASC.
- [x] Повторить layout test; Expected: PASS. Создать lockfile `npm install --package-lock-only --ignore-scripts`; Expected: exit 0, приватный root не является release-артефактом.
- [x] Доработка после ревью: package layout тест проверяет public access (уже реализован), оба metadata exports, engines после реального прогона минимального Node. Не выполнять scaffold повторно.
- [x] Закоммитить только файлы задачи с issue-префиксом.

### Task 2: Манифесты и безопасная загрузка нормативных документов

**Files:** `packages/core/schemas/{manifest,project}.schema.json`, `packages/core/templates/{requirement,module,adr}.md`; `manifest.json` и нормативные Markdown в пяти пакетах спецификаций; `packages/tooling/standards-cli/lib/catalog/{requirement-id,validate,load}.js`, `packages/tooling/standards-cli/tests/catalog.test.js`.

**Interfaces:** `validateManifest(value) -> Manifest`; `loadCatalog(packageRoot) -> Promise<{ manifest, documents: Map<string, string> }>`; metadata name/version совпадает с package.json. Schema project соответствует контракту выше. Нормативные тексты размещаются по разделам дерева spec, не в repository docs/architecture.

При доработке namespace добавить `parseRequirementId(id) -> { namespace, category, number }`
в `lib/catalog/requirement-id.js`; number сохраняется строкой, включая ведущие
нули. Невалидный ID даёт MANIFEST_SCHEMA, чужой namespace — REQUIREMENT_NAMESPACE.
Schema и parser используют один контракт выше; shape validation предшествует
ownership validation.

- [x] Добавить тесты валидного manifest, duplicate ID, invalid status, metadata version mismatch, отсутствующего документа/обоснования, ссылки `../outside.md` и документа-symlink наружу. Для marker внешнего файла: `assert.ok(!error.message.includes(marker))`.
- [x] Запустить `node --test packages/tooling/standards-cli/tests/catalog.test.js`; Expected: FAIL отсутствующей реализации.
- [x] Реализовать Schema-валидацию и realpath boundary check. Добавить компактные тексты общих/frontend/TS/Svelte/stack требований со стабильными ID; новые нормативные тексты остаются proposed до содержательного ревью. Accepted fixtures не подменяют их согласование. Шаблоны задают текст, rationale, applicability, verification; module template — состояния, отказы, acceptance.
- [x] Повторить catalog и layout tests; Expected: PASS. Проверить Schema и template exports в core allowlist.
- [x] Доработка после ревью: explicit schema version diagnostics, namespaces и canonical profile IDs, bundled schema parity и удаление runtime dependency CLI на core; package-root symlink fixture проходит, internal document escape отклоняется. Добавить RED→GREEN tests перед runtime правками.
- [x] Добавить RED→GREEN проверки ID: все пять текущих manifest IDs, включая `CORE-ARCH-001` и `SVELTE-SPA-ARCH-001`, принимаются; `core-ARCH-001`, `CORE_ARCH_001`, `CORE-ARCH-01`, `CORE-ARCH-0001`, `CORE--ARCH-001` и `CORE-001` отклоняются. Parser assertions: `assert.deepEqual(parseRequirementId('SVELTE-STATE-001'), { namespace: 'SVELTE', category: 'STATE', number: '001' })` и `assert.deepEqual(parseRequirementId('SVELTE-SPA-ARCH-001'), { namespace: 'SVELTE-SPA', category: 'ARCH', number: '001' })`. Manifest с package.namespace `SVELTE` и ID `SVELTE-SPA-ARCH-001` даёт REQUIREMENT_NAMESPACE даже без выбранного SPA-пакета; package.namespace `SVELTE-SPA` с этим же ID проходит.
- [x] Закоммитить только файлы задачи.

### Task 3: Нормативное содержание и его принятие

**Files:** Нормативные Markdown и manifest.json в пяти пакетах спецификаций; docs/architecture/requirements-inventory.md; docs/architecture/content-approval.md. Никакие приватные тексты ASC не копируются целиком.

**Interfaces:** Каждое правило inventory имеет исходную тему, applicability, target package/ID, proposed текст, rationale, verification и local-only основание при исключении. Accepted статус задаётся только после содержательного ревью владельца, с PR/decision ссылкой. Автор не утверждает собственные новые требования автоматически.

Отдельные содержательные подзадачи, каждая со своим inventory, текстом,
rationale, verification, review и коммитом:

- **3.1 Core:** `packages/core/architecture`, `security`, `workflow`; темы публичных границ, проверки приёмки, ревью и секретов. Первым принимается CORE-ARCH-001 или согласованная замена без повторного использования ID.
- **3.2 TypeScript:** `packages/technologies/typescript/docs`; strict и runtime-boundaries. TS-TYPES-001 проходит отдельное ревью до первого среза.
- **3.3 Svelte SPA:** `packages/stacks/frontend/svelte-spa/docs`; композиция и выбранные FSD-границы. SVELTE-SPA-ARCH-001 проходит отдельное ревью до первого среза.
- **3.4 Frontend:** `packages/domains/frontend/architecture`, `accessibility`, `forms`; state ownership и состояния взаимодействия. Выполняется после Task 8, с отдельным owner approval.
- **3.5 Svelte:** `packages/technologies/svelte/docs`; derived state и lifecycle. Выполняется после Task 8, с отдельным owner approval.

Каждый набор проверяется своим catalog validation и review checklist;
accepted статусы подтверждаются владельцем, не наличием зелёного Schema-теста.

- [ ] Для core отдельно инвентаризировать границы/приёмку/ревью/секреты; для TypeScript — strict и runtime-boundaries; для Svelte SPA — композицию и explicit FSD boundary. Каждый набор получает свой reviewable commit. Для frontend и Svelte создать отдельные наборы содержания и review commits после вертикального среза, не считать их готовыми по одной строке плана.
- [ ] Подготовить inventory «тема ASC -> универсальный ID или local-only»: prefer-guard, arrow-body-style, padding preferences, alias names, auth/API бизнес-контракты и требование Superpowers остаются локальными, пока отдельно не согласован универсальный профиль. Матрица не объявляет все conventions ASC общепринятыми.
- [ ] Владелец проводит review конкретных формулировок core/TypeScript/Svelte SPA; автор фиксирует принятые/отклонённые решения. Expected: минимум 3 accepted требования распределены между этими тремя пакетами; без owner approval вертикальный срез не называется принятым стандартом и release блокируется.
- [ ] После approval изменить только подтверждённые statuses; прогнать catalog/resolver проверки actual catalogs и проверить отсутствие proposed среди активных. Expected: выбранный реальный профиль имеет минимум 3 активных ID, а не только accepted fixtures. Саму человеческую прозу не тестировать substring-assertions.
- [ ] Закоммитить нормативное принятие отдельно от инфраструктуры; сохранить явную ссылку на review. Остальные пакеты могут содержать proposed правила, но 0.1.0 не объявляется пустым каркасом с принятой спецификацией.

### Task 4: Совместимость и композиция профилей/модулей

**Files:** `packages/tooling/standards-cli/lib/selection/{validate,resolve}.js`, `packages/tooling/standards-cli/tests/selection.test.js`, `tests/fixtures/catalog/`.

**Interfaces:** Consumes catalogs Task 2 и provenance/namespace контракты выше. `validateSelection(value) -> Selection`; `resolveSelection(catalogs, selection) -> Resolved`. Selection содержит только package names; resolver сохраняет фактические точные версии validated catalogs в Resolved packages/source, проверяет package requires ranges и явное наличие необходимых пакетов. Сверку с declaration потребителя выполняет discovery Task 7, не чистый resolver. Profile traversal собирает declared зависимости; module dependencies обязаны быть выбраны явно.

- [ ] Написать `composes svelte-spa deterministically`: `assert.deepEqual(result.profiles, ['core', 'domains/frontend', 'stacks/frontend/svelte-spa', 'technologies/svelte', 'technologies/typescript'])`; перестановка catalogs сохраняет результат, требования не дублируются. Отказы: несовместимый range, missing package, duplicate profile/version, цикл, unknown ID, конфликт и exception без reason/decision. Fixture выбранного модуля включает только совместимый вариант; `assert.ok(!ids.includes('fixture-unselected'))`, `assert.ok(!ids.includes('fixture-proposed'))`.
- [ ] Запустить `node --test packages/tooling/standards-cli/tests/selection.test.js`; Expected: FAIL отсутствующего resolver.
- [ ] Реализовать semver-проверку пакетов, глобальную уникальность ID, детерминированный обход зависимостей и explicit exceptions. Формальные связи проверяются автоматически; противоречия в прозе — ревью. Deprecated/proposed не становятся активными обязательными правилами.
- [ ] Повторить selection/catalog tests; Expected: PASS всех сценариев, корректное исключение присутствует в result.exceptions.
- [ ] Добавить несовпадающую source version одного canonical profile и проверить PACKAGE_VERSION; при перестановке catalogs source attribution не меняется.
- [ ] Добавить resolver fixture с обоими namespaces `SVELTE` и `SVELTE-SPA`: требования `SVELTE-STATE-001` и `SVELTE-SPA-ARCH-001` получают разные точные source packages. Подмена владельца второго ID на Svelte-пакет отклоняется REQUIREMENT_NAMESPACE; результат не зависит от порядка, наличия или отсутствия SPA-каталога. Наличие дефисного префикса само по себе не является конфликтом namespace.
- [ ] Закоммитить только файлы задачи.

### Task 5: Безопасные пути и managed-реестр

**Files:** packages/tooling/standards-cli/lib/files/{safe-path,managed}.js; tests/{paths,managed}.test.js внутри CLI; docs/filesystem-safety.md.

**Interfaces:** safePath(root, relativePath, { allowMissing }) -> Promise<string>; readManaged(root) -> Promise<Managed|null>; planManaged(root, desiredFiles, provenance) -> Promise<WritePlan>; commitManaged(root, writePlan, io) -> Promise<void>. io — файловый адаптер с production default, для fault injection только в tests. WritePlan содержит preflight originals/staged content, а не произвольные пути из недоверенного manifest.

- [ ] Написать tests traversal, symlink components, malformed manifest, unknown managed target, manual edit, CRLF/LF и case alias. Пример отказа не меняет оригинал: assert.equal(await readFile(target, 'utf8'), original). Case-insensitive test на macOS сначала подтверждает свойство ФС реальной пробой; Linux тест проверяет явную CASE_COLLISION политику на normalized portable paths.
- [ ] Запустить node --test packages/tooling/standards-cli/tests/paths.test.js packages/tooling/standards-cli/tests/managed.test.js; Expected: RED отсутствующих новых managed операций.
- [ ] Preflight всех фиксированных owned paths, staged files в том же каталоге, exclusive create, rename документов, manifest последним; сохранять original backups для восстановления и отказа sync на неопознанной частичной записи. Повторять lstat/parent identity checks перед записью/rename, использовать O_NOFOLLOW где доступно. Fault injection подменяет parent на symlink между preflight и commit, операция отказывает до внешней записи.
- [ ] Проверить сбой второго rename: check сообщает MANAGED_DRIFT; backups исходных файлов доступны, recovery не затирает новую пользовательскую правку. Expected: тесты PASS и нет ложного обещания multi-file atomicity. Повторный lstat не устраняет все races: модель доверяет локальной ФС без злонамеренного конкурентного владельца; это ограничение явно описать, не заявлять абсолютную TOCTOU-защиту.
- [ ] Закоммитить только managed/path deliverable; не добавлять renderer или команды в эту задачу.

### Task 6: Чистый renderer инструкций

**Files:** packages/tooling/standards-cli/lib/documents/render.js; tests/render.test.js внутри CLI.

**Interfaces:** renderInstructions(resolved, documents, generatorVersion) -> string; consumes Resolved Task 4, без IO/Node discovery. Вывод UTF-8/LF, полный normative текст, IDs, source package/version, generatorVersion и exceptions.

- [ ] Написать tests: реальные accepted IDs из Task 3 присутствуют; proposed и невыбранные отсутствуют; exception явно обозначено, не как обязательное требование; порядок стабилен при входной перестановке; package version отличается от generator version.
- [ ] Запустить node --test packages/tooling/standards-cli/tests/render.test.js; Expected: RED отсутствующего renderer.
- [ ] Реализовать только чистый renderer и deterministic provenance. Исключённые требования и ручные проверки не выдавать за автоматически доказанное соответствие.
- [ ] Повторить render/catalog/selection suite; Expected: PASS и непустой real profile, подтверждённый owner review.
- [ ] Закоммитить renderer отдельно от managed IO.

### Task 7: Package discovery, команды и bin

**Files:** packages/tooling/standards-cli/lib/catalog/discover.js; lib/commands/{init,sync,check}.js; lib/setup/{plan,install}.js; bin/engist.js; tests/{discovery,cli,setup}.test.js; docs/diagnostics.md; CLI package.json.

**Interfaces:** discoverCatalogs(root, selection) -> Promise<Catalog[]>; planSetup(root, choices) -> Promise<SetupPlan>; initProject(root, options, adapters) -> Promise<Report>; syncProject(root, { dryRun, diff }), checkProject(root). Init options явно разделяют selection, noninteractive и installation consent; prompt/package-manager adapters injectable для tests. Exact flags и поддерживаемые package managers согласовать до runtime реализации. Bin engist init|sync|check; --dry-run и --diff — sync, --diff только вместе с --dry-run. root cwd — consumer. Stdout diff содержит только unified patch, stderr — diagnostics; IDE preview — терминал. Task 7 реализует standards setup без обещания отсутствующих tooling exports; Task 9.1 подключает готовые configs.

- [ ] Написать tests missing/undeclared package, installed version mismatch с прямой exact declaration, unsupported schema, external root symlink и exported metadata. Sync без документа/реестра создаёт оба; existing document без реестра, missing managed output, malformed/partial state и manual edit отклоняются. Check/dry-run read-only, entrypoint links обязательны. После dependency update при неизменном Selection check даёт MANAGED_DRIFT по версиям. Assert.deepEqual(afterCheckFiles, beforeCheckFiles); реальные команды дают 0/1 без private marker.
- [ ] Запустить node --test packages/tooling/standards-cli/tests/discovery.test.js packages/tooling/standards-cli/tests/cli.test.js; Expected: RED отсутствующих команд.
- [ ] TDD setup сценариев: existing engist.json, включая invalid JSON, даёт successful no-op до prompts/network; unsafe path/IO errors отказывают. Detected stack подтверждается, unknown stack выбирается вручную; только доступные catalogs/modules. Show plan до writes; cancel ничего не меняет; exclusive create не затирает появившийся во время wizard JSON. Configuration-only не запускает install; без package.json не создаётся приложение. Noninteractive missing choices — отказ без writes/network, defaults не разрешают install.
- [ ] Реализовать отдельную границу installer: только после явного согласия, exact reviewed versions, supported project package manager; compatible existing deps сохраняются, conflicts/upgrades требуют решения. Нет shell interpolation из choices, raw secret output или blind rollback. Failure сохраняет approved JSON/фактические dependency changes, возвращает nonzero с точными завершёнными шагами; recovery через manager и sync. Unit adapter tests плюс реальный offline-prepared tarball consumer проверяют dependency/lock изменения и отсутствие установки при отказе. Metadata resolution предшествует writes; cancellation до commit не меняет проект.
- [ ] Скомпоновать Tasks 4–6: sync создаёт docs/engineering-standards.md с полными принятыми текстами и managed record либо обновляет managed output. Init создаёт Selection и после validated install предлагает вызвать обычный sync, не собственный renderer. AGENTS/CLAUDE links добавляет человек. Validate HTTPS/local decision references и stable diagnostics. Sync/check не делают сетевых запросов/установки и не переписывают tooling configs.
- [ ] Реализовать preview только из безопасного WritePlan после полного preflight: sync --dry-run --diff не пишет документ, реестр, временные файлы, backups, package.json или lockfile. Добавить tests реального unified patch, пустого patch при отсутствии изменений, отказа --diff без --dry-run и сохранения ручных правок без вывода их содержимого. Dry-run проходит те же проверки совместимости/конфликтов, что запись. Обычный sync оставляет tracked diff для review/commit.
- [ ] Повторить suite; Expected: PASS включая symlink root пакета вне consumer, с запретом internal document escape и consumer writes outside root. Read tracked инструкции после удаления fixture node_modules; нельзя выдавать это за успешный CLI check без dependencies.
- [ ] Закоммитить commands/bin отдельно.

### Task 8: Вертикальные срезы на внешнем tarball consumer

#### Task 8.1: Технический срез до наполнения стандартов

Решение владельца 2026-10-12: сначала техническая платформа, затем содержание.
Tasks 4–7 используют synthetic fixtures вместо ещё не принятых actual catalogs;
упоминания accepted IDs из Task 3 в renderer tests на этом этапе относятся
к fixture IDs. Нормативные manifests в packages не меняют статусы ради тестов.

**Files:** tests/integration/technical-vertical-slice.test.js;
tests/fixtures/technical-vertical/; docs/architecture/technical-acceptance.md.

**Interfaces:** Реальные CLI tarball и test-only specification tarballs,
созданные из изолированных каталогов; resolver/renderer/managed/commands Tasks 4–7.

- [ ] Написать и выполнить RED external-consumer test: npm pack → offline
      install → настоящий bin engist init/sync/check; выбранные synthetic accepted
      ID попадают в документ, proposed и невыбранные ID не попадают.
- [ ] Проверить повторный sync, dry-run/diff без записи, manual edit → conflict,
      missing package и incompatible range → nonzero; после отказа файлы сохранены.
- [ ] Получить GREEN на Node 26.0.0 и 26.11.1; test-only пакеты не публикуются,
      actual package versions/statuses остаются неизменными. Этот срез разрешает
      продолжать технические Tasks 9–11, но не закрывает content/release gates.
- [ ] Закоммитить технический срез отдельно от нормативного принятия.

#### Task 8.2: Срез реальных стандартов после их принятия

**Files:** tests/integration/vertical-slice.test.js; tests/fixtures/vertical/{package.json,package-lock.json,engist.json,AGENTS.md}; docs/architecture/vertical-acceptance.md.

**Interfaces:** Реальные spec artifacts core/TypeScript/Svelte SPA, CLI и явно необходимые dependency profiles frontend/Svelte. Первые 3 принятых требования фокусируются на core/TypeScript/stack; не удалять зависимости стека ради трёх пакетов.

- [ ] Написать failing external-consumer test: npm pack -> locked install -> resolver -> sync renderer -> check; отдельно init configuration-only и явно разрешённая installer граница Task 7. Assert generated accepted IDs >= 3; manual edit приводит к MANAGED_CONFLICT, missing selected package к PACKAGE_MISSING. Workspace checkout не участвует в resolution.
- [ ] Запустить node --test tests/integration/vertical-slice.test.js; Expected: RED при отсутствии lock/consumer integration.
- [ ] Создать committed fixture lockfile с зафиксированными tool dependencies; local tarballs устанавливать через --offline и --ignore-scripts после явной cache preparation. Без заполненного cache offline test обязан отказать, не обращаться к registry неявно. Тестировать на Node 26.0.0 и 26.11.1, npm consumer и symlink-backed consumer.
- [ ] Повторить vertical test и npm test; Expected: PASS, не пустая инструкция из реальных accepted catalogs. Дополнить frontend/Svelte нормативные review commits из Task 3 после успешного среза.
- [ ] Закоммитить срез и acceptance evidence до первого нормативного релиза.

### Task 9: Импортируемые конфигурации отдельными пакетами

**Files:** `packages/tooling/eslint-config/{javascript,typescript,svelte-spa}.js`, `packages/tooling/prettier-config/{index,svelte}.js`, package.json обоих пакетов; `tests/integration/configs.test.js`, `tests/fixtures/{typescript,svelte-spa}/`.

**Interfaces:** ESLint exports `./javascript`, `./typescript`, `./svelte-spa`: factories `createConfig({ files, ignores } = {}) -> FlatConfig[]`. Prettier exports основной объект и `./svelte` с объявленным совместимым plugin. Нет ASC alias/guard/business-model assumptions. Конфигурации документируют проверяемые rule IDs и нормативные IDs; proposed правила не включаются как обязательные.

- [ ] Добавить fixtures: valid TS/Svelte проходят; negative examples отклоняются с ожидаемым ruleId, не parse/install error. `assert.equal(validMessages.length, 0)`; `assert.ok(invalidMessages.some((item) => { return item.ruleId === 'no-undef'; }))` для JS fixture. Prettier повторно форматирует без изменения и сохраняет явно заданный inline-пробел. Импортировать публичные exports из установленных tarballs вне workspaces.
- [ ] Запустить `node --test tests/integration/configs.test.js`; Expected: FAIL отсутствующих exports.
- [ ] Проверить официальную документацию совместимости, закрепить проверенные peer ranges и fixture lockfile; добавить небольшой набор correctness checks и форматирование. Не переносить весь ASC ESLint и prefer-guard. Tooling-only correctness checks имеют явную маркировку и не выдаются за принятое нормативное требование.
- [ ] Повторить configs tests; Expected: PASS valid и подтверждённый ожидаемый отказ negative. Проверить pack обоих config-пакетов без private fixtures.
- [ ] Проверить rule-contract coverage: каждый enabled rule сопоставлен с accepted нормативным ID либо explicit tooling-only записью в README/mapping; proposed normative rule не включается. TS 5 и Svelte fixture lockfile обязательны. Корневые ESLint/Prettier configs импортируют собственные пакеты для dogfooding.
- [ ] Закоммитить только файлы задачи.

### Task 9.1: Подключение ESLint/Prettier через init

**Files:** lib/setup/tooling.js и шаблоны внутри CLI; CLI tests/setup-tooling.test.js;
tests/integration/setup-tooling.test.js; docs/workflow.md.

**Interfaces:** Task 9 public exports/peer compatibility -> SetupPlan Task 7.
Отдельная подзадача после Task 9, не скрытая зависимость первой генерации.
Правила живут в пакетах; init создаёт только небольшие import configs.
Tool choices не добавляют undeclared fields в текущий Selection; installed
tool dependencies и локальные imports фиксируют подключение. Новый persistent
tooling schema при необходимости требует отдельного проектирования.

- [ ] RED tests: отсутствующие configs и scripts создаются только по явному
      выбору после установки/validation; существующие configs любых поддерживаемых
      форматов, scripts с теми же именами и пользовательские значения сохраняются.
      No-install/failed-install не оставляет активных imports/scripts на отсутствующие
      зависимости. Предлагаются lint, format:check, code:fix; исходники не меняются.
- [ ] Реализовать подтверждённое initial creation с exclusive create, безопасными
      путями и manual integration guidance при conflicts. package.json не теряет
      unrelated поля/scripts; concurrent change даёт отказ, не overwrite. Tool configs
      после создания project-owned, не managed output. Sync не перезаписывает их.
- [ ] GREEN external tarball test: generated imports действительно работают с
      совместимыми installed ESLint/Prettier/plugins; positive и negative code checks
      относятся к реальным rule IDs. Проверить local overrides/ignores, отсутствие
      противоречий formatter/lint и сохранение произвольных existing configs.
      Check не выполняет tools и не доказывает semantic conformity их executable configs.
- [ ] Закоммитить tooling connection отдельно; не объявлять завершённой по
      наличию документации или install-only теста.

### Task 10: Changesets и проверка release artifacts

После ревью PR #4 начальная настройка Changesets и корневых scripts выделяется
в отдельный инфраструктурный этап по
[дизайну monorepo tooling](../specs/2026-10-11-engist-monorepo-tooling-design.md).
Lerna/Nx отложены до реальных prerequisites и измеримой потребности.
Этап включает локальные current/projected manifest.requires checks,
прямую проверку равенства всех workspace versions в package-lock.json и
package.json до/после version:prepare, синхронизацию lockfile после version
и требования к base ref/history
для branch-relative status. Полный release preflight ниже остаётся Task 10;
ни инфраструктурный дизайн, ни его merge не означают завершение Task 10.

**Files:** .changeset/config.json, .changeset/*.md; scripts/releases/{validate,sync-metadata}.js; tests/integration/{releases,artifacts}.test.js; docs/architecture/releases.md.

**Interfaces:** Changesets отвечает за independent versions/changelogs, fixed/linked пусты, access public, baseBranch main, private root не версионируется. Самописный planRelease удалён из плана. validateRelease({ releases, manifests, availableVersions }) -> diagnostics проверяет наши semantic metadata/accepted gates, не повторяет versioning engine. Sync package.version в manifest детерминирован после Changesets version; check отклоняет drift, compatibility ranges не генерируются слепо из runtime dependencies.

- [ ] Написать tests на временной копии workspace, реально выполняющие Changesets: editorial patch, explicit minor для breaking 0.x, major после 1.0; unrelated config version неизменна; несовместимый dependent range требует его change/release; missing published dependency вне группы даёт отказ. Не предполагать специальную 0.x настройку без доказательства — применить minor changeset и проверить реальное поведение выбранной версии.
- [ ] Запустить node --test tests/integration/releases.test.js tests/integration/artifacts.test.js; Expected: RED отсутствующей release integration.
- [ ] Закрепить проверенную Changesets версию; добавить полный semantic preflight поверх локальных workspace проверок, manifest version synchronization, offline lockfile update и отдельные package tags по полному npm-имени. Каждая спецификация/конфиг/CLI упаковывается и импортируется в locked consumer; fixtures не публикуются.
- [ ] Повторить releases/artifacts/vertical suite; Expected: PASS, провал на пустом active set, mismatched manifest version или non-public access. Для будущего publication workflow предусмотреть npm trusted publishing/provenance; bootstrap первой публикации отдельно согласовать, credentials не копировать.
- [ ] Закоммитить candidate automation, без npm publish. Источники: https://changesets.dev/guide/config и https://docs.npmjs.com/trusted-publishers/.

### Task 11: CI и передача первого release candidate

**Files:** `.github/workflows/{ci,release-candidate}.yml`, `scripts/{check-documents,check-public-content}.js`, `tests/integration/public-content.test.js`, root scripts, `docs/architecture/release-checklist.md`.

**Interfaces:** Scripts `test`, `typecheck`, `lint`, `format:check`, `check:docs`, `check:public`, `pack:check`. Release candidate workflow проверяет конкретную группу и сохраняет отдельные tarballs, но не делает npm publish. Typecheck обязателен в verify job; ошибка типов блокирует подготовку release candidate.

- [ ] Добавить tests отсутствующей локальной ссылки, duplicate ID и маркера private key в синтетическом fixture: `assert.equal(report.ok, false)`. Проверить отсутствие publish команды в candidate workflow и allowlist публикации каждого пакета.
- [ ] Запустить `node --test tests/integration/public-content.test.js`; Expected: FAIL отсутствующих проверок.
- [ ] Реализовать document/public-content checks и CI: npm ci, typecheck, tests, lint, formatting, docs и tarball fixtures. Закрепить Actions по проверенным SHA на этапе настройки. Вручную проверить материалы/лицензии; автоматический scanner не доказывает отсутствие всех секретов.
- [ ] Запустить `npm ci`, `npm run typecheck`, `npm test`, `npm run lint`, `npm run format:check`, `npm run check:docs`, `npm run check:public`, `npm run pack:check`; Expected: exit 0 каждого шага. Перед PR провести whole-branch review по spec/plan; проверить CI PR. Содержательное ревью новых требований, npm authorization и одобрение release group — явные незавершённые условия публикации.
- [ ] Добавить CONTRIBUTING.md, SECURITY.md и CODEOWNERS (@antonsmolko). PR workflow: permissions contents: read, без pull_request_target и secrets; release OIDC permission только в отдельно одобренном publication job. CI проверяет собственные config imports, Node matrix [26.0.0, 26.11.1], locked/offline-prepared consumers и macOS case-insensitive scenario.
- [ ] После появления реального зелёного verify проверить branch-protection API и согласовать настройку main: PR required, verify required, запрет force-push/delete. Не менять защиту основной ветки в ходе этой остановленной итерации и не заявлять её настроенной.
- [ ] Закоммитить задачу и передать feature PR на ревью; не merge, не publish и не менять consumer asc-admin в этом PR.

### Task 11.1: Подготовка и одобренный запуск публикации

Дополнение к candidate-only Task 11. Подготовка процесса входит в техническую
платформу; реальный npm publish выполняется после content gates и отдельного
одобрения владельцем конкретной release group/revision.

**Files:** `.github/workflows/publish.yml`, `scripts/releases/publish.js`,
`tests/integration/publication.test.js`, `docs/architecture/releases.md`.

**Interfaces:** Проверенная release group и её tarballs из Tasks 10–11,
read-only validateRelease и явно одобренная revision → публикация выбранных
пакетов и полные package tags. Bootstrap первой npm публикации проектируется
отдельно с проверкой текущих требований registry; credentials не копируются.

- [ ] Согласовать письменный publication design/plan и npm authorization;
      реализация workflow не считается разрешением выполнить публикацию.
- [ ] Написать failing tests на fixtures: неодобренная revision/group, провал preflight,
      пустой actual accepted set и несовпадение tarball metadata блокируют
      обращение к publisher; approved synthetic fixture проверяет порядок
      действий с test publisher без отправки пакетов в registry.
- [ ] Запустить `node --test tests/integration/publication.test.js`;
      Expected: FAIL отсутствующей publication integration до runtime изменений.
- [ ] Реализовать отдельный publication workflow с минимальными permissions,
      без публикации из PR job; закрепить Actions и проверить выбранный механизм
      npm authorization/provenance по официальной документации.
- [ ] Проверить failure/recovery: nonzero перечисляет опубликованные пакеты,
      повторный запуск сверяет registry и не перезаписывает существующие версии.
      Test-only пакеты и private root не входят в release group.
- [ ] Повторить `node --test tests/integration/publication.test.js`,
      `npm run typecheck` и `npm test`; Expected: PASS всех сценариев и полного
      suite, без registry writes тестовых пакетов.
- [ ] Закоммитить подготовку процесса публикации и её тесты в issue-scoped
      ветке с префиксом коммита по AGENTS.md; не выполнять npm publish.
- [ ] Зафиксировать техническую готовность: workflow, preflight, fixture tests
      и инструкция первой публикации проверены. Реальный запуск остаётся pending
      до одобрения владельцем, actual accepted-среза Task 8.2 и npm authorization.
- [ ] После явного release approval выполнить первую публикацию, проверить
      точные версии установкой из registry во внешнем consumer и запуском CLI.

## Проверка плана и остановка

Текущее состояние после возобновления:

- Tasks 1–2: metadata exports, namespaces/canonical profile IDs, explicit schema-version diagnostics, bundled schema parity, отсутствие runtime dependency CLI на core и root-symlink regression реализованы. Baseline после PR #3 — 70 тестов (прежнее число 55 устарело); предыдущие прогоны проверили его на Node 22.13.0 и 24.14.0. Эти исторические результаты не заменяют свежий прогон при продолжении. Проверка включает пакеты, установленные из tarballs через явно offline install после npm ci, и names-only selection schema. Это проверка каталога и схемы, не будущих commands/config fixtures.
- Task 3.1: core boundaries/workflow/security тексты и inventory подготовлены в отдельном commit, все proposed.
- Task 3.2: runtime-boundaries и strict-checking TypeScript подготовлены в отдельном commit, оба proposed.
- Task 3.3: explicit FSD composition/boundaries подготовлены в отдельном commit, proposed.
- Owner content approval: pending, см. [decision record](../../architecture/content-approval.md). Всего девять proposed требований, ноль accepted. Tasks 3.4–3.5 и 4–11 не выполнены; следующий шаг — техническая платформа на fixtures по решению 2026-10-12. Содержательное ревью и нормативный релиз следуют после неё.

Уточнения после обсуждения PR #3: names-only project schema реализована.
Имя Engist и файл engist.json зафиксированы в дизайне, npm/repository identities
не переименованы. Init создаёт настройки, optional confirmed install и после
Task 9.1 — отсутствующие tool connection files/scripts; existing JSON останавливает
wizard. Sync отвечает за первую генерацию и обновление; --dry-run --diff доступен
для обоих. [Руководство CLI](../../../packages/tooling/standards-cli/docs/workflow.md)
описывает эти сценарии; commands/setup/configs остаются будущей реализацией.

Порядок продолжения уточнён владельцем 2026-10-12: отдельный monorepo tooling
этап → resolver Task 4 → managed Task 5 → renderer Task 6 → команды/standards
setup Task 7 → технический срез Task 8.1 → configs Task 9 → tooling setup
Task 9.1 → release preflight Task 10, CI Task 11 и подготовка публикации Task 11.1 → наполнение/owner acceptance
Task 3 → реальный accepted-срез Task 8.2 → одобренная публикация.
Content gates в Tasks 10–11 могут быть реализованы и проверены на fixtures;
проверка actual catalogs останется блокирующей до принятия настоящих требований.
Реальный запуск подготовленного publication workflow Task 11.1 требует
проверки npm authorization и явного одобрения выпуска.

Ни одно review замечание не считается реализованным в runtime только из-за исправления плана. [Ответы по всем пунктам](2026-10-11-engineering-standards-independent-packages-review-response.md) описывают состояние на момент остановленной review-итерации. Работа возобновлена после merge PR #2; фактические доработки и проверки фиксируются в следующих commits/PR. Canonical документы в engineering-standards; оригинал пользовательского review сохраняется. Owner approval нормативных текстов и разрешение публикации по-прежнему отдельные условия.
