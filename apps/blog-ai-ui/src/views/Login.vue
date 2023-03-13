<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />
    <BannerFront msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BannerFront from '../components/BannerFront.vue';

export default defineComponent({
  name: 'Login',
  components: {
    BannerFront,
  },
});
</script>
