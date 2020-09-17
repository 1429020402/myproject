import Vue from 'vue'
import VueRouter from 'vue-router'
import product from '@/views/nav/product'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
      path: '/',
      name: 'product',
      component: product,
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/nav/shop.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/nav/comment.vue')
    },
  ]
})