<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";

const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

const isHiddenLayout = computed(() =>
  route.path.startsWith("/Admin") || route.path.startsWith("/Worker")
);

// router 준비 후 로딩 종료
onMounted(async () => {
  await router.isReady(); // ⭐ 중요!
  setTimeout(() => {
    isLoading.value = false;
  }, 1000); // 필요시 시간 조절
});
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <Topbar v-if="!isHiddenLayout && route.name !== 'NotFound'" />
    <router-view />
    <Footer v-if="!isHiddenLayout && route.name !== 'NotFound'" />
  </div>
</template>
