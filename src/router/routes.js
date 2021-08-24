import { getters } from 'src/store/session-store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue')
      },
      {
        path: '/sobre',
        name: 'sobre',
        component: () => import('pages/Sobre.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/acervo',
        name: 'acervo',
        component: () => import('pages/Acervo.vue'),
        beforeEnter (to, from, next) {
          if (to.name !== 'login' && !getters.user()) {
            next({
              name: 'login',
              query: { goTo: to.fullPath }
            })
          } else next()
        }
      },
      {
        path: '/submissao',
        name: 'submissao',
        component: () => import('pages/Submissao.vue'),
        beforeEnter (to, from, next) {
          if (to.name !== 'login' && !getters.user()) {
            next({
              name: 'login',
              query: { goTo: to.fullPath }
            })
          } else next()
        }
      },
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  }
  // {
  //   path: '/dashboard',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '/imagens',
  //       name: 'imagens',
  //       component: () => import('pages/Imagens.vue')
  //     },
  //     {
  //       path: '/videos',
  //       name: 'videos',
  //       component: () => import('pages/Video.vue')
  //     },
  //     {
  //       path: '/audios',
  //       name: 'audios',
  //       component: () => import('pages/Audios.vue')
  //     },
  //     {
  //       path: '/arquivos',
  //       name: 'arquivos',
  //       component: () => import('pages/Arquivos.vue')
  //     }
  //   ]
  // },
  // Always leave this as last one,
  // but you can also remove it
]

export default routes
