<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

const isHiddenLayout = computed(
  () => route.path.startsWith("/Admin") || route.path.startsWith("/Worker")
);
</script>

<template>
  <div>
    <Topbar v-if="!isHiddenLayout && route.name !== 'NotFound'" />
    <router-view />
    <Footer v-if="!isHiddenLayout && route.name !== 'NotFound'" />
  </div>
</template>
