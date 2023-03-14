<template>
  <div class="articles">

    <AllArticles />
      <v-container>
        <v-row>
          <v-col
            v-for="item in articles.data"
            :key="item.uuid"
            cols="12"
            sm="6"
          >

          <CardArticle :title="item.title" :content="item.content" :categoryName="item.category.name" :uuid="item.uuid" :thumbnail="item.thumbnail" />

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import CardArticle from '../components/CardArticle.vue';
import AllArticles from '../components/AllArticles.vue';
import axios from 'axios';
import { Pagination, Post } from '@challenge-vue-api-blog-ai/shared';
interface ViewContext {
  articles:Pagination<Post>
}


export default defineComponent({
  name: 'Articles',
  components: {
    CardArticle,
    AllArticles
  },
  data(): ViewContext {
    return {
      articles: Pagination.empty(),
    };
  },
  methods: {
    async AllArticles() {
      const API_ALL_POST = 'http://localhost:3333/api/post'
      const isDataLoading = ref(true)

      const AllArticles = await axios.get<Pagination<Post>>(API_ALL_POST)
      const {data,status} = AllArticles // object destructuring FTW!
      if(status===200){
          isDataLoading.value=false
      }
      this.articles = data
      console.log(data);
    },
  },
  async mounted() {
            await this.AllArticles()
  },
});
</script>
