# Design

## Context

База 495b1a1 после merge PR #39: пять документальных пакетов 0.1.0, Changesets 3.0.3, verification CI на Node 26.0.0/26.11.1 и 47 tests. #18 закрыта, #35 открыта без comments. Все реальные standards proposed; owner decisions Pending. Мотивация — [proposal](proposal.md), критерии — [#35](https://github.com/antonsmolko/engineering-standards/issues/35) и [#26](https://github.com/antonsmolko/engineering-standards/issues/26).

## Goals / Non-Goals

Один результат — исполнимая вручную инструкция выпуска, проверенная без настоящей публикации. Владелец выбрал ручной вариант 2026-10-17. Контроль человеческих решений выполняет оператор; автоматические проверки подтверждают только технические свойства артефактов. Release workflow, approval API/JSON schema, credential setup, изменения repository settings и новые consumer capabilities не нужны.

## Decisions

### Baseline и минимальный механизм

Официальный [Changesets CLI](https://changesets.dev/guide/cli), maintained [upstream publish example](https://github.com/changesets/changesets/blob/main/.github/workflows/publish.yml) и [upstream pack tests](https://github.com/changesets/changesets/blob/main/packages/cli/src/commands/pack/__tests__/index.test.ts) уже разделяют version/plan/pack/publish. Берём CLI-последовательность, без Actions automation из примера. [npm publish](https://docs.npmjs.com/cli/v11/commands/npm-publish/) поддерживает tarball и dry-run.

Конкретная потребность — публиковать проверенные tarballs, а не пересобирать пакет после аудита. В установленном 3.0.3 есть `publish-plan --output`, `pack --from-publish-plan --out-dir` и `publish --from-pack-dir`. Альтернатива publish из workspace повторно пакует файлы; собственный staging/registry/retry engine дублирует upstream. Native plan experimental: используем только CLI 3.0.3 из lockfile во всей цепочке, не создаём своего формата и не редактируем release entries вручную. Обновление CLI требует повторной репетиции.

### Ручная последовательность для будущего #26

Инструкция `docs/publication.md` будет на английском, с командами и явными stop points:

1. Выбрать чистый checkout точной ревизии. Проверить CI/full check и реальные документы. Если нужны version changes — отдельная одобренная version-preparation PR по существующему guide, затем npm lock sync/check. После потребления changesets добавить committed `add --empty`, если это нужно PR CI. Первый выпуск не требует bump только ради запуска процедуры; версии выбираются владельцем отдельно.
2. Для реального выпуска проверить target registry, npm identity и право публиковать каждое из пяти имён; E404 не подтверждает scope rights, network/auth errors не означают свободное имя. Не записывать токены/OTP в evidence. Authentication/2FA готовится владельцем отдельно в #26; #35 её не меняет.
3. На этой ревизии получить native publish-plan и упаковать его в отдельный абсолютный каталог вне checkout. Использовать `npm_config_ignore_scripts=true`. Сверить plan и tarball metadata с ровно пятью ожидаемыми workspace names/точными версиями; private root, лишние publish/tag-only entries, чужие paths или неожиданный registry — STOP. Plan от CLI — данные, не разрешение публикации.
4. Установить именно эти tarballs во внешний consumer: existing document/link checks, accepted-header helper из #18, README/manual adoption и версии. Owner отдельно подтверждает applicability, решения и reviewed revisions по content-approval.md. Записать ручной аудит каждого tarball на секреты, private/product content и лицензии/права.
5. Сохранить revision, native plan, tarballs, их SHA-256 и logs/check results; получить отдельную owner-ссылку, явно одобряющую пять имён, версии, ревизию и эти артефакты. Технический hash можно вычислить штатными средствами; native pack записывает integrity, но publisher не гарантирует проверку её соответствия файлу. Оператор сравнивает hashes до approval и непосредственно перед publish. Изменение ревизии/плана/артефактов или неоднозначное/устаревшее/недоступное evidence — STOP, повторные проверки/аудит/approval. Нет `approved=true` или принятия fixture record за решение владельца.
6. Только после всех точек #26 выполняет `npm run changeset -- publish --from-pack-dir <absolute-pack-dir>` из того же checkout. Не запускать plain publish с повторным выбором пакетов. Upstream создаёт package tags по полным npm-именам; проверить каждый tag и его revision, отправлять только явно одобренные refs. Никаких массовых `git push --tags`.
7. Проверить exact registry installs пяти опубликованных версий во внешнем consumer, actual registry integrity/metadata и те же документы/adoption; сохранить evidence. Любой отказ означает незавершённый выпуск.

Данные ручных решений — существующие owner reviews/decision records и release issue #26, аудит — запись проверяющего по конкретным tarballs. Оператор проверяет автора/ссылку/содержание/ревизию, а не доверяет переданным caller flags. Это организационная контрольная точка; пользователь с прямыми npm правами технически может обойти инструкцию. CLI/CI не объявляются enforcement человеческих решений.

### Репетиция #35

Автоматический TS integration test использует temporary synthetic workspaces без lifecycle scripts, native v1 plan fixture по upstream tests и pinned 3.0.3. Fixture plan — тестовые входные данные штатного CLI, не публичный API/каталог и не evidence npm availability. `changeset pack --from-publish-plan ...` не запрашивает реальные имена в registry. Проверить полученные package metadata/состав, установку через existing installOffline, checkDocuments и checkAcceptedHeaders (accepted synthetic set / proposed not-ready), `npm publish <fixture-tarball> --dry-run --ignore-scripts`. Использовать изолированные npm config/cache, закрытый registry endpoint без credentials и ограниченные retries/timeouts; npm dry-run может читать registry metadata, его exit 0 не доказывает доступность registry или права; реальный `changeset publish`, version/tag команды и registry writes в #35 не выполняются. Проверить отсутствие Git tags и изменений рабочего repo. Не тестировать upstream field validation заново.

Ручная репетиция в отдельном test-only разделе ledger: оператор проходит тот же runbook с synthetic документами и однозначно помеченными synthetic review/audit/approval материалами. По одному убрать accepted content, owner applicability/decision, аудит каждого артефакта, approval точных имён/версий/revision; отдельно поменять artifact после synthetic approval. Каждый раз зафиксировать STOP до publish, недостающий источник и отсутствие вызова publish/tag. При полном synthetic комплекте допустим только dry-run, не реальный выпуск. Это выполненные ручные проверки, не unit tests булевых «разрешений» и не реальные owner decisions. Автоматические результаты и ручные observations записываются раздельно; строковые тесты инструкции не нужны.

### Частичный сбой и evidence

Changesets publish не транзакционен: несколько пакетов/тегов могут успеть создаться до exit 1. Инструкция требует остановки, сохранения полного stdout/stderr/exit и состояния каждого approved name@version/tag, read-only проверки registry и hashes. Не откатывать registry и не переиспользовать version для иных bytes. Перед повтором сверить уже опубликованные артефакты, оставшийся exact subset и разрешение владельца; не редактировать native plan ради обхода проверки и не запускать retry вслепую. Если нужен новый plan/pack, повторно связать его с approved unchanged tarballs либо получить новое approval. Неоднозначный registry/network/auth result — STOP. Rehearsal частичного сбоя — явно simulated scenario с фиксацией ожидаемых действий, не заявление о реально выполненной публикации. Actual failure/recovery проверяются по фактическим результатам #26.

## Risks / Trade-offs

- Ручные проверки могут быть пропущены → короткие stop points и обязательное owner evidence; автоматического запрета со стороны npm/CLI не обещаем.
- Native plan — experimental input/output → одна закреплённая версия CLI, plan не подменяется чужими файлами; используем реальные upstream commands.
- Dry-run не доказывает npm rights, registry success или tag/recovery поведение → эти проверки обязательны на actual #26; сохраняем их как отдельные gates.
- Registry state может измениться между plan и publish → оператор перед выпуском перепроверяет target/availability и останавливается при расхождении, а не меняет одобренный состав автоматически.

## Migration Plan

После утверждения этого плана добавить одну инструкцию и TS test, ссылки из README/CONTRIBUTING/.changeset guide; актуализировать tooling/handoff. Провести автоматическую и ручную репетиции, check на обеих Node/CI, независимое полное review и сверку issues/ссылок. Реальные package files, 0.1.0/IDs/drafts/owner decisions сохраняются. Откат — revert инструкции/test без registry effects. Завершение #35 открывает содержательное #20; #26 остаётся отдельным owner-approved выпуском. OpenSpec archive/branch protection — отдельные действия.
