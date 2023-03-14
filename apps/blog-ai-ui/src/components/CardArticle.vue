


<template>
    <v-card
      class="mx-auto rounded-lg"
      max-width="344"
    >
    <v-img
      :src="thumbnail"
      height="200px"
      cover
    ></v-img>
      <v-card-text>
        <p class="text-h5 text--primary d-inline">
          {{ title }}
        </p>
        <v-badge
          class="d-inline"
          color="error"
          :content="categoryName"
          inline
        ></v-badge>
        <div class="text--primary text-left mt-8">
         {{ content.substring(0,250)+".." }}
        </div>
      </v-card-text>
      <v-card-actions class="d-inline">
        <span>13/03</span>
      </v-card-actions>  
      <v-card-actions class="d-inline">
        <RouterLink  :to="{name:'articlesDetails',params:{uuid}}">Lire la suite</RouterLink>
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
  });
  
  </script>