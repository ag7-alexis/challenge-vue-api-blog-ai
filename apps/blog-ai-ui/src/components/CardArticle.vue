


<template>
    <v-card
      class="mx-auto rounded-lg"
      max-width="344"
    >
    <v-img
      :src="thumbnail"
      height="200px"
      cover
    >
    <v-toolbar
            color="rgba(0, 0, 0, 0)"
            
          >

            <v-badge
          class="d-inline ml-5"
          color="error"
          :content="categoryName"
          inline
        ></v-badge>

          </v-toolbar>
    
    
    </v-img>
      <v-card-text>
        <p class="text-h5 text--primary d-inline">
          {{ title }}
        </p>
        <div class="text--primary text-left mt-8">
         {{ content.substring(0,200)+".." }}
        </div>
      </v-card-text>
      <v-card-actions class="d-inline">
        <span>13/03</span>
      </v-card-actions>  
      <v-card-actions class="d-inline">
        <RouterLink v-if="!admin" :to="{name:'articlesDetails',params:{uuid}}">Lire la suite</RouterLink>
        <RouterLink v-if="admin" :to="{name:'editArticle',params:{uuid}}">Modifier</RouterLink>
        <RouterLink v-if="admin" :to="{name:'articlesDetails',params:{uuid}}">Supprimer</RouterLink>
      </v-card-actions>
    </v-card>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'CardArticle',
    props: {
      title: String,
      content: String,
      status: String,
      categoryName: String,
      uuid: String,
      thumbnail: String,
    },
    data() {
      return {
        admin: true
      }
    }
  });
  
  </script>