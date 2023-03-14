<template>
    <div>
        <p>test</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'EditArticles',
  components: {
    
  },
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
            // await this.AllArticles()
  },
})
</script>

<style>
</style>
