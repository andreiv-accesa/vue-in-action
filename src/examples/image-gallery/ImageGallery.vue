<script setup lang="ts">
import { ref } from 'vue'
import { generateId } from '@/shared/utils/generateId'

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
  <form @submit.prevent="handleSubmit" class="upload-form">
    <label for="photo-url-input" class="sr-only">Image URL</label>
    <input
      id="photo-url-input"
      v-model.trim="newPhotoUrl"
      type="url"
      placeholder="Enter image URL"
      class="url-input"
      required
    />
    <button type="submit" :disabled="!newPhotoUrl">Upload Photo</button>
  </form>

  <hr class="divider" />

  <main>
    <ul v-if="photos.length" class="gallery" aria-label="Photo gallery">
      <li v-for="(photo, index) in photos" :key="photo.id" class="photo-card photo-fill">
        <img :src="photo.url" :alt="`Gallery image ${index + 1}`" class="photo-img" />

        <div class="card-actions">
          <button
            type="button"
            class="action-btn fav-btn"
            :class="{ active: photo.isFavorite }"
            :aria-pressed="photo.isFavorite"
            :aria-label="photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            @click.stop="toggleFavorite(photo)"
          >
            {{ photo.isFavorite ? '★' : '☆' }}
          </button>

          <button
            type="button"
            class="action-btn remove-btn"
            aria-label="Remove photo"
            @click.stop="removePhoto(index)"
          >
            ✕
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="description">No photos added yet. Add some!</p>
  </main>
</template>

<style scoped>
.upload-form {
  display: flex;
  gap: 0.5rem;
}

.url-input {
  flex: 1;
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin-block: 1.5rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.photo-card {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .action-btn {
    width: 2rem;
    height: 2rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 50%;
    opacity: 0;
    transition:
      opacity 0.2s ease,
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;

    &.fav-btn:hover,
    &.fav-btn.active {
      opacity: 1;
      color: var(--accent);
    }

    &.remove-btn:hover {
      color: var(--danger);
    }
  }

  &:has(:hover, :focus-within) .action-btn {
    opacity: 1;
    background: color-mix(in srgb, canvas 75%, transparent);
    backdrop-filter: blur(4px);
    border-color: var(--border-strong);
  }
}
</style>
