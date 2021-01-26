
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/imagens',
        name: 'imagens',
        component: () => import('pages/Imagens.vue')
      },
      {
        path: '/videos',
        name: 'videos',
        component: () => import('pages/Video.vue')
      },
      {
        path: '/audios',
        name: 'audios',
        component: () => import('pages/Audios.vue')
      },
      {
        path: '/arquivos',
        name: 'arquivos',
        component: () => import('pages/Arquivos.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
