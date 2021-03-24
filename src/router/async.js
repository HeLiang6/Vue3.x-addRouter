import router from "./index";
// // 导入默认的配置的静态路由
import { defaultRoutes } from "./index"
import layout from '@/views/menu'
// 遍历后台返回的路由列表，处理成我们需要的格式，这里的处理是一种理想化状态，非理想化状态的处理，代码多多了
// 有时候后台返回的数据并不会有明确的父子级路由嵌套关系，就只是一个一维数组，我们要根据我们的匹配规则，将其处理成想要的格式
// 这里的 arr 其实就是登录成功之后拿到的那个 menu
export const getAsyncRoutes = arr => {
  return arr.map(({ path, name, component, meta, children }) => {
    console.log(path, name, component, meta, children);
    const route = {
      path,
      name,
      meta: {
        ...meta,
        // 标记路由已经被配置了，如果项目需要的话，要在路由拦截器里根据这个值做相应的处理
        require: true
      },
      // 根据后台返回的 component 的路径，引入路由对应的组件
      component: () => import(`@/${component}.vue`)
      // component: () => import('../views/page1.vue')
    };
    if (children) {
      // 如果存在 children，使用递归，将 children 也处理成我们需要的格式，并绑定给父级路由
      route.redirect = children[0].path;
      route.component = layout
      route.children = getAsyncRoutes(children);
    }
    router.addRoute('a', route)
    console.log(route);
    return route;
  });
};

export const setAsyncRoutes = menu => {
  const _menu = getAsyncRoutes(menu);
  console.log(_menu);
  // 将处理好的动态配置的路由通过 vue 提供的方式添加到 router 中，注意这个 _menu 的格式是和配置路由时的键 routes 一样格式的数组
  // router.addRoute(_menu);
  router.addRoute('home', {
    path: '/page',
    name: '首页',
    component: () => import('@/views/page1')
  });
  // 路由 options 并不会随着 addRoutes 动态响应，所以要在这里进行设置
  router.options.routes = defaultRoutes.concat(
    _menu
  );
  console.log(router.options);
};
// export const getRoutes = routers => {
//   // console.log(itemRouter, index);
//   router.addRoute(routers)
// router.options.routes = defaultRoutes.concat(_menu);

//   // if (itemRouter.component !== "Layout") {
//   //   router.addRoute("BasicLayout", {
//   //     path: `${itemRouter.path}`,
//   //     name: itemRouter.name,
//   //     component: () => import(`@/${itemRouter.component}`)
//   //   });
//   // }
//   // 是否存在子集
//   // if (itemRouter.children && itemRouter.children.length) {
//   //   getRoutes(itemRouter.children);
//   // }
//   return true;
//   // });
// };