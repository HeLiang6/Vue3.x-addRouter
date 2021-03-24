<template>
  <div><button @click="login">login</button></div>
</template>

<script>
// import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const menu = [
      {
        path: '/page1',
        name: 'index',
        component: 'views/menu',
        meta: {
          // 这个值，指代路由是否被配置，刚开始引入时，没有被配置，配置之后将其变为 true
          // 也不一定要将这个判断条件加在这里，可以将其声明在 state 中，或者本地，看个人项目需求
          // 当然这个值也可以不设置，直接拿为 undefined 时，代表并没有配置，所有的子路由就没有添加，这里只是一个示范
          require: false,
          title: '父组件'
        },
        children: [
          {
            path: '/page-1',
            name: 'page1',
            meta: {
              title: '页面一'
            },
            component: 'views/page1'
          },
          {
            path: '/page-2',
            name: 'page2',
            meta: {
              title: '页面二'
            },
            component: 'views/page2'
          },
          {
            path: '/page-3',
            name: 'page3',
            meta: {
              title: '页面三'
            },
            component: 'views/page3'
          }
        ]
      }
    ]
    const login = () => {
      console.log(menu)
      store.commit('SET_ROUTES', menu)
      console.log(router.options)
      // router.push('/home')
    }
    return {
      menu,
      login
    }
  }
}
</script>