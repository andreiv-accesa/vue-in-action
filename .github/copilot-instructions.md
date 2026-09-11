# Copilot Instructions for vue-in-action

## Core Principles

- **Domain-driven feature structure**: Each example in `src/examples/` is self-contained with no cross-feature imports.
- **Technology stack**: Vue 3 Composition API (`<script setup>`), TypeScript, Pinia, Vue Router, @vueuse/core, Lucide icons.
- **Feature isolation**: Examples can only import from `src/shared/`, `src/components/ui/`, and Vue/dependencies.
- **Code style**: No semicolons, single quotes, 100 char printWidth, type-safe `defineProps<>()` and `defineEmits<>()`, TypeScript required.

## Directory Structure

```
src/core/              App bootstrap and layout (App.vue, layouts/AppLayout.vue)
src/components/ui/     Shared UI (AppHeader.vue, icons.ts from @/components/ui/icons)
src/examples/*/        Self-contained features with own components/composables/types/styles
src/pages/             Route entry points (IndexPage.vue only)
src/shared/utils/      Shared utilities (used by 2+ examples)
src/shared/types/      Shared types (used by 2+ examples)
src/router/            Vue Router config
src/assets/            Global styles with CSS variables (--surface, --border, --accent, --text)
```

## New Example Checklist

1. Create `src/examples/my-feature/MyFeature.vue`
2. Add route to `src/router.ts` with `meta: { title, showBack }`
3. Update `src/pages/IndexPage.vue`
4. Optional: Create `Concept.md` documenting the feature

## Styling

- Use **scoped CSS** with custom CSS variables from `src/assets/style.css`
- Import Tailwind (`@import 'tailwindcss'`) for utility foundation; prefer CSS variables + custom classes over heavy utility chains
- Leverage `color-scheme: light dark` and `color-mix()` for theme support; no hardcoded colors
- Reference existing styles: `src/examples/task-list/TaskItem.vue`, `TaskCreateForm.vue`

## Icons & Components

- Import icons from `@/components/ui/icons` (barrel export of Lucide); see [lucide.dev](https://lucide.dev)
- `AppHeader` auto-renders via route `meta: { title, showBack }` in `AppLayout`
- Icon usage: `<ChevronLeft :size="20" aria-label="Go back" />`

## Reactivity & State

- Use **Pinia** with `defineStore` + Composition API; return refs, computed, functions
- Use **@vueuse/core** composables (esp. `useStorage` for persistence); don't reimplement
- Shared utilities in `src/shared/utils/` only when used by 2+ examples

## Development

### Accessibility & HTML

- Semantic HTML: `<button>`, `<input>`, `<header>`, `<main>`
- Icon buttons: `aria-label`; toggle buttons: `aria-pressed`; screen-reader-only: `sr-only` class
- Test keyboard navigation; see examples in `src/examples/task-list/`

### Patterns

- Study existing patterns: types in `task-list/types.ts`, utilities in `src/shared/utils/generateId.ts`, forms in `TaskCreateForm.vue`
- Reuse before creating new abstractions; keep changes focused

### Validation

```bash
pnpm lint        # oxlint + eslint --fix
pnpm type-check  # vue-tsc --build
pnpm test:unit   # vitest
pnpm format      # prettier
pnpm build
```

Fix all actionable warnings (including Tailwind canonicalization); no suppressions.

## Architecture Constraints

**Allowed imports:**

- Examples → `src/shared/`, `src/components/ui/`, Vue + deps (vue, vue-router, pinia, @vueuse/core, lucide-vue-next)
- Shared utils/components → Vue + deps only
- Shared components → other shared components

**Feature boundaries:**

- No cross-feature imports
- No direct state sharing between examples (use props/emits)
- No circular dependencies
- `src/shared/` code must be generic and feature-agnostic

**Import conventions:**

- Absolute: `@/` alias; example: `import { generateId } from '@/shared/utils/generateId'`
- Relative within feature: `import type { Task } from './types'`
- Never: `../../../` chains across features

## Troubleshooting

| Problem                 | Check                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Module not found        | `@/` paths correct? File exists? `pnpm install` run?                                                        |
| Component not rendering | Route meta has `title`? `AppLayout` in `App.vue`? Router configured in `main.ts`?                           |
| Icons not showing       | Import from `@/components/ui/icons` not `lucide-vue-next`? Correct names from lucide.dev? `:size` prop set? |

## Resources

[Vue 3](https://vuejs.org) • [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) • [Vue Router](https://router.vuejs.org) • [Pinia](https://pinia.vuejs.org) • [VueUse](https://vueuse.org) • [Lucide](https://lucide.dev) • [TypeScript](https://www.typescriptlang.org/docs/)
