<template>
  <div class="articles">

    <AllArticles />
    <v-container>
      <select id="category" @change="filterArticles" v-model="selectedCategory" class="bg-indigo-lighten-2 pt-3 pb-3  pl-5 pr-3 rounded-xl">
      <option value="">Toutes</option>
      <option v-for="category in categories" :value="category.uuid">{{ category.name }}</option>
    </select>
      <v-row class="mt-5">
      <p  class="text-black" v-if="articles.data.length == 0">Il n'y pas encore d'article</p>
        <v-col v-for="item in articles.data" :key="item.uuid" cols="12" sm="6">

          <CardArticle :title="item.title" :content="item.content" :categoryName="item.category.name" :uuid="item.uuid"
            :thumbnail="item.thumbnail" />

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CardArticle from '../components/CardArticle.vue';
import AllArticles from '../components/AllArticles.vue';
import axios from 'axios';
import { isEmptyArray, Pagination, Post } from '@challenge-vue-api-blog-ai/shared';
interface ViewContext {
  articles: Pagination<Post>
  categories: []
  selectedCategory: string
  filteredArticles: Pagination<Post>
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
      categories: [],
      selectedCategory: '',
      filteredArticles: Pagination.empty(),
    };
  },
  methods: {
    async AllArticles() {
      const isDataLoading = ref(true)

      const AllArticles = await axios.get<Pagination<Post>>("/api/post")
      const { data, status } = AllArticles // object destructuring FTW!
      if (status === 200) {
        isDataLoading.value = false
      }
      this.articles = data
    },
    AllCategories() {
      axios.get('/api/category')
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    filterArticles() {
      if (this.selectedCategory === '') {
        // Si aucune catégorie n'est sélectionnée, on affiche tous les articles
        this.AllArticles();
      } else {
        // Sinon, on filtre les articles par catégorie
        axios.get('/api/post/category/' + this.selectedCategory)
          .then(response => {
            this.articles = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },
  async mounted() {
    await this.AllArticles();
    await this.AllCategories();
  },
});
</script>
