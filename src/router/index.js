import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { setAsyncRoutes } from "./async"
export const defaultRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue')
  },
  // {
  //   path: "/page-2",
  //   name: 'index',
  //   meta: { title: '首页', noCache: true },
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/page2.vue'),
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...defaultRoutes
  ]
})
router.beforeEach((to, from, next) => {
  if (!to.meta.require && to.path !== '/login') {
    // 从 session 中获取菜单
    const menu = JSON.parse(sessionStorage.getItem('menu'));
    // 重新配置路由
    setAsyncRoutes(menu);
    router.replace(to.path);
  } else next()

})
export default router
