<template>
  <div class="articles">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <BannerFront msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <AllArticles />
    <v-container>
      <v-row>
        <v-col
          v-for="n in 10"
          :key="n"
          cols="12"
          sm="6"
        >
          <CardArticle />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BannerFront from '../components/BannerFront.vue';
import CardArticle from '../components/CardArticle.vue';
import AllArticles from '../components/AllArticles.vue';

export default defineComponent({
  name: 'Articles',
  components: {
    BannerFront,
    CardArticle,
    AllArticles
  },
});
</script>
