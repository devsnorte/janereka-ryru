import { Session } from 'src/api/SessionManager'

const session = Session.getSessionManager()

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
        path: '/contato',
        name: 'contato',
        component: () => import('pages/Contato.vue')
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
          if (to.name !== 'login' && !session.isAuthenticated()) {
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
          session.loadFromLocalStorage()
          if (to.name !== 'login' && !session.isAuthenticated()) {
            next({
              name: 'login',
              query: { goTo: to.fullPath }
            })
          } else next()
        }
      },
      {
        path: '/construction',
        name: 'construction',
        component: () => import('pages/UnderConstruction.vue')
      },
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  }
]

export default routes
