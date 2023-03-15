<template>
  <Navbar v-if="!isAuthenticated" />
  <NavbarAdmin v-if="isAuthenticated" />
  <router-view class="router-view" />
</template>

<script lang="ts">
import { User } from '@challenge-vue-api-blog-ai/shared';
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import Navbar from '../src/components/Navbar.vue';
import NavbarAdmin from '../src/components/Admin/Navbar.vue';
import { UserInfo } from './auth';

interface ViewContext {
  user: User | undefined;
  admin: boolean
  isAuthenticated: boolean;
}

export default defineComponent({
  name: 'Home',
  data(): ViewContext {
    return {
      user: undefined,
      admin: false,
      isAuthenticated: false,
    };
  },
  components: {
    Navbar,
    NavbarAdmin
  },
  methods: {
    async UserConnected() {
      // Vérifier si l'utilisateur est authentifié
      const authenticated = await UserInfo();
      if (authenticated) {
        this.isAuthenticated = true;
      }
    },
  },
  async mounted() {
    await this.UserConnected()
  }
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
