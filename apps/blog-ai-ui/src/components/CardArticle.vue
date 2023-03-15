


<template>
    <v-card
      class="mx-auto rounded-lg"
      max-width="344"
      v-if="renderComponent"
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
          <RouterLink v-if="isAuthenticated" :to="{name:'editArticle',params:{uuid}}"> <UilEdit   size="25px" class="trash text-teal-lighten-1 mr-3" /></RouterLink>
          <UilTrash  @click="DeleteArticle(uuid)" size="25px" class="trash text-teal-lighten-1 hover-click" />
        </p>
        <div class="text--primary text-left mt-8">
         {{ content.substring(0,200)+".." }}
        </div>
      </v-card-text>
      <v-card-actions class="d-inline">
        <span>13/03</span>
      </v-card-actions>  
      <v-card-actions class="d-inline">
        <RouterLink :to="{name:'articlesDetails',params:{uuid}}">Lire la suite</RouterLink>
      </v-card-actions>
    </v-card>
    
  </template>

  <script lang="ts">
  import { defineComponent, nextTick } from 'vue';
  import { UserInfo } from '../auth';
  import { UilTrash, UilEdit  } from '@iconscout/vue-unicons';
  import axios from 'axios';

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
    components: {
      UilTrash,
      UilEdit,
  },
    data() {
      return {
        admin: true,
        isAuthenticated: false,
        renderComponent: true,
      }
    },
    methods: {
    async UserConnected() {
      const authenticated = await UserInfo();
      if (authenticated) {
        this.isAuthenticated = true;
      }
    },
    async DeleteArticle(uuid) {
      const DeleteArticle = await axios.delete('/api/post/' + uuid)
      const { data, status } = DeleteArticle // object destructuring FTW!
      if (status === 200) {
        this.renderComponent = true;
        await nextTick();
        this.renderComponent = false;
      }
    },
  },
  async mounted() {
    await this.UserConnected()
  }
  });
  
  </script>

  <style>
  .hover-click {
    cursor: pointer;
  }
  </style>