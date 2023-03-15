<template>
  <div>
    <p>test</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

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
      const isDataLoading = ref(true)
      const route = useRoute()

      const LastArticles = await axios.get('/api/post/' + route.params.uuid)
      const { data, status } = LastArticles // object destructuring FTW!
      if (status === 200) {
        isDataLoading.value = false
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

<style></style>
