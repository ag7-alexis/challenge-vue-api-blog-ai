<template>
  <div v-if="category" class="Category">
      <div class="text-black pt-10 pb-5 text-left pl-10">
          <h1 class="mb-8 d-inline mr-5">Liste des categories</h1>
          <v-btn @click="showAddCategoryModal">Ajouter une catégorie</v-btn>
      </div>
      <v-container class="text-black text-left mt-8 mb-8">
        <v-row>
        <v-col v-for="item in category.data" :key="item.uuid" cols="12">
          <v-card
              class="pl-5"
              max-width="300"
              block
            >
          <v-list :item="item.name" block>  {{ item.name  }} <v-btn @click="deleteCategory(item.uuid)">Supprimer</v-btn> </v-list>
          
        </v-card>
      </v-col>
        
      </v-row>
      </v-container>

    <v-dialog
      v-model="addCategoryModalVisible"
      width="auto"
    >

      <v-card>
        <v-card-text>
          <v-sheet width="300" class="mx-auto">
            <v-text class="text-h5 text-center mb-5">Ajouter une catégorie</v-text>
        <v-form @submit.prevent="addCategory" class="mt-5">
        <v-text-field
          v-model="newCategoryName"
          label="Nom de la catégorie"
          required
        ></v-text-field>
        <v-btn type="submit" block class="mt-2" @click="addCategory">Ajouter</v-btn>
      </v-form>
    </v-sheet>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import {
Category, Pagination,
} from '@challenge-vue-api-blog-ai/shared';

interface ViewContext {
  category: Pagination<Category> | undefined
  fields: string[]
  addCategoryModalVisible: boolean
  newCategoryName: string
  renderComponent: boolean
  error: any
  dialog: false,
  success: any
}


export default defineComponent({
  name: 'Category',
  data(): ViewContext {
      return {
        category: undefined,
        fields: ['name'],
      addCategoryModalVisible: false,
      newCategoryName: '',
      renderComponent: true,
      error: null,
      success: null,
      dialog: false,
      };
  },
  methods: {
      async GetCategory() {
          const isDataLoading = ref(true)
          const route = useRoute()

          const GetCategory = await axios.get<Pagination<Category>>('/api/category')
          const { data, status } = GetCategory // object destructuring FTW!
          if (status === 200) {
              isDataLoading.value = false
          }
          this.category = data
          console.log(data)
      },
      showAddCategoryModal() {
      this.addCategoryModalVisible = true;
    },
    async addCategory() {
      try {
        const response = await axios.post<Category>("/api/category", { name: this.newCategoryName }, {
        });
        this.success = response.data;
        this.category?.data.push(response.data);
      } catch (error: any) {
        this.error = error.message;
        
      }
      this.addCategoryModalVisible = false;
    },
    async deleteCategory(uuid: string) {
      try {
        const response = await axios.delete<Category>("/api/category/" + uuid);
        this.success = response.data;
        location.reload();
      //  this.category = response.data;
        

      } catch (error: any) {
        this.error = error.message;
        
      }
      this.addCategoryModalVisible = false;
    },
  },
  async mounted() {
      await this.GetCategory()
  }
});
</script>
