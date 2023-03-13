<template>
  <div class="home">
    <BannerFront msg="Bienvenue sur notre site de génération d'article" />
    <LastArticles />
    <v-container>
    <v-row>
      <v-col
        v-for="n in 4"
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
import LastArticles from '../components/LastArticles.vue';
import CardArticle from '../components/CardArticle.vue';

export default defineComponent({
  name: 'Home',
  components: {
    BannerFront,
    LastArticles,
    CardArticle,
  },
});
</script>
