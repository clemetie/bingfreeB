<script setup>
import { useRoute } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
</script>

<template>
  <div>
    <Topbar v-if="route.name !== 'NotFound'" />
    <Header v-if="route.name !== 'NotFound'" />
    <router-view></router-view>
    <Footer v-if="route.name !== 'NotFound'" />
  </div>
</template>
