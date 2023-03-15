<template>
  <div class="editArticles mt-5 mb-5">
    <h2 class="text-black text-left ml-10 mt-10">Modification de l'article</h2>
    <v-sheet width="600" class="mx-auto">
      <v-form ref="form" @submit.prevent="editArticle">
        <h3 class="text-black text-left mt-10">Titre de l'article</h3>
        <v-text-field v-model="title" label="titre" required></v-text-field>

        <div class="d-flex flex-row">
          <v-btn color="success" class="mt-4" :disabled="title === ''" block @click="generateArticle">Générer un article</v-btn>
        </div>

        <h3 class="text-black text-left mt-5">Article généré</h3>
        <v-textarea v-model="article" label="article" required></v-textarea>

        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === ''" class="mt-4" block @click="saveDraft">Enregistrer le brouillon</v-btn>
        </div>
        <div class="d-flex flex-row">
          <v-btn color="success" :disabled="title === '' || article === ''" class="mt-4" block @click="editArticle">Appliquer les modifications</v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Post } from '@challenge-vue-api-blog-ai/shared';

export default defineComponent({
  name: 'EditArticles',
  data() {
    return {
      title: '',
      article: '',
      error: null,
      loading: false,
      generating: false,
    };
  },
  methods: {
    // récupération de l'article
    async getArticle() {
      const isDataLoading = ref(true)
      const route = useRoute()

      const GetArticle = await axios.get<Post>('/api/post/' + route.params.uuid)
      const { data, status } = GetArticle // object destructuring FTW!
      if (status === 200) {
          isDataLoading.value = false
      }
      console.log(data);
      this.title = data.title
      this.article = data.content
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
        const route = await useRoute()
        const response = await axios.put("/api/post/" + route.params.uuid, {
          title: this.title,
          content: this.article,
          status: 'draft',
        })
        console.log("test");
        
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
    },
    async editArticle() {
      try {
        const route = useRoute()
        const response = await axios.put("/api/post/" + route.params.uuid, {
          title: this.title,
          content: this.article,
          status: 'published',
        })
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getArticle()
  },
})
</script>

<style></style>
