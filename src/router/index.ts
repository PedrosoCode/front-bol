import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import OrdemServicoView from '@/views/OrdemServicoView.vue'
import MainMenuView from '@/views/MainMenuView.vue'
import ListaParceiroNegocio from '@/views/ListaParceiroNegocio.vue'
import CadastroParceiro from '@/views/CadastroParceiro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ordem_servico',
      name: 'ordem_servico',
      component: OrdemServicoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MainMenuView,
      meta: { requiresAuth: true }
    },
    {
      path: '/lista_parceiro',
      name: 'lista_parceiro',
      component: ListaParceiroNegocio,
      meta: { requiresAuth: true }
    },
    {
      path: '/cadastro_parceiro',
      name: 'cadastro_parceiro',
      component: CadastroParceiro,
      meta: { requiresAuth: true }
    },
    {
      path: '/lista_parceiro/:id',
      name: 'cadastro_parceiro',
      component: CadastroParceiro,
      meta: { requiresAuth: true },
      props: true //
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwtToken')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' })
    } else {
      const isExpired = checkTokenExpiration(token)
      if (isExpired) {
        localStorage.removeItem('jwtToken')
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

function checkTokenExpiration(token : any) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000
    return Date.now() > exp
  } catch (error) {
    return true
  }
}

export default router
