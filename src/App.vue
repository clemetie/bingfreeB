<script setup>
import Topbar from "./components/Topbar.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
<div>
    <Topbar />
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped></style>
