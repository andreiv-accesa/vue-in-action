import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ImageGallery from '../ImageGallery.vue'

describe('ImageGallery', () => {
  let wrapper: ReturnType<typeof mount>

  async function addPhoto(url = 'https://example.com/photo.jpg') {
    const input = wrapper.get('#photo-url-input')
    const button = wrapper.get('button[type="submit"]')

    await input.setValue(url)
    await button.trigger('click')
  }

  beforeEach(() => {
    wrapper = mount(ImageGallery)
  })

  it('renders the empty state and upload form', () => {
    expect(wrapper.text()).toContain('No photos added yet')
    expect(wrapper.find('#photo-url-input').exists()).toBe(true)
    expect(wrapper.find('#photo-url-input').attributes('type')).toBe('url')
  })

  it('adds a photo and clears the input', async () => {
    await addPhoto()

    const photo = wrapper.get('li')
    expect(photo.find('img').attributes('src')).toBe('https://example.com/photo.jpg')
    expect((wrapper.get('#photo-url-input').element as HTMLInputElement).value).toBe('')
  })

  it('toggles the favorite button state and accessibility attributes', async () => {
    await addPhoto('https://example.com/photo1.jpg')

    const favoriteButton = wrapper.get('.icon-btn--favorite')

    expect(favoriteButton.attributes('aria-label')).toBe('Add to favorites')
    expect(favoriteButton.attributes('aria-pressed')).toBe('false')

    await favoriteButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.icon-btn--favorite').attributes('aria-label')).toBe(
      'Remove from favorites',
    )
    expect(wrapper.get('.icon-btn--favorite').attributes('aria-pressed')).toBe('true')
  })

  it('removes a photo when the remove button is clicked', async () => {
    await addPhoto('https://example.com/photo2.jpg')

    const removeButton = wrapper.get('.icon-btn--remove')
    await removeButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('li')).toHaveLength(0)
    expect(wrapper.text()).toContain('No photos added yet')
  })

  it('keeps favorite state isolated for each photo', async () => {
    await addPhoto('https://example.com/photo1.jpg')
    await addPhoto('https://example.com/photo2.jpg')

    const favoriteButtons = wrapper.findAll('.icon-btn--favorite')
    expect(favoriteButtons).toHaveLength(2)

    const firstButton = favoriteButtons[0]
    const secondButton = favoriteButtons[1]

    expect(firstButton).toBeDefined()
    expect(secondButton).toBeDefined()
    if (!firstButton || !secondButton) {
      throw new Error('Expected two favorite buttons to be rendered')
    }

    await firstButton.trigger('click')
    await wrapper.vm.$nextTick()

    const nextFavoriteButtons = wrapper.findAll('.icon-btn--favorite')
    const nextFirstButton = nextFavoriteButtons[0]
    const nextSecondButton = nextFavoriteButtons[1]

    expect(nextFirstButton).toBeDefined()
    expect(nextSecondButton).toBeDefined()
    if (!nextFirstButton || !nextSecondButton) {
      throw new Error('Expected two favorite buttons after toggling a favorite')
    }

    expect(nextFirstButton.attributes('aria-pressed')).toBe('true')
    expect(nextSecondButton.attributes('aria-pressed')).toBe('false')
  })
})
