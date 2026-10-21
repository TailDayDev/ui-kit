# @tessera/ui-kit

Единственный источник UI для мобильного приложения на React Native: токены дизайн-системы, тема, примитивы и компоненты.

Внутри только «глупый» UI. Нет API-запросов, стора, навигации, i18n и бизнес-логики — все данные, тексты и колбэки приходят через props. ESLint запрещает импорт `axios`, redux, `@react-navigation/*` и i18n-библиотек, а также hex/rgb-цвета в компонентах.

- [Установка](#установка)
- [Подключение темы](#подключение-темы)
- [Токены](#токены)
- [Локальная разработка с приложением](#локальная-разработка-с-приложением)
- [Версии и релизы](#версии-и-релизы)
- [Устаревание API](#устаревание-api)
- [Как добавить компонент](#как-добавить-компонент)
- [Структура](#структура)

## Установка

Пакет раздаётся из git-тегов этого приватного репозитория. В каждом теге `vX.Y.Z` лежит готовая сборка (`lib/`), поэтому при установке ничего не собирается.

```bash
npm install "@tessera/ui-kit@github:TailDayDev/ui-kit#semver:^0.1.0"
```

В `package.json` приложения:

```json
"@tessera/ui-kit": "github:TailDayDev/ui-kit#semver:^0.1.0"
```

Нужен доступ на чтение к `TailDayDev/ui-kit`: локально через `gh auth login` или SSH-ключ, в CI приложения — через deploy key или токен.

Peer-зависимости, которые ставит приложение: `react >= 19`, `react-native >= 0.79`, `react-native-svg >= 15`.

Шрифты (Inter) подключает приложение. Библиотека ссылается на них по имени: `Inter-Regular`, `Inter-Medium`, `Inter-SemiBold`, `Inter-Bold`.

Тени задаются через `boxShadow`, поэтому нужна New Architecture.

## Подключение темы

Один раз у корня приложения:

```tsx
import { ThemeProvider } from '@tessera/ui-kit';

export const App = () => (
  <ThemeProvider>
    <RootNavigator />
  </ThemeProvider>
);
```

В компонентах:

```tsx
import { StyleSheet } from 'react-native';
import { Box, Text, useThemedStyles, type Theme } from '@tessera/ui-kit';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: { marginBottom: theme.space[2] },
  });

export const PetHeader = ({ name }: { name: string }) => {
  const styles = useThemedStyles(createStyles);
  return (
    <Box padding={4} background="surface" radius="md" shadow="block">
      <Text variant="headline/bold" style={styles.title}>
        {name}
      </Text>
    </Box>
  );
};
```

Без провайдера `useTheme()` возвращает светлую тему, поэтому компоненты рендерятся и в тестах.

## Токены

Значения берутся только по ключам, литералов в компонентах нет. Поэтому новую тему (например, тёмную) можно добавить, не трогая компоненты.

| Ключ                                | Откуда в Figma                                                       | Пример                           |
| ----------------------------------- | -------------------------------------------------------------------- | -------------------------------- |
| `theme.colors.<group>.<role>`       | коллекция `Semantic`                                                 | `colors.text.primary`            |
| `theme.palette.<name>`              | коллекция `Colors`                                                   | `palette.feedingBadgeBackground` |
| `theme.space[n]`                    | `Spacing`: `space/4` → `4`, `space/0_5` → `0.5`, `space/-2` → `neg2` | `space[4] = 16`                  |
| `theme.radius.<key>`                | `Radius`                                                             | `radius.sm = 8`                  |
| `theme.stroke[n]`                   | `Stroke`                                                             | `stroke[1] = 1`                  |
| `theme.typography.<group>.<weight>` | текстовые стили                                                      | `typography.headline.medium`     |
| `theme.shadows.<key>`               | стили эффектов                                                       | `shadows.block`                  |

Сначала используйте семантические цвета (`colors.*`). `palette` — для случаев, когда семантической роли пока нет.

### Синхронизация с Figma

Повторяемый процесс:

1. В Figma desktop: **Plugins → Development → Import plugin from manifest…** → выбрать `figma-plugin/manifest.json`. Это нужно один раз.
2. Открыть файл дизайн-системы и запустить плагин **UI kit — export tokens**. Он ничего не меняет в файле.
3. Сохранить скачанный JSON как `tokens/figma-export.json`.
4. `npm run tokens:build` — перегенерирует `src/tokens/generated/*` и выведет отличия от Figma.
5. Оформить PR с changeset: новый токен — minor, изменённое значение — patch.

Почему плагин, а не REST API: Figma Variables API доступен только на тарифе Enterprise.

Если значение в коде осознанно отличается от Figma, это записывается в `tokens/overrides.json` вместе с причиной. Генератор печатает каждое такое отличие. Чтобы Figma «победила», достаточно удалить запись.

CI запускает `npm run tokens:check` и падает, если сгенерированные файлы не совпадают с выгрузкой.

## Локальная разработка с приложением

### yalc (рекомендуется)

```bash
# в ui-kit: собрать и опубликовать в локальный yalc-стор
npm run yalc:publish

# в приложении, один раз
npx yalc add @tessera/ui-kit
npm install

# дальше после каждого изменения в ui-kit
npm run yalc:publish        # --push сам обновит все приложения, где пакет добавлен

# вернуть версию из git-тега
npx yalc remove @tessera/ui-kit && npm install
```

`yalc` копирует пакет в `.yalc/` приложения. Это обычная папка, поэтому Metro её видит и React в сборке один.

### `file:../ui-kit` (живые правки без пересборки)

В `package.json` приложения указывается `"@tessera/ui-kit": "file:../ui-kit"`. Metro нужно научить видеть папку вне проекта и брать `react`/`react-native` только из `node_modules` приложения, иначе в сборке окажется два React:

```js
// metro.config.js приложения
const path = require('path');
const uiKitRoot = path.resolve(__dirname, '../ui-kit');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  watchFolders: [uiKitRoot],
  resolver: {
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    // ui-kit/node_modules содержит свои копии react и react-native для тестов — их не берём.
    blockList: [
      new RegExp(
        `${uiKitRoot}/node_modules/(react|react-native|react-native-svg)/.*`,
      ),
    ],
  },
});
```

## Версии и релизы

Semver:

| Изменение                                                                            | Версия    |
| ------------------------------------------------------------------------------------ | --------- |
| Изменение props: удалён, переименован, сменился тип или смысл; удалён deprecated API | **major** |
| Новый компонент, новый необязательный prop, новый токен                              | **minor** |
| Исправление бага или визуала под Figma без изменения API                             | **patch** |

Процесс:

1. Ветка → PR. Шаблон PR содержит чек-лист.
2. `npm run changeset` — выбрать тип версии и описать изменение для разработчиков приложения. CI не пропустит PR, который меняет `src/` без changeset.
3. CI: format, lint, typecheck, tokens:check, тесты, сборка пакета и Storybook.
4. Ревью владельца библиотеки (`.github/CODEOWNERS`). Мерж только после его approve.
5. После мержа в `main` бот открывает PR «chore: version packages» с новой версией и `CHANGELOG.md`.
6. Мерж этого PR = релиз: CI собирает `lib/`, ставит тег `vX.Y.Z` и создаёт GitHub Release.
7. В приложении: обновить диапазон версии или выполнить `npm update @tessera/ui-kit`.

## Устаревание API

1. Пометить prop или компонент тегом `@deprecated` в JSDoc и указать, что использовать вместо него.
2. В dev-сборке вызывать `warnDeprecated('<Component>.<prop>', '<что использовать вместо>')`. Предупреждение показывается один раз за запуск и не попадает в release-сборку.
3. Changeset с типом **minor** и пометкой «Deprecated: …».
4. Удалять только в следующей **major**-версии, в описании changeset — инструкция по миграции.

## Как добавить компонент

Структура: `src/components/<Name>/` с файлами `Name.tsx`, `Name.types.ts`, `Name.stories.tsx`, `Name.test.tsx`, `index.ts`.

- [ ] Есть узел в Figma. Варианты, размеры и состояния (default, pressed, disabled, loading, error) сверены с ним.
- [ ] Компонент «глупый»: нет запросов, стора, навигации, переводов. Тексты, данные и колбэки приходят через props.
- [ ] Все значения из `useTheme()`/`useThemedStyles()`: цвета, отступы, радиусы, типографика, тени. Своих чисел нет. Если токена не хватает — сначала добавить его в Figma.
- [ ] Props описаны в `Name.types.ts` через `interface`, у каждого prop есть JSDoc. Нет `any`. Булевы props начинаются с `is…`/`has…` (кроме устоявшихся `disabled`, `loading`).
- [ ] Доступность: `accessibilityRole`, `accessibilityLabel` (или prop для него), `accessibilityState` (disabled, selected, checked, busy, expanded).
- [ ] Story показывает каждый вариант и каждое состояние.
- [ ] Тесты: рендер, нажатие, disabled (и loading/error, если есть).
- [ ] Экспорт из `src/components/<Name>/index.ts` и `src/components/index.ts`. Наружу — только через `src/index.ts`.
- [ ] Новая peer-зависимость (например, reanimated) добавлена в `peerDependencies` и описана в README.
- [ ] `npm run check` зелёный, changeset добавлен (**minor**).

## Структура

```
src/
  tokens/        токены (generated/ — из Figma, руками не править)
  theme/         ThemeProvider, useTheme, useThemedStyles, тип Theme
  primitives/    Box, Text, Icon, Pressable
  components/    компоненты, по папке на компонент
  utils/         внутренние хелперы (warnDeprecated)
  index.ts       единственная публичная точка входа
tokens/          выгрузка из Figma и осознанные отличия от неё
figma-plugin/    плагин выгрузки токенов
scripts/         генерация токенов, публикация тега
```

## Команды

| Команда                | Что делает                                                 |
| ---------------------- | ---------------------------------------------------------- |
| `npm run check`        | lint + typecheck + test + build                            |
| `npm run storybook`    | Storybook (web, react-native-web) на http://localhost:6006 |
| `npm run tokens:build` | сгенерировать токены из `tokens/figma-export.json`         |
| `npm run changeset`    | описать изменение для релиза                               |
| `npm run yalc:publish` | собрать и отдать в локальное приложение                    |

Stories используют формат CSF, поэтому их можно подключить и в нативный Storybook приложения (`@storybook/react-native`): добавить `../node_modules/@tessera/ui-kit/src/**/*.stories.tsx` в `stories` его `main`-конфига.
