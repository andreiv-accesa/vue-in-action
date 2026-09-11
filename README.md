# Vue 3 Learning Examples

A modern, well-structured Vue 3 application demonstrating practical patterns, best practices, and architectural principles through interactive examples.

## Overview

This application provides hands-on learning examples for Vue 3 developers. Each example is self-contained and demonstrates specific Vue 3 concepts such as composition API, reactive state management, form handling, and component communication.

**What you'll learn:**
- Vue 3 Composition API with `<script setup>` syntax
- Reactive state management and computed properties
- Form validation and handling
- Component composition and reusability
- TypeScript integration with Vue
- CSS variables and modern styling approaches
- Local storage persistence with VueUse
- Accessibility best practices

## Architecture

The application follows a **domain-driven feature structure** designed for scalability and maintainability:

```
src/
├── core/
│   ├── App.vue                    # Root component wrapping AppLayout
│   └── layouts/
│       └── AppLayout.vue          # Global app shell with header
├── components/
│   └── ui/
│       ├── AppHeader.vue          # Reusable navigation header
│       ├── icons.ts               # Lucide icons barrel export
│       └── (future shared components)
├── examples/
│   ├── task-list/                 # Task management CRUD example
│   ├── image-gallery/             # Image list management example
│   ├── can-you-drive/             # Computed properties & lifecycle hooks
│   └── event-registration/        # Event data management example
├── pages/
│   └── IndexPage.vue              # Home page with example navigation
├── router/
│   └── (routing configuration)
├── shared/
│   ├── utils/                     # Shared utility functions
│   │   ├── generateId.ts
│   │   └── getHighlightedSegments.ts
│   └── types/
├── assets/
│   └── style.css                  # Global styles & CSS variables
└── main.ts                        # Application bootstrap
```

### Directory Guide

**`core/`** - Application bootstrap and global layout
- `App.vue`: Root component that mounts AppLayout
- `layouts/AppLayout.vue`: Global layout wrapper providing consistent header and main content area

**`components/ui/`** - Reusable UI components and patterns
- `AppHeader.vue`: Navigation header with back button support
- `icons.ts`: Barrel export of commonly used Lucide icons
- Shared form components, buttons, etc. (to be added as needed)

**`examples/`** - Feature/domain-driven structure
- Each example is a self-contained feature demonstrating Vue patterns
- Examples include their own components, types, and utilities
- Can be added/removed independently without affecting other examples

**`pages/`** - Route entry points
- `IndexPage.vue`: Landing page listing all available examples

**`shared/`** - Truly shared code across features
- `utils/`: Utility functions used by multiple examples
- `types/`: Type definitions shared across the application

**`assets/`** - Static resources
- `style.css`: Global styles using CSS variables for theming

## Running the Project

### Prerequisites
- Node.js 18+ 
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Optional: Start the JSON Server for mock API data (port 3000)
pnpm api
```

### Development

```bash
# Start the development server (http://localhost:5173)
pnpm dev
```

### Build

```bash
# Create a production build
pnpm build

# Preview the production build
pnpm preview
```

### Testing & Quality

```bash
# Run unit tests
pnpm test:unit

# Type check
pnpm type-check

# Lint and auto-fix issues
pnpm lint

