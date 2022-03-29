import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontEnd/FrontView.vue'),
    // 巢狀路由不用/斜線
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/FrontEnd/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/FrontEnd/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/FrontEnd/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/FrontEnd/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/BackEnd/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/BackEnd/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/BackEnd/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
