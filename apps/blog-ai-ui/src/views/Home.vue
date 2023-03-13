<template>
  <div class="home">
    <BannerFront msg="Bienvenue sur notre site de génération d'article" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BannerFront from '../components/BannerFront.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BannerFront,
  },
});
</script>
