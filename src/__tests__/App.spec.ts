import { describe, it, expect } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import App from '../core/App.vue'

describe('App', () => {
  it('renders without error', () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          component: { template: '<div>Home</div>' },
          meta: { title: 'Home' },
        },
      ],
    })

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
