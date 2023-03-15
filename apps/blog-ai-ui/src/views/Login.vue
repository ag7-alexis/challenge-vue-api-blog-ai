<template>
  <div class="login mt-5">
    <v-sheet width="300" class="mx-auto">

      <v-alert class="mt-4 mb-4" v-if="error" text="Nom d'utilisateur ou mot de passe incorrect"></v-alert>
      <v-alert class="mt-4 mb-4" v-if="success" text="Vous êtes maintenant connecté"></v-alert>

      <v-form ref="form" @submit.prevent="login">
        <v-text-field v-model="username" label="Nom d'utilisateur" required></v-text-field>
        <v-text-field v-model="password" label="Mot de passe" required></v-text-field>

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="login">
            S'identifier
          </v-btn>

          <router-link to="/register"><v-btn class="mt-8 mb-8" block>S'enregistrer</v-btn></router-link>

        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      loading: false,
      success: null,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        console.log(this.username);
        const response = await axios.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        }, {
          headers: {
            'Accept': '*/*',
            "Access-Control-Allow-Credentials": true
          },
          withCredentials: true
        });
        this.success = response.data;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
      this.loading = false;
    },
  },
});
</script>
