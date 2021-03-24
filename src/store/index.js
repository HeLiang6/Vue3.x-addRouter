import { createStore } from 'vuex'
import { setAsyncRoutes } from "../router/async"
export default createStore({
  state: {
    routes: []
  },
  mutations: {
    SET_ROUTES(state, routes) {
      console.log(1);
      // 动态配置路由
      setAsyncRoutes(routes);
      // 为了防止用户刷新页面导致动态创建的路由失效，将其存储在本地中
      // 这里见一个好用的 session 工具，vue-session，可直接安装，使用方式可以在 gitub 上搜索
      sessionStorage.setItem('menu', JSON.stringify(routes));
      // 将路由存储在 store 中
      state.routes = routes;
    }

  },
  actions: {
  },
  modules: {
  }
})