# Format code
pnpm format
```

## Adding a New Example

To create a new learning example:

### 1. Create the Feature Directory

```bash
mkdir -p src/examples/my-feature
cd src/examples/my-feature
```

### 2. Create Components

```typescript
// MyFeature.vue (main component)
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <h2>My Feature</h2>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<style scoped>
/* Use CSS variables from src/assets/style.css */
button {
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>
```

### 3. Add Routing

Update `src/router.ts`:

```typescript
import MyFeature from '@/examples/my-feature/MyFeature.vue'

// Add to routes array:
{
  path: '/examples/my-feature',
  name: 'my-feature',
  component: MyFeature,
  meta: { title: 'My Feature', showBack: true },
}
```

### 4. Update Index Page

Add entry to the examples list in `src/pages/IndexPage.vue`:

```typescript
{
  id: 'my-feature',
  path: '/examples/my-feature',
  title: '06 My Feature',
  description: 'Brief description of what this demonstrates',
}
```

### 5. (Optional) Add Concept Documentation

Create `src/examples/my-feature/Concept.md` documenting:
- What this example teaches
- Key Vue 3 concepts demonstrated
- Functional requirements
- Workflow diagrams (using Mermaid)

## UI Conventions

### Icons

This project uses **Lucide Vue Icons** for a consistent, accessible icon system.

**Import and use icons:**

```typescript
import { ChevronLeft, Star, Trash2 } from '@/components/ui/icons'
```

**In templates:**

```vue
<button aria-label="Delete">
  <Trash2 :size="20" />
</button>
```

**Common icons:**
- Navigation: `ChevronLeft`, `ChevronRight`, `Home`, `Menu`
- Actions: `Plus`, `Edit`, `Trash2`, `Search`
- Status: `Check`, `Star`, `AlertCircle`

See [lucide.dev](https://lucide.dev) for the complete icon library.

### Application Header

The `AppHeader` component appears on all pages and provides:
- Application title on home page
- Example title + back button on example pages

The header is automatically rendered by `AppLayout` based on route metadata:

```typescript
// In router.ts
meta: { 
  title: 'My Example',
  showBack: true 
}
```

### Styling

Use **CSS variables** for consistent theming. Variables are defined in `src/assets/style.css`:

```css
/* Colors */
--text
--text-secondary
--surface
--accent
--border

/* Responsive containers */
max-width: 1200px
```

**Example:**

```vue
<style scoped>
.card {
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.card:hover {
  background-color: color-mix(
    in srgb,
    var(--accent) 10%,
    var(--surface)
  );
}
</style>
```

### Accessibility

All components should follow accessibility standards:

- Use semantic HTML (`<button>`, `<input>`, `<header>`, etc.)
- Provide `aria-label` for icon-only buttons
- Use `aria-pressed` for toggle buttons
- Test with keyboard navigation
- Ensure sufficient color contrast

## Architectural Rules

### Allowed Dependencies

- ✅ Features can import from `src/shared/`
- ✅ Features can import from `src/components/ui/`
- ❌ Features **cannot** import from other features
- ✅ Shared utilities can import from Vue and dependencies only
- ✅ Shared components can import from other shared components

### Feature Boundaries

Each example in `src/examples/` is a complete, self-contained feature:

- **Own components**: Keep feature-specific components in the feature folder
- **Own state**: Use component-level `ref()` or VueUse `useStorage()` for persistence
- **Own types**: Define types in the feature folder (e.g., `src/examples/task-list/types.ts`)
- **No cross-feature imports**: Examples must not import from other examples

### Shared Code Expectations

Code goes in `src/shared/` only when:
- Used by 2+ examples
- Truly reusable and generic
- Stable and unlikely to change

**Before extracting:**
1. Ensure the code is actually used by multiple features
2. Make it generic (remove feature-specific logic)
3. Add documentation/types
4. Update this README with new shared utilities

## Development Workflow

### Code Quality Checks

Before committing, ensure all checks pass:

```bash
pnpm lint      # ESLint + Oxlint with auto-fix
pnpm format    # Prettier
pnpm type-check # TypeScript validation
pnpm test:unit # Unit tests
pnpm build     # Production build
```

### Code Style

- **No semicolons** - Prettier removes them automatically
- **Single quotes** - For consistency with the project standard
- **100 character line width** - For readability
- **Vue 3 Composition API** with `<script setup>` - Required for all new components
- **TypeScript** - All components and utilities must be typed

### Component Patterns

```typescript
<script setup lang="ts">
// Use defineProps with type safety
defineProps<{
  title: string
  count?: number
}>()

// Use defineEmits with type safety
const emit = defineEmits<{
  update: [value: string]
  close: []
}>()

import { ref, computed } from 'vue'

const value = ref('')
const uppercase = computed(() => value.value.toUpperCase())
</script>
```

## Troubleshooting

**Port 5173 already in use?**
```bash
pnpm dev -- --port 3001
```

**Build fails with import errors?**
- Run `pnpm install` to ensure dependencies are installed
- Check that all imports use correct paths with `@/` alias

**Tests failing?**
```bash
# Clear Vitest cache
rm -rf .vitest

# Run tests with verbose output
pnpm test:unit -- --reporter=verbose
```

## Resources

- [Vue 3 Documentation](https://vuejs.org)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [VueUse](https://vueuse.org) - Composable utilities
- [Lucide Icons](https://lucide.dev) - Icon library
- [Tailwind CSS](https://tailwindcss.com) - Utility CSS
- [TypeScript Documentation](https://www.typescriptlang.org)

## License

This project is open source and available for learning purposes.
