<template>
  <div class="editArticles mt-5 mb-5">
    <h2 class="text-black text-left ml-10 mt-10">Création d'un article</h2>
    <v-sheet width="600" class="mx-auto">
      <v-form ref="form" @submit.prevent="editArticle">
        <h3 class="text-black text-left mt-10">Titre de l'article</h3>
        <v-text-field v-model="title" label="titre" required></v-text-field>

        <div class="d-flex flex-row">
          <v-btn color="success" class="mt-4" :disabled="title === ''" block @click="generateArticle">Générer un
            article</v-btn>
        </div>

        <h3 class="text-black text-left mt-5">Article généré</h3>
        <v-textarea v-model="article" label="article" required></v-textarea>

        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === ''" class="mt-4" block
            @click="saveDraft">Enregistrer le brouillon</v-btn>
        </div>
        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === ''" class="mt-4" block
            @click="editArticle">Publier</v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Category, Post, Pagination } from '@challenge-vue-api-blog-ai/shared';

const route = useRoute();

interface ViewContext {
  title: string
  article: string
  error: any
  loading: boolean
  generating: boolean
  categories: Pagination<Category> | undefined
}

export default defineComponent({
  name: 'EditArticles',
  data(): ViewContext {
    return {
      title: '',
      article: '',
      error: null,
      loading: false,
      generating: false,
      categories: undefined,
    };
  },
  methods: {
    async getAllCategories() {
      try {
        const GetCategory = await axios.get<Pagination<Category>>("/api/category")
        const { data, status } = GetCategory
        // if (status === 200) {
        //       isDataLoading.value = false
        //   }
        // this.categories = data
        console.log(data.data)
      } catch (error) {
        
      }
    },
    async generateArticle() {
      // this.article = ''
      this.generating = true
      try {
        const response = await axios.post("/api/post/generate-text", {
          title: this.title
        })
        this.article = response.data
      } catch (error: any) {
        this.error = error.message
        console.log(error);
      }
      this.generating = false
    },
    async saveDraft() {
      try {
        const response = await axios.post<Post>("/api/post/", {
          title: this.title,
          content: this.article,
          status: 'draft',
          categoryUuid: '2f2e6a8f-de2c-4fef-a8af-46e4061b67ec'
        })
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
    },
    async editArticle() {
      try {
        const response = await axios.post<Post>("/api/post/", {
          title: this.title,
          content: this.article,
          status: 'published',
          categoryUuid: '2f2e6a8f-de2c-4fef-a8af-46e4061b67ec'
        })
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getAllCategories()
  },
})
</script>

<style></style>
