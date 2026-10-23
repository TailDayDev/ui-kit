# Figma → библиотека → Storybook

Инструкция для агентов (и людей), которые ведут макет в Figma и должны переносить компоненты в Storybook, когда в макете они получают финальный статус.

Короткая версия: **Storybook не редактируется отдельно.** Он собирается из кода библиотеки (`src/**/*.stories.tsx`) и публикуется сам после каждого мержа в `main`. Обновить Storybook = обновить компонент и его story в этом репозитории через PR.

## 1. Как устроен Storybook

| Что                                   | Где                                                                                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Публичный Storybook (всегда доступен) | https://taildaydev.github.io/ui-kit-storybook/                                                                                                                  |
| Откуда собирается                     | stories этого репозитория: `src/components/<Name>/<Name>.stories.tsx`, `src/primitives/*`, `src/tokens/Tokens.stories.tsx`                                      |
| Кто публикует                         | workflow `.github/workflows/storybook-pages.yml` после каждого пуша в `main` → репозиторий `TailDayDev/ui-kit-storybook` (там только сборка, руками не трогать) |
| Через сколько обновится               | ~3–4 минуты после мержа                                                                                                                                         |
| Локально                              | `npm run storybook` → http://localhost:6006                                                                                                                     |
| Движок                                | Storybook 10, `@storybook/react-native-web-vite`: React Native компоненты рисуются в браузере через react-native-web                                            |
| Общая обёртка всех stories            | `.storybook/preview.tsx`: `ThemeProvider`, `SafeAreaProvider` с отступами iPhone (59/34), фон `bg.screen`, отступ 16                                            |
| Шрифты                                | Inter в `.storybook/public/fonts` (только для Storybook; в приложении шрифты свои)                                                                              |

Цепочка целиком:

```
Figma (страница 01 Components, переменные, стили)
  │  figma:export-components  ─→ figma/components/nodes.json (+ png-рендеры)
  │  figma-plugin             ─→ tokens/figma-export.json
  ▼
src/tokens (генерируются) ─→ src/components/<Name> (код + story + тест)
  ▼  PR → CI → ревью → merge в main
GitHub Pages: taildaydev.github.io/ui-kit-storybook   (автоматически)
  ▼  PR «chore: version packages» → merge
релиз vX.Y.Z (git-тег) для приложения
```

## 2. Источник правды и статус «финальный»

- Компоненты: файл Figma **TailDay**, страница **01 Components** (`JGXl0xHQB1XmQVG9qQgZbq`, node `10:3`). Токены: переменные и стили того же файла.
- У каждого компонента в Figma есть описание в формате:
  `Назначение: … | Не использовать: … | Код: <путь в приложении> · ждёт кода: … · в коде есть ещё: … | Статус: beta`
- **Финальный** = в описании компонента стоит **`Статус: stable`** (договорённость с дизайнером от 22.10.2026; настройка — [`figma/status-config.json`](../figma/status-config.json)). Статусы Dev Mode («Ready for dev» и т.п.) не учитываются.
- Любой другой статус (`beta` и т.д.) — черновик: в библиотеку **не переносим** и не меняем под него код. Если `figma:status` сообщает о неизвестном значении статуса — уточните у дизайнера, а не добавляйте его в финальные самостоятельно.

Поля описания для разработки:

- `Код:` — где компонент живёт в приложении сейчас (полезно сравнить поведение).
- `ждёт кода: …` — что в Figma уже решено, а в коде ещё нет → это нужно реализовать.
- `в коде есть ещё: …` — что есть в коде, но не нарисовано в Figma → не удалять, оставить как есть.

## 3. Что нужно один раз

