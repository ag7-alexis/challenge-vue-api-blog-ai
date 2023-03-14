<template>
  <div class="header">
    <h1 class="title">CHATBLOG</h1>
    <div class="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/articles">Articles</router-link>
      <router-link to="/generate">Générer</router-link>
      <router-link to="/login" class="button">Se connecter</router-link>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;400;700&display=swap');

#app {
  font-family: 'Roboto Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 // text-align: center;
  color: #ffffff;
}

.header {
  background-color: #494949;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}

.nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  gap: 60px;
  font-weight: 100;
  font-style: thin;

  a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #3BCBFF;
    }
  }
}

nav.router-link-active {
  background-color: red;
}

.title {
  margin: auto 0px;
}

.button {
  padding: 0px 10px;
  background-color: red;
  color: #3BCBFF;
}
</style>
