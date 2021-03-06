import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "./store";
import VueProgressiveImage from "vue-progressive-image";

Vue.use(VueProgressiveImage);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
