<template>
    <div v-if="article" class="ArticlesDetails">
        <div class="headerArticles bg-indigo-lighten-2 pt-10 pb-5 text-left pl-10">
            <h1 class="mb-8">{{ article.title }}</h1>
            <p class="d-inline">
                Publié le 13/03/2023 |
                <span v-if="article.category" class="pl-3">
                    Catégorie : {{ article.category.name }}
                </span>
            </p>
        </div>
        <v-container class="text-black text-left mt-8 mb-8">

            <div class="text-center">
                <img :src="article.thumbnail" alt="thumbnail" class="mb-8 w-50" />
            </div>


            {{ article.content }}
        </v-container>
        <router-link to="/"><v-btn class="ml-8 mt-8 mb-8">Voir tous les articles</v-btn></router-link>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import {
    Post
} from '@challenge-vue-api-blog-ai/shared';

interface ViewContext {
    article: Post | undefined
}


export default defineComponent({
    name: 'ArticlesDetails',
    data(): ViewContext {
        return {
            article: undefined,
        };
    },
    methods: {
        async LastArticles() {
            const isDataLoading = ref(true)
            const route = useRoute()

            const LastArticles = await axios.get<Post>('/api/post/' + route.params.uuid)
            const { data, status } = LastArticles // object destructuring FTW!
            if (status === 200) {
                isDataLoading.value = false
            }
            this.article = data
            console.log(data);
        },
    },
    async mounted() {
        await this.LastArticles()
    }
});
</script>
  