 <template>
  <div class="about">
    <router-link :to="$store.state.routes[0].path">{{ 123 }}</router-link>
    <router-link v-for="item in menuList" :key="item.name" :to="item.path">
      {{ item.meta.title }}
    </router-link>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    menuList() {
      return this.$store.state.routes[0].children || []
    }
  },
  created() {
    console.log(this.$store.state.routes)
    // 页面刷新后，store 中的数据会丢失不见，这个时候需要从 session 中获取
    const menu = JSON.parse(sessionStorage.getItem('menu'))
    if (menu) this.$store.commit('SET_ROUTES', menu)
  }
}
</script>       