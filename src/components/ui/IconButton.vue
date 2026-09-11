<template>
  <button
    :class="['icon-btn', `icon-btn--${type}`]"
    :aria-label="ariaLabel"
    :aria-pressed="ariaPressed"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  ariaLabel?: string
  type?: 'favorite' | 'edit' | 'remove' | 'default'
  ariaPressed?: boolean
}>()
</script>

<style scoped>
.icon-btn {
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.icon-btn:hover {
  background: color-mix(in srgb, var(--border) 50%, transparent);
}

.icon-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.icon-btn--favorite:hover {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
}

.icon-btn--edit:hover {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
}

.icon-btn--remove:hover {
  color: var(--danger);
  background: color-mix(in srgb, var(--danger) 15%, transparent);
}

.icon-btn--default:hover {
  color: var(--text);
  background: color-mix(in srgb, var(--text) 10%, transparent);
}
</style>
