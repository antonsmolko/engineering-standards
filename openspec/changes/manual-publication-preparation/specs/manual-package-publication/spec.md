# Manual package publication

## Purpose

Дать владельцу воспроизводимую ручную процедуру выпуска проверенных пакетов документов и безопасную репетицию до принятия реального содержания.

## ADDED Requirements

### Requirement: Поддерживаемая подготовка артефактов

Процесс SHALL использовать штатные средства version/plan/pack/publish и публиковать проверенные tarballs. Набор имён/версий, registry и revision MUST совпадать с конкретным owner approval. Новый release engine или caller-supplied approval shortcut MUST NOT вводиться.

#### Scenario: Проверенные tarballs
- **WHEN** оператор подготавливает выпуск
- **THEN** он сверяет plan и tarballs с пятью ожидаемыми пакетами, проверяет их во внешнем consumer и сохраняет hashes/evidence до разрешения публикации

#### Scenario: Расхождение артефактов
- **WHEN** состав, bytes, registry или revision отличаются от проверенного и одобренного набора
- **THEN** оператор останавливается до publish и повторяет затронутые проверки/approval

### Requirement: Ручные контрольные точки

Оператор SHALL остановить выпуск без актуальных owner decisions/applicability, accepted ID в core/TypeScript/Svelte SPA, аудита каждого tarball и отдельного разрешения точных пакетов/версий/revision/артефактов. Green CI и synthetic evidence MUST NOT заменять реальные решения. Автоматическое enforcement человеческих решений не обещается.

#### Scenario: Не хватает решения или аудита
- **WHEN** хотя бы один обязательный источник отсутствует, неоднозначен, устарел или недоступен
- **THEN** процедура завершается STOP до publish/tag с указанием недостающего evidence

#### Scenario: Изменение после approval
- **WHEN** изменились принятый текст, revision, plan или tarballs
- **THEN** прежнее разрешение не переносится автоматически, оператор повторяет проверки и получает актуальное разрешение

### Requirement: Репетиция без настоящего выпуска

Подготовка SHALL проверяться на temporary synthetic workspaces и установленных tarballs. Автоматические проверки и ручные negative/positive observations MUST записываться отдельно. #35 MUST NOT писать в registry, создавать настоящие теги, менять реальные версии/документы или выдавать fixture acceptance за owner decision.

#### Scenario: Полный synthetic набор
- **WHEN** технические проверки и все synthetic ручные контрольные точки пройдены
- **THEN** оператор доходит только до dry-run и сохраняет test-only evidence, не публикуя пакет

#### Scenario: Неполный synthetic набор
- **WHEN** поочерёдно удалены acceptance/applicability, аудит либо конкретное approval или подменён проверенный артефакт
- **THEN** ручная репетиция фиксирует STOP до publish/tag; автоматические тесты отдельно проверяют реальные упаковку, установку и headers

### Requirement: Права npm и частичный сбой

Инструкция SHALL требовать отдельной проверки npm identity/scope rights каждого имени и диагностики частичного сбоя. E404/network failure MUST NOT считаться доказательством разрешения публикации. Повтор SHALL учитывать actual registry/tag state, неизменность артефактов и актуальное owner approval.

#### Scenario: Часть пакетов опубликована
- **WHEN** фактический #26 завершается частичным успехом или неясным сетевым результатом
- **THEN** оператор останавливается, сохраняет logs/exit и состояние каждого пакета/тега; без read-only сверки registry и разрешённого remaining subset повтор не выполняется

### Requirement: Проверка реального выпуска отдельно

#26 SHALL сохранять revision, одобренные версии/артефакты, owner/audit links, hashes, результаты публикации/тегов и exact registry consumer installs. Завершение #35 MUST означать только готовность процедуры; content acceptance #20 и реальная публикация требуют отдельных решений.

#### Scenario: Репетиция завершена
- **WHEN** synthetic проверки и независимое review #35 успешны
- **THEN** реальные стандарты остаются proposed до owner acceptance, а выпуск #26 остаётся открытым

#### Scenario: Реальная публикация заявляется завершённой
- **WHEN** владелец выполняет #26
- **THEN** evidence включает установку exact опубликованных версий из registry и проверку документов/manual adoption во внешнем consumer
