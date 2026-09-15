<script setup lang="ts">
import { ref } from 'vue'
import { Trash2 } from '@/components/ui/icons'
import { generateId } from '@/shared/utils/generateId'
import IconButton from '@/components/ui/IconButton.vue'

type Photo = {
  id: string
  url: string
  isFavorite: boolean
}

const photos = ref<Photo[]>([])
const newPhotoUrl = ref('')

function handleSubmit() {
  if (!newPhotoUrl.value) return

  photos.value.push({
    id: generateId(),
    url: newPhotoUrl.value,
    isFavorite: false,
  })

  newPhotoUrl.value = ''
}

function toggleFavorite(photo: Photo) {
  photo.isFavorite = !photo.isFavorite
}

function removePhoto(index: number) {
  photos.value.splice(index, 1)
}
</script>

<template>
  <form class="flex gap-2 items-center w-full">
    <label for="photo-url-input" class="sr-only">Image URL</label>
    <input
      id="photo-url-input"
      v-model.trim="newPhotoUrl"
      type="url"
      placeholder="Enter image URL"
      class="flex-1 px-3 py-2 border border-(--border) rounded bg-(--surface) text-(--text) focus-visible:outline-2 focus-visible:outline-(--accent)"
      required
    />
    <button
      type="submit"
      :disabled="!newPhotoUrl"
      class="px-4 py-2 bg-(--accent) text-white rounded font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
      @click="handleSubmit"
    >
      Upload Photo
    </button>
  </form>

  <hr class="my-6 border-t border-(--border)" />

  <main class="w-full">
    <ul
      v-if="photos.length"
      class="grid gap-4 p-0 m-0 list-none"
      style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))"
      aria-label="Photo gallery"
    >
      <li
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="group relative overflow-hidden rounded border border-(--border)"
        style="aspect-ratio: 16 / 9"
      >
        <img
          :src="photo.url"
          :alt="`Gallery image ${index + 1}`"
          class="w-full h-full object-cover block"
        />

        <div class="absolute top-2 right-2 flex flex-col gap-1">
          <div
            class="transition-opacity"
            :class="
              photo.isFavorite
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
            "
          >
            <IconButton
              :ariaLabel="photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
              :aria-pressed="photo.isFavorite"
              type="favorite"
              @click.stop="toggleFavorite(photo)"
            >
              {{ photo.isFavorite ? '★' : '☆' }}
            </IconButton>
          </div>

          <div
            class="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
          >
            <IconButton ariaLabel="Remove photo" type="remove" @click.stop="removePhoto(index)">
              <Trash2 :size="16" />
            </IconButton>
          </div>
        </div>
      </li>
    </ul>

    <p v-else class="text-center text-(--text-secondary) py-8">
      No photos added yet. Add some!
    </p>
  </main>
</template>
