import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/reset.css"; // * 初始化样式

import { dateFormat } from "./utils/utils.js";
import api from "./request/api.js";

Vue.config.productionTip = false;

Vue.prototype.$http = api;
Vue.prototype.$dateFormat = dateFormat;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
