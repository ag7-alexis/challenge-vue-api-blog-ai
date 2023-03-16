import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Articles from '../views/Articles.vue'
import Generate from '../views/Admin/Generate.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ArticlesDetails from '../views/ArticlesDetails.vue'
import EditArticle from '../views/Admin/EditArticles.vue'
import Category from '../views/Admin/Category.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/articles',
    name: 'articles',
    component: Articles,
  },
  {
    path: '/generate',
    name: 'generate',
    component: Generate,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/articles/:uuid',
    name: 'articlesDetails',
    component: ArticlesDetails
  },
  {
    path: '/articles/edit/:uuid',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
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
