import Vue from "vue";
import Router from "vue-router";
import NotFound from "./views/not-found";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import UserInfo from "./components/userinfo/user-info";
import ArticleEdit from "./components/articleedit/article-edit";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "",
          name: "artilce-edit",
          component: ArticleEdit
        },
        {
          path: "/userInfo",
          name: "userInfo",
          component: UserInfo
        }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      name: "not-found",
      component: NotFound
    }
  ]
});

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
