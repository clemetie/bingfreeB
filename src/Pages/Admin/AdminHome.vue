<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

const links = [
  {
    name: "대시보드",
    imgUrl: "/public/prime/dashboard-icon.png",
    path: "/Admin/Dashboard",
    icon: "fas fa-chart-line",
  },
  {
    name: "예약관리",
    imgUrl: "/public/prime/reservation-icon.png",
    path: "/Admin/AdminReservation",
    icon: "fas fa-calendar-check",
  },
  {
    name: "고객관리",
    imgUrl: "/public/prime/customer-icon.png",
    path: "/Admin/Customers",
    icon: "fas fa-users",
  },
  {
    name: "기사관리",
    imgUrl: "/public/prime/worker-icon.png",
    path: "/Admin/Workers",
    icon: "fas fa-user-tie",
  },
  {
    name: "클레임",
    imgUrl: "/public/prime/claim-icon.png",
    path: "/Admin/Claim",
    icon: "fas fa-user-tie",
  },
  {
    name: "정산내역",
    imgUrl: "/public/prime/pay-icon.png",
    path: "/Admin/Sales",
    icon: "fas fa-user-tie",
  },
  {
    name: "게시판",
    imgUrl: "/public/prime/notice-icon.png",
    path: "/Admin/Board",
    icon: "fas fa-user-tie",
  },
  {
    name: "설정",
    imgUrl: "/public/prime/settings-icon.png",
    path: "/Admin/Settings",
    icon: "fas fa-cog",
  },
];

// 현재 경로에 따른 활성화 상태 계산
const isActive = (path) => route.path === path;

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<!-- 지수 대시보드 홈 -->

<template>
  <!-- 페이지 헤더 -->
  <header class="adminHead">
    <div class="logo">
      <router-link to="/Admin/Dashboard"><img src="/public/prime/bingfree-logo.png" alt="빙프리로고" /></router-link>
    </div>
    <div class="right">
      <div class="right-icon saerch">
        <img src="/public/prime/search-icon.png" alt="돋보기 아이콘" />
      </div>
      <div class="right-icon bell">
        <img src="/public/prime/bell-icon.png" alt="알림 아이콘" />
        <img class="redPoint" src="/public/prime/redPoint-icon.png" alt="알림이 있을때 활성화되는 빨간도트 아이콘" />
      </div>
      <div class="right-icon darkmode">
        <img src="/public/prime/darkmode-icon.png" alt="다크모드 아이콘" />
      </div>
      <div class="right-icon setting">
        <img src="/public/prime/setting-icon.png" alt="설정 아이콘" />
      </div>
      <div class="right-icon profile">
        <img src="/public/prime/profile-image-icon.png" alt="프로필 아이콘" />
      </div>
    </div>
  </header>
  <div class="home">
    <!-- 사이드바 -->
    <div class="sidebar">
      <nav class="side-menu">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="flex items-center text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray8 transition-colors"
          :class="{ 'bg-gray1 text-gray8 font-semibold': isActive(link.path) }">
          <img :src="link.imgUrl" :alt="link.name" />
          {{ link.name }}
        </router-link>
      </nav>
      <div class="logout-wrap">
        <div class="logout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.66667 15H2.55556C2.143 15 1.74733 14.8361 1.45561 14.5444C1.16389 14.2527 1 13.857 1 13.4444V2.55556C1 2.143 1.16389 1.74733 1.45561 1.45561C1.74733 1.16389 2.143 1 2.55556 1H5.66667"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M11.1112 11.8891L15.0001 8.00022L11.1112 4.11133"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M15 8H5.66663"
              stroke="#616161"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>로그아웃</span>
        </div>
      </div>
    </div>
    <!-- 전체 -->
    <div class="admin-right">
      <p v-if="isLoggedIn">🛠 {{ userName }} 기사님!</p>
      <div>
        <main class="adminbody"><router-view></router-view></main>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
