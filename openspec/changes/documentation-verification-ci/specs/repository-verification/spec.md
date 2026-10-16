# Repository verification

## Purpose

Дать maintainer повторяемую проверку пяти пакетов документов на PR и main, сохраняя независимые решения о принятии содержания и реальном выпуске.

## ADDED Requirements

### Requirement: Повторяемый technical verify

PR в main и push main SHALL запускать clean установку зависимостей и root check на Node 26.0.0 и 26.11.1. Typecheck, workspace consistency и весь suite с реальными external-consumer сценариями MUST блокировать job при ошибке. Реальные версии 0.1.0 и документы MUST сохраняться.

#### Scenario: Успешная проверка
- **WHEN** корректный checkout с lockfile проверяется на обеих Node
- **THEN** CI устанавливает зависимости и выполняет те же root checks, включая реальные tarballs всех пяти пакетов и subset

#### Scenario: Ошибка проверки
- **WHEN** установка, typecheck, workspace check или тест завершаются с ошибкой
- **THEN** verification job не считается успешным

### Requirement: Проверенный состав документов

CI SHALL выводить штатный npm packed inventory пяти workspaces и проверять доступность документов/локальных ссылок существующими installed-artifact tests. Служебные/review материалы MUST NOT включаться в пакеты. Автоматические проверки MUST NOT подменять ручной аудит секретов/продуктовых сведений/прав перед выпуском.

#### Scenario: Служебный файл или битая ссылка
- **WHEN** пакет включает запрещённый review-файл или README ведёт к отсутствующему документу
- **THEN** существующие artifact tests блокируют verification с пакетом/путём в диагностике

### Requirement: Changesets получает Git-контекст

На PR штатный Changesets status SHALL использовать доступный base commit и историю до merge-base. Отсутствующий контекст MUST давать понятный nonzero до status, без fallback success. На push main SHALL проверяться текущие pending changesets. Локальный workspace metadata check MUST обходиться без remote refs.

#### Scenario: PR с доступным контекстом
- **WHEN** полный checkout содержит base commit и merge-base с HEAD
- **THEN** workflow выполняет branch-relative Changesets status относительно base commit

#### Scenario: Контекст отсутствует
- **WHEN** base commit или merge-base недоступны
- **THEN** шаг завершается nonzero с понятной диагностикой и не выдаёт успешный план

### Requirement: Synthetic accepted-content prerequisite

CI SHALL проверять на synthetic данных правило: минимум один accepted applicable непустой ID из каждого core, TypeScript и Svelte SPA. Fixtures MUST NOT принимать реальные документы или служить разрешением выпуска. Текущие proposed документы MUST NOT блокировать technical verify; нормативный выпуск сохраняет отдельный content gate.

#### Scenario: Полный synthetic accepted набор
- **WHEN** fixture содержит qualifying ID всех трёх обязательных пакетов
- **THEN** проверка prerequisites даёт положительный результат без изменения реальных документов

#### Scenario: Неполный или неприменимый набор
- **WHEN** один пакет отсутствует, ID пуст, status proposed или ID неприменим, либо один пакет продублирован вместо другого
- **THEN** prerequisites дают отрицательный результат; тест подтверждает отказ и technical suite проходит

### Requirement: Ограниченные права и руководство

Verification SHALL работать с минимальными read permissions без publish secrets, registry writes, tags и привилегированного исполнения PR. Contributor/security/ownership guidance SHALL быть доступно maintainer. Branch protection и реальное принятие/публикация MUST требовать отдельных решений.

#### Scenario: Исполнение PR
- **WHEN** workflow проверяет в том числе fork PR
- **THEN** используется обычный PR job без publish credentials/write permissions; публикация и теги не выполняются

#### Scenario: Материалы готовятся к выпуску
- **WHEN** technical verify зелёный
- **THEN** maintainer всё ещё должен получить принятие содержания, ручной аудит и явное разрешение конкретного выпуска по отдельному процессу
