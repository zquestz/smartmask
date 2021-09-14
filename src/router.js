/* ./src/router.css */

import { createRouter, createWebHistory } from "vue-router";
import About from "./components/About.vue";
import Community from "./components/Community.vue";
import SmartMask from "./components/SmartMask.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SmartMask,
    },
    {
      path: "/community",
      component: Community,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
