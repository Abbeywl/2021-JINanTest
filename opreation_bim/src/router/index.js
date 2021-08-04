import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/Login.vue"
import Main from '../views/Home.vue'

const routes = [
  {
      // 登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 首页
      path: '/main',
      name: 'Main',
      component: Main
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
