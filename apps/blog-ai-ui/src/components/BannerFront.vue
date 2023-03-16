<template>
  <div class="hello bg-indigo-lighten-2 pt-4 pb-4 text-center">
    <img alt="Vue logo" src="../assets/logo_v2.png" :width="250" class="mt-10 mb-10" />
    <h1>{{ msg }}</h1>

    <router-link to="/articles">
    <v-btn class="mt-8 p-4 mx-lg-auto">
      Je découvre les articles
    </v-btn>
    </router-link>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BannerFront',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
