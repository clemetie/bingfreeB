import { createRouter, createWebHistory } from "vue-router";
import BingFree from "@/views/BingFree.vue";
import BingPrime from "@/views/BingPrime.vue";
import FreeMall from "@/views/FreeMall.vue";
import IntroBing from "@/views/IntroBing.vue";
import Check from "@/views/Check.vue";
import Review from "@/views/Review.vue";
import Reservation from "@/views/Reservation.vue";
import Error from "@/views/Error.vue";

const routes = [
  {
    path: "/",
    component: BingFree,
  },
  {
    path: "/BingPrime",
    component: BingPrime,
  },
  {
    path: "/FreeMall",
    component: FreeMall,
  },
  {
    path: "/IntroBing",
    component: IntroBing,
  },
  {
    path: "/Check",
    component: Check,
  },
  {
    path: "/Review",
    component: Review,
  },
  {
    path: "/Reservation",
    component: Reservation,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 최상단으로 이동
    return { top: 0 };
  },
});

export default router;
