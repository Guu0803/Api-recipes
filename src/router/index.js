import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecipesDetails from '@/views/RecipesDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detalhes-da-receita',
    name: 'recipesDetails',
    component: RecipesDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
