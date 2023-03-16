<template>
  <div class="generate mt-5 mb-5">
    <h2 class="text-black text-left ml-10 mt-10">Création d'un article</h2>
    <v-sheet width="600" class="mx-auto">
      <v-form ref="form" @submit.prevent="generateArticle">
        <h3 class="text-black text-left mt-10">Titre de l'article</h3>
        <v-text-field v-model="title" label="titre" required></v-text-field>

        <div class="d-flex flex-row">
          <v-btn color="success" class="mt-4" :disabled="title === ''" block @click="generateArticle">Générer un
            article</v-btn>
        </div>

        <h3 class="text-black text-left mt-5">Article généré</h3>
        <v-textarea v-model="article" label="article" required></v-textarea>

        <select id="category" v-model="selectedCategory" class="bg-indigo-lighten-2 pt-3 pb-3  pl-5 pr-3 rounded-xl">
          <option value="">Selectionner une catégorie</option>
          <option v-for="category in categories" :value="category.uuid">{{ category.name }}</option>
        </select>

        <div>
          <input type="file" @change="onFileChange" class="custom-input" accept="image/*">
        </div>

        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === '' || selectedCategory === '' || image === ''" class="mt-4" block
            @click="saveDraft">Enregistrer le brouillon</v-btn>
        </div>
        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === '' || selectedCategory === '' || image === ''" class="mt-4" block
            @click="publishArticle">Publier</v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Post } from '@challenge-vue-api-blog-ai/shared';

interface ViewContext {
  title: string
  article: string
  error: any
  loading: boolean
  generating: boolean
  isDataLoading: boolean
  selectedCategory: string
  categories: [],
  image: string
}

export default defineComponent({
  name: 'GenerateArticle',
  data(): ViewContext {
    return {
      title: '',
      article: '',
      error: null,
      loading: false,
      generating: false,
      isDataLoading: false,
      selectedCategory: '',
      categories: [],
      image: ''
    };
  },
  methods: {
    // récupération de tous les articles
    async getAllCategories() {
      this.generating = true
      try {
        const GetCategory = await axios.get("/api/category")
        const { data, status } = GetCategory
        this.categories = data.data
      } catch (error:any) {
        this.error = error.message
        console.log(error);
      }
      this.generating = false
    },
    // génération de l'article
    async generateArticle() {
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
    // enregistrement de l'article en brouillon
    async saveDraft() {
      this.generating = true
      try {
        const response = await axios.post<Post>("/api/post/", {
          title: this.title,
          content: this.article,
          status: 'draft',
          categoryUuid: this.selectedCategory
        })
        this.generating = false
        window.location.href = "/articles"
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
      this.generating = false
    },
    // validation des modifications de l'article
    async publishArticle() {
      this.generating = true
      try {
        const response = await axios.post<Post>("/api/post/", {
          title: this.title,
          content: this.article,
          status: 'published',
          categoryUuid: this.selectedCategory
        })
        this.generating = false
        window.location.href = "/articles"
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
      this.generating = false
    },
  },
  async onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        this.image = base64 as string
      };
    },
  async mounted() {
    await this.getAllCategories()
  },
})
</script>

<style></style>
