<template>
  <div class="home">
    <Menu />

    <Content />
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from './menu'
import Content from './content'
export default {
  name: 'Home',
  components: {
    Menu,
    Content
  }
}
</script>
