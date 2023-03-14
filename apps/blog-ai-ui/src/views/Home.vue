<template>
  <div class="home">
    <BannerFront msg="Bienvenue sur notre site de génération d'article" />
    <LastArticles />
    <v-container>
    <v-row>
      <v-col
        v-for="item in articles"
        :key="item.uuid"
        cols="12"
        sm="6"
      >

      <CardArticle :title="item.title" :content="item.content" :categoryName="item.category.name" :uuid="item.uuid" />

   
    </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import BannerFront from '../components/BannerFront.vue';
import LastArticles from '../components/LastArticles.vue';
import CardArticle from '../components/CardArticle.vue';
import axios from 'axios';


export default defineComponent({
  name: 'Home',
  components: {
    BannerFront,
    LastArticles,
    CardArticle,
  },
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    async LastArticles() {
      const API_ALL_POST = 'http://localhost:3333/api/post'
      const isDataLoading = ref(true)

      const LastArticles = await axios.get(API_ALL_POST)
      const {data,status} = LastArticles // object destructuring FTW!
      if(status===200){
          isDataLoading.value=false
      }
      this.articles = data
      console.log(data);
    },
  },
  async mounted() {
            await this.LastArticles()
  }
});
</script>
