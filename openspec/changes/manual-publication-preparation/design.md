# Design

## Context

База 495b1a1 после merge PR #39: пять документальных пакетов 0.1.0, Changesets 3.0.3, verification CI на Node 26.0.0/26.11.1 и 47 tests. #18 закрыта, #35 открыта. Все реальные standards proposed; owner decisions Pending. Мотивация — [proposal](proposal.md), критерии — [#35](https://github.com/antonsmolko/engineering-standards/issues/35) и [#26](https://github.com/antonsmolko/engineering-standards/issues/26).

## Goals / Non-Goals

Один результат — инструкция ручного выпуска с проверенной подготовкой артефактов и ручными stop points. Ручной Changesets разрешён в [публичном решении владельца](https://github.com/antonsmolko/engineering-standards/issues/1#issuecomment-6133308941), конкретный процесс выбирается в #35 по #26; 2026-10-17 владелец выбрал этот вариант в рабочем диалоге. Контроль человеческих решений выполняет оператор; автоматические проверки подтверждают только свойства артефактов. Release workflow, approval API/JSON schema и credential/settings changes не нужны.

## Decisions

### Baseline и минимальный механизм

Официальный [Changesets CLI](https://changesets.dev/guide/cli), maintained [upstream publish example](https://github.com/changesets/changesets/blob/main/.github/workflows/publish.yml) и [upstream pack tests](https://github.com/changesets/changesets/blob/main/packages/cli/src/commands/pack/__tests__/index.test.ts) разделяют подготовку и публикацию. Берём CLI-последовательность без Actions automation из примера.

Потребность — публиковать проверенные tarballs, а не пересобирать пакет после аудита. В установленном 3.0.3 есть `publish-plan --output`, `pack --from-publish-plan --out-dir` и `publish --from-pack-dir`. Альтернатива publish из workspace повторно пакует файлы; собственный staging/retry engine дублирует upstream. Native plan experimental: вся цепочка использует CLI 3.0.3 из lockfile, без собственного формата или ручного редактирования release entries. Обновление CLI требует повторной проверки подготовки.

### Инструкция для будущего #26

`docs/publication.md` будет на английском, с командами и stop points:

1. Выбрать чистый checkout точной ревизии с одобренными версиями. Проверить CI/full check и реальные документы. Первый выпуск не требует bump ради запуска процедуры; рабочие версии #35 сохраняются 0.1.0.
2. Проверить target registry, npm identity и право публиковать каждое из пяти имён. E404 не подтверждает scope rights; network/auth errors не означают свободное имя. Не записывать токены/OTP в evidence. Authentication/2FA готовит владелец отдельно в #26.
3. Получить native publish-plan и упаковать его в отдельный абсолютный каталог вне checkout с `npm_config_ignore_scripts=true`. Сверить plan и tarball metadata с ровно пятью workspace names/точными версиями. Private root, лишние publish/tag-only entries, чужие paths или неожиданный registry — STOP. План CLI — данные, не разрешение публикации; `--from-pack-dir` не совмещается с `--tag`.
4. Установить именно эти tarballs во внешний consumer: existing document/link checks, accepted-header helper из #18, README/manual adoption и версии. Owner отдельно подтверждает applicability, решения и reviewed revisions по content-approval.md. Записать ручной аудит каждого tarball на секреты, private/product content и лицензии/права.
5. Сохранить revision, native plan, tarballs, logs/check results и npm-style integrity `sha512-<base64>` каждого tarball. Получить owner-ссылку, одобряющую пять имён, версии, ревизию и эти артефакты. Native pack записывает SHA-256: проверить её соответствие файлу отдельно; SHA-512 связывает approval, проверку непосредственно перед publish и registry `dist.integrity`. Вычисления — штатными средствами, без нового hash API. Publisher сам не сверяет integrity. Изменение ревизии/плана/артефактов или неоднозначное/устаревшее/недоступное evidence — STOP, повторные проверки/аудит/approval.
6. После всех точек #26 выполняет `npm run changeset -- publish --from-pack-dir <absolute-pack-dir>` из того же checkout. Не запускать plain publish с повторным выбором пакетов. Upstream создаёт package tags по полным npm-именам; проверить каждый tag/revision и отправлять только одобренные refs, без массового `git push --tags`.
7. По требованиям #26 сверить `npm view <name>@<version> dist.integrity` каждого пакета с одобренным SHA-512 и проверить exact registry installs во внешнем consumer (документы/manual adoption/версии). Сохранить evidence; любой отказ означает незавершённый выпуск.

Источники решений — owner reviews/decision records и issue #26, аудит — запись проверяющего по конкретным tarballs. Оператор проверяет автора/ссылку/содержание/ревизию; caller flags и synthetic records не заменяют решений. Это организационные stop points: прямой npm доступ технически позволяет обойти инструкцию; CLI/CI не объявляются enforcement человеческих решений.

### Проверка подготовки в #35

Один TS integration test строит temporary synthetic fixture по реальным пяти workspaces и `.changeset/config.json`, как существующий changesets.test.ts. Документы synthetic, без lifecycle scripts. Native v1 plan fixture берётся по upstream pack tests: это вход штатного CLI, не свой API и не доказательство npm availability. Цепочка: fixture plan → `changeset pack --from-publish-plan ... --out-dir ...` → native SHA-256 integrity совпадает с файлом → отдельный SHA-512 для evidence → metadata/состав → installOffline → checkDocuments и один вызов checkAcceptedHeaders как связки. Negative-кейсы headers уже покрыты accepted-headers.test.ts и не повторяются. Проверить неизменность рабочего repo; команды публикации/тегов не вызываются, отдельный assertion «no tags» не нужен. Нет npm publish dry-run, изолированного registry и тестов upstream JSON validation.

Ручная репетиция в test-only разделе ledger: оператор проходит ту же инструкцию с synthetic документами и явно помеченными synthetic review/audit/approval материалами. По одному убрать accepted content, owner applicability/decision, аудит каждого артефакта, approval точных имён/версий/revision; отдельно поменять artifact после synthetic approval. Каждый раз записать STOP до publish и недостающий источник. Полный synthetic комплект означает «все stop points пройдены, publish не вызывался». Это ручные observations, не unit tests булевых разрешений и не owner decisions. Автоматические результаты записываются отдельно; строковые тесты инструкции не нужны.

### Частичный сбой: только инструкция для #26

Changesets publish не транзакционен: successful пакеты получают tags даже при общей ошибке. Протокол — STOP → сохранить stdout/stderr/exit и per-package/tag state → read-only `npm view <name>@<version> dist.integrity` по каждому пакету → проверить соответствие одобренному SHA-512. Штатный повтор той же `publish --from-pack-dir` с тем же неизменённым одобренным каталогом пропускает `failed:already-published`; отдельный remaining-subset/replan протокол не нужен. Повтор допускается в рамках актуального owner approval после сверки артефактов и registry/tag state; иначе требуется новое approval. Missing/неожиданный tag, integrity mismatch или неясный network/auth result — STOP с диагностикой. Не переиспользовать опубликованную версию для иных bytes, не редактировать plan и не пересобирать каталог для retry. Реальный retry и проверка тегов остаются #26; симуляция частичного сбоя в #35 не проводится.

## Risks / Trade-offs

- Ручные stop points можно пропустить → короткая инструкция и owner evidence; автоматический запрет npm/CLI не обещаем.
- Native plan experimental → одна закреплённая CLI, без подмены/редактирования plan.
- Упаковка и consumer tests не доказывают npm rights или publish/recovery success → actual проверки остаются #26.
- Registry state может измениться → перед выпуском read-only сверка, при расхождении STOP, без автоматической замены одобренного состава.

## Migration Plan

После утверждения: одна инструкция и один TS test, ссылки из README/CONTRIBUTING/.changeset guide, актуализация tooling/handoff. Проверка упаковки и ручных stop points, check на обеих Node/CI, независимое полное review и сверка issues/ссылок. Реальные package files, 0.1.0/IDs/drafts/owner decisions сохраняются. Откат — revert инструкции/test без registry effects. #35 открывает содержательное #20; #26 остаётся отдельным owner-approved выпуском. OpenSpec archive/branch protection — отдельные действия.