- Node 22 (`.nvmrc`), `npm ci`.
- Python 3 (для генерации спецификаций).
- Figma personal access token: Figma → Settings → Security → Personal access tokens, scope **File content: read**. Токен нужен с **полного места** (Dev или Full): у мест View и Collab лимит Tier 1 — около 6 запросов в месяц к файлу и картинкам, а одна выгрузка делает около пяти (дерево, две пачки PNG, SVG). Полное место на Professional — 15 запросов в минуту ([лимиты REST API](https://developers.figma.com/docs/rest-api/rate-limits)). Токен хранится только в переменной окружения текущего терминала — не в файлах, не в аргументах команд, не в чатах.
- Для токенов дизайн-системы: плагин `figma-plugin/` импортирован в Figma desktop (Plugins → Development → Import plugin from manifest…). Подробнее — README, раздел «Токены».

## 4. Цикл обновления

Выполнять, когда дизайнер сообщил, что компоненты стали финальными, или по расписанию.

### 4.1. Выгрузить макет

```bash
git checkout main && git pull
git checkout -b figma/sync-$(date +%Y-%m-%d)
read -s FIGMA_TOKEN && export FIGMA_TOKEN && npm run figma:export-components; unset FIGMA_TOKEN
npm run figma:specs     # figma/components/specs/<Name>.txt — читаемая спецификация каждого компонента
npm run figma:icons     # src/icons/figma/Icon*.tsx из SVG
```

Если в Figma менялись переменные или стили (цвета, отступы, шрифты, тени): выгрузить их плагином в `tokens/figma-export.json` и выполнить `npm run tokens:build`. Отличия от Figma, которые оставлены осознанно, перечислены в `tokens/overrides.json` — генератор их печатает.

### 4.2. Понять, что делать

```bash
npm run figma:status
```

| Состояние          | Что делать                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `NEW`              | финальный компонент, которого нет в библиотеке → создать (4.3)                                                    |
| `CHANGED`          | финальный компонент изменился с прошлой синхронизации (или только что стал финальным) → сравнить и обновить (4.3) |
| `SYNCED`           | ничего                                                                                                            |
| `DRAFT` / `DRAFT*` | не трогать; `*` значит «черновик менялся» — только для информации                                                 |

Что именно поменялось, видно по diff спецификации: `git diff figma/components/specs/<Name>.txt` (размеры, отступы, цвета с подсказкой токена, текстовые стили, свойства компонента). Картинка компонента: `figma/components/png/<nodeId с '-' вместо ':'>.png`.

### 4.3. Перенести компонент

Один компонент = одна папка `src/components/<Name>/`: `<Name>.tsx`, `<Name>.types.ts`, `<Name>.stories.tsx`, `<Name>.test.tsx`, `index.ts`. Имя — как в Figma.

**Props из свойств Figma:**

| Свойство Figma                                             | Prop                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| VARIANT                                                    | union строк (`actionType: 'CheckIn' \| 'CheckOut'`), значения как в Figma |
| BOOLEAN                                                    | `is…` / `has…` (`hasBadge`), как в Figma                                  |
| TEXT                                                       | `string`                                                                  |
| INSTANCE_SWAP (иконка)                                     | `IconComponent` из `src/icons/figma`                                      |
| INSTANCE_SWAP (контент)                                    | слот `ReactNode`                                                          |
| растровая картинка (фото, иллюстрация, иконка типа задачи) | слот `ReactNode` / `renderImage` — библиотека не загружает картинки       |

**Значения — только из токенов** через `useTheme()` / `useThemedStyles()`: цвета `colors.*` (иначе `palette.*`), отступы `space[n]`, радиусы `radius.*`, обводки `stroke[n]`, текст `<Text variant="caption/bold">`, тени `shadows.*`. В спецификации рядом с каждым цветом указан подходящий токен. Если значения нет в токенах — сначала добавить переменную в Figma; временно — именованная константа с комментарием, откуда число.

**Нельзя в библиотеке:** запросы к API, стор, навигация, переводы (`translate`), загрузка картинок, бизнес-логика. Тексты, данные, картинки и колбэки — только через props. ESLint часть этого проверяет.

**Обводки:** в Figma обводка INSIDE не занимает места, в React Native занимает → вычесть толщину обводки из отступов, чтобы внешний размер совпал.

**Доступность:** `accessibilityRole`, `accessibilityLabel` (или prop для него), `accessibilityState`.

**Если меняется существующий компонент:** изменение props — это major; лучше добавить новый prop и пометить старый `@deprecated` + `warnDeprecated()` (см. README, «Устаревание API»).

Ссылки на примеры уже перенесённых из Figma компонентов: `TodayTaskTypeBadge`, `Chip`, `TodayTaskCard`, `FieldRow`. Общие правила переноса — [`docs/migration-guide.md`](migration-guide.md).

### 4.4. Story

- `title: 'Components/<Name>'`, `component: <Name>`.
- `args` по умолчанию = значения по умолчанию из Figma (свойства компонента в спецификации).
- **Одна story на каждый вариант Figma**, название — значение варианта, над ней JSDoc с исходным вариантом:
  ```tsx
  /** Figma actionType=CheckIn. */
  export const CheckIn: Story = {};
  /** Figma actionType=CheckOut. */
  export const CheckOut: Story = { args: { actionType: 'CheckOut' } };
  ```
- Плюс stories для состояний, которых нет в вариантах: disabled, loading, error, длинный текст.
- Картинки в stories — заглушки (`Icon` из `src/icons/figma` или серый блок): настоящие картинки передаёт приложение.
- Ширина: холст ~398pt (430 минус отступы). Не задавайте фиксированную ширину больше холста — правый край обрежется.

### 4.5. Проверить

```bash
npm run check             # lint + typecheck + tests + build
npm run storybook         # открыть story и сравнить с figma/components/png/<id>.png
```

Сравнивайте рендер story и png из Figma: размеры, отступы, цвета, шрифты, состояния. Особенности web-рендера, которые **не** являются ошибкой компонента (подробно — `docs/visual-review-2026-10-21.md`):

- нативные пикеры рисуются как HTML `<select>`, колёса не прокручиваются к значению;
- `flex: 0` + фиксированная ширина схлопывается в 0 — используйте `flexGrow: 0, flexShrink: 0`;
- `TextInput` без ширины на web очень широкий — задайте `minWidth`;
- синяя рамка фокуса браузера у полей ввода;
- нативные тени и анимации проверяются только на устройстве.

### 4.6. Зафиксировать и отдать

```bash
npm run figma:status -- --mark-synced <Name> [<Name> …]   # запомнить версию Figma, по которой собрано
npm run changeset                                          # тип версии + описание для разработчиков приложения
```

- Обновить таблицу покрытия в [`docs/figma-components.md`](figma-components.md) (новый компонент / осознанное отличие от Figma).
- Changeset: новый компонент — **minor**; визуальная правка под Figma без изменения API — **patch**; изменение/удаление props — **major**.
- Коммит на каждый компонент: `feat(<name>): …` или `fix(<name>): match Figma …`, затем PR в `main`.
- В описании PR: ссылка на узел Figma, скриншоты «Figma | Storybook», что сознательно отличается.
- После ревью владельца и зелёного CI — merge. Через несколько минут изменения в публичном Storybook. Релиз для приложения — когда смержат PR «chore: version packages».

## 5. Чего не делать

- Не править репозиторий `TailDayDev/ui-kit-storybook` и `storybook-static/` — это сборка.
- Не править сгенерированное: `src/tokens/generated/*`, `src/icons/figma/*`, `figma/components/specs/*` (перегенерировать командами выше).
- Не трогать приложение `frontend-mobile`: библиотека в него не интегрируется без отдельного решения.
- Не переносить компоненты со статусом `beta`.
- Не класть токены доступа в файлы, аргументы команд, коммиты и сообщения.
- Не менять визуал существующих компонентов «по ходу»: только то, что изменилось в финальном компоненте Figma.

## 6. Чек-лист агента

- [ ] `npm run figma:export-components`, `figma:specs`, `figma:icons` (+ токены, если менялись)
- [ ] `npm run figma:status` → список `NEW` / `CHANGED`
- [ ] для каждого: код по спецификации, props из свойств Figma, только токены
- [ ] story на каждый вариант + состояния, тесты (рендер, нажатие, disabled)
- [ ] `npm run check` зелёный, story сверена с png из Figma
- [ ] `figma:status -- --mark-synced <Name>`, таблица в `docs/figma-components.md`, changeset
- [ ] PR со скриншотами → ревью → merge → проверить https://taildaydev.github.io/ui-kit-storybook/
