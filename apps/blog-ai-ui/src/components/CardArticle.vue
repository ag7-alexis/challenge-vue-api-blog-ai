<template>
    <v-card
      class="mx-auto rounded-lg"
      max-width="344"
    >
      <v-card-text>
        <p class="text-h5 text--primary d-inline">
          el·ee·mos·y·nar·y
        </p>
        <v-badge
          class="d-inline"
          color="error"
          content="Catégorie"
          inline
        ></v-badge>
        <div class="text--primary text-left mt-8">
          relating to or dependent on charity; charitable.<br>
          "an eleemosynary educational institution."
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
      msg: String,
    },
  });
  </script>