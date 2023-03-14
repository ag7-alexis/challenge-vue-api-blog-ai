<template>
    <div class="ArticlesDetails">
        <div class="headerArticles bg-indigo-lighten-2 pt-10 pb-5 text-left pl-10">
            <h1 class="mb-8">{{ articles.title }}</h1>
            <p class="d-inline">
            Publié le 13/03/2023   |
            <span v-if="articles.category" class="pl-3">
                Catégorie : {{ articles.category.name }}
            </span>
            </p>
        </div>
        <v-container class="text-black text-left mt-8 mb-8">
            
            {{ articles.content  }}
        </v-container>
        <router-link to="/"><v-btn class="ml-8 mt-8 mb-8">Voir tous les articles</v-btn></router-link>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';


export default defineComponent({
name: 'ArticlesDetails',
data() {
return {
    articles: [],
};
},
methods: {
async LastArticles() {
    const API_ALL_POST = 'http://localhost:3333/api/post'
    const isDataLoading = ref(true)
    const route = useRoute()

    const LastArticles = await axios.get(API_ALL_POST+'/'+route.params.uuid)
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
  