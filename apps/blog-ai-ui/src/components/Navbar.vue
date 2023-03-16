<template>
  <div class="header">
    <router-link to="/" class="title">CHATBLOG</router-link>
    <div class="nav">
      <router-link to="/" class="button">Accueil</router-link>
      <router-link to="/articles" class="button">Articles</router-link>
      <!-- <router-link to="/generate" class="button">Générer</router-link> -->
      <router-link v-if="!isAuthenticated" to="/register" class="button-register">Créer un compte</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="button-login">Se connecter</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { UserInfo } from '../auth';

export default defineComponent({
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    async UserConnected() {
      // Vérifier si l'utilisateur est authentifié
      const authenticated = await UserInfo();
      if (authenticated) {
        this.isAuthenticated = true;
      }
    },
  },
  async mounted() {
    await this.UserConnected()
  }
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
    margin: auto 20px;
  }

  a.button-register {
    color: #fff;
    // background-color:;
    border-radius: 5px;
    padding: 7px 10px;
    border: solid #3BCBFF;
    margin: auto 15px;
  }

  a.button-login {
    border: solid #3BCBFF;
    color: #000000;
    background-color: #3BCBFF;
    border-radius: 5px;
    padding: 7px 15px;
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

@media screen and (max-width: 700px) {
  .header{
    display: inline-block !important;
    text-align: center;
    position: initial !important;
    .nav {
      display: inline-block;
      a {
        display: inline-block;
        width: 100%;
        margin: 0px 10px;
      }
    }
  }
  .router-view{
    padding-top: 0px !important;
  }
}

</style>