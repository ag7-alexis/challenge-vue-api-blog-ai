<template>
  <Navbar v-if="!admin" />
  <NavbarAdmin v-if="admin" />
  <router-view class="router-view" />
</template>

<script>
import { defineComponent } from 'vue';
import Navbar from '../src/components/Navbar.vue';
import NavbarAdmin from '../src/components/Admin/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    NavbarAdmin
  },
  data() {
    return {
      admin: true
    }
  }
});

// export default data() {
//   return {
//     admin
//   }
// }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;400;700&display=swap');

#app {
  font-family: 'Roboto Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 // text-align: center;
  color: #ffffff;
}

.router-view {
  padding-top: 100px;
}
</style>
