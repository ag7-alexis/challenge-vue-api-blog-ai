<template>
  <div class="header">
    <router-link to="/" class="title">CHATBLOG</router-link>
    <div class="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/articles">Articles</router-link>
      <router-link to="/generate">Générer</router-link>
      <router-link to="/login" class="button">Se connecter</router-link>
    </div>
  </div>
  <router-view class="router-view" />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;400;700&display=swap');

#app {
  font-family: 'Roboto Mono', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.header {
  background-color: #494949;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
  position: fixed;
  width: 100%;
  box-shadow: 0px 5px 40px grey;
}

.nav {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  gap: 60px;

  a {
    color: #ffffff;
    text-decoration: none;
    margin: auto;

    &.router-link-exact-active {
      color: #3BCBFF;
    }
  }

  a.button {
    color: #000000;
    background-color: #3BCBFF;
    border-radius: 5px;
    padding: 7px 20px;
  }
}

.router-view {
  padding-top: 100px;
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
