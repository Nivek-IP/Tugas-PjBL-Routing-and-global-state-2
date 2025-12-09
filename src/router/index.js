import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import InProgress from '@/views/InProgress.vue'
import Completed from '@/views/Completed.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/inprogress', component: InProgress },
    { path: '/completed', component: Completed }
  ]
})

export default router
