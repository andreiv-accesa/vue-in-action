import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import CanYouDrive from '@/examples/can-you-drive/CanYouDrive.vue'
import ImageGallery from '@/examples/image-gallery/ImageGallery.vue'
import TaskManager from '@/examples/task-list/TaskManager.vue'
import EventRegistration from '@/examples/event-registration/EventRegistration.vue'

const router = createRouter({
  history: createWebHashHistory('/vue-in-action/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage,
      meta: { title: 'Vue Examples' },
    },
    {
      path: '/examples/can-you-drive',
      name: 'can-you-drive',
      component: CanYouDrive,
      meta: { title: 'Can You Drive?', showBack: true },
    },
    {
      path: '/examples/image-gallery',
      name: 'image-gallery',
      component: ImageGallery,
      meta: { title: 'Image Gallery', showBack: true },
    },
    {
      path: '/examples/task-list',
      name: 'task-list',
      component: TaskManager,
      meta: { title: 'Task Manager', showBack: true },
    },
    {
      path: '/examples/event-registration',
      name: 'event-registration',
      component: EventRegistration,
      meta: { title: 'Event Registration', showBack: true },
    },
  ],
})

export default router
