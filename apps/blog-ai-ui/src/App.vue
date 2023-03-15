<template>
  <Navbar v-if="!admin" />
  <NavbarAdmin v-if="admin" />
  <router-view class="router-view" />
</template>

<script lang="ts">
import { User } from '@challenge-vue-api-blog-ai/shared';
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import Navbar from '../src/components/Navbar.vue';
import NavbarAdmin from '../src/components/Admin/Navbar.vue';

interface ViewContext {
  user: User | undefined;
  admin: boolean
}

export default defineComponent({
  name: 'Home',
  data(): ViewContext {
    return {
      user: undefined,
      admin: false
    };
  },
  components: {
    Navbar,
    NavbarAdmin
  },
  methods: {
  },
});
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
