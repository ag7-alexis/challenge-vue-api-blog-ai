<template>
  <div class="login mt-5">
    <v-sheet width="300" class="mx-auto">

      <v-alert class="mt-4 mb-4" v-if="success" text="Inscription confirmée, vous êtes maintenant connecté"></v-alert>

      <v-form ref="form" @submit.prevent="register">
        <v-text-field v-model="username" label="Nom d'utilisateur" required></v-text-field>
        <v-text-field v-model="password" label="Mot de passe" required></v-text-field>

        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="register">
            S'enregistrer
          </v-btn>

          <router-link to="/login"><v-btn class="mt-8 mb-8" block>S'identifier</v-btn></router-link>

        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import {
  User
} from '@challenge-vue-api-blog-ai/shared';

interface ViewContext {
  username: string;
  password: string;
  error: any;
  loading: boolean;
  success: any
}

export default defineComponent({
  name: 'Register',
  data(): ViewContext {
    return {
      username: '',
      password: '',
      error: null,
      loading: false,
      success: null,
    };
  },
  methods: {
    async register() {
      this.loading = true;
      try {
        const userCandidate: Partial<User> = {
          username: this.username,
          password: this.password,
        };
        const response = await axios.post<User>('http://localhost:3333/api/auth/register', userCandidate, {
          headers: {
            'Accept': '*/*',
            "Access-Control-Allow-Credentials": true
          },
          withCredentials: true

        });
        this.success = response.data;
      } catch (error: any) {
        this.error = error.message;
        console.log(error);
      }
      this.loading = false;
    },
  },
});
</script>
