import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:slug?',
      name: 'public-menu',
      component: () => import('@/modules/menu/pages/PublicMenuPage.vue'),
      meta: {
        title: 'Cardápio',
      },
    },
  ],
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Cardápio'
  document.title = title
})

export default router
