<template>
  <div class="header">
    <router-link to="/" class="title">CHATBLOG</router-link>
    <div class="nav">
      <router-link to="/" class="button">Accueil</router-link>
      <router-link to="/articles" class="button">Articles</router-link>
      <router-link to="/generate" class="button">Générer</router-link>
      <router-link to="/categories" class="button">Categories</router-link>

      <button @click="logout" class="button-login">Se déconnecter</button>
    </div>
  </div>
</template>


<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({

  methods: {
    async logout() {
      await axios.get("/api/auth/logout");
      window.location.href = '/';
    }
  },

});
</script>



<style  lang="scss">
.header {
  background-color: #494949;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
  position: fixed;
  width: 100%;
  box-shadow: 0px 5px 40px grey;
  z-index: 1;
  color: #fff;
}

.nav {
  padding: 20px;
  display: flex;
  justify-content: space-around;

  a {
    color: #ffffff;
    text-decoration: none;
    margin: auto;

    &.router-link-exact-active {
      color: #3BCBFF;
    }
  }

  a.button {
    margin: auto 2Opx;
  }

  a.button-register {
    color: #fff;
    // background-color:;
    border-radius: 5px;
    padding: 7px 10px;
    border: solid #3BCBFF;
    margin: auto 10px;
  }

  a.button-login {
    border: solid #3BCBFF;
    color: #000000;
    background-color: #3BCBFF;
    border-radius: 5px;
    padding: 7px 10px;
  }
}

.title {
  margin: auto 0px;
  text-decoration: none;
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #ffffff;
}
</style>