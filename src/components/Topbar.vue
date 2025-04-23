<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const highlightPaths = ["/", "/IntroBing", "/Check", "/Reservation", "/Review"];
</script>
<template>
  <div class="topbar" style="color: #fff">
    <router-link
      to="/"
      :style="{
        backgroundColor: highlightPaths.includes(route.path)
          ? '#1456fd'
          : 'black',
      }"
      >빙프리 홈페이지
    </router-link>
    <router-link
      to="/BingPrime"
      :style="{
        backgroundColor: route.path === '/BingPrime' ? '#1456fd' : 'black',
      }"
      >빙프라임</router-link
    >
    <router-link
      to="/"
      :style="{
        backgroundColor: route.path === '/FreeMall' ? '#1456fd' : 'black',
      }"
      >프리몰</router-link
    >
  </div>
</template>
<style scoped>
@media (min-width: 370px) and (max-width: 767px) {
  .topbar a {
    width: 30% !important;
    font-size: 11px !important;
  }
}
.topbar {
  position: fixed; /* 또는 absolute / fixed */
  z-index: 100;
  width: 100%;
  height: 40px;
  top: 0;
  background-color: black;
  text-align: center;
}
.topbar a {
  width: 20%;
  margin: 0 5px;
  display: inline-block;
  /* background-color: #1456fd; */
  padding: 0 20px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
