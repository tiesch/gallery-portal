import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/modules/layout/Layout.vue";
import Gallery from "@/modules/gallery/Gallery.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      component: Layout,
      children: [
        {
          path: "",
          name: "gallery",
          component: Gallery
        }
      ]
    }
  ]
});

export default router;
