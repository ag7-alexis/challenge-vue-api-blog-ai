import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Articles from '../views/Articles.vue'
import Generate from '../views/Admin/Generate.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ArticlesDetails from '../views/ArticlesDetails.vue'
import EditArticle from '../views/Admin/EditArticles.vue'
import Category from '../views/Admin/Category.vue'
import { UserInfo } from '../auth';

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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
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
    component: EditArticle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: Category,
    meta: {
      requiresAuth: true
    }
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


async function UserConnected() {
  const authenticated = await UserInfo();
  if (authenticated) {
    return true;
  }
  return false;
};


router.beforeEach(async(to, from, next) => {

  // Call the function to check if the user is authenticated
  const isAuthenticated = await UserConnected();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("dsq");
    if (!isAuthenticated) {
      window.location.href = "/login";
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})



export default router;
