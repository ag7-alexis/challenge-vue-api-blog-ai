


<template>
    <v-card
      class="mx-auto rounded-lg"
      max-width="344"
    >
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
         {{ content  }}
        </div>
      </v-card-text>
      <v-card-actions class="d-inline">
        <span>13/03</span>
      </v-card-actions>  
      <v-card-actions class="d-inline">
        <v-btn
          variant="text"
          color="teal-accent-4"
        >
          Lire la suite
        </v-btn>
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
    },
  });
  
  </script>