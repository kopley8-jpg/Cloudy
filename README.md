# Cloudy

Экспериментальное приложение для визуального редактирования анимированных градиентов светодиодной ленты. Пользователь изменяет стопы градиента, а приложение мгновенно показывает результат на виртуальной ленте при помощи Reanimated-анимаций и SVG.

## Технологии

- **React Native 0.83 / React 19** — каркас мобильного приложения.
- **TypeScript** — строгая типизация всех слоёв.
- **Zustand** — стор `useLEDStore` в `src/entities/led-strip/model`.
- **react-native-reanimated**, **reanimated-color-picker** — анимации и выбор цветов.
- **react-native-svg** — визуализация LED-сегментов.
- **react-native-linear-gradient** — предпросмотр статичных градиентов.
- **Feature-Sliced Design (FSD)** — организационная парадигма кода.

## Быстрый старт

```sh
# установка зависимостей
npm install

# запуск Metro
npm start

# запуск платформ
npm run android
npm run ios
```

Перед `npm run ios` выполните `bundle install && bundle exec pod install` внутри каталога `ios`.

## Бранчинг-стратегия

1. **main** — стабильные релизные сборки. Прямые коммиты запрещены.
2. **develop** — основная ветка разработки. Вливаем только через PR из feature-веток.
3. **feature/<scope>** — изолированные задачи. Названия включают домен и краткое описание (например, `feature/led-preview-improvements`). После ревью feature мерджится в `develop`, затем при релизе `develop` сливается в `main` через fast-forward/merge commit.
4. **hotfix/<name>** — только для срочных багфиксов в `main`; после мерджа фикс обязательно переносится в `develop`.

## Кодстайл и FSD

Мы придерживаемся Feature-Sliced Design:

- **shared** — общие ресурсы (компоненты, хуки, модели). Глобальные UI-компоненты живут в `shared/components`, а инфраструктурные хуки вроде `useUI` — в `shared/hooks`.
- **entities** — бизнес-сущности. Модель LED-ленты (`useLEDStore`, типы) расположена в `entities/led-strip` и используется остальными слоями через публичные API (`index.ts`).
- **features** — пользовательские сценарии. Например, `features/led-control/ui` содержит `EffectEditor` и `EffectPreview`, а подкомпоненты находятся в `features/led-control/components`.
- **screens** — композиция features/entities в рамках экранов (например, `screens/main/ui/Main.screen.tsx`).

Правила:

1. Импорты только через публичные API (`@entities/...`, `@features/...`, `@shared/...`). Прямой доступ к «глубоким» файлам запрещён.
2. Локальные стили получают цвета через `useUI` (`src/shared/hooks/ui-context/useUI.ts`) вместо жёстко заданных hex.
3. Модели/сторы не лежат в `features/*/model`; все бизнес-модели размещаем в соответствующих `entities/*` (см. правило проекта «models live in entities»).
4. Общие компоненты должны быть без бизнес-логики; интерактивные обёртки находятся в features или screens.

## Полезные команды

```sh
npm run lint      # ESLint + Prettier
npm test          # Jest (по мере добавления тестов)
```

## Контакты

Вопросы по проекту и вкладу оформляйте через Issues/PR. Соблюдайте описанную выше структуру и бранчинг — это ускоряет ревью и сохраняет единый стиль.
