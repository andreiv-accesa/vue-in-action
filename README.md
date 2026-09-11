# Vue 3 Learning Examples

A collection of interactive Vue 3 examples demonstrating Composition API, state management, form handling, and component architecture.

**Based on:** [Vue in Action Course](https://accesa.udemy.com/course/vue-in-action/learn/lecture/43452932#overview)

## Quick Start

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server (http://localhost:5173)
pnpm api         # (Optional) Start mock API on port 3000
```

## Project Structure

```
src/
├── core/               # App bootstrap & layout
├── components/ui/      # Shared UI & icons (Lucide)
├── examples/           # Self-contained feature examples
├── pages/              # Route entry points
├── shared/             # Shared utils & types
└── assets/style.css    # Global CSS variables
```

Each example is self-contained with no cross-feature imports.

## Commands

```bash
pnpm dev         # Development server
pnpm build       # Production build
pnpm test:unit   # Run tests
pnpm type-check  # TypeScript validation
pnpm lint        # Lint & auto-fix
pnpm format      # Prettier format
```

## Adding a New Example

1. Create `src/examples/my-feature/MyFeature.vue`
2. Add route to `src/router.ts` with `meta: { title, showBack }`
3. Update `src/pages/IndexPage.vue`
4. (Optional) Create `Concept.md` documenting the feature

See existing examples for patterns.

## Architecture

**Key rules:**

- ✅ Features import from `src/shared/` and `src/components/ui/`
- ❌ Features cannot import from other features
- Use Vue Router `meta` for page titles and back button
- CSS variables for theming (see `src/assets/style.css`)
- TypeScript required for all components

**Feature structure:**

- Own components, types, and state
- `ref()` for local state or `useStorage()` for persistence
- No circular dependencies

## Code Style

- No semicolons
- Single quotes
- 100 char line width
- Vue 3 Composition API with `<script setup>`
- TypeScript with `defineProps<>()` and `defineEmits<>()`

## Resources

- [Vue 3](https://vuejs.org) • [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia](https://pinia.vuejs.org) • [VueUse](https://vueuse.org)
- [Lucide Icons](https://lucide.dev) • [TypeScript](https://www.typescriptlang.org)
