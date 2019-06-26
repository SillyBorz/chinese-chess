import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/signin"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./views/Index.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/Signin.vue")
    }]
});
