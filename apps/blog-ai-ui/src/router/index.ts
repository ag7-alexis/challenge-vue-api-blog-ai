import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Articles from '../views/Articles.vue'
import Generate from '../views/Generate.vue'
import Login from '../views/Login.vue'
import ArticlesDetails from '../views/ArticlesDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/articles/:uuid',
    name: 'articlesDetails',
    component: ArticlesDetails
  }
  // {
  //   path: '/generer',
  //   name: 'Generer',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
